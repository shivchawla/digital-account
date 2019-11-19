import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'
import { Ionicons } from '@expo/vector-icons';
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

const WelcomeScreen = (props) => {

    const proceed = useSelector(state => state.loginScreenReducer.proceed, shallowEqual)
    const all = useSelector(state => state.loginScreenReducer.message, shallowEqual)
    useEffect(() => {
        proceed && props.navigation.navigate('Main')
    }, [proceed]);
    const dispatch = useDispatch()
    const login = (values) => dispatch(actionCreator.login1(values))
    forgotPassword = async () => {
        let result = await WebBrowser.openBrowserAsync('https://tuah.niyo.my/password/reset');
    };
    const [secure, secureItem] = useState(true)

    return (

        <Formik initialValues={{ email: '', password: '' }} onSubmit={(values, actions) => {
            setTimeout(() => {
                login(values);
                actions.setSubmitting(false);
            }, 1000);

        }}
            validationSchema={validationSchema}
        >
            {FormikProps => {

                const { email, password } = FormikProps.values

                const emailError = FormikProps.errors.email
                const emailTouched = FormikProps.touched.email

                const passwordError = FormikProps.errors.password
                const passwordTouched = FormikProps.touched.password

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>
                        <View style={{ justifyContent: 'space-between', flex: 9, }}>
                            <View style={{ flex: 9 }}>
                                <View style={{ flex: 1, backgroundColor: '#055E7C' }}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', padding: 10 }}>
                                        <Text style={[styles.subTitle, { color: '#fff', fontSize: 28.5 }]}>Welcome to your</Text>
                                        <Text style={[styles.title, { color: '#fff', fontWeight: 'bold', fontSize: 30 }]}>Digital Account</Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
                                        <View style={[styles.formElement]}>
                                            <View style={{ margin: 10 }} />
                                            <TextInput value={email} onBlur={FormikProps.handleBlur('email')} onChangeText={FormikProps.handleChange('email')} placeholder={emailTouched && emailError ? '' : 'Email'} style={{ borderBottomWidth: 1, borderColor: '#9ADAF4', padding: 5 }} />
                                            {emailTouched && emailError && <Text style={styles.error}>{emailError}</Text>}
                                        </View>
                                        <View style={[styles.formElement]}>
                                            <View style={{ margin: 10 }} />
                                            <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#9ADAF4', padding: 5 }}>
                                                <TextInput secureTextEntry={secure} value={password} onBlur={FormikProps.handleBlur('password')} placeholder={passwordTouched && passwordError ? '' : 'Password'} onChangeText={FormikProps.handleChange('password')} style={{}} placeholderTextColor={passwordTouched && passwordError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                                <TouchableOpacity onPress={() => secureItem(!secure)}>
                                                    <Ionicons name={secure ? 'ios-eye-off' : 'ios-eye'} style={{ fontSize: 25, color: secure ? 'lightgrey' : 'grey' }} />
                                                </TouchableOpacity>
                                            </View>
                                            {passwordTouched && passwordError && <Text style={styles.error}>{passwordError}</Text>}
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                            <Text style={[styles.textDefault, { margin: 5, color: 'darkgrey' }]}>Forgot password?</Text>
                                            <TouchableOpacity onPress={() => forgotPassword()}>
                                                <Text style={[styles.textDefault, { margin: 5, color: '#055E7C' }]}>Click here</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: 'row', margin: 5, justifyContent: 'center' }}>
                                            <TouchableOpacity onPress={() => props.navigation.navigate('Intro')} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                                                <Text style={[styles.textDefault, { color: 'black' }]}>Register</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: FormikProps.isValid ? '#09A4BF' : 'rgba(9,164,191,0.5)' }} >
                                                {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.textDefault, { color: '#fff' }]}>Log In</Text>}
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik>
    )
}

WelcomeScreen.navigationOptions = {
    header: null
};

export default WelcomeScreen