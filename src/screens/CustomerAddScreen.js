import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView, TextInput, ActivityIndicator } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import { CustomFormAction, CustomTextInput } from '../components/Custom'
import LayoutA from '../Layout/LayoutA';

const validationSchema = Yup.object().shape({

    customerName: Yup
        .string()
        .required()
        .min(3)
        .label('Customer Name'),

    customerEmail: Yup
        .string()
        .email()
        .required()
        .label('Customer Email'),

    currency: Yup
        .string()
        .required()
        .label('Currency'),

});

const CustomerAddScreen = (props) => {

    const dispatch = useDispatch()
    const setCustomer = (val) => dispatch({ type: 'SET_CUSTOMER_DATA', payload: { ...val } });
    const [offSet,setOffSet]=useState(true)
    useEffect(() => {
        const open = () => setOffSet(false)
        const off = () => setOffSet(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates


    return (

        <Formik onSubmit={async values => {

            dispatch(actionCreator.passCustomerData(values))
            props.navigation.navigate("CustomerAddSuccess")
            console.log(JSON.stringify(values))
        }}

            validationSchema={validationSchema}>

            {FormikProps => {
                const { customerName, customerEmail, currency } = FormikProps.values

                const customerNameError = FormikProps.errors.customerName
                const customerNameTouched = FormikProps.touched.customerName

                const customerEmailError = FormikProps.errors.customerEmail
                const customerEmailTouched = FormikProps.touched.customerEmail

                const currencyError = FormikProps.errors.currency
                const currencyTouched = FormikProps.touched.currency

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center' }} keyboardVerticalOffset={offSet ? 30 : 0} >
                        {/*<View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text numberOfLines={1} style={[styles.title, { color: '#055E7C' }]} ellipsizeMode='tail' >CUSTOMER DETAILS</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <View style={{ backgroundColor:'rgba(62,194,217,0.5)',borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
          </View>
                            </View>
                </View>*/}
                        <LayoutA
                            title={'CUSTOMER DETAILS'}
                            screenType='form'
                            navigation={props.navigation}
                            nopadding
                           
                        >
                            <View style={[styles.screenMargin, { flex: 3, marginRight: 20 }]}>
                                <CustomTextInput
                                    label={`Customer Name`}
                                    value={customerName}
                                    handleChange={FormikProps.handleChange(`customerName`)}
                                    handleBlur={FormikProps.handleBlur('customerName')}
                                    touched={customerNameTouched}
                                    error={customerNameError}
                                    placeholder={'Siti binti Ali'}
                                />
                                <CustomTextInput
                                    label={`Customer E-mail`}
                                    value={customerEmail}
                                    handleChange={FormikProps.handleChange(`customerEmail`)}
                                    handleBlur={FormikProps.handleBlur('customerEmail')}
                                    touched={customerEmailTouched}
                                    error={customerEmailError}
                                    placeholder={'example@email.com'}
                                />
                                <CustomTextInput
                                    label={`Preferred Currency`}
                                    value={currency}
                                    handleChange={FormikProps.handleChange(`currency`)}
                                    handleBlur={FormikProps.handleBlur('currency')}
                                    touched={currencyTouched}
                                    error={currencyError}
                                    placeholder={'MYR'}
                                />
                            </View>
                            <CustomFormAction
                                navigation={props.navigation}
                                isValid={FormikProps.isValid}
                                handleSubmit={FormikProps.handleSubmit}
                                isSubmitting={FormikProps.isSubmitting}
                            />
                        </LayoutA>
                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}

CustomerAddScreen.navigationOptions = {
    header: null,
};

export default CustomerAddScreen