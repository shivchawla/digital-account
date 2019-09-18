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
        <Formik

            onSubmit={values => companyInfo(values)}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                const { cddCompanyName, cddRegistrationNumber } = FormikProps.values

                const cddCompanyNameError = FormikProps.errors.cddCompanyName
                const cddCompanyNameTouched = FormikProps.touched.cddCompanyName

                const cddRegistrationNumberError = FormikProps.errors.cddRegistrationNumber
                const cddRegistrationNumberTouched = FormikProps.touched.cddRegistrationNumber

                return (
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 2 }}>

                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#4D6BFA' }}>

                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', alignItems: 'flex-start',paddingLeft:10, }}>
                                <Text numberOfLines={1} style={styles.title} ellipsizeMode='tail'>COMPANY INFORMATION</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={require('../assets/images/logosmall.png')} style={{ width: 50, height: 50, borderRadius: 15 }} />
                            </View>

                        </View>

                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 9, margin: 10 }}>
                                <View>
                                    <Text style={[styles.text, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 14 }]}>Please fill up this form to continue the process for your company.</Text>
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5, borderBottomColor: cddCompanyNameTouched && cddCompanyNameError ? '#d94498' : '#5a83c2' }]}>Company's Name</Text>
                                    <TextInput value={cddCompanyName} onBlur={FormikProps.handleBlur('cddCompanyName')} onChangeText={FormikProps.handleChange('cddCompanyName')} placeholder={cddCompanyNameTouched && cddCompanyNameError ? '' : 'Eg: Syarikat ABC Sdn Bhd'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                </View>

                                {cddCompanyNameTouched && cddCompanyNameError && <Text style={styles.error}>{cddCompanyNameError}</Text>}

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5, borderBottomColor: cddRegistrationNumberTouched && cddRegistrationNumberError ? '#d94498' : '#5a83c2' }]}>Registration Number</Text>
                                    <TextInput value={cddRegistrationNumber} onBlur={FormikProps.handleBlur('cddRegistrationNumber')} onChangeText={FormikProps.handleChange('cddRegistrationNumber')} placeholder={cddRegistrationNumberTouched && cddRegistrationNumberError ? '' : 'Eg: 105015-A'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                </View>

                                {cddRegistrationNumberTouched && cddRegistrationNumberError && <Text style={styles.error}>{cddRegistrationNumberError}</Text>}

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

CompanyInformationScreen.navigationOptions = { header: null, };

export default CompanyInformationScreen