import React from 'react';
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
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'
import Dot from '../components/Dot'
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({

    vendorName: Yup
        .string(),
    vendorEmail: Yup
        .string(),
    currency: Yup
        .string(),
    vendorAddress: Yup
        .string(),
});

const VendorScreen = (props) => {
    return (
        <Formik onSubmit={async values => {
            console.log(JSON.stringify(values))
        }}

            validationSchema={validationSchema}>
            {FormikProps => {
                const { vendorName, vendorEmail, currency, vendorAddress } = FormikProps.values
                // const purposeError = FormikProps.errors.purpose
                // const purposeTouched = FormikProps.touched.purpose

                // const amountError = FormikProps.errors.amount
                // const amountTouched = FormikProps.touched.amount
                return (
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#4D6BFA' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#4D6BFA'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.title}>Setting</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                            <Text style={styles.title}>Vendor</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 3, padding: 10, marginRight: 20 }}>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Vendor Name</Text>
                                    <TextInput value={vendorName} onChangeText={FormikProps.handleChange('vendorName')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Vendor E-mail</Text>
                                    <TextInput value={vendorEmail} onChangeText={FormikProps.handleChange('vendorEmail')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Preferred Currency</Text>
                                    <TextInput value={currency} onChangeText={FormikProps.handleChange('currency')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Vendor Address</Text>
                                    <TextInput value={vendorAddress} onChangeText={FormikProps.handleChange('vendorAddress')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
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

VendorScreen.navigationOptions = {
    header: null,
};

export default VendorScreen