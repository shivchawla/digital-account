import React, { useEffect,useState } from 'react';
import { Image, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, ActivityIndicator,ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'
import {keyboardBeingDisplay,keyboardBeingClose} from '../components/handleKeyboard'
import { CustomFormAction, CustomTextInput } from '../components/Custom'
import LayoutA from '../Layout/LayoutA';
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

                            <LayoutA
                            title={'REGISTRATION'}
                            screenType='registration'
                            navigation={props.navigation}
                            nopadding
                        >
                            
                            <ScrollView style={[styles.screenMargin, { flex: 3 }]}>
                            <CustomTextInput
                                    label={`Name`}
                                    value={name}
                                    handleChange={FormikProps.handleChange(`name`)}
                                    handleBlur={FormikProps.handleBlur(`name`)}
                                    touched={nameTouched}
                                    error={nameError}
                                    placeholder={'Eg: Ahmad bin Ali'}

                                />
                                 <CustomTextInput
                                    label={`Email`}
                                    value={email}
                                    handleChange={FormikProps.handleChange(`email`)}
                                    handleBlur={FormikProps.handleBlur(`email`)}
                                    touched={emailTouched}
                                    error={emailError}
                                    placeholder={'Eg: abc@email.com'}
                                    message={message}
                                />
                                  <CustomTextInput
                                    label={`Password`}
                                    value={password}
                                    handleChange={FormikProps.handleChange(`password`)}
                                    handleBlur={FormikProps.handleBlur(`password`)}
                                    touched={passwordTouched}
                                    secureText={true}
                                    error={passwordError}
                                    placeholder={'******'}

                                    
                                />
                                 <CustomTextInput
                                    label={`Password Confirmation`}
                                    value={password_confirmation}
                                    handleChange={FormikProps.handleChange(`password_confirmation`)}
                                    handleBlur={FormikProps.handleBlur(`password_confirmation`)}
                                    touched={password_confirmationTouched}
                                    secureText={true}
                                    error={password_confirmationError}
                                    placeholder={'******'}

                                />
                                </ScrollView>
                            <CustomFormAction
                                navigation={props.navigation}
                                isValid={FormikProps.isValid}
                                handleSubmit={FormikProps.handleSubmit}
                                isSubmitting = {FormikProps.isSubmitting}
                                label={`Next`}
                            />
                            </LayoutA>
                    )
                }
                }
            </Formik >
        );
    }
}



export default SignupPersonalScreen;