//console.ignoredYellowBox = ['Setting a timer']
import React, { useState, useEffect, useRef } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView,
    ActivityIndicator

} from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';


import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({
    name: Yup
        .string()
        .required()
        .label('Name'),
    email: Yup
        .string()
        .required()
        .email()
        .label('Email'),
    password: Yup
        .string()
        .min(6)
        .required()
        .label('Password'),
    password_confirmation: Yup
        .string()
        .required()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .label('Password Confirmation'),
});

const SignupPersonalScreen = (props) => {
    //const access_token = useSelector(state => state.registrationReducer.access_token, shallowEqual)
    const proceed = useSelector(state => state.registrationReducer.proceed, shallowEqual)

    useEffect(() => {
        dispatch(actionCreator.getToken());
        proceed && props.navigation.navigate('SignUpPersonalSuccess');
    }, [proceed]);
    const dispatch = useDispatch()
    // const register = async (values) => await dispatch(actionCreator.register(values))
    //const getToken = () => dispatch(actionCreator.requestToken())

    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={values => dispatch(actionCreator.register(values))}
                        validationSchema={validationSchema}
                    >
                        {FormikProps => {
                            const { name, email, password, password_confirmation } = FormikProps.values


                            const nameError = FormikProps.errors.name
                            const emailError = FormikProps.errors.email
                            const passwordError = FormikProps.errors.password
                            const password_confirmationError = FormikProps.errors.password_confirmation

                            const nameTouched = FormikProps.touched.name
                            const emailTouched = FormikProps.touched.email
                            const passwordTouched = FormikProps.touched.password
                            const password_confirmationTouched = FormikProps.touched.password_confirmation

                            return (
                                <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>REGISTRATION</Text>
                                    {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                                    <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Personal Info</Text>
                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: nameTouched && nameError ? '#d94498' : '#5a83c2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                        <Image source={require('../assets/images/user.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={name} onBlur={FormikProps.handleBlur('name')} onChangeText={FormikProps.handleChange('name')} placeholder={nameTouched && nameError ? '' : 'Name'} style={{ marginLeft: 5, flex: 1 }} placeholderTextColor={nameTouched && nameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>
                                    {nameTouched && nameError && <Text style={styles.error}>{nameError}</Text>}
                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: emailTouched && emailError ? '#d94498' : '#5a83c2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                        <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={email} onBlur={FormikProps.handleBlur('email')} onChangeText={FormikProps.handleChange('email')} placeholder={emailTouched && emailError ? '' : 'E-mail'} style={{ marginLeft: 5, flex: 1 }} keyboardType={'email-address'} placeholderTextColor={emailTouched && emailError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>
                                    {emailTouched && emailError && <Text style={styles.error}>{emailError}</Text>}
                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: passwordTouched && passwordError ? '#d94498' : '#5a83c2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                        <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput secureTextEntry value={password} onBlur={FormikProps.handleBlur('password')} placeholder={passwordTouched && passwordError ? '' : '******'} onChangeText={FormikProps.handleChange('password')} style={{ marginLeft: 5, flex: 1 }} placeholderTextColor={passwordTouched && passwordError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>
                                    {passwordTouched && passwordError && <Text style={styles.error}>{passwordError}</Text>}
                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: password_confirmationTouched && password_confirmationError ? '#d94498' : '#5a83c2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, marginBottom: 20 }}>
                                        <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput secureTextEntry value={password_confirmation} onBlur={FormikProps.handleBlur('password_confirmation')} placeholder={password_confirmationTouched && password_confirmationError ? '' : '******'} onChangeText={FormikProps.handleChange('password_confirmation')} style={{ marginLeft: 5, flex: 1 }} placeholderTextColor={password_confirmationTouched && password_confirmationError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>
                                    {password_confirmationTouched && password_confirmationError && <Text style={styles.error}>{password_confirmationError}</Text>}
                                    <View style={{ flexDirection: 'row', margin: 5 }}>
                                        <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                            <LinearGradient colors={FormikProps.isValid ? ['#4DCB3E', '#269B1D'] : ['rgba(77, 203, 62, 0.5)', 'rgba(38, 155, 29, 0.5)']} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center', alignItems: 'center', }}>
                                                {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> :
                                                    <Text style={[styles.textDefault, { color: '#fff' }]}>Register</Text>}
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#5A647F' }} >
                                            <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}
                    </Formik>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}

SignupPersonalScreen.navigationOptions = { header: null, };

export default SignupPersonalScreen