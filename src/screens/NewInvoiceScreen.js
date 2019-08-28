import React, { useState, } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
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
        .string(),
    customer: Yup
        .string(),
    issueDate: Yup
        .string(),
    dueDate: Yup
        .string(),
    invoiceNumber: Yup
        .string(),
    amount: Yup
        .string(),
    category: Yup
        .string(),
    customerName: Yup
        .string(),
    customerEmail: Yup
        .string(),
    customerPhone: Yup
        .string(),
    customerAddress: Yup
        .string(),
    datePicked: Yup
        .string(),
});


const NewInvoiceScreen = (props) => {
    //const [loanData, setLoanData] = useContext(LoanApplicationContext)
    //const [datePicked, setDatePicked] = useState(undefined)

    return (
        <Formik
            onSubmit={values => {
                console.log(JSON.stringify(values))
                // await setLoanData({...loanData,connectedParties:[values]})
                // props.navigation.navigate('LoanApplicationDeclaration')
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
                                <Text style={styles.title}>New Invoice</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 9, margin: 10 }}>
                                <ScrollView>
                                    <View style={{ marginBottom: 10 }}>
                                        <Picker
                                            selectedValue={type}
                                            style={{ height: 50, width: 100 }}
                                            onValueChange={(itemValue, itemIndex) =>
                                                FormikProps.setFieldValue('type', itemValue)
                                            }>
                                            <Picker.Item label="Java" value="java" />
                                            <Picker.Item label="JavaScript" value="js" />
                                        </Picker>
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Type</Text>
                                        <TextInput value={type} onChangeText={FormikProps.handleChange('type')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Customer</Text>
                                        <TextInput value={customer} onChangeText={FormikProps.handleChange('customer')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    </View>
                                    <View style={{ marginBottom: 10 }}>

                                        <TouchableOpacity onPress={datePicker}><Text>Date Picker</Text></TouchableOpacity>
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Issue Date</Text>
                                        <TextInput value={issueDate} onChangeText={FormikProps.handleChange('issueDate')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Due Date</Text>
                                        <TextInput value={dueDate} onChangeText={FormikProps.handleChange('dueDate')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Invoice Number</Text>
                                        <TextInput value={invoiceNumber} onChangeText={FormikProps.handleChange('invoiceNumber')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Amount</Text>
                                        <TextInput value={amount} onChangeText={FormikProps.handleChange('amount')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Category</Text>
                                        <TextInput value={category} onChangeText={FormikProps.handleChange('category')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Customer Name</Text>
                                        <TextInput value={customerName} onChangeText={FormikProps.handleChange('customerName')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Customer Email</Text>
                                        <TextInput value={customerEmail} onChangeText={FormikProps.handleChange('customerEmail')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Customer Phone</Text>
                                        <TextInput value={customerPhone} onChangeText={FormikProps.handleChange('customerPhone')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Customer Address</Text>
                                        <TextInput value={customerAddress} onChangeText={FormikProps.handleChange('customerAddress')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity style={{ flex: 1, }}>
                                    <LinearGradient colors={['#A4A4A4', '#A4A4A4']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.text, { color: '#fff' }]}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={FormikProps.handleSubmit} style={{ flex: 1, }} >
                                    <LinearGradient colors={['#628BFB', '#0E47E8']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.text, { color: '#fff' }]}>Submit</Text>
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