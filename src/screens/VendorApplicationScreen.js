import React,{useEffect,useState} from 'react';
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';
import {keyboardBeingDisplay,keyboardBeingClose} from '../components/handleKeyboard'
import { CustomFormAction, CustomTextInput } from '../components/Custom'
import LayoutA from '../Layout/LayoutA';
const validationSchema = Yup.object().shape({

    vendorName: Yup
        .string()
        .required()
        .min(3)
        .label('Vendor Name'),

    vendorEmail: Yup
        .string()
        .email()
        .required()
        .label('Vendor Email'),

    currency: Yup
        .string()
        .required()
        .label('Currency'),

    address: Yup
        .string()
        .required()
        .min(3)
        .label('Vendor Address'),

});

const VendorApplicationScreen = (props) => {

    const dispatch = useDispatch()
    const setVendor = (val) => dispatch({ type: 'SET_VENDOR_DATA', payload: { ...val } });
    const [offSet, setOffSet] = useState(true)
    useEffect(() => {
        const open = () => setOffSet(false)
        const off = () => setOffSet(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates

    return (

        <Formik onSubmit={async values => {
            dispatch(actionCreator.passVendorData(values))
            props.navigation.navigate("VendorAddSuccess")

            console.log(JSON.stringify(values))
        }}

            validationSchema={validationSchema}>

            {FormikProps => {
                const { vendorName, vendorEmail, currency, address } = FormikProps.values

                const vendorNameError = FormikProps.errors.vendorName
                const vendorNameTouched = FormikProps.touched.vendorName

                const vendorEmailError = FormikProps.errors.vendorEmail
                const vendorEmailTouched = FormikProps.touched.vendorEmail

                const currencyError = FormikProps.errors.currency
                const currencyTouched = FormikProps.touched.currency

                const addressError = FormikProps.errors.address
                const addressTouched = FormikProps.touched.address

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center' }} keyboardVerticalOffset={offSet ? 30 : 0}>
                        <LayoutA
                            title={'VENDOR DETAILS'}
                            screenType='form'
                            navigation={props.navigation}
                            nopadding
                        >
                            <ScrollView style={[styles.screenMargin, { flex: 3 }]}>
                                <CustomTextInput
                                    label={`Vendor Name`}
                                    value={vendorName}
                                    handleChange={FormikProps.handleChange(`vendorName`)}
                                    handleBlur={FormikProps.handleBlur('vendorName')}
                                    touched={vendorNameTouched}
                                    error={vendorNameError}
                                    placeholder={'Siti binti Ali'}

                                />
                                <CustomTextInput
                                    label={`Vendor E-mail`}
                                    value={vendorEmail}
                                    handleChange={FormikProps.handleChange(`vendorEmail`)}
                                    handleBlur={FormikProps.handleBlur('vendorEmail')}
                                    touched={vendorEmailTouched}
                                    error={vendorEmailError}
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
                                <CustomTextInput
                                    label={`Vendor Address`}
                                    value={address}
                                    handleChange={FormikProps.handleChange(`address`)}
                                    handleBlur={FormikProps.handleBlur('address')}
                                    touched={addressTouched}
                                    error={addressError}
                                    placeholder={'32, Jalan Hartamas, Bandar Baru Sendayan, Negeri Sembilan'}
                                />
                            </ScrollView>
                            <CustomFormAction
                                navigation={props.navigation}
                                isValid={FormikProps.isValid}
                                handleSubmit={FormikProps.handleSubmit}
                                isSubmitting = {FormikProps.isSubmitting}
                                
                            />
                            </LayoutA>
                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}



export default VendorApplicationScreen