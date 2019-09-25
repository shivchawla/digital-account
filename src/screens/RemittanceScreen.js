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

    senderCurrency: Yup
        .string()
        .required(),

    senderAmount: Yup
        .string()
        .required()
        .label('Amount'),

    recipientCurrency: Yup
        .string()
        .required(),

    recipientAmount: Yup
        .string()
        .required()
        .label('Amount'),

    recipientName: Yup
        .string()
        .required()
        .label('Name'),

    recipientPhoneNumber: Yup
        .number()
        .required()
        .label('Phone Number'),

    recipientEmail: Yup
        .string()
        .required()
        .email()
        .label('Email Address'),

});

const RemittanceScreen = (props) => {

    return (

        <Formik

            onSubmit={async values => {

            }}
            validationSchema={validationSchema}
        >
            {FormikProps => {

                const { senderCurrency, senderAmount, recipientCurrency, recipientAmount, recipientName, recipientPhoneNumber, recipientEmail } = FormikProps.values

                const senderCurrencyError = FormikProps.errors.senderCurrency
                const senderCurrencyTouched = FormikProps.touched.senderCurrency

                const senderAmountError = FormikProps.errors.senderAmount
                const senderAmountTouched = FormikProps.touched.senderAmount

                const recipientCurrencyError = FormikProps.errors.recipientCurrency
                const recipientCurrencyTouched = FormikProps.touched.recipientCurrency

                const recipientAmountError = FormikProps.errors.recipientAmount
                const recipientAmountTouched = FormikProps.touched.recipientAmount

                const recipientNameError = FormikProps.errors.recipientName
                const recipientNameTouched = FormikProps.touched.recipientName

                const recipientPhoneNumberError = FormikProps.errors.recipientPhoneNumber
                const recipientPhoneNumberTouched = FormikProps.touched.recipientPhoneNumber

                const recipientEmailError = FormikProps.errors.recipientEmail
                const recipientEmailTouched = FormikProps.touched.recipientEmail

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>

                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#055E7C' }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#055E7C'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title, { color: '#055E7C' }]}>Remittance Details</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>

                        </View>

                        <View style={{ justifyContent: 'space-between', flex: 9 }}>

                            <View style={{ flex: 9 }}>

                                <ScrollView style={{ padding: 10 }}>

                                    <View style={{ marginBottom: 10 }}>

                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>From</Text>

                                        <Picker
                                            style={{ flex: 1, height: 35, borderColor: '#055E7C', borderWidth: 1 }}
                                            selectedValue={senderCurrency}
                                            onValueChange={(itemValue, itemIndex) =>
                                                FormikProps.setFieldValue('senderCurrency', itemValue)
                                            }>
                                            <Picker.Item label="Malaysian Ringgit (MYR)" value="myr" />
                                            <Picker.Item label="Indonesian Rupiah (IDR)" value="idr" />
                                        </Picker>

                                        <TextInput value={senderAmount} onChangeText={FormikProps.handleChange('senderAmount')} onBlur={FormikProps.handleBlur('senderAmount')} style={{ borderWidth: 1, borderColor: senderAmountTouched && senderAmountError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={senderAmountTouched && senderAmountError ? '' : 'MYR 90.00'} placeholderTextColor={senderAmountTouched && senderAmountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />

                                    </View>

                                    {senderCurrencyError && senderCurrencyTouched && <Text style={styles.error}>{senderCurrencyTouched}</Text>}


                                    {senderAmountTouched && senderAmountError && <Text style={styles.error}>{senderAmountError}</Text>}

                                    <View style={{ marginBottom: 10 }}>

                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>To</Text>

                                        <Picker
                                            style={{ flex: 1, height: 35, borderColor: '#055E7C', borderWidth: 1 }}
                                            selectedValue={recipientCurrency}
                                            onValueChange={(itemValue, itemIndex) =>
                                                FormikProps.setFieldValue('recipientCurrency', itemValue)
                                            }>
                                            <Picker.Item label="Malaysian Ringgit (MYR)" value="myr" />
                                            <Picker.Item label="Indonesian Rupiah (IDR)" value="idr" />
                                        </Picker>

                                        <TextInput value={recipientAmount} onChangeText={FormikProps.handleChange('recipientAmount')} onBlur={FormikProps.handleBlur('recipientAmount')} style={{ borderWidth: 1, borderColor: recipientAmountTouched && recipientAmountError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={recipientAmountTouched && recipientAmountError ? '' : 'MYR 90.00'} placeholderTextColor={recipientAmountTouched && recipientAmountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />

                                    </View>

                                    {recipientCurrencyError && recipientCurrencyTouched && <Text style={styles.error}>{recipientCurrencyTouched}</Text>}

                                    {recipientAmountTouched && recipientAmountError && <Text style={styles.error}>{recipientAmountError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Recipient Name</Text>
                                        <TextInput value={recipientName} onChangeText={FormikProps.handleChange('recipientName')} onBlur={FormikProps.handleBlur('recipientName')} style={{ borderWidth: 1, borderColor: recipientNameTouched && recipientNameError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={recipientNameTouched && recipientNameError ? '' : 'Siti Aminah binti Wahid'} placeholderTextColor={recipientNameTouched && recipientNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>

                                    {recipientNameTouched && recipientNameError && <Text style={styles.error}>{recipientNameError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Recipient Phone Number</Text>
                                        <TextInput value={recipientPhoneNumber} onChangeText={FormikProps.handleChange('recipientPhoneNumber')} onBlur={FormikProps.handleBlur('recipientPhoneNumber')} style={{ textAlignVertical: 'top', borderWidth: 1, borderColor: recipientPhoneNumberTouched && recipientPhoneNumberError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={recipientPhoneNumberTouched && recipientPhoneNumberError ? '' : '0180980971'} placeholderTextColor={recipientPhoneNumberTouched && recipientPhoneNumberError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                    </View>

                                    {recipientPhoneNumberTouched && recipientPhoneNumberError && <Text style={styles.error}>{recipientPhoneNumberError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Allowance Amount</Text>
                                        <TextInput value={recipientEmail} onChangeText={FormikProps.handleChange('recipientEmail')} onBlur={FormikProps.handleBlur('recipientEmail')} style={{ textAlignVertical: 'top', borderWidth: 1, borderColor: recipientEmailTouched && recipientEmailError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={recipientEmailTouched && recipientEmailError ? '' : 'address@email.com'} placeholderTextColor={recipientEmailTouched && recipientEmailError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>

                                    {recipientEmailTouched && recipientEmailError && <Text style={styles.error}>{recipientEmailError}</Text>}

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

RemittanceScreen.navigationOptions = {
    header: null,
};


export default RemittanceScreen;