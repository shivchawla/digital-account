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
        <Formik

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
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 2 }}>

                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#4D6BFA', }}>

                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text numberOfLines={1} style={styles.title} ellipsizeMode='head'>REGISTRATION</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={require('../assets/images/logosmall.png')} style={{ width: 50, height: 50, borderRadius: 15 }} />
                            </View>


                        </View>

                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 9, margin: 10 }}>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5, borderBottomColor: nameTouched && nameError ? '#d94498' : '#5a83c2' }]}>Name</Text>
                                    <TextInput value={name} onBlur={FormikProps.handleBlur('name')} onChangeText={FormikProps.handleChange('name')} placeholder={nameTouched && nameError ? '' : 'Eg: Ahmad bin Ali'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                </View>

                                {nameTouched && nameError && <Text style={styles.error}>{nameError}</Text>}

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5, borderBottomColor: emailTouched && emailError ? '#d94498' : '#5a83c2' }]}>Email</Text>
                                    <TextInput value={email} onBlur={FormikProps.handleBlur('email')} onChangeText={FormikProps.handleChange('email')} placeholder={emailTouched && emailError ? '' : 'Eg: abc@email.com'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                </View>

                                {emailTouched && emailError && <Text style={styles.error}>{emailError}</Text>}

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5, borderBottomColor: passwordTouched && passwordError ? '#d94498' : '#5a83c2' }]}>Password</Text>
                                    <TextInput secureTextEntry value={password} onBlur={FormikProps.handleBlur('password')} placeholder={passwordTouched && passwordError ? '' : '******'} onChangeText={FormikProps.handleChange('password')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} placeholderTextColor={passwordTouched && passwordError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                </View>

                                {passwordTouched && passwordError && <Text style={styles.error}>{passwordError}</Text>}

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5, borderBottomColor: password_confirmationTouched && password_confirmationError ? '#d94498' : '#5a83c2' }]}>Password Confirmation</Text>
                                    <TextInput secureTextEntry value={password_confirmation} onBlur={FormikProps.handleBlur('password_confirmation')} placeholder={password_confirmationTouched && password_confirmationError ? '' : '******'} onChangeText={FormikProps.handleChange('password_confirmation')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} placeholderTextColor={password_confirmationTouched && password_confirmationError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                </View>

                                {password_confirmationTouched && password_confirmationError && <Text style={styles.error}>{password_confirmationError}</Text>}

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

SignupPersonalScreen.navigationOptions = {
    header: null,
};

export default SignupPersonalScreen;