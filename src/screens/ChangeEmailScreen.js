import React, { useContext } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    FlatList,
    TextInput
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'
import Dot from '../components/Dot'

const validationSchema = Yup.object().shape({

    newEmail: Yup
        .string(),
    password: Yup
        .string()
});

const ChangeEmailScreen = (props) => {
    return (
        <Formik onSubmit={async values => {
            console.log(JSON.stringify(values))
        }}

            validationSchema={validationSchema}>
            {FormikProps => {
                const { newEmail, password } = FormikProps.values
                // const purposeError = FormikProps.errors.purpose
                // const purposeTouched = FormikProps.touched.purpose

                // const amountError = FormikProps.errors.amount
                // const amountTouched = FormikProps.touched.amount
                return (
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>
                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#4D6BFA' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#4D6BFA'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.title}>Change Email Address</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 3, padding: 10, marginRight: 20 }}>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>New Email Address</Text>
                                    <TextInput value={newEmail} onChangeText={FormikProps.handleChange('newEmail')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Password</Text>
                                    <TextInput value={password} onChangeText={FormikProps.handleChange('password')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, }}>
                                <LinearGradient colors={['#A4A4A4', '#A4A4A4']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.text, { color: '#fff' }]}>Back</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={FormikProps.handleSubmit} style={{ flex: 1 }} >
                                <LinearGradient colors={['#628BFB', '#0E47E8']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.text, { color: '#fff' }]}>Submit</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}

ChangeEmailScreen.navigationOptions = {
    header: null,
};

export default ChangeEmailScreen