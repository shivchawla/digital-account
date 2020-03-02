import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import styles from '../styles/styles'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import LayoutA from '../Layout/LayoutA';
import { CustomFormAction, CustomTextInput } from '../components/Custom'


const validationSchema = Yup.object().shape({

    companyName: Yup
        .string()
        .min(3)
        .label('Company Name'),

    registrationNumber: Yup
        .string()
        .min(3)
        .label('Registration Number'),

    companyAddress: Yup
        .string()
        .min(3)
        .label('Company Address'),

    companyPostcode: Yup
        .string()
        .min(5)
        .label('Company Postcode'),

    companyRegisteredDate: Yup
        .string()
        .label('Company Registration Date'),

});

const EditProfileScreen = (props) => {
    useEffect(() => {
        retrieveMerchantInfo()
    }, [])

    const [offSet, setOffSet] = useState(true)
    useEffect(() => {
        const open = () => setOffSet(false)
        const off = () => setOffSet(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates

    const dispatch = useDispatch()
    const retrieveMerchantInfo = () => { dispatch(actionCreator.retrieveMerchantInfo()) }
    const { business_name, business_reg_no, business_address, business_postcode, support_email, contact_no } = useSelector(state => state.merchantInfoReducer, shallowEqual)

    return (

        <Formik initialValues={{ companyName: business_name, companyRegNum: business_reg_no, companyAddress: business_address, companyPostcode: business_postcode, email: support_email, contactNo: contact_no }} onSubmit={async values => {
        }}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                const { companyName, companyRegNum, companyAddress, companyPostcode, companyRegisteredDate, email, contactNo } = FormikProps.values

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }} keyboardVerticalOffset={offSet ? 30 : 0} >

                        <View style={{ flex: 1 }}>
                            <LayoutA
                                title={'EDIT PROFILE'}
                                screenType='form'
                                navigation={props.navigation}
                                nopadding
                            >

                                <View style={[{ flex: 9 }]}>
                                    <ScrollView style={[styles.screenMargin]}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10, marginTop: 25, marginBottom: 25 }}>
                                            <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 1, width: 90, height: 90, justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 60 }} />
                                            </View>
                                        </View>
                                        <CustomTextInput
                                            label={`Company Name`}
                                            value={companyName}
                                            handleChange={FormikProps.handleChange(`companyName`)}
                                            handleBlur={FormikProps.handleBlur('companyName')}
                                            placeholder={'Eg: Syarikat Maju Budi Sdn Bhd'}
                                        />
                                        <CustomTextInput
                                            label={`Registration Number`}
                                            value={companyRegNum}
                                            handleChange={FormikProps.handleChange(`companyRegNum`)}
                                            handleBlur={FormikProps.handleBlur('companyRegNum')}
                                            placeholder={'Eg: 543-A123'}
                                        />
                                        <CustomTextInput
                                            label={`Company Addresss`}
                                            value={companyAddress}
                                            handleChange={FormikProps.handleChange(`companyAddress`)}
                                            handleBlur={FormikProps.handleBlur('companyAddress')}
                                            placeholder={'Eg: 86, Jalan Budiman, Kuala Langat, Selangor'}
                                        />
                                        <CustomTextInput
                                            label={`Postcode`}
                                            value={companyPostcode}
                                            handleChange={FormikProps.handleChange(`companyPostcode`)}
                                            handleBlur={FormikProps.handleBlur('companyPostcode')}
                                            placeholder={'Eg: 75600'}
                                            keyboardType={'phone-pad'}
                                        />
                                        <View style={[styles.formElement]}>
                                            <Text style={[styles.titleBox, { marginBottom: 10 }]}>Email</Text>
                                            <TextInput editable={false} value={email} style={[styles.textInput, { borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} />
                                        </View>
                                        <View style={[styles.formElement]}>
                                            <Text style={[styles.titleBox, { marginBottom: 10 }]}>Contact Number</Text>
                                            <TextInput editable={false} value={contactNo} style={[styles.textInput, { borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} />
                                        </View>
                                        <CustomTextInput
                                            label={`Company Registered Date`}
                                            value={companyRegisteredDate}
                                            handleChange={FormikProps.handleChange(`companyRegisteredDate`)}
                                            handleBlur={FormikProps.handleBlur('companyRegisteredDate')}
                                        />
                                    </ScrollView>
                                </View>
                                <CustomFormAction
                                navigation={props.navigation}
                                isValid={FormikProps.isValid}
                                handleSubmit={FormikProps.handleSubmit}
                                label={`Submit`}
                            />
                            </LayoutA>
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}



export default EditProfileScreen;