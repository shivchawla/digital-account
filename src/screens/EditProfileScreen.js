import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import styles from '../styles/styles'

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

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }} keyboardVerticalOffset={20}>
                    
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title, { color: '#055E7C' }]}>EDIT PROFILE</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                                </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={[{ flex: 9 }]}>
                                <ScrollView style={[styles.screenMargin]}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10, marginTop: 25, marginBottom: 25 }}>
                                            <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 1, width: 90, height: 90, justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 60 }} />
                                            </View>
                                        </View>
                                        <View style={[styles.formElement]}>
                                            <Text style={[styles.titleBox, { marginBottom: 10 }]}>Company Name</Text>
                                            <TextInput value={companyName} onChangeText={FormikProps.handleChange('companyName')} style={[styles.textInput,{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={'Eg: Syarikat Maju Budi Sdn Bhd'} />
                                        </View>
                                        <View style={[styles.formElement]}>
                                            <Text style={[styles.titleBox, { marginBottom: 10 }]}>Registration Number</Text>
                                            <TextInput value={companyRegNum} onChangeText={FormikProps.handleChange('companyRegNum')} style={[styles.textInput,{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={'Eg: 543-A123'} />
                                        </View>
                                        <View style={[styles.formElement]}>
                                            <Text style={[styles.titleBox, { marginBottom: 10 }]}>Company Addresss</Text>
                                            <TextInput value={companyAddress} onChangeText={FormikProps.handleChange('companyAddress')} style={[styles.textInput,{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5, }]} placeholder={'Eg: 86, Jalan Budiman, Kuala Langat, Selangor'} />
                                        </View>
                                        <View style={[styles.formElement]}>
                                            <Text style={[styles.titleBox, { marginBottom: 10 }]}>Postcode</Text>
                                            <TextInput value={companyPostcode} onChangeText={FormikProps.handleChange('companyPostcode')} style={[styles.textInput,{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={'Eg: 75600'} keyboardType={'phone-pad'} />
                                        </View>
                                        <View style={[styles.formElement]}>
                                            <Text style={[styles.titleBox, { marginBottom: 10 }]}>Email</Text>
                                            <TextInput editable={false} value={email} style={[styles.textInput,{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} />
                                        </View>
                                        <View style={[styles.formElement]}>
                                            <Text style={[styles.titleBox, { marginBottom: 10 }]}>Contact Number</Text>
                                            <TextInput editable={false} value={contactNo} style={[styles.textInput,{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} />
                                        </View>
                                        <View style={[styles.formElement]}>
                                            <Text style={[styles.titleBox, { marginBottom: 10 }]}>Company Registered Date</Text>
                                            <TextInput value={companyRegisteredDate} onChangeText={FormikProps.handleChange('companyRegisteredDate')} style={[styles.textInput,{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} />
                                        </View>
                                </ScrollView>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                    <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                        <Text style={[styles.butang, { color: '#fff' }]}>Submit</Text>
                                       
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}

EditProfileScreen.navigationOptions = {
    header: null,
};

export default EditProfileScreen;