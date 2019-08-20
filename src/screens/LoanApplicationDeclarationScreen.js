import React from 'react';
import {
    View

} from 'react-native';
import NavigationService from '../navigation/NavigationService'
import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, Card, CardItem, Thumbnail, Grid, Col, Row, Form, Item, Label, Input, Textarea, ListItem, CheckBox } from 'native-base';
import SideBar from '../components/SideBar'

import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({

   

});


const LoanApplicationDeclarationScreen = () => {

    return (
        <Formik

            onSubmit={values => {
                console.log(JSON.stringify(values))
                NavigationService.navigate('ConnectedParties')
            }}
            validationSchema={validationSchema}
        >
            {FormikProps => {
               
                return (<Container>
                    <Header style={{ borderBottomWidth: 1, borderColor: '#84A4FD' }}>
                        <Left>
                            <Button transparent onPress={() => NavigationService.goBack()}>
                                <Icon name="ios-arrow-back" style={{ color: '#84A4FD' }} />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Declaration</Title>
                        </Body>
                        <Right>
                            <Thumbnail small source={{ uri: `https://picsum.photos/200/300` }} />
                        </Right>
                    </Header>
                    <Content padder>
                        <ListItem>
                            <CheckBox checked={true} />
                            <Body>
                                <Text>Daily Stand Up</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <CheckBox checked={false} />
                            <Body>
                                <Text>Discussion with Client</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <CheckBox checked={false} />
                            <Body>
                                <Text>Finish list Screen</Text>
                            </Body>
                        </ListItem>
                    </Content>
                    <Footer>
                        <FooterTab>
                            <Button>
                                <Text>Back</Text>
                            </Button>
                            <Button onPress={FormikProps.handleSubmit} >
                                <Text>Submit</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>)
            }}
        </Formik >
    );
}



LoanApplicationDeclarationScreen.navigationOptions = {
    header: null,
};

export default LoanApplicationDeclarationScreen;
