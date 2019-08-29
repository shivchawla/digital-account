//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useRef } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    TextInput,
    AsyncStorage,
    ImageBackground,
    KeyboardAvoidingView,
    ActivityIndicator


} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import { Formik } from 'formik';
import * as Yup from 'yup';

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { DatePicker } from 'native-base'
import moment from 'moment'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'


const validationSchema = Yup.object().shape({
    cddCompanyName: Yup
        .string()
        .required(),

    cddRegistrationNumber: Yup
        .string()
        .required()

});

const CompanyInformationScreen = (props) => {
    const dispatch = useDispatch()
    const companyInfo = (values) => {
        dispatch(actionCreator.companyInfo(values))
        props.navigation.navigate('CompanyContactInformation')
    }

    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>

            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Formik
                        // initialValues={{ email: '', password: '' }}
                        onSubmit={values => companyInfo(values)}
                        validationSchema={validationSchema}
                    >
                        {FormikProps => {
                            const { cddCompanyName, cddRegistrationNumber, cddAddress, cddPostcode, cddTelephone, cddEmail } = FormikProps.values
                            const cddCompanyNameError = FormikProps.errors.cddCompanyName
                            const cddRegistrationNumberError = FormikProps.errors.cddRegistrationNumber
                            const cddCompanyNameTouched = FormikProps.touched.cddCompanyName
                            const cddRegistrationNumberTouched = FormikProps.touched.cddRegistrationNumber

                            return (
                                <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                                    <Text style={[styles.text, { margin: 5, fontWeight: 'bold' }]}>COMPANY INFORMATION</Text>
                                    <Text style={[styles.text, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 14 }]}>Please fill up this form to continue the process for your company.</Text>
                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                        <Image source={require('../assets/images/company.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={cddCompanyName} onChangeText={FormikProps.handleChange('cddCompanyName')} placeholder={cddCompanyNameTouched && cddCompanyNameError ? cddCompanyNameError : 'Name'} placeholderTextColor={cddCompanyNameTouched && cddCompanyNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} style={{ marginLeft: 5, flex: 1 }} />
                                    </View>
                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                        <Image source={require('../assets/images/compRegNum.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={cddRegistrationNumber} onChangeText={FormikProps.handleChange('cddRegistrationNumber')} placeholder={cddRegistrationNumberTouched && cddRegistrationNumberError ? cddRegistrationNumberError : 'Registration Number'} placeholderTextColor={cddRegistrationNumberTouched && cddRegistrationNumberError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} style={{ marginLeft: 5, flex: 1 }} />
                                    </View>
                                    <View style={{ flexDirection: 'row', margin: 5 }}>
                                        <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                            <LinearGradient colors={FormikProps.isValid ? ['#4DCB3E', '#269B1D'] : ['rgba(77, 203, 62, 0.5)', 'rgba(38, 155, 29, 0.5)']} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                                {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> :
                                                    <Text style={[styles.text, { color: '#fff' }]}>Next</Text>}
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#5A647F' }} >
                                            <Text style={[styles.text, { color: '#fff' }]}>Back</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}
                    </Formik>
                </KeyboardAvoidingView>
            </View>
        </View>
    );

}

CompanyInformationScreen.navigationOptions = { header: null, };

export default CompanyInformationScreen