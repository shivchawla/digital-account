import React, { useEffect,useState } from 'react';
import { Image, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, ActivityIndicator,ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'
import {keyboardBeingDisplay,keyboardBeingClose} from '../components/handleKeyboard'
const validationSchema = Yup.object().shape({

    name: Yup
        .string()
        .required()
        .min(3)
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

    const status = useSelector(state => state.registrationReducer.status, shallowEqual)
    const message = useSelector(state => state.registrationReducer.message, shallowEqual)
    const proceed = useSelector(state => state.registrationReducer.proceed, shallowEqual)
    const register = async (values) => {
        await dispatch(actionCreator.register(values));
    }

    const [offSet,setOffSet]=useState(true)
    useEffect(() => {
        const open=()=>setOffSet(false)
        const off=()=>setOffSet(true)
       
        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates

    useEffect(() => {
        console.log(`proceed ialah ${proceed}`)
        proceed && props.navigation.navigate('SignUpPersonalSuccess');
    }, [proceed]);

    const dispatch = useDispatch()
    if (message === "Unauthenticated") {
        props.navigation.navigate('SignUpPersonalSuccess');
        
    } else {

        return (

            <Formik onSubmit={(values, actions) => {
                register(values)
                actions.setSubmitting(false)
            }
            }
                validationSchema={validationSchema}
            >
                {FormikProps => {

                    const { name, email, password, password_confirmation } = FormikProps.values

                    const nameError = FormikProps.errors.name
                    const nameTouched = FormikProps.touched.name

                    const emailError = FormikProps.errors.email
                    const emailTouched = FormikProps.touched.email

                    const passwordError = FormikProps.errors.password
                    const passwordTouched = FormikProps.touched.password

                    const password_confirmationError = FormikProps.errors.password_confirmation
                    const password_confirmationTouched = FormikProps.touched.password_confirmation

                    return (

                        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 2 }} keyboardVerticalOffset={offSet?30:0}>
                            <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 10 }}>
                                    <Text numberOfLines={1} style={[styles.title]} ellipsizeMode='head'>REGISTRATION</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                    <Image source={require('../assets/images/logosmall.png')} style={{ width: 50, height: 50, borderRadius: 15 }} />
                                </View>
                            </View>
                            <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <ScrollView style={[styles.screenMargin, { flex: 3 }]}>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginTop: 20, marginBottom: 10, borderBottomColor: nameTouched && nameError ? 'rgba(255,0,0,1)' : '#5a83c2' }]}>Name</Text>
                                    <TextInput value={name} onBlur={FormikProps.handleBlur('name')} onChangeText={FormikProps.handleChange('name')} placeholder={nameTouched && nameError ? '' : 'Eg: Ahmad bin Ali'} style={[styles.textInput,{ borderWidth: 1, borderColor:nameTouched && nameError ? 'rgba(255,0,0,1)': 'rgba(0,0,0,0.3)', padding: 5 }]} />
                                    {nameTouched && nameError && <Text style={styles.error}>{nameError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 10, borderBottomColor: emailTouched && emailError ? 'rgba(255,0,0,1)' : '#5a83c2' }]}>Email</Text>
                                    <TextInput value={email} onBlur={FormikProps.handleBlur('email')} onChangeText={FormikProps.handleChange('email')} placeholder={emailTouched && emailError ? '' : 'Eg: abc@email.com'} style={[styles.textInput,{ borderWidth: 1, borderColor:emailTouched && emailError ?'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} keyboardType={'email-address'} />
                                    {emailTouched && emailError && <Text style={styles.error}>{emailError}</Text>}
                                    {message && <Text style={styles.error}>{message.email}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 10, borderBottomColor: passwordTouched && passwordError ? 'rgba(255,0,0,1)' : '#5a83c2' }]}>Password</Text>
                                    <TextInput secureTextEntry value={password} onBlur={FormikProps.handleBlur('password')} placeholder={passwordTouched && passwordError ? '' : '******'} onChangeText={FormikProps.handleChange('password')} style={[styles.textInput,{ borderWidth: 1, borderColor:passwordTouched && passwordError ? 'rgba(255,0,0,1)': 'rgba(0,0,0,0.3)', padding: 5 }]} placeholderTextColor={passwordTouched && passwordError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {passwordTouched && passwordError && <Text style={styles.error}>{passwordError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 10, borderBottomColor: password_confirmationTouched && password_confirmationError ? 'rgba(255,0,0,1)' : '#5a83c2' }]}>Password Confirmation</Text>
                                    <TextInput secureTextEntry value={password_confirmation} onBlur={FormikProps.handleBlur('password_confirmation')} placeholder={password_confirmationTouched && password_confirmationError ? '' : '******'} onChangeText={FormikProps.handleChange('password_confirmation')} style={[styles.textInput,{ borderWidth: 1, borderColor:password_confirmationTouched && password_confirmationError ? 'rgba(255,0,0,1)': 'rgba(0,0,0,0.3)', padding: 5 }]} placeholderTextColor={password_confirmationTouched && password_confirmationError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {password_confirmationTouched && password_confirmationError && <Text style={styles.error}>{password_confirmationError}</Text>}
                                </View>
                                </ScrollView>
                            </View>
                            <View style={{  flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center',padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    
                                        <Text style={[styles.butang, { color: 'lightgrey' }]}>Back</Text>
                                  
                                </TouchableOpacity>
                                <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1, borderColor: FormikProps.isValid ? '#0A6496' : 'rgba(10,100,150,0.5)', borderWidth: 1 }}>
                                    <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff' }]}>Next</Text>}
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>)
                }
                }
            </Formik >
        );
    }
}



export default SignupPersonalScreen;