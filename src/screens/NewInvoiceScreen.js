import React, { useState, } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ActivityIndicator,
    KeyboardAvoidingView,
    TextInput,
    ScrollView,
    DatePickerAndroid,
    DatePickerIOS,
    Picker,
    PickerIOS
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';

import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'

const validationSchema = Yup.object().shape({
    type: Yup
        .string()
        .required()
        .label('Type'),

    customer: Yup
        .string()
        .required()
        .label('Customer'),

    issueDate: Yup
        .string()
        .required()
        .label('Issue Date'),

    dueDate: Yup
        .string()
        .required()
        .label('Due Date'),

    invoiceNumber: Yup
        .string()
        .required()
        .label('Invoice Number'),

    amount: Yup
        .string()
        .required()
        .label('Amount'),

    category: Yup
        .string()
        .required()
        .label('Category'),

    customerName: Yup
        .string()
        .required()
        .label('Customer Name'),

    customerEmail: Yup
        .string()
        .email()
        .required()
        .label('Customer Email'),

    customerPhone: Yup
        .string()
        .required()
        .label('Customer Phone'),

    customerAddress: Yup
        .string()
        .required()
        .label('Customer Address'),

    datePicked: Yup
        .string()
        .required()
        .label('Date Picked'),
});


const NewInvoiceScreen = (props) => {

    return (
        <Formik
            onSubmit={values => {
                props.navigation.navigate("InvoiceSuccess")
                console.log(JSON.stringify(values))
            }}

            validationSchema={validationSchema}
        >
            {FormikProps => {
                const datePicker = async () => {
                    try {
                        const { action, year, month, day } = await DatePickerAndroid.open({
                            // Use `new Date()` for current date.
                            // May 25 2020. Month 0 is January.
                            date: new Date(2020, 4, 25),
                        });
                        if (action !== DatePickerAndroid.dismissedAction) {
                            // Selected year, month (0-11), day
                            FormikProps.setFieldValue('datePicked', `${year}-${month}-${day}`)
                        }
                    } catch ({ code, message }) {
                        console.warn('Cannot open date picker', message);
                    }
                }
                const { type, customer, issueDate, dueDate, invoiceNumber, amount, category, customerName, customerEmail, customerPhone, customerAddress } = FormikProps.values

                const typeError = FormikProps.errors.type
                const typeTouched = FormikProps.touched.type

                const customerError = FormikProps.errors.customer
                const customerTouched = FormikProps.touched.customer

                const issueDateError = FormikProps.errors.issueDate
                const issueDateTouched = FormikProps.touched.issueDate

                const dueDateError = FormikProps.errors.dueDate
                const dueDateTouched = FormikProps.touched.dueDate

                const invoiceNumberError = FormikProps.errors.invoiceNumber
                const invoiceNumberTouched = FormikProps.touched.invoiceNumber

                const amountError = FormikProps.errors.amount
                const amountTouched = FormikProps.touched.amount

                const categoryError = FormikProps.errors.category
                const categoryTouched = FormikProps.touched.category

                const customerNameError = FormikProps.errors.customerName
                const customerNameTouched = FormikProps.touched.customerName

                const customerEmailError = FormikProps.errors.customerEmail
                const customerEmailTouched = FormikProps.touched.customerEmail

                const customerPhoneError = FormikProps.errors.customerPhone
                const customerPhoneTouched = FormikProps.touched.customerPhone

                const customerAddressError = FormikProps.errors.customerAddress
                const customerAddressTouched = FormikProps.touched.customerAddress

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>

                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#055E7C' }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#055E7C'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title, { color: '#055E7C' }]}>New Invoice</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>

                        </View>

                        <View style={{ justifyContent: 'space-between', flex: 9 }}>

                            <View style={{ flex: 9, margin: 10 }}>

                                <ScrollView>

                                    <View style={{ marginBottom: 10, alignSelf: 'stretch' }}>

                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Type</Text>

                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <Picker selectedValue={type}
                                                style={{ flex: 1, height: 35 }}
                                                onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('type', itemValue)}>
                                                <Picker.Item label="Merchant" value="Merchant" />
                                                <Picker.Item label="Customer" value="Customer" />
                                            </Picker>
                                        </View>

                                        {typeTouched && typeError && <Text style={styles.error}>{typeError}</Text>}

                                    </View>

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Customer</Text>
                                        <TextInput value={customer} onChangeText={FormikProps.handleChange('customer')} onBlur={FormikProps.handleBlur('customer')} style={{ borderWidth: 1, borderColor: customerTouched && customerError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={customerTouched && customerError ? '' : ''} placeholderTextColor={customerTouched && customerError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />

                                    </View>

                                    {customerTouched && customerError && <Text style={styles.error}>{customerError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <TouchableOpacity onPress={datePicker}><Text style={{ color: '#055E7C' }}>Date Picker</Text></TouchableOpacity>
                                    </View>

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Issue Date</Text>
                                        <TextInput value={issueDate} onChangeText={FormikProps.handleChange('issueDate')} onBlur={FormikProps.handleBlur('issueDate')} style={{ borderWidth: 1, borderColor: issueDateTouched && issueDateError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={issueDateTouched && issueDateError ? '' : ''} placeholderTextColor={issueDateTouched && issueDateError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />

                                    </View>

                                    {issueDateTouched && issueDateError && <Text style={styles.error}>{issueDateError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Due Date</Text>
                                        <TextInput value={dueDate} onChangeText={FormikProps.handleChange('dueDate')} onBlur={FormikProps.handleBlur('dueDate')} style={{ borderWidth: 1, borderColor: dueDateTouched && dueDateError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={dueDateTouched && dueDateError ? '' : ''} placeholderTextColor={dueDateTouched && dueDateError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />

                                    </View>

                                    {dueDateTouched && dueDateError && <Text style={styles.error}>{dueDateError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Invoice Number</Text>
                                        <TextInput value={invoiceNumber} onChangeText={FormikProps.handleChange('invoiceNumber')} onBlur={FormikProps.handleBlur('invoiceNumber')} style={{ borderWidth: 1, borderColor: invoiceNumberTouched && invoiceNumberError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={invoiceNumberTouched && invoiceNumberError ? '' : ''} placeholderTextColor={invoiceNumberTouched && invoiceNumberError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />

                                    </View>

                                    {invoiceNumberTouched && invoiceNumberError && <Text style={styles.error}>{invoiceNumberError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Amount</Text>
                                        <TextInput value={amount} onChangeText={FormikProps.handleChange('amount')} onBlur={FormikProps.handleBlur('amount')} style={{ borderWidth: 1, borderColor: amountTouched && amountError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={amountTouched && amountError ? '' : ''} placeholderTextColor={amountTouched && amountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />

                                    </View>

                                    {amountTouched && amountError && <Text style={styles.error}>{amountError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Category</Text>
                                        <TextInput value={category} onChangeText={FormikProps.handleChange('category')} onBlur={FormikProps.handleBlur('category')} style={{ borderWidth: 1, borderColor: categoryTouched && categoryError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={categoryTouched && categoryError ? '' : ''} placeholderTextColor={categoryTouched && categoryError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />

                                    </View>

                                    {categoryTouched && categoryError && <Text style={styles.error}>{categoryError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Customer Name</Text>
                                        <TextInput value={customerName} onChangeText={FormikProps.handleChange('customerName')} onBlur={FormikProps.handleBlur('customerName')} style={{ borderWidth: 1, borderColor: customerNameTouched && customerNameError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={customerNameTouched && customerNameError ? '' : ''} placeholderTextColor={customerNameTouched && customerNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />

                                    </View>

                                    {customerNameTouched && customerNameError && <Text style={styles.error}>{customerNameError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Customer Email</Text>
                                        <TextInput value={customerEmail} onChangeText={FormikProps.handleChange('customerEmail')} onBlur={FormikProps.handleBlur('customerEmail')} style={{ borderWidth: 1, borderColor: customerEmailTouched && customerEmailError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={customerEmailTouched && customerEmailError ? '' : ''} placeholderTextColor={customerEmailTouched && customerEmailError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />

                                    </View>

                                    {customerEmailTouched && customerEmailError && <Text style={styles.error}>{customerEmailError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Customer Phone</Text>
                                        <TextInput value={customerPhone} onChangeText={FormikProps.handleChange('customerPhone')} onBlur={FormikProps.handleBlur('customerPhone')} style={{ borderWidth: 1, borderColor: customerPhoneTouched && customerPhoneError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={customerPhoneTouched && customerPhoneError ? '' : ''} placeholderTextColor={customerPhoneTouched && customerPhoneError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />

                                    </View>

                                    {customerPhoneTouched && customerPhoneError && <Text style={styles.error}>{customerPhoneError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Customer Address</Text>
                                        <TextInput value={customerAddress} onChangeText={FormikProps.handleChange('customerAddress')} onBlur={FormikProps.handleBlur('customerAddress')} style={{ borderWidth: 1, borderColor: customerAddressTouched && customerAddressError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={customerAddressTouched && customerAddressError ? '' : ''} placeholderTextColor={customerAddressTouched && customerAddressError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />

                                    </View>

                                    {customerAddressTouched && customerAddressError && <Text style={styles.error}>{customerAddressError}</Text>}

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

NewInvoiceScreen.navigationOptions = {
    header: null,
};

export default NewInvoiceScreen;