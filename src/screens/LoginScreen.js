//console.ignoredYellowBox = ['Setting a timer']
import React, { useState, useEffect, useRef } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';


import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import * as WebBrowser from 'expo-web-browser';

import Layout from '../constants/Layout'
import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({
    email: Yup
        .string()
        .required()
        .email()
        .label('Email'),
    password: Yup
        .string()
        .required()
        .label('Password'),
});


const LoginScreen = (props) => {
    const proceed = useSelector(state => state.loginScreenReducer.proceed, shallowEqual)
    const all = useSelector(state => state.loginScreenReducer.message, shallowEqual)
    useEffect(() => {
        //console.log(`proceed ialah : ${proceed}`)
        proceed && props.navigation.navigate('Main')
    }, [proceed]);
    const dispatch = useDispatch()
    const login = (values) => dispatch(actionCreator.login1(values))
    forgotPassword = async () => {
        let result = await WebBrowser.openBrowserAsync('https://app.Digital Account.my/password/reset');
    };
    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight, backgroundColor: '#80A0FD' }}>
            <LinearGradient colors={['#80A0FD', '#4F6DFB']} style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={[styles.h3, { color: '#fff' }]}>Welcome to your</Text>
                <Text style={[styles.h2, { color: '#fff' }]}>Digital Account</Text>
            </LinearGradient>
            <View style={{ position: 'absolute', top: Layout.window.height / 3, left: 0, bottom: 0, right: 0, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, paddingTop: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                login(values);
                                actions.setSubmitting(false);
                                //actions.setFieldValue('error',JSON.stringify(all))
                            }, 1000);
                        }}
                        validationSchema={validationSchema}
                    >
                        {FormikProps => {
                            const { email, password } = FormikProps.values
                            const emailError = FormikProps.errors.email
                            const passwordError = FormikProps.errors.password
                            const emailTouched = FormikProps.touched.email
                            const passwordTouched = FormikProps.touched.password
                            return (
                                <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                                    {/* <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} /> */}
                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: emailTouched && emailError ? '#d94498' : '#5a83c2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                        <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={email} onChangeText={FormikProps.handleChange('email')} placeholder={emailTouched && emailError ? emailError : 'E-mail'} style={{ marginLeft: 5, flex: 1 }} keyboardType={'email-address'} placeholderTextColor={emailTouched && emailError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>
                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: passwordTouched && passwordError ? '#d94498' : '#5a83c2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, marginBottom: 20 }}>
                                        <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput secureTextEntry value={password} placeholder={passwordTouched && passwordError ? passwordError : '******'} onChangeText={FormikProps.handleChange('password')} style={{ marginLeft: 5, flex: 1 }} placeholderTextColor={passwordTouched && passwordError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <Text style={styles.error}> {all}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <Text style={[styles.textDefault, { margin: 5 }]}>Forgot password?</Text>
                                        <TouchableOpacity onPress={() => forgotPassword()}>
                                            <Text style={[styles.textDefault, { margin: 5, color: 'dodgerblue' }]}>Click here</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', margin: 5 }}>
                                        <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                            <LinearGradient colors={FormikProps.isValid ? ['#4DCB3E', '#269B1D'] : ['rgba(77, 203, 62, 0.5)', 'rgba(38, 155, 29, 0.5)']} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center', alignItems: 'center', }}>
                                                {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> :
                                                    <Text style={[styles.text, { color: '#fff' }]}>Log In</Text>}
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#5A647F' }} >
                                            <Text style={[styles.text, { color: '#fff' }]}>Back</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* {indicator && <ActivityIndicator color={'#34c6f4'} style={{ marginLeft: 5 }} />} */}
                                </View>
                            )
                        }}
                    </Formik>
                </KeyboardAvoidingView>
            </View>
        </View >
    )
}

LoginScreen.navigationOptions = { header: null, };

export default LoginScreen