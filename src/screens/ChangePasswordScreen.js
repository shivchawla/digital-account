import React,{useState,useEffect} from 'react';
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView, ActivityIndicator, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';
import {keyboardBeingDisplay,keyboardBeingClose} from '../components/handleKeyboard'
import { CustomFormAction, CustomTextInput } from '../components/Custom'
import LayoutA from '../Layout/LayoutA';
const validationSchema = Yup.object().shape({

    oldPassword: Yup
        .string()
        .min(6)
        .required()
        .label('Change Password'),

    newPassword: Yup
        .string()
        .min(6, 'Too Short')
        .required()
        .label('New Password'),

    confirmPassword: Yup
        .string()
        .min(6)
        .required()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .label('Confirm Password'),

});

const ChangePasswordScreen = (props) => {

    const [offSet,setOffSet]=useState(true)
    useEffect(() => {
        const open=()=>setOffSet(false)
        const off=()=>setOffSet(true)
       
        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates


    return (
        <Formik onSubmit={async values => {
            props.navigation.navigate("PasswordSuccess")
            console.log(JSON.stringify(values))
        }}
            validationSchema={validationSchema}>
            {FormikProps => {

                const { oldPassword, newPassword, confirmPassword } = FormikProps.values

                const oldPasswordError = FormikProps.errors.oldPassword
                const oldPasswordTouched = FormikProps.touched.oldPassword

                const newPasswordError = FormikProps.errors.newPassword
                const newPasswordTouched = FormikProps.touched.newPassword

                const confirmPasswordError = FormikProps.errors.confirmPassword
                const confirmPasswordTouched = FormikProps.touched.confirmPassword

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }} keyboardVerticalOffset={offSet?30:0}>
                        <LayoutA
                            title={'CHANGE PASSWORD'}
                            screenType='form'
                            navigation={props.navigation}
                            nopadding
                        >
                       
                            <View style={[styles.screenMargin, { flex: 3 }]}>
                                <CustomTextInput
                                    label={`Old Password`}
                                    value={password}
                                    handleChange={FormikProps.handleChange(`oldPassword`)}
                                    handleBlur={FormikProps.handleBlur(`oldPassword`)}
                                    touched={oldPasswordTouched}
                                    error={oldPasswordError}
                                    placeholder={'******'}
                                />
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderColor: newPasswordTouched && newPasswordError ? 'rgba(255,0,0,1)' : '#5a83c2' }]}>New Password</Text>
                                    <TextInput secureTextEntry value={newPassword} onBlur={FormikProps.handleBlur('newPassword')} onChangeText={FormikProps.handleChange('newPassword')} placeholder={newPasswordError && newPasswordTouched ? '' : 'Please insert your new password'} style={[styles.textInput,{ borderWidth: 1, borderColor:newPasswordError && newPasswordTouched ? 'rgba(255,0,0,1)': 'rgba(0,0,0,0.3)', padding: 5 }]} />
                                    {newPasswordError && newPasswordTouched ?<Text style={styles.error}>{newPasswordError}</Text>:!newPasswordTouched?<Text style={{fontSize:10.5,fontFamily:'Montserrat_medium',color:'grey'}}>Note:Password must be atleast 6 characters long</Text>:<View />}
                                </View>
                                <CustomTextInput
                                    label={`Confirm Password`}
                                    value={confirmPassword}
                                    handleChange={FormikProps.handleChange(`confirmPassword`)}
                                    handleBlur={FormikProps.handleBlur(`confirmPassword`)}
                                    touched={confirmPasswordTouched}
                                    error={confirmPasswordError}
                                    placeholder={'Type your password again'}
                                   
                                />
                            </View>
                       <CustomFormAction
                                navigation={props.navigation}
                                isValid={FormikProps.isValid}
                                handleSubmit={FormikProps.handleSubmit}
                                isSubmitting={FormikProps.isSubmitting}
                                label={`Save`}
                            />
                       </LayoutA>
                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}



export default ChangePasswordScreen