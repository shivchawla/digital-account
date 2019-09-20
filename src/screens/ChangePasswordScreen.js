import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    ActivityIndicator,
    TextInput
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'
import Dot from '../components/Dot'
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({

    oldPassword: Yup
        .string()
        .min(6)
        .required()
        .label('Change Password'),
    newPassword: Yup
        .string()
        .min(6)
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

    return (

        <Formik onSubmit={async values => {
            console.log(JSON.stringify(values))
        }}

            validationSchema={validationSchema}>
            {FormikProps => {

                const { oldPassword, newPassword, confirmPassword } = FormikProps.values

                const oldPasswordError = FormikProps.errors.oldPassword
                const newPasswordError = FormikProps.errors.newPassword
                const confirmPasswordError = FormikProps.errors.confirmPassword
                const oldPasswordTouched = FormikProps.touched.oldPassword
                const newPasswordTouched = FormikProps.touched.newPassword
                const confirmPasswordTouched = FormikProps.touched.confirmPassword

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>

                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#055E7C' }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#055E7C'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text numberOfLines={1} style={styles.title} ellipsizeMode='tail'>Change Password</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>

                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 3, padding: 10, marginRight: 20 }}>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5, color: '#055E7C', borderColor: oldPasswordTouched && oldPasswordError ? '#d94498' : '#5a83c2' }]}>Old Password</Text>
                                    <TextInput secureTextEntry value={oldPassword} onBlur={FormikProps.handleBlur('oldPassword')} onChangeText={FormikProps.handleChange('oldPassword')} placeholder={oldPasswordError && oldPasswordTouched ? '' : 'Old Password'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                </View>

                                {oldPasswordError && oldPasswordTouched && <Text style={styles.error}>{oldPasswordError}</Text>}

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5, color: '#055E7C', borderColor: newPasswordTouched && newPasswordError ? '#d94498' : '#5a83c2' }]}>New Password</Text>
                                    <TextInput secureTextEntry value={newPassword} onBlur={FormikProps.handleBlur('newPassword')} onChangeText={FormikProps.handleChange('newPassword')} placeholder={newPasswordError && newPasswordTouched ? '' : 'New Password'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                </View>

                                {newPasswordError && newPasswordTouched && <Text style={styles.error}>{newPasswordError}</Text>}

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5, color: '#055E7C', borderColor: confirmPasswordTouched && confirmPasswordError ? '#d94498' : '#5a83c2' }]}>Confirm Password</Text>
                                    <TextInput secureTextEntry value={confirmPassword} onBlur={FormikProps.handleBlur('confirmPassword')} onChangeText={FormikProps.handleChange('confirmPassword')} placeholder={confirmPasswordError && confirmPasswordTouched ? '' : 'Confirm Password'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                </View>

                                {confirmPasswordError && confirmPasswordTouched && <Text style={styles.error}>{confirmPasswordError}</Text>}

                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>

                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 }}>
                                <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.text, { color: '#000000' }]}>Back</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> :
                                        <Text style={[styles.text, { color: '#fff' }]}>Save</Text>}
                                </LinearGradient>
                            </TouchableOpacity>

                        </View>

                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}

ChangePasswordScreen.navigationOptions = {
    header: null,
};

export default ChangePasswordScreen