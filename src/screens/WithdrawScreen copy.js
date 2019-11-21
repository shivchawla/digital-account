import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({

    bankAccountNo: Yup
        .string()
        .required()
        .label('Bank Account No'),

    bankAccountName: Yup
        .string()
        .required()
        .label('Bank Account Name'),

    bankAddress: Yup
        .string()
        .required()
        .label('Bank Address'),

    bankCountry: Yup
        .string()
        .required()
        .label('Bank Country'),

    amount: Yup
         .number()
        .positive()
        .required()
        .label('Amount'),

    remark: Yup
        .string()
        .required()
        .label('Remark'),

});

const WithdrawScreen = (props) => {

    const [bankAccountNoActive, setBankAccountNoActive] = useState(false)
    const withDraw = (values) => {
        props.navigation.navigate('WithdrawSuccess')
    }

    return (
        <Formik onSubmit={values => withDraw(values)}
            validationSchema={validationSchema}
        >
            {FormikProps => {

                const { bankAccountNo, bankAccountName, bankAddress, bankCountry, amount, remark } = FormikProps.values

                const bankAccountNoError = FormikProps.errors.bankAccountNo
                const bankAccountNoTouched = FormikProps.touched.bankAccountNo

                const bankAccountNameError = FormikProps.errors.bankAccountName
                const bankAccountNameTouched = FormikProps.touched.bankAccountName

                const bankAddressError = FormikProps.errors.bankAddress
                const bankAddressTouched = FormikProps.touched.bankAddress

                const bankCountryError = FormikProps.errors.bankCountry
                const bankCountryTouched = FormikProps.touched.bankCountry

                const amountError = FormikProps.errors.amount
                const amountTouched = FormikProps.touched.amount

                const remarkError = FormikProps.errors.remark
                const remarkTouched = FormikProps.touched.remark

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>
                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title, { color: '#055E7C' }]}>Withdrawal</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={[{ flex: 9 }]}>
                                <ScrollView style={[styles.screenMargin]}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                        <Text style={[styles.h3, { color: '#04A2BD' }]}>Withdrawal Application Form</Text>
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Bank Account Number</Text>
                                        <TextInput value={bankAccountNo} onChangeText={FormikProps.handleChange('bankAccountNo')} onFocus={() => setBankAccountNoActive(!bankAccountNoActive)} onBlur={() => { setBankAccountNoActive(!bankAccountNoActive); FormikProps.handleBlur('bankAccountNo') }} style={{ borderWidth: bankAccountNoActive ? 2 : 1, borderColor: bankAccountNoTouched && bankAccountNoError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={bankAccountNoTouched && bankAccountNoError ? '' : 'Eg: 013-113-12345678'} placeholderTextColor={bankAccountNoTouched && bankAccountNoError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {bankAccountNoTouched && bankAccountNoError && <Text style={styles.error}>{bankAccountNoError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Bank Account Name</Text>
                                        <TextInput value={bankAccountName} onChangeText={FormikProps.handleChange('bankAccountName')} onBlur={FormikProps.handleBlur('bankAccountName')} style={{ borderWidth: 1, borderColor: bankAccountNameTouched && bankAccountNameError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={bankAccountNameTouched && bankAccountNameError ? '' : 'Eg: Bank Berjaya Berhad'} placeholderTextColor={bankAccountNameTouched && bankAccountNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {bankAccountNameTouched && bankAccountNameError && <Text style={styles.error}>{bankAccountNameError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Bank Address</Text>
                                        <TextInput value={bankAddress} onChangeText={FormikProps.handleChange('bankAddress')} onBlur={FormikProps.handleBlur('bankAddress')} style={{ borderWidth: 1, borderColor: bankAddressTouched && bankAddressError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={bankAddressTouched && bankAddressError ? '' : 'Eg: 89, Jalan Damai, Petaling Jaya, Selangor'} placeholderTextColor={bankAddressTouched && bankAddressError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {bankAddressTouched && bankAddressError && <Text style={styles.error}>{bankAddressError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Bank Country</Text>
                                        <TextInput value={bankCountry} onChangeText={FormikProps.handleChange('bankCountry')} onBlur={FormikProps.handleBlur('bankCountry')} style={{ borderWidth: 1, borderColor: bankCountryTouched && bankCountryError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={bankCountryTouched && bankCountryError ? '' : 'Eg: Malaysia'} placeholderTextColor={bankCountryTouched && bankCountryError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {bankCountryTouched && bankCountryError && <Text style={styles.error}>{bankCountryError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Amount</Text>
                                        <TextInput value={amount} onChangeText={FormikProps.handleChange('amount')} onBlur={FormikProps.handleBlur('amount')} style={{ borderWidth: 1, borderColor: amountTouched && amountError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={amountTouched && amountError ? '' : 'Eg: RM890.00'} placeholderTextColor={amountTouched && amountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                        {amountTouched && amountError && <Text style={styles.error}>{amountError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Remark</Text>
                                        <TextInput value={remark} onChangeText={FormikProps.handleChange('remark')} onBlur={FormikProps.handleBlur('remark')} style={{ borderWidth: 1, borderColor: remarkTouched && remarkError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={remarkTouched && remarkError ? '' : 'Eg: For reference'} placeholderTextColor={remarkTouched && remarkError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {remarkTouched && remarkError && <Text style={styles.error}>{remarkError}</Text>}
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 }}>
                                    <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                                    </LinearGradient>
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

WithdrawScreen.navigationOptions = {
    header: null,
};

export default WithdrawScreen;