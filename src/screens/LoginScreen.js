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
            <LinearGradient colors={['#80A0FD', '#4F6DFB']} style={{ flex: 1, alignItems: 'center' }}>
                <Text style={[styles.h3, { color: '#fff' }]}>Welcome to your</Text>
                <Text style={[styles.h2, { color: '#fff' }]}>Digital Account</Text>
            </LinearGradient>
            <View style={{ position: 'absolute', top: Layout.window.height / 3, left: 0, bottom: 0, right: 0, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, paddingTop: 10, alignItems: 'center' }}>
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

                                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                                    <View style={{ flex: 9, margin: 10 }}>

                                        <View style={{ marginBottom: 10 }}>
                                            <Text style={[styles.text, { marginBottom: 5, borderColor: emailTouched && emailError ? '#d94498' : '#5a83c2' }]}>Email</Text>
                                            <TextInput value={email} onBlur={FormikProps.handleBlur('email')} onChangeText={FormikProps.handleChange('email')} placeholder={emailTouched && emailError ? '' : 'Email'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                        </View>

                                        {emailTouched && emailError && <Text style={styles.error}>{emailError}</Text>}

                                        <View style={{ marginBottom: 10 }}>
                                            <Text style={[styles.text, { marginBottom: 5, borderColor: passwordTouched && passwordError ? '#d94498' : '#5a83c2' }]}>Password</Text>
                                            <TextInput secureTextEntry value={password} onBlur={FormikProps.handleBlur('password')} placeholder={passwordTouched && passwordError ? '' : '******'} onChangeText={FormikProps.handleChange('password')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} placeholderTextColor={passwordTouched && passwordError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        </View>

                                        {passwordTouched && passwordError && <Text style={styles.error}>{passwordError}</Text>}

                                    </View>

                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <Text style={styles.error}> {all}</Text>
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

                                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1 }}>
                                            <LinearGradient colors={['#A4A4A4', '#A4A4A4']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={[styles.text, { color: '#fff' }]}>Back</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>

                                        <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                            <LinearGradient colors={FormikProps.isValid ? ['#628BFB', '#0E47E8'] : ['rgba(98, 139, 251, 0.5)', 'rgba(14, 71, 232, 0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> :
                                                    <Text style={[styles.text, { color: '#fff' }]}>Log In</Text>}
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        
                                    </View>
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