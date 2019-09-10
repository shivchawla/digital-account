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
        .string()
        .required()
        .label('Vendor Name'),
    vendorEmail: Yup
        .string()
        .email()
        .required()
        .label('Vendor Email'),
    currency: Yup
        .string()
        .required()
        .label('Currency'),
    vendorAddress: Yup
        .string()
        .required()
        .label('Vendor Address'),
});

const VendorScreen = (props) => {
    return (
        <Formik onSubmit={async values => {
            console.log(JSON.stringify(values))
        }}

            validationSchema={validationSchema}>
            {FormikProps => {
                const { vendorName, vendorEmail, currency, vendorAddress } = FormikProps.values

                const vendorNameError = FormikProps.errors.vendorName
                const vendorNameTouched = FormikProps.touched.vendorName

                const vendorEmailError = FormikProps.errors.vendorEmail
                const vendorEmailTouched = FormikProps.touched.vendorEmail

                const currencyError = FormikProps.errors.currency
                const currencyTouched = FormikProps.touched.currency

                const vendorAddressError = FormikProps.errors.vendorAddress
                const vendorAddressTouched = FormikProps.touched.vendorAddress

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
                                    <TextInput value={vendorName} onChangeText={FormikProps.handleChange('vendorName')} onBlur={FormikProps.handleBlur('vendorName')} style={{ borderWidth: 1, borderColor: vendorNameTouched && vendorNameError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={vendorNameTouched && vendorNameError ? '' : 'Siti binti Ali'} placeholderTextColor={vendorNameTouched && vendorNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                </View>

                                {vendorNameTouched && vendorNameError && <Text style={styles.error}>{vendorNameError}</Text>}

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Vendor E-mail</Text>
                                    <TextInput value={vendorEmail} onChangeText={FormikProps.handleChange('vendorEmail')} onBlur={FormikProps.handleBlur('vendorEmail')} style={{ borderWidth: 1, borderColor: vendorEmailTouched && vendorEmailError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={vendorEmailTouched && vendorEmailError ? '' : 'example@email.com'} placeholderTextColor={vendorEmailTouched && vendorEmailError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                </View>

                                {vendorEmailTouched && vendorEmailError && <Text style={styles.error}>{vendorEmailError}</Text>}

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Preferred Currency</Text>
                                    <TextInput value={currency} onChangeText={FormikProps.handleChange('currency')} onBlur={FormikProps.handleBlur('currency')} style={{ borderWidth: 1, borderColor: currencyTouched && currencyError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={currencyTouched && currencyError ? '' : 'MYR'} placeholderTextColor={currencyTouched && currencyError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                </View>

                                {currencyTouched && currencyError && <Text style={styles.error}>{currencyError}</Text>}

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Vendor Address</Text>
                                    <TextInput value={vendorAddress} onChangeText={FormikProps.handleChange('vendorAddress')} onBlur={FormikProps.handleBlur('vendorAddress')} style={{ borderWidth: 1, borderColor: vendorAddressTouched && vendorAddressError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={vendorAddressTouched && vendorAddressError ? '' : '32, Jalan Hartamas, Bandar Baru Sendayan, Negeri Sembilan'} placeholderTextColor={vendorAddressTouched && vendorAddressError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                </View>

                                {vendorAddressTouched && vendorAddressError && <Text style={styles.error}>{vendorAddressError}</Text>}

                            </View>

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

                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}

VendorScreen.navigationOptions = {
    header: null,
};

export default VendorScreen