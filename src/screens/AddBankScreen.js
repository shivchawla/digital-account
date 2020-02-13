import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({

    bankAccountNo: Yup
        .string()
        .required()
        .min(10, 'Too short')
        .label('Bank Account No'),

    bankAccountName: Yup
        .string()
        .required()
        .min(3)
        .label('Bank Account Name'),

    bankAddress: Yup
        .string()
        .required()
        .min(3)
        .label('Bank Address'),

    bankCountry: Yup
        .string()
        .required()
        .min(3)
        .label('Bank Country'),

    bankLabel: Yup
        .string()
        .required()
        .min(3)
        .label('bankLabel'),

});

const AddBankScreen = (props) => {

    const [bankAccountNoActive, setBankAccountNoActive] = useState(false)
    const dispatch = useDispatch()
    const addBank = async (values) => {
        await dispatch(actionCreator.addBank(values))
        await dispatch(actionCreator.bankList())
        props.navigation.goBack()
    }

    useEffect(() => {
        dispatch(actionCreator.bankList())
    }, [])

    return (
        <Formik
            onSubmit={values => addBank(values)}
            validationSchema={validationSchema}
        >
            {FormikProps => {

                const { bankAccountNo, bankAccountName, bankAddress, bankCountry, bankLabel } = FormikProps.values

                const bankAccountNoError = FormikProps.errors.bankAccountNo
                const bankAccountNoTouched = FormikProps.touched.bankAccountNo

                const bankAccountNameError = FormikProps.errors.bankAccountName
                const bankAccountNameTouched = FormikProps.touched.bankAccountName

                const bankAddressError = FormikProps.errors.bankAddress
                const bankAddressTouched = FormikProps.touched.bankAddress

                const bankCountryError = FormikProps.errors.bankCountry
                const bankCountryTouched = FormikProps.touched.bankCountry

                const bankLabelError = FormikProps.errors.bankLabel
                const bankLabelTouched = FormikProps.touched.bankLabel

                return (
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>
                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title, { color: '#055E7C' }]}>BANK DETAILS</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <View style={{ backgroundColor:'rgba(62,194,217,0.5)',borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
          </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 9 }}>
                                <ScrollView style={[styles.screenMargin]}>
                                    <View style={[styles.formElement, { marginTop: 20 }]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Bank Account Number</Text>
                                        <TextInput value={bankAccountNo} onChangeText={FormikProps.handleChange('bankAccountNo')} onFocus={() => setBankAccountNoActive(!bankAccountNoActive)} onBlur={() => { setBankAccountNoActive(!bankAccountNoActive); FormikProps.handleBlur('bankAccountNo') }} style={[styles.textInput,{ borderWidth: bankAccountNoActive ? 2 : 1, borderColor: bankAccountNoTouched && bankAccountNoError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={bankAccountNoTouched && bankAccountNoError ? '' : 'Eg: 2310134578'} placeholderTextColor={bankAccountNoTouched && bankAccountNoError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {bankAccountNoTouched && bankAccountNoError && <Text style={styles.error}>{bankAccountNoError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Bank Account Name</Text>
                                        <TextInput value={bankAccountName} onChangeText={FormikProps.handleChange('bankAccountName')} onBlur={FormikProps.handleBlur('bankAccountName')} style={[styles.textInput,{ borderWidth: 1, borderColor: bankAccountNameTouched && bankAccountNameError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={bankAccountNameTouched && bankAccountNameError ? '' : 'Eg: Bank Berjaya Berhad'} placeholderTextColor={bankAccountNameTouched && bankAccountNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {bankAccountNameTouched && bankAccountNameError && <Text style={styles.error}>{bankAccountNameError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Bank Address</Text>
                                        <TextInput value={bankAddress} onChangeText={FormikProps.handleChange('bankAddress')} onBlur={FormikProps.handleBlur('bankAddress')} style={[styles.textInput,{ borderWidth: 1, borderColor: bankAddressTouched && bankAddressError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={bankAddressTouched && bankAddressError ? '' : 'Eg: 89, Jalan Damai, Petaling Jaya, Selangor'} placeholderTextColor={bankAddressTouched && bankAddressError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {bankAddressTouched && bankAddressError && <Text style={styles.error}>{bankAddressError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Bank Country</Text>
                                        <TextInput value={bankCountry} onChangeText={FormikProps.handleChange('bankCountry')} onBlur={FormikProps.handleBlur('bankCountry')} style={[styles.textInput,{ borderWidth: 1, borderColor: bankCountryTouched && bankCountryError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={bankCountryTouched && bankCountryError ? '' : 'Eg: Malaysia'} placeholderTextColor={bankCountryTouched && bankCountryError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {bankCountryTouched && bankCountryError && <Text style={styles.error}>{bankCountryError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Bank Label</Text>
                                        <TextInput value={bankLabel} onChangeText={FormikProps.handleChange('bankLabel')} onBlur={FormikProps.handleBlur('bankLabel')} style={[styles.textInput,{ borderWidth: 1, borderColor: bankLabelTouched && bankLabelError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={bankLabelTouched && bankLabelError ? '' : 'Eg: For reference'} placeholderTextColor={bankLabelTouched && bankLabelError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {bankLabelTouched && bankLabelError && <Text style={styles.error}>{bankLabelError}</Text>}
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                                        
                                            <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                                        
                                    </TouchableOpacity>
                                <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                    <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> :
                                            <Text style={[styles.butang, { color: '#fff' }]}>Submit</Text>}
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}

AddBankScreen.navigationOptions = {
    header: null,
};

export default AddBankScreen;