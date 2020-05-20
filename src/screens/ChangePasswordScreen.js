import React,{useState,useEffect} from 'react';
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView, ActivityIndicator, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';
import {keyboardBeingDisplay,keyboardBeingClose} from '../components/handleKeyboard'

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
                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.navigate("DataSetting")} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text numberOfLines={1} style={styles.title} ellipsizeMode='tail'>CHANGE PASSWORD</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <View style={{ backgroundColor:'rgba(62,194,217,0.5)',borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
          </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={[styles.screenMargin, { flex: 3 }]}>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderColor: oldPasswordTouched && oldPasswordError ? 'rgba(255,0,0,1)' : '#5a83c2', marginTop: 25 }]}>Old Password</Text>
                                    <TextInput secureTextEntry value={oldPassword} onBlur={FormikProps.handleBlur('oldPassword')} onChangeText={FormikProps.handleChange('oldPassword')} placeholder={oldPasswordError && oldPasswordTouched ? '' : '******'} style={[styles.textInput,{ borderWidth: 1, borderColor: oldPasswordError && oldPasswordTouched ? 'rgba(255,0,0,1)':'rgba(0,0,0,0.3)', padding: 5 }]} />
                                    {oldPasswordError && oldPasswordTouched && <Text style={styles.error}>{oldPasswordError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderColor: newPasswordTouched && newPasswordError ? 'rgba(255,0,0,1)' : '#5a83c2' }]}>New Password</Text>
                                    <TextInput secureTextEntry value={newPassword} onBlur={FormikProps.handleBlur('newPassword')} onChangeText={FormikProps.handleChange('newPassword')} placeholder={newPasswordError && newPasswordTouched ? '' : 'Please insert your new password'} style={[styles.textInput,{ borderWidth: 1, borderColor:newPasswordError && newPasswordTouched ? 'rgba(255,0,0,1)': 'rgba(0,0,0,0.3)', padding: 5 }]} />
                                    {newPasswordError && newPasswordTouched ?<Text style={styles.error}>{newPasswordError}</Text>:!newPasswordTouched?<Text style={{fontSize:10.5,fontFamily:'Montserrat_medium',color:'grey'}}>Note:Password must be atleast 6 characters long</Text>:<View />}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderColor: confirmPasswordTouched && confirmPasswordError ? 'rgba(255,0,0,1)' : '#5a83c2' }]}>Confirm Password</Text>
                                    <TextInput secureTextEntry value={confirmPassword} onBlur={FormikProps.handleBlur('confirmPassword')} onChangeText={FormikProps.handleChange('confirmPassword')} placeholder={confirmPasswordError && confirmPasswordTouched ? '' : 'Type your password again'} style={[styles.textInput,{ borderWidth: 1, borderColor:confirmPasswordError && confirmPasswordTouched ? 'rgba(255,0,0,1)': 'rgba(0,0,0,0.3)', padding: 5 }]} />
                                    {confirmPasswordError && confirmPasswordTouched && <Text style={styles.error}>{confirmPasswordError}</Text>}
                                </View>
                            </View>
                        </View>
                        <View style={{  flexDirection: 'row', alignSelf: 'stretch' }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                                        
                                            <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                                        
                                    </TouchableOpacity>
                            <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> :
                                        <Text style={[styles.butang, { color: '#fff' }]}>Save</Text>}
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}



export default ChangePasswordScreen