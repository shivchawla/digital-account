import React from 'react';
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView, TextInput, ActivityIndicator } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({

    vendorName: Yup
        .string()
        .required()
        .min(3)
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

    address: Yup
        .string()
        .required()
        .min(3)
        .label('Vendor Address'),

});

const VendorApplicationScreen = (props) => {

    const dispatch = useDispatch()
    const setVendor = (val) => dispatch({ type: 'SET_VENDOR_DATA', payload: { ...val } });

    return (

        <Formik onSubmit={async values => {
            dispatch(actionCreator.passVendorData(values))
            props.navigation.navigate("VendorAddSuccess")

            console.log(JSON.stringify(values))
        }}

            validationSchema={validationSchema}>

            {FormikProps => {
                const { vendorName, vendorEmail, currency, address } = FormikProps.values

                const vendorNameError = FormikProps.errors.vendorName
                const vendorNameTouched = FormikProps.touched.vendorName

                const vendorEmailError = FormikProps.errors.vendorEmail
                const vendorEmailTouched = FormikProps.touched.vendorEmail

                const currencyError = FormikProps.errors.currency
                const currencyTouched = FormikProps.touched.currency

                const addressError = FormikProps.errors.address
                const addressTouched = FormikProps.touched.address

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title]}>VENDOR DETAILS</Text>
                            </View>
                            <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={[styles.screenMargin, { flex: 9 }]}>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, marginTop: 25 }]}>Vendor Name</Text>
                                    <TextInput value={vendorName} onChangeText={FormikProps.handleChange('vendorName')} onBlur={FormikProps.handleBlur('vendorName')} style={{ borderWidth: 1, borderColor: vendorNameTouched && vendorNameError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={vendorNameTouched && vendorNameError ? '' : 'Siti binti Ali'} placeholderTextColor={vendorNameTouched && vendorNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {vendorNameTouched && vendorNameError && <Text style={styles.error}>{vendorNameError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5 }]}>Vendor E-mail</Text>
                                    <TextInput value={vendorEmail} onChangeText={FormikProps.handleChange('vendorEmail')} onBlur={FormikProps.handleBlur('vendorEmail')} style={{ borderWidth: 1, borderColor: vendorEmailTouched && vendorEmailError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={vendorEmailTouched && vendorEmailError ? '' : 'example@email.com'} placeholderTextColor={vendorEmailTouched && vendorEmailError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {vendorEmailTouched && vendorEmailError && <Text style={styles.error}>{vendorEmailError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5 }]}>Preferred Currency</Text>
                                    <TextInput value={currency} onChangeText={FormikProps.handleChange('currency')} onBlur={FormikProps.handleBlur('currency')} style={{ borderWidth: 1, borderColor: currencyTouched && currencyError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={currencyTouched && currencyError ? '' : 'MYR'} placeholderTextColor={currencyTouched && currencyError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {currencyTouched && currencyError && <Text style={styles.error}>{currencyError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5 }]}>Vendor Address</Text>
                                    <TextInput value={address} onChangeText={FormikProps.handleChange('address')} onBlur={FormikProps.handleBlur('address')} style={{ borderWidth: 1, borderColor: addressTouched && addressError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={addressTouched && addressError ? '' : '32, Jalan Hartamas, Bandar Baru Sendayan, Negeri Sembilan'} placeholderTextColor={addressTouched && addressError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {addressTouched && addressError && <Text style={styles.error}>{addressError}</Text>}
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>

                                <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>

                            </TouchableOpacity>
                            <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff' }]}>Submit</Text>}
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}

VendorApplicationScreen.navigationOptions = {
    header: null,
};

export default VendorApplicationScreen