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
    cddEmail: Yup
        .string()
        .email()
        .required()
        .label('Email'),
    cddTelephone: Yup
        .string()
        .required()
        .label('Telephone'),

});

const CompanyContactInformationScreen = (props) => {

    const dispatch = useDispatch()

    const { comp_addr, comp_addr2, comp_city, comp_state, comp_postcode } = useSelector(state => state.companyInformationReducer, shallowEqual)

    const companyInfo = async (values) => {
        await dispatch(actionCreator.companyInfo(values))
        await dispatch(actionCreator.registerCompany())
        props.navigation.navigate('CompanyInfoSuccess')
    }

    return (
        <Formik

            // initialValues={{ email: '', password: '' }}
            onSubmit={values => companyInfo(values)}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                const { cddTelephone, cddEmail } = FormikProps.values

                const cddTelephoneError = FormikProps.errors.cddTelephone
                const cddTelephoneTouched = FormikProps.touched.cddTelephone

                const cddEmailError = FormikProps.errors.cddEmail
                const cddEmailTouched = FormikProps.touched.cddEmail

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 2 }}>

                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                        </View>

                        <View>
                            <Text style={[styles.text, { margin: 5, fontWeight: 'bold', justifyContent: 'center' }]}>COMPANY CONTACT INFORMATION</Text>
                        </View>

                        <View>
                            <Text style={[styles.text, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 14 }]}>Please fill up this form to continue the process for your company.</Text>
                        </View>

                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 9, margin: 10 }}>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5, borderBottomColor: cddTelephoneTouched && cddTelephoneError ? '#d94498' : '#5a83c2' }]}>Phone Number</Text>
                                    <TextInput value={cddTelephone} onBlur={FormikProps.handleBlur('cddTelephone')} onChangeText={FormikProps.handleChange('cddTelephone')} placeholder={cddTelephoneTouched && cddTelephoneError ? '' : 'Eg: 6076541258'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} keyboardType={'phone-pad'} />
                                </View>

                                {cddTelephoneTouched && cddTelephoneError && <Text style={styles.error}>{cddTelephoneError}</Text>}

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5, borderBottomColor: cddEmailTouched && cddEmailError ? '#d94498' : '#5a83c2' }]}>Email Address</Text>
                                    <TextInput value={cddEmail} onBlur={FormikProps.handleBlur('cddEmail')} onChangeText={FormikProps.handleChange('cddEmail')} placeholder={cddEmailTouched && cddEmailError ? '' : 'Eg: abc@email.com'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                </View>

                                {cddEmailTouched && cddEmailError && <Text style={styles.error}>{cddEmailError}</Text>}

                                <TouchableOpacity onPress={() => props.navigation.navigate('CompanyContactAddressInformation')} style={{ flexDirection: 'row', margin: 5 }}>
                                    <Text style={[styles.text, { color: 'black', marginLeft: 15 }]}>Address</Text>
                                    {!comp_state ? <TextInput editable={false} value={comp_addr} style={{ marginLeft: 5 }} />
                                        :
                                        <View style={{ marginRight: 3, paddingBottom: 5 }}>

                                            <Text>{comp_addr}</Text>
                                            {comp_addr2 && <Text>{comp_addr2}</Text>}

                                            <View style={{ flexDirection: 'row' }}>
                                                <Text>{comp_postcode}</Text>
                                                <Text>{comp_city}</Text>
                                            </View>

                                            <Text>{comp_state}</Text>

                                        </View>}

                                </TouchableOpacity>

                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>

                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1 }}>
                                    <LinearGradient colors={['#A4A4A4', '#A4A4A4']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.text, { color: '#fff' }]}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                    <LinearGradient colors={FormikProps.isValid ? ['#628BFB', '#0E47E8'] : ['rgba(98, 139, 251, 0.5)', 'rgba(14, 71, 232, 0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> :
                                            <Text style={[styles.text, { color: '#fff' }]}>Submit</Text>}
                                    </LinearGradient>
                                </TouchableOpacity>

                            </View>

                        </View>

                    </KeyboardAvoidingView>)
            }}
        </Formik >

    );

}

CompanyContactInformationScreen.navigationOptions = { header: null, };
export default CompanyContactInformationScreen