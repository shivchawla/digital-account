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

    capacity: Yup
        .string(),
    name: Yup
        .string(),
    myKad: Yup
        .string(),
    relationship: Yup
        .string(),
    personnelName: Yup
        .string(),
    email: Yup
        .string(),

});


const ConnectedPartiesScreen = () => {

    return (
        <Formik

            onSubmit={values => {
                console.log(JSON.stringify(values))
                //NavigationService.navigate('LoanApplicationDeclaration')
            }}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                const { capacity, name, myKad, relationship, personnelName, email } = FormikProps.values
                // const purposeError = FormikProps.errors.purpose
                // const purposeTouched = FormikProps.touched.purpose

                // const amountError = FormikProps.errors.amount
                // const amountTouched = FormikProps.touched.amount
                return (<Container>
                    <Header style={{ borderBottomWidth: 1, borderColor: '#84A4FD' }}>
                        <Left>
                            <Button transparent onPress={() => NavigationService.goBack()}>
                                <Icon name="ios-arrow-back" style={{ color: '#84A4FD' }} />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Connected Parties</Title>
                        </Body>
                        <Right>
                            <Thumbnail small source={{ uri: `https://picsum.photos/200/300` }} />
                        </Right>
                    </Header>
                    <Content padder>
                        <Form>
                            <Item stackedLabel>
                                <Label>Capacity</Label>
                                <Input value={capacity} onChangeText={FormikProps.handleChange('capacity')} />
                            </Item>
                            <Item stackedLabel >
                                <Label>Name</Label>
                                <Input value={name} onChangeText={FormikProps.handleChange('name')} />
                            </Item>
                            <Item stackedLabel >
                                <Label>MyKad</Label>
                                <Input value={myKad} onChangeText={FormikProps.handleChange('myKad')} />
                            </Item>
                            <Item stackedLabel >
                                <Label>Relationship</Label>
                                <Input value={relationship} onChangeText={FormikProps.handleChange('relationship')} />
                            </Item>
                            <Item stackedLabel >
                                <Label>Bank Personnel Name</Label>
                                <Input value={personnelName} onChangeText={FormikProps.handleChange('personnelName')} />
                            </Item>
                            <Item stackedLabel >
                                <Label>Email</Label>
                                <Input value={email} onChangeText={FormikProps.handleChange('email')} />
                            </Item>
                        </Form>
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



ConnectedPartiesScreen.navigationOptions = {
    header: null,
};

export default ConnectedPartiesScreen;
