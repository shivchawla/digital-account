import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, KeyboardAvoidingView, TextInput, ScrollView, Picker, Platform,Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'
import Constants from 'expo-constants';
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
        .min(3)
        .label('Name'),

    payerEmail: Yup
        .string()
        .required()
        .email()
        .label('Email Address'),

    payerPhoneNumber: Yup
        .string()
        .required()
        .min(10)
        .label('Phone Number'),

});



const ZakatScreen = (props) => {
    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false

    const handleIosPicker=(modalContent)=>{
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }

    return (
        <Formik onSubmit={async values => {
            props.navigation.navigate("ZakatSuccess")
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

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }} keyboardVerticalOffset={20}>
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
                                    {modalContent === 'typeZakat' ?
                                        <Picker style={{ flex: 1, height: 35 }} selectedValue={typeZakat} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('typeZakat', itemValue)}>
                                            <Picker.Item label={'Please Select'} value={undefined} />
                                            <Picker.Item label="Zakat Pendapatan" value="zakatPendapatan" />
                                            <Picker.Item label="Zakat Perniagaan" value="zakatPerniagaan" />
                                            <Picker.Item label="Zakat Simpanan" value="zakatSimpanan" />
                                        </Picker> : <Picker style={{ flex: 1, height: 35 }} selectedValue={payZakatTo} onValueChange={(itemValue, itemIndex) =>
                                                FormikProps.setFieldValue('payZakatTo', itemValue)}>
                                                <Picker.Item label={'Please Select'} value={undefined} />
                                                <Picker.Item label="Zakat Selangor" value="zakatSelangor" />
                                                <Picker.Item label="Zakat Perak" value="zakatPerak" />
                                                <Picker.Item label="Zakat Terengganu" value="zakatTerengganu" />
                                            </Picker>
                                    }
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
                                <Text style={[styles.title]}>Zakat Details</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                                </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={[styles.screenMargin, { flex: 9 }]}>
                                <ScrollView >
                                    <View style={[styles.formElement, { alignSelf: 'stretch' }]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10,fontSize:15 }]}>Type of Zakat</Text>
                                        {ios ?
                                            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)',justifyContent:'center' }}>
                                                <TouchableOpacity style={{ justifyContent:'center',margin:5 }} onPress={() => handleIosPicker('typeZakat')}>
                                                    <Text style={[styles.titleBox]}>{typeZakat ? typeZakat : `Select Type`}</Text>
                                                </TouchableOpacity>
                                                {typeZakatTouched && typeZakatError && <Text style={styles.error}>{typeZakatError}</Text>}
                                            </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                                <Picker style={{ flex: 1, height: 35 }} selectedValue={typeZakat} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('typeZakat', itemValue)}>
                                                    <Picker.Item label={'Please Select'} value={undefined} />
                                                    <Picker.Item label="Zakat Pendapatan" value="zakatPendapatan" />
                                                    <Picker.Item label="Zakat Perniagaan" value="zakatPerniagaan" />
                                                    <Picker.Item label="Zakat Simpanan" value="zakatSimpanan" />
                                                </Picker>
                                                {typeZakatTouched && typeZakatError && <Text style={styles.error}>{typeZakatError}</Text>}
                                            </View>}
                                    </View>
                                    <View style={[styles.formElement, { alignSelf: 'stretch' }]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10,fontSize:15 }]}>Pay Zakat To</Text>
                                        {ios ?
                                            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                                <TouchableOpacity style={{ justifyContent:'center',margin:5 }} onPress={() => handleIosPicker('payZakatTo')}>
                                                    <Text style={[styles.titleBox]}>{payZakatTo ? payZakatTo : `Zakat To`}</Text>
                                                </TouchableOpacity>
                                                {payZakatToTouched && payZakatToError && <Text style={styles.error}>{payZakatToError}</Text>}
                                            </View> :<View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <Picker style={{ flex: 1, height: 35 }} selectedValue={payZakatTo} onValueChange={(itemValue, itemIndex) =>
                                                FormikProps.setFieldValue('payZakatTo', itemValue)}>
                                                <Picker.Item label={'Please Select'} value={undefined} />
                                                <Picker.Item label="Zakat Selangor" value="zakatSelangor" />
                                                <Picker.Item label="Zakat Perak" value="zakatPerak" />
                                                <Picker.Item label="Zakat Terengganu" value="zakatTerengganu" />
                                            </Picker>
                                            {payZakatToTouched && payZakatToError && <Text style={styles.error}>{payZakatToError}</Text>}
                                        </View>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10,fontSize:15 }]}>Amount</Text>
                                        <TextInput value={amountZakat} onChangeText={FormikProps.handleChange('amountZakat')} onBlur={FormikProps.handleBlur('amountZakat')} style={{ borderWidth: 1, borderColor: amountZakatTouched && amountZakatError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={amountZakatTouched && amountZakatError ? '' : 'RM 100.00'} placeholderTextColor={amountZakatTouched && amountZakatError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                        {amountZakatTouched && amountZakatError && <Text style={styles.error}>{amountZakatError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10,fontSize:15 }]}>Payer's Name</Text>
                                        <TextInput value={payerName} onChangeText={FormikProps.handleChange('payerName')} onBlur={FormikProps.handleBlur('payerName')} style={{ textAlignVertical: 'center', borderWidth: 1, borderColor: payerNameTouched && payerNameError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={payerNameTouched && payerNameError ? '' : 'Che Abdul bin Rahim'} placeholderTextColor={payerNameTouched && payerNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {payerNameTouched && payerNameError && <Text style={styles.error}>{payerNameError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10,fontSize:15 }]}>Payer's Email</Text>
                                        <TextInput value={payerEmail} onChangeText={FormikProps.handleChange('payerEmail')} onBlur={FormikProps.handleBlur('payerEmail')} style={{ textAlignVertical: 'center', borderWidth: 1, borderColor: payerEmailTouched && payerEmailError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={payerEmailTouched && payerEmailError ? '' : 'address@email.com'} placeholderTextColor={payerEmailTouched && payerEmailError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {payerEmailTouched && payerEmailError && <Text style={styles.error}>{payerEmailError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10,fontSize:15 }]}>Payer's Phone Number</Text>
                                        <TextInput value={payerPhoneNumber} onChangeText={FormikProps.handleChange('payerPhoneNumber')} onBlur={FormikProps.handleBlur('payerPhoneNumber')} style={{ textAlignVertical: 'center', borderWidth: 1, borderColor: payerPhoneNumberTouched && payerPhoneNumberError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={payerPhoneNumberTouched && payerPhoneNumberError ? '' : '0189076510'} placeholderTextColor={payerPhoneNumberTouched && payerPhoneNumberError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                        {payerPhoneNumberTouched && payerPhoneNumberError && <Text style={styles.error}>{payerPhoneNumberError}</Text>}
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>

                                    <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>

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

ZakatScreen.navigationOptions = {
    header: null,
};

export default ZakatScreen;