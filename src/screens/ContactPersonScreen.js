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
    cddContactPersonName: Yup
        .string()
        .required(),

    cddContactPersonIc: Yup
        .string()
        .required(),

    cddContactPersonNumber: Yup
        .string()
        .required(),

    cddContactPersonPosition: Yup
        .string()
        .required(),

});

const ContactPersonScreen = (props) => {
    
    const dispatch = useDispatch()

    const contactPerson = (values) => {

        dispatch(actionCreator.contactPerson(values))

        props.navigation.navigate('ContactPersonSuccess')

    }

    return (
        <Formik
            // initialValues={{ email: '', password: '' }}
            onSubmit={values => contactPerson(values)}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                const { cddContactPersonName, cddContactPersonIc, cddContactPersonNumber, cddContactPersonPosition } = FormikProps.values

                const cddContactPersonNameError = FormikProps.errors.cddContactPersonName
                const cddContactPersonNameTouched = FormikProps.touched.cddContactPersonName

                const cddContactPersonIcError = FormikProps.errors.cddContactPersonIc
                const cddContactPersonIcTouched = FormikProps.touched.cddContactPersonIc

                const cddContactPersonNumberError = FormikProps.errors.cddContactPersonNumber
                const cddContactPersonNumberTouched = FormikProps.touched.cddContactPersonNumber

                const cddContactPersonPositionError = FormikProps.errors.cddContactPersonPosition
                const cddContactPersonPositionTouched = FormikProps.touched.cddContactPersonPosition

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 2 }}>

                        <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4', }]}>

                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', alignItems: 'flex-start', padding: 10 }}>
                                <Text style={styles.title} >CONTACT</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', marginRight: 3, alignItems: 'flex-end' }}>
                                <Image source={require('../assets/images/logosmall.png')} style={{ width: 50, height: 50, borderRadius: 15 }} />
                            </View>

                        </View>

                        <View style={{ justifyContent: 'space-between', flex: 9 }}>

                            <View style={[styles.screenMargin, { flex: 9 }]}>

                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: cddContactPersonNameTouched && cddContactPersonNameError ? '#d94498' : '#5a83c2' }]}>Name</Text>
                                    <TextInput value={cddContactPersonName} onBlur={FormikProps.handleBlur('cddContactPersonName')} onChangeText={FormikProps.handleChange('cddContactPersonName')} placeholder={cddContactPersonNameTouched && cddContactPersonNameError ? '' : 'Eg: Siti binti Iskandar'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    {cddContactPersonNameTouched && cddContactPersonNameError && <Text style={styles.error}>{cddContactPersonNameError}</Text>}
                                </View>

                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: cddContactPersonIcTouched && cddContactPersonIcError ? '#d94498' : '#5a83c2' }]}>MyKad Number</Text>
                                    <TextInput value={cddContactPersonIc} onBlur={FormikProps.handleBlur('cddContactPersonIc')} onChangeText={FormikProps.handleChange('cddContactPersonIc')} placeholder={cddContactPersonIcTouched && cddContactPersonIcError ? '' : 'Eg: 800310022514'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} keyboardType={'phone-pad'} />
                                    {cddContactPersonIcTouched && cddContactPersonIcError && <Text style={styles.error}>{cddContactPersonIcError}</Text>}
                                </View>

                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: cddContactPersonNumberTouched && cddContactPersonNumberError ? '#d94498' : '#5a83c2' }]}>Phone Number</Text>
                                    <TextInput value={cddContactPersonNumber} onBlur={FormikProps.handleBlur('cddContactPersonNumber')} onChangeText={FormikProps.handleChange('cddContactPersonNumber')} placeholder={cddContactPersonNumberTouched && cddContactPersonNumberError ? '' : 'Eg: 0189852012'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} keyboardType={'phone-pad'} />
                                    {cddContactPersonNumberTouched && cddContactPersonNumberError && <Text style={styles.error}>{cddContactPersonNumberError}</Text>}
                                </View>

                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: cddContactPersonPositionTouched && cddContactPersonPositionError ? '#d94498' : '#5a83c2' }]}>Position</Text>
                                    <TextInput value={cddContactPersonPosition} onBlur={FormikProps.handleBlur('cddContactPersonPosition')} onChangeText={FormikProps.handleChange('cddContactPersonPosition')} placeholder={cddContactPersonPositionTouched && cddContactPersonPositionError ? '' : 'Eg: HR Officer'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    {cddContactPersonPositionTouched && cddContactPersonPositionError && <Text style={styles.error}>{cddContactPersonPositionError}</Text>}
                                </View>

                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>

                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 }}>
                                    <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.butang, { color: 'lightgrey' }]}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity disabled={!(FormikProps.isValid)} onPress={FormikProps.handleSubmit} style={{ flex: 1, borderColor: FormikProps.isValid ? '#0A6496' : 'rgba(10,100,150,0.5)', borderWidth: 1 }}>
                                    <LinearGradient colors={(FormikProps.isValid) ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> :
                                            <Text style={[styles.butang, { color: '#fff' }]}>Save</Text>}
                                    </LinearGradient>
                                </TouchableOpacity>

                            </View>

                        </View>

                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}

ContactPersonScreen.navigationOptions = { header: null, };
export default ContactPersonScreen