import React from 'react';
import {
    View

} from 'react-native';
import NavigationService from '../navigation/NavigationService'
import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'


import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    bank: Yup
        .string()
        .required(),
    amount: Yup
        .string()
        .required(),
    remark: Yup
        .string()

});


const WithdrawScreen = () => {


    return (
        <Formik

            onSubmit={values => console.log(JSON.stringify(values))}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                const { bank, amount,remark } = FormikProps.values
                const bankError = FormikProps.errors.bank
                const bankTouched = FormikProps.touched.bank

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
                            <Title>Withdrawal</Title>
                        </Body>
                        <Right>
                            <Thumbnail small source={{ uri: `https://picsum.photos/200/300` }} />
                        </Right>
                    </Header>
                    <Content padder>
                        <Form>
                            <Item stackedLabel>
                                <Label>Bank</Label>
                                <Input value={bank} onChangeText={FormikProps.handleChange('bank')} />
                            </Item>
                            <Item stackedLabel >
                                <Label>Amount</Label>
                                <Input value={amount} onChangeText={FormikProps.handleChange('amount')} />
                            </Item>
                            <Item stackedLabel>
                                <Label>Remark</Label>
                                <Input value={remark} onChangeText={FormikProps.handleChange('remark')} />
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



WithdrawScreen.navigationOptions = {
    header: null,
};

export default WithdrawScreen;
