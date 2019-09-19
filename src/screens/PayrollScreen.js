import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ActivityIndicator,
    KeyboardAvoidingView,
    TextInput,
    ScrollView,
    Picker
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';

import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'

const validationSchema = Yup.object().shape({

    typeZakat: Yup
        .string()
        .required(),

    payZakatTo: Yup
        .string()
        .required(),

    amountZakat: Yup
        .string()
        .required()
        .label('Zakat Amount'),

    payerName: Yup
        .string()
        .required()
        .label('Name'),

    payerEmail: Yup
        .string()
        .required()
        .email()
        .label('Email Address'),

    payerPhoneNumber: Yup
        .number()
        .required()
        .label('Phone Number'),

});

const ZakatScreen = (props) => {

    return (

        <Formik

            onSubmit={async values => {

            }}
            validationSchema={validationSchema}
        >
            {FormikProps => {

                const { personName, bankName, accountNumber, amount, deductionAmount, allowanceAmount } = FormikProps.values

                const personNameError = FormikProps.errors.personName
                const personNameTouched = FormikProps.touched.personName

                const bankNameError = FormikProps.errors.bankName
                const bankNameTouched = FormikProps.touched.bankName

                const accountNumberError = FormikProps.errors.accountNumber
                const accountNumberTouched = FormikProps.touched.accountNumber

                const amountError = FormikProps.errors.amount
                const amountTouched = FormikProps.touched.amount

                const deductionAmountError = FormikProps.errors.deductionAmount
                const deductionAmountTouched = FormikProps.touched.deductionAmount

                const allowanceAmountError = FormikProps.errors.allowanceAmount
                const allowanceAmountTouched = FormikProps.touched.allowanceAmount

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>

                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#055E7C' }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#055E7C'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title, { color: '#055E7C' }]}>Payroll Details</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>

                        </View>

                        <View style={{ justifyContent: 'space-between', flex: 9 }}>

                            <View style={{ flex: 9 }}>

                                <ScrollView style={{ padding: 10 }}>

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Name</Text>
                                        <TextInput value={personName} onChangeText={FormikProps.handleChange('personName')} onBlur={FormikProps.handleBlur('personName')} style={{ borderWidth: 1, borderColor: personNameTouched && personNameError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={personNameTouched && personNameError ? '' : 'Salman bin Abu Bakar'} placeholderTextColor={personNameTouched && personNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>

                                    {personNameTouched && personNameError && <Text style={styles.error}>{personNameError}</Text>}

                                    <View style={{ marginBottom: 10, alignSelf: 'stretch' }}>

                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Bank</Text>
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>

                                            <Picker
                                                style={{ flex: 1, height: 35 }}
                                                selectedValue={bankName}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    FormikProps.setFieldValue('bankName', itemValue)
                                                }>
                                                <Picker.Item label="Bank Islam" value="bankIslam" />
                                                <Picker.Item label="Maybank" value="maybank" />
                                            </Picker>

                                        </View>

                                    </View>

                                    {bankNameTouched && bankNameError && <Text style={styles.error}>{bankNameError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Account Number</Text>
                                        <TextInput value={accountNumber} onChangeText={FormikProps.handleChange('accountNumber')} onBlur={FormikProps.handleBlur('accountNumber')} style={{ borderWidth: 1, borderColor: accountNumberTouched && accountNumberError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={accountNumberTouched && accountNumberError ? '' : '789083821235'} placeholderTextColor={accountNumberTouched && accountNumberError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                    </View>

                                    {accountNumberTouched && accountNumberError && <Text style={styles.error}>{accountNumberError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Amount</Text>
                                        <TextInput value={amount} onChangeText={FormikProps.handleChange('amount')} onBlur={FormikProps.handleBlur('amount')} style={{ textAlignVertical: 'top', borderWidth: 1, borderColor: amountTouched && amountError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={amountTouched && amountError ? '' : 'RM 78.00'} placeholderTextColor={amountTouched && amountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                    </View>

                                    {amountTouched && amountError && <Text style={styles.error}>{amountError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Deduction Amount</Text>
                                        <TextInput value={deductionAmount} onChangeText={FormikProps.handleChange('deductionAmount')} onBlur={FormikProps.handleBlur('deductionAmount')} style={{ textAlignVertical: 'top', borderWidth: 1, borderColor: deductionAmountTouched && deductionAmountError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={deductionAmountTouched && deductionAmountError ? '' : 'address@email.com'} placeholderTextColor={deductionAmountTouched && deductionAmountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                    </View>

                                    {deductionAmountTouched && deductionAmountError && <Text style={styles.error}>{deductionAmountError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Allowance Amount</Text>
                                        <TextInput value={allowanceAmount} onChangeText={FormikProps.handleChange('allowanceAmount')} onBlur={FormikProps.handleBlur('allowanceAmount')} style={{ textAlignVertical: 'top', borderWidth: 1, borderColor: allowanceAmountTouched && allowanceAmountError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={allowanceAmountTouched && allowanceAmountError ? '' : '0189076510'} placeholderTextColor={allowanceAmountTouched && allowanceAmountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                    </View>

                                    {allowanceAmountTouched && allowanceAmountError && <Text style={styles.error}>{allowanceAmountError}</Text>}

                                </ScrollView>

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
                                            <Text style={[styles.text, { color: '#fff' }]}>Submit</Text>}
                                    </LinearGradient>
                                </TouchableOpacity>

                            </View>

                        </View>

                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}

ZakatScreen.navigationOptions = {
    header: null,
};


export default ZakatScreen;