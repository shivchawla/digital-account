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

                const { typeZakat, payZakatTo, amountZakat, payerName, payerEmail, payerPhoneNumber } = FormikProps.values

                const typeZakatError = FormikProps.errors.typeZakat
                const typeZakatTouched = FormikProps.touched.typeZakat

                const payZakatToError = FormikProps.errors.payZakatTo
                const payZakatToTouched = FormikProps.touched.payZakatTo

                const amountZakatError = FormikProps.errors.amountZakat
                const amountZakatTouched = FormikProps.touched.amountZakat

                const payerNameError = FormikProps.errors.payerName
                const payerNameTouched = FormikProps.touched.payerName

                const payerEmailError = FormikProps.errors.payerEmail
                const payerEmailTouched = FormikProps.touched.payerEmail

                const payerPhoneNumberError = FormikProps.errors.payerPhoneNumber
                const payerPhoneNumberTouched = FormikProps.touched.payerPhoneNumber

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>

                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#055E7C' }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#055E7C'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title, { color: '#055E7C' }]}>Zakat Details</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>

                        </View>

                        <View style={{ justifyContent: 'space-between', flex: 9 }}>

                            <View style={{ flex: 9 }}>

                                <ScrollView style={{ padding: 10 }}>

                                    <View style={{ marginBottom: 10, alignSelf: 'stretch' }}>

                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Type of Zakat</Text>
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>

                                            <Picker
                                                style={{ flex: 1, height: 35 }}
                                                selectedValue={typeZakat}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    FormikProps.setFieldValue('typeZakat', itemValue)
                                                }>
                                                <Picker.Item label="Zakat Pendapatan" value="zakatPendapatan" />
                                                <Picker.Item label="Zakat Perniagaan" value="zakatPerniagaan" />
                                                <Picker.Item label="Zakat Simpanan" value="zakatSimpanan" />
                                            </Picker>

                                        </View>

                                    </View>

                                    {typeZakatTouched && typeZakatError && <Text style={styles.error}>{typeZakatError}</Text>}

                                    <View style={{ marginBottom: 10, alignSelf: 'stretch' }}>

                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Pay Zakat To</Text>
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>

                                            <Picker
                                                style={{ flex: 1, height: 35 }}
                                                selectedValue={payZakatTo}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    FormikProps.setFieldValue('payZakatTo', itemValue)
                                                }>
                                                <Picker.Item label="Zakat Selangor" value="zakatSelangor" />
                                                <Picker.Item label="Zakat Perak" value="zakatPerak" />
                                                <Picker.Item label="Zakat Terengganu" value="zakatTerengganu" />
                                            </Picker>

                                        </View>

                                    </View>

                                    {payZakatToTouched && payZakatToError && <Text style={styles.error}>{payZakatToError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Amount</Text>
                                        <TextInput value={amountZakat} onChangeText={FormikProps.handleChange('amountZakat')} onBlur={FormikProps.handleBlur('amountZakat')} style={{ borderWidth: 1, borderColor: amountZakatTouched && amountZakatError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={amountZakatTouched && amountZakatError ? '' : 'RM 100.00'} placeholderTextColor={amountZakatTouched && amountZakatError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                    </View>

                                    {amountZakatTouched && amountZakatError && <Text style={styles.error}>{amountZakatError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Payer's Name</Text>
                                        <TextInput value={payerName} onChangeText={FormikProps.handleChange('payerName')} onBlur={FormikProps.handleBlur('payerName')} style={{ textAlignVertical: 'top', borderWidth: 1, borderColor: payerNameTouched && payerNameError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={payerNameTouched && payerNameError ? '' : 'Che Abdul bin Rahim'} placeholderTextColor={payerNameTouched && payerNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>

                                    {payerNameTouched && payerNameError && <Text style={styles.error}>{payerNameError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Payer's Email</Text>
                                        <TextInput value={payerEmail} onChangeText={FormikProps.handleChange('payerEmail')} onBlur={FormikProps.handleBlur('payerEmail')} style={{ textAlignVertical: 'top', borderWidth: 1, borderColor: payerEmailTouched && payerEmailError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={payerEmailTouched && payerEmailError ? '' : 'address@email.com'} placeholderTextColor={payerEmailTouched && payerEmailError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>

                                    {payerEmailTouched && payerEmailError && <Text style={styles.error}>{payerEmailError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Payer's Phone Number</Text>
                                        <TextInput value={payerPhoneNumber} onChangeText={FormikProps.handleChange('payerPhoneNumber')} onBlur={FormikProps.handleBlur('payerPhoneNumber')} style={{ textAlignVertical: 'top', borderWidth: 1, borderColor: payerPhoneNumberTouched && payerPhoneNumberError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={payerPhoneNumberTouched && payerPhoneNumberError ? '' : '0189076510'} placeholderTextColor={payerPhoneNumberTouched && payerPhoneNumberError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                    </View>

                                    {payerPhoneNumberTouched && payerPhoneNumberError && <Text style={styles.error}>{payerPhoneNumberError}</Text>}

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