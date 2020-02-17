import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
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
        .min(6)
        .label('Password'),

});

const LoginScreen = (props) => {

    const proceed = useSelector(state => state.loginScreenReducer.proceed, shallowEqual)
    const all = useSelector(state => state.loginScreenReducer.message, shallowEqual)

    const [emailActive, setEmailActive] = useState(false)
    const [passwordActive, setPasswordActive] = useState(false)

    useEffect(() => {
        proceed && props.navigation.navigate('Main')
    }, [proceed]);

    const dispatch = useDispatch()
    const login = (values) => dispatch(actionCreator.login1(values))

    forgotPassword = async () => {
        let result = await WebBrowser.openBrowserAsync('https://tuah.niyo.my/password/reset');
    };

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
                        <LinearGradient colors={['#80A0FD', '#4F6DFB']} style={{ flex: 1 }}>
                            <View style={{ justifyContent: 'space-between', flex: 9, }}>
                                <View style={{ flex: 9 }}>
                                    <View style={{ flex: 1 }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                                        </View>
                                        <View style={{ flex: 3, backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
                                            <View style={[styles.formElement]}>
                                                <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: emailTouched && emailError ? 'rgba(255,0,0,1)' : '#5a83c2' }]}>Email</Text>
                                                <TextInput value={email} onFocus={setEmailActive(!emailActive)} onBlur={() => { setEmailActive(!emailActive); FormikProps.handleBlur('email') }} onChangeText={FormikProps.handleChange('email')} placeholder={emailTouched && emailError ? '' : 'Email'} style={{ borderWidth: emailActive ? 2 : 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                                {emailTouched && emailError && <Text style={styles.error}>{emailError}</Text>}
                                            </View>
                                            <View style={[styles.formElement]}>
                                                <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: passwordTouched && passwordError ? 'rgba(255,0,0,1)' : '#5a83c2' }]}>Password</Text>
                                                <TextInput secureTextEntry value={password} onFocus={setPasswordActive(!passwordActive)} onBlur={() => { setPasswordActive(!passwordActive); FormikProps.handleBlur('password') }} placeholder={passwordTouched && passwordError ? '' : '******'} onChangeText={FormikProps.handleChange('password')} style={{ borderWidth: passwordActive ? 2 : 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} placeholderTextColor={passwordTouched && passwordError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                                {passwordTouched && passwordError && <Text style={styles.error}>{passwordError}</Text>}
                                            </View>
                                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                                <Text style={[styles.textDefault, { margin: 5 }]}>Forgot password?</Text>
                                                <TouchableOpacity onPress={() => forgotPassword()}>
                                                    <Text style={[styles.textDefault, { margin: 5, color: '#055E7C' }]}>Click here</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 }}>
                                        <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1, borderColor: FormikProps.isValid ? '#0A6496' : 'rgba(10,100,150,0.5)', borderWidth: 1 }}>
                                        <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                            {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff' }]}>Submit</Text>}
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </LinearGradient>
                    </KeyboardAvoidingView>)
            }}
        </Formik>
    )
}

LoginScreen.navigationOptions = {
    header: null,
};

export default LoginScreen