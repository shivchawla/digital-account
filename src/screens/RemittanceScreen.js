import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, KeyboardAvoidingView, TextInput, ScrollView, Picker, Modal, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'
import Constants from 'expo-constants';

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
        .min(3)
        .label('Name'),

    recipientPhoneNumber: Yup
        .string()
        .required()
        .min(10)
        .label('Phone Number'),

    recipientEmail: Yup
        .string()
        .required()
        .email()
        .label('Email Address'),

});

const RemittanceScreen = (props) => {
    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false

    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }

    return (

        <Formik onSubmit={async values => {
            props.navigation.navigate("RemittanceSuccess")
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

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }} keyboardVerticalOffset={20} >
                        <Modal animationType={'slide'}
                            visible={iosPickerVisible} onRequestClose={() => console.log(`onRequestClose`)}
                        >
                            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                                <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <TouchableOpacity onPress={() => setIosPickerVisible(!iosPickerVisible)} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                            <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.title]}>Select</Text>
                                    </View>
                                    <View style={{ flex: 1 }} />
                                </View>
                                <View style={{ flex: 9, justifyContent: 'flex-start' }}>
                                    <Picker style={{ flex: 1, height: 35, borderColor: '#055E7C', borderWidth: 1 }} selectedValue={modalContent==='recipientCurrency'?recipientCurrency:senderCurrency} onValueChange={(itemValue, itemIndex) => {
                                        modalContent==='recipientCurrency'?FormikProps.setFieldValue('recipientCurrency', itemValue):FormikProps.setFieldValue('senderCurrency', itemValue)}}>
                                        <Picker.Item label={'Please Select'} value={undefined} />
                                        <Picker.Item label="Malaysian Ringgit (MYR)" value="myr" />
                                        <Picker.Item label="Indonesian Rupiah (IDR)" value="idr" />
                                    </Picker>
                                </View>
                            </View>
                        </Modal>
                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4', marginBottom: 25 }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.title, { color: '#055E7C' }]}>Remittance Details</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                                </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 9 }}>
                                <ScrollView style={styles.screenMargin}>
                                    <View style={[styles.formElement, { alignSelf: 'stretch' }]}>
                                        <Text style={[styles.titleBox], { marginBottom: 10 }}>From</Text>
                                        {ios ?
                                            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)',marginBottom:5 }}>
                                                 <TouchableOpacity style={{ justifyContent:'center',margin:5 }} onPress={() => handleIosPicker('senderCurrency')}>
                                                    <Text style={[styles.titleBox]}>{senderCurrency ? senderCurrency : `Sender Currency`}</Text>
                                                </TouchableOpacity>
                                                {senderCurrencyError && senderCurrencyTouched && <Text style={styles.error}>{senderCurrencyTouched}</Text>}
                                            </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', marginBottom: 10 }}>
                                                <Picker style={{ flex: 1, height: 35, borderColor: '#055E7C', borderWidth: 1 }} selectedValue={senderCurrency} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('senderCurrency', itemValue)}>
                                                    <Picker.Item label={'Please Select'} value={undefined} />
                                                    <Picker.Item label="Malaysian Ringgit (MYR)" value="myr" />
                                                    <Picker.Item label="Indonesian Rupiah (IDR)" value="idr" />
                                                </Picker>
                                            </View>}
                                        {senderCurrencyError && senderCurrencyTouched && <Text style={styles.error}>{senderCurrencyTouched}</Text>}
                                        <TextInput value={senderAmount} onChangeText={FormikProps.handleChange('senderAmount')} onBlur={FormikProps.handleBlur('senderAmount')} style={[styles.textInput,{ borderWidth: 1, borderColor: senderAmountTouched && senderAmountError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={senderAmountTouched && senderAmountError ? '' : 'MYR 90.00'} placeholderTextColor={senderAmountTouched && senderAmountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                        {senderAmountTouched && senderAmountError && <Text style={styles.error}>{senderAmountError}</Text>}
                                    </View>
                                    <View style={[styles.formElement, { alignSelf: 'stretch' }]}>
                                        <Text style={[styles.titleBox], { marginBottom: 10 }}>To</Text>
                                        {ios ?
                                            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)',marginBottom:5 }}>
                                                <TouchableOpacity style={{ justifyContent:'center',margin:5 }} onPress={() => handleIosPicker('recipientCurrency')}>
                                                    <Text style={[styles.titleBox]}>{recipientCurrency ? recipientCurrency : `Recipient Currency`}</Text>
                                                </TouchableOpacity>
                                                {recipientCurrencyError && recipientCurrencyTouched && <Text style={styles.error}>{recipientCurrencyTouched}</Text>}
                                            </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', marginBottom: 10 }}>
                                                <Picker style={{ flex: 1, height: 35, borderColor: '#055E7C', borderWidth: 1 }} selectedValue={recipientCurrency} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('recipientCurrency', itemValue)}>
                                                    <Picker.Item label={'Please Select'} value={undefined} />
                                                    <Picker.Item label="Malaysian Ringgit (MYR)" value="myr" />
                                                    <Picker.Item label="Indonesian Rupiah (IDR)" value="idr" />
                                                </Picker>
                                            </View>}
                                        {recipientCurrencyError && recipientCurrencyTouched && <Text style={styles.error}>{recipientCurrencyTouched}</Text>}
                                        <TextInput value={recipientAmount} onChangeText={FormikProps.handleChange('recipientAmount')} onBlur={FormikProps.handleBlur('recipientAmount')} style={[styles.textInput,{ borderWidth: 1, borderColor: recipientAmountTouched && recipientAmountError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={recipientAmountTouched && recipientAmountError ? '' : 'MYR 90.00'} placeholderTextColor={recipientAmountTouched && recipientAmountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                        {recipientAmountTouched && recipientAmountError && <Text style={styles.error}>{recipientAmountError}</Text>}
                                    </View>
                                    <View style={styles.formElement}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Recipient Name</Text>
                                        <TextInput value={recipientName} onChangeText={FormikProps.handleChange('recipientName')} onBlur={FormikProps.handleBlur('recipientName')} style={[styles.textInput,{ borderWidth: 1, borderColor: recipientNameTouched && recipientNameError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={recipientNameTouched && recipientNameError ? '' : 'Siti Aminah binti Wahid'} placeholderTextColor={recipientNameTouched && recipientNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {recipientNameTouched && recipientNameError && <Text style={styles.error}>{recipientNameError}</Text>}
                                    </View>
                                    <View style={styles.formElement}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Recipient Phone Number</Text>
                                        <TextInput value={recipientPhoneNumber} onChangeText={FormikProps.handleChange('recipientPhoneNumber')} onBlur={FormikProps.handleBlur('recipientPhoneNumber')} style={[styles.textInput,{ textAlignVertical: 'top', borderWidth: 1, borderColor: recipientPhoneNumberTouched && recipientPhoneNumberError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={recipientPhoneNumberTouched && recipientPhoneNumberError ? '' : '0180980971'} placeholderTextColor={recipientPhoneNumberTouched && recipientPhoneNumberError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                        {recipientPhoneNumberTouched && recipientPhoneNumberError && <Text style={styles.error}>{recipientPhoneNumberError}</Text>}
                                    </View>
                                    <View style={styles.formElement}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Recipient Email</Text>
                                        <TextInput value={recipientEmail} onChangeText={FormikProps.handleChange('recipientEmail')} onBlur={FormikProps.handleBlur('recipientEmail')} style={[styles.textInput,{ textAlignVertical: 'top', borderWidth: 1, borderColor: recipientEmailTouched && recipientEmailError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={recipientEmailTouched && recipientEmailError ? '' : 'address@email.com'} placeholderTextColor={recipientEmailTouched && recipientEmailError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {recipientEmailTouched && recipientEmailError && <Text style={styles.error}>{recipientEmailError}</Text>}
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
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



export default RemittanceScreen;