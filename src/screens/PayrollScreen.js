import React from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, KeyboardAvoidingView, TextInput, ScrollView, Picker } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'

const validationSchema = Yup.object().shape({

    personName: Yup
        .string()
        .required()
        .min(3)
        .label('Name'),

    bankName: Yup
        .string()
        .required(),

    accountNumber: Yup
        .string()
        .required()
        .min(3)
        .label('Account Number'),

    amount: Yup
        .string()
        .required()
        .label('Total Amount'),

    deductionAmount: Yup
        .string()
        .required()
        .label('Total Deduction'),

    allowanceAmount: Yup
        .string()
        .required()
        .label('Allowance Amount'),

});

const PayrollScreen = (props) => {

    return (

        <Formik onSubmit={async values => {
            props.navigation.navigate("PayrollSuccess")
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
                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4', marginBottom: 25 }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title, { color: '#055E7C' }]}>Payroll Details</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <View style={{ backgroundColor:'rgba(62,194,217,0.5)',borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
          </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 9 }}>
                                <ScrollView style={styles.screenMargin}>
                                    <View style={styles.formElement}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Name</Text>
                                        <TextInput value={personName} onChangeText={FormikProps.handleChange('personName')} onBlur={FormikProps.handleBlur('personName')} style={{ borderWidth: 1, borderColor: personNameTouched && personNameError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={personNameTouched && personNameError ? '' : 'Salman bin Abu Bakar'} placeholderTextColor={personNameTouched && personNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {personNameTouched && personNameError && <Text style={styles.error}>{personNameError}</Text>}
                                    </View>
                                    <View style={[styles.formElement, { alignSelf: 'stretch' }]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Bank</Text>
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <Picker style={{ flex: 1, height: 35 }} selectedValue={bankName} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('bankName', itemValue)}>
                                                <Picker.Item label={'Please Select'} value={undefined} />
                                                <Picker.Item label="Bank Islam" value="bankIslam" />
                                                <Picker.Item label="Maybank" value="maybank" />
                                            </Picker>
                                            {bankNameTouched && bankNameError && <Text style={styles.error}>{bankNameError}</Text>}
                                        </View>
                                    </View>
                                    <View style={styles.formElement}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Account Number</Text>
                                        <TextInput value={accountNumber} onChangeText={FormikProps.handleChange('accountNumber')} onBlur={FormikProps.handleBlur('accountNumber')} style={{ borderWidth: 1, borderColor: accountNumberTouched && accountNumberError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={accountNumberTouched && accountNumberError ? '' : '789083821235'} placeholderTextColor={accountNumberTouched && accountNumberError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                        {accountNumberTouched && accountNumberError && <Text style={styles.error}>{accountNumberError}</Text>}
                                    </View>
                                    <View style={styles.formElement}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Amount</Text>
                                        <TextInput value={amount} onChangeText={FormikProps.handleChange('amount')} onBlur={FormikProps.handleBlur('amount')} style={{ textAlignVertical: 'top', borderWidth: 1, borderColor: amountTouched && amountError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={amountTouched && amountError ? '' : 'RM 78.00'} placeholderTextColor={amountTouched && amountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                        {amountTouched && amountError && <Text style={styles.error}>{amountError}</Text>}
                                    </View>
                                    <View style={styles.formElement}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Deduction Amount</Text>
                                        <TextInput value={deductionAmount} onChangeText={FormikProps.handleChange('deductionAmount')} onBlur={FormikProps.handleBlur('deductionAmount')} style={{ textAlignVertical: 'top', borderWidth: 1, borderColor: deductionAmountTouched && deductionAmountError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={deductionAmountTouched && deductionAmountError ? '' : 'address@email.com'} placeholderTextColor={deductionAmountTouched && deductionAmountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                        {deductionAmountTouched && deductionAmountError && <Text style={styles.error}>{deductionAmountError}</Text>}
                                    </View>
                                    <View style={styles.formElement}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Allowance Amount</Text>
                                        <TextInput value={allowanceAmount} onChangeText={FormikProps.handleChange('allowanceAmount')} onBlur={FormikProps.handleBlur('allowanceAmount')} style={{ textAlignVertical: 'top', borderWidth: 1, borderColor: allowanceAmountTouched && allowanceAmountError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={allowanceAmountTouched && allowanceAmountError ? '' : 'RM 900.00'} placeholderTextColor={allowanceAmountTouched && allowanceAmountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                        {allowanceAmountTouched && allowanceAmountError && <Text style={styles.error}>{allowanceAmountError}</Text>}
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
                                        {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff' }]}>Submit</Text>}
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}

PayrollScreen.navigationOptions = {
    header: null,
};

export default PayrollScreen;