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

    amount: Yup
        .string()
        .required(),
    purpose: Yup
        .string()

});


const LoanApplicationScreen = () => {

    return (
        <Formik

            onSubmit={values => {
                console.log(JSON.stringify(values))
                NavigationService.navigate('LoanApplicationDeclaration')
            }}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                const { amount, purpose } = FormikProps.values
                const purposeError = FormikProps.errors.purpose
                const purposeTouched = FormikProps.touched.purpose

                const amountError = FormikProps.errors.amount
                const amountTouched = FormikProps.touched.amount
                return (<Container>
                    <Header style={{ borderBottomWidth: 1, borderColor: '#84A4FD' }}>
                        <Left>
                            <Button transparent onPress={() => NavigationService.goBack()}>
                                <Icon name="ios-arrow-back" style={{ color: '#84A4FD' }} />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Loan Application</Title>
                        </Body>
                        <Right>
                            <Thumbnail small source={{ uri: `https://picsum.photos/200/300` }} />
                        </Right>
                    </Header>
                    <Content padder>
                        <Form>
                            <Item stackedLabel>
                                <Label>Total Financing (MYR)</Label>
                                <Input value={amount} onChangeText={FormikProps.handleChange('amount')} />
                            </Item>
                            <Item stackedLabel >
                                <Label>Purpose</Label>
                                <Input value={purpose} onChangeText={FormikProps.handleChange('purpose')} />
                            </Item>
                            <Item stackedLabel>
                                <Label>Is company connected with SME Bank</Label>
                                <View style={{ flex: 1, flexDirection: 'row' }}><CheckBox checked={false} /><Text>Yes</Text><CheckBox checked={false} /><Text>No</Text></View>
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



LoanApplicationScreen.navigationOptions = {
    header: null,
};

export default LoanApplicationScreen;
