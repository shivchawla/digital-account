import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, KeyboardAvoidingView, TextInput, ScrollView, DatePickerAndroid, Picker, DatePickerIOS, Modal, Platform } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'
import Constants from 'expo-constants';

const validationSchema = Yup.object().shape({

    // invoiceType: Yup
    //     .string()
    //     .required()
    //     .label('invoiceType'),

    // customer: Yup
    //     .string()
    //     .required()
    //     .label('Customer'),

    // invoiceDate: Yup
    //     .string()
    //     .required()
    //     .label('Issue Date'),

    // dueDate: Yup
    //     .string()
    //     .required()
    //     .label('Due Date'),

    // invoiceNumber: Yup
    //     .string()
    //     .required()
    //     .label('Invoice Number'),

    // amount: Yup
    //     .string()
    //     .required()
    //     .label('Amount'),

    // category: Yup
    //     .string()
    //     .required()
    //     .label('Category'),

    // entityName: Yup
    //     .string()
    //     .required()
    //     .label('Customer Name'),

    // entityEmail: Yup
    //     .string()
    //     .email()
    //     .required()
    //     .label('Customer Email'),

    // entityPhone: Yup
    //     .string()
    //     .required()
    //     .label('Customer Phone'),

    // entityAddress: Yup
    //     .string()
    //     .required()
    //     .label('Customer Address'),

});

const NewInvoiceScreen = (props) => {
    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState('')
    const ios = Platform.OS === "ios" ? true : false
    const [tarikh, setTarikh] = useState(new Date())

    const dispatch = useDispatch()
    const setInvoiceData = (val) => dispatch({ type: 'SET_INVOICE_APPLICATION', payload: { newInvoice: val } });
    const invoiceData = useSelector(state => state.invoiceReducer, shallowEqual)
    const { customerList } = useSelector(state => state.customerReducer, shallowEqual)

    //const test={'animal[0]':'kucing',food:'catfood'}
    //const 'test[0]'='test'

    useEffect(() => { dispatch(actionCreator.getCustomerList()) }, [])

    return (

        <Formik onSubmit={values => {
            console.log(` ini formik ${JSON.stringify(values)}`)
            setInvoiceData(values)
            //console.log(` ini reducer ${JSON.stringify(values)}`)
            //dispatch(actionCreator.submitNewInvoice())
            props.navigation.navigate("NewInvoiceItems")

        }}
        initialValues={{currency:'MYR'}}

        //validationSchema={validationSchema}
        >
            {FormikProps => {

                const handleIosPicker = (content) => {
                    setModalContent(content)
                    setIosPickerVisible(!iosPickerVisible)
                }

                const handleDateChange = async (newDate, whichDate) => {
                    await setTarikh(newDate)
                    FormikProps.setFieldValue((whichDate == "datepicker") ? 'invoiceDate' : 'dueDate', tarikh.toString())
                }

                const datePicker = async () => {
                    if (ios) {
                        handleIosPicker('datepicker')
                    } else {
                        try {
                            const { action, year, month, day } = await DatePickerAndroid.open({
                                // Use `new Date()` for current date.
                                // May 25 2020. Month 0 is January.
                                date: new Date(2020, 4, 25),
                            });
                            if (action !== DatePickerAndroid.dismissedAction) {
                                // Selected year, month (0-11), day
                                FormikProps.setFieldValue('invoiceDate', `${year}-${month}-${day}`)
                            }
                        } catch ({ code, message }) {
                            console.warn('Cannot open date picker', message);
                        }
                    }

                }

                const datePicker2 = async () => {
                    if (ios) {
                        handleIosPicker('datepicker2')
                    } else {
                        try {
                            const { action, year, month, day } = await DatePickerAndroid.open({
                                date: new Date(2020, 4, 25),
                            });
                            if (action !== DatePickerAndroid.dismissedAction) {
                                FormikProps.setFieldValue('dueDate', `${year}-${month}-${day}`)
                            }
                        } catch ({ code, message }) {
                            console.warn('Cannot open date picker', message);
                        }
                    }
                }

                const { invoiceType, currency, invoiceDate, dueDate, invoiceNumber, amount, category, entityId, entityName, entityEmail, entityPhone, entityAddress } = FormikProps.values

                const invoiceTypeError = FormikProps.errors.invoiceType
                const invoiceTypeTouched = FormikProps.touched.invoiceType

                const currencyError = FormikProps.errors.currency
                const currencyTouched = FormikProps.touched.currency

                const invoiceDateError = FormikProps.errors.invoiceDate
                const invoiceDateTouched = FormikProps.touched.invoiceDate

                const dueDateError = FormikProps.errors.dueDate
                const dueDateTouched = FormikProps.touched.dueDate

                const invoiceNumberError = FormikProps.errors.invoiceNumber
                const invoiceNumberTouched = FormikProps.touched.invoiceNumber

                const amountError = FormikProps.errors.amount
                const amountTouched = FormikProps.touched.amount

                const categoryError = FormikProps.errors.category
                const categoryTouched = FormikProps.touched.category

                const entityIdError = FormikProps.errors.entityId
                const entityIdTouched = FormikProps.touched.entityId

                const entityNameError = FormikProps.errors.entityName
                const entityNameTouched = FormikProps.touched.entityName

                const entityEmailError = FormikProps.errors.entityEmail
                const entityEmailTouched = FormikProps.touched.entityEmail

                const entityPhoneError = FormikProps.errors.entityPhone
                const entityPhoneTouched = FormikProps.touched.entityPhone

                const entityAddressError = FormikProps.errors.entityAddress
                const entityAddressTouched = FormikProps.touched.entityAddress


                /////////////////////



                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>
                        <Modal animationinvoiceType={'slide'}
                            visible={iosPickerVisible} onRequestClose={() => FormikProps.setFieldValue('dueDate', tarikh.toString())}
                        >
                            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                                <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4', marginBottom: 25 }]}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                        <TouchableOpacity onPress={() => setIosPickerVisible(!iosPickerVisible)} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                            <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.title, { color: '#055E7C' }]}>Select</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 9, justifyContent: 'flex-start' }}>
                                    {(modalContent === "invoiceType") ?
                                        <Picker selectedValue={invoiceType} style={{ flex: 1, height: 35 }} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('invoiceType', itemValue)}>
                                            <Picker.Item label="Merchant" value="Merchant" />
                                            <Picker.Item label="Customer" value="Customer" />
                                        </Picker> : <DatePickerIOS date={tarikh} onDateChange={(newDate) => handleDateChange(newDate, modalContent)} />}
                                </View>
                            </View>
                        </Modal>
                        <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title]}>NEW INVOICE</Text>
                            </View>
                            <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 9 }}>
                                <ScrollView style={[styles.screenMargin]}>
                                    {ios ? <View style={[styles.formElement, { alignSelf: 'stretch' }]}>
                                        <Text style={[styles.titleBox], { marginTop: 20 }}>Invoice Type</Text>
                                        <TouchableOpacity onPress={() => handleIosPicker('invoiceType')}>
                                            <Text style={[styles.small, { color: '#0A6496' }]}>{invoiceType ? invoiceType : 'Select invoiceType'}</Text>
                                        </TouchableOpacity>
                                    </View> : <View style={[styles.formElement, { alignSelf: 'stretch' }]}>
                                            <Text style={[styles.titleBox], { marginBottom: 10 }}>Invoice Type</Text>
                                            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                                <Picker selectedValue={invoiceType} style={{ flex: 1, height: 35 }} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('invoiceType', itemValue)}>
                                                    <Picker.Item label="To Customer" value={1} />
                                                    <Picker.Item label="From Vendor" value={2} />
                                                </Picker>
                                                {invoiceTypeTouched && invoiceTypeError && <Text style={styles.error}>{invoiceTypeError}</Text>}
                                            </View>
                                        </View>}

                                    <View style={[styles.formElement, { alignSelf: 'stretch' }]}>
                                        <Text style={[styles.titleBox], { marginBottom: 10 }}>Entity</Text>
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            {customerList && <Picker selectedValue={entityId} style={{ flex: 1, height: 35 }} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('entityId', itemValue)}>
                                                {customerList && customerList.map(c => <Picker.Item label={c.email} value={c.id} key={c.id} />)}


                                            </Picker>}
                                            {entityIdTouched && invoiceTypeError && <Text style={styles.error}>{entityIdError}</Text>}
                                        </View>
                                    </View>

                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Currency</Text>
                                        <TextInput  editable={false}  value={currency} onChangeText={FormikProps.handleChange('currency')} onBlur={FormikProps.handleBlur('currency')} style={{ borderWidth: 1, borderColor: currencyTouched && currencyError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={currencyTouched && currencyError ? '' : ''} placeholderTextColor={currencyTouched && currencyError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {currencyTouched && currencyError && <Text style={styles.error}>{currencyError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Issue Date</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={datePicker}>
                                                <Image source={require('../assets/images/calendar.png')} style={{ width: 30, height: 30, marginRight: 10 }} resizeMode={'contain'} />
                                            </TouchableOpacity>
                                            <TextInput style={{ flex: 1, borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }} value={invoiceDate} />
                                        </View>
                                        {invoiceDateTouched && invoiceDateError && <Text style={styles.error}>{invoiceDateError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Due Date</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={datePicker2}>
                                                <Image source={require('../assets/images/calendar.png')} style={{ width: 30, height: 30, marginRight: 10 }} resizeMode={'contain'} />
                                            </TouchableOpacity>
                                            <TextInput style={{ flex: 1, borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }} value={dueDate} />
                                        </View>
                                        {dueDateTouched && dueDateError && <Text style={styles.error}>{dueDateError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Invoice Number</Text>
                                        <TextInput value={invoiceNumber} onChangeText={FormikProps.handleChange('invoiceNumber')} onBlur={FormikProps.handleBlur('invoiceNumber')} style={{ borderWidth: 1, borderColor: invoiceNumberTouched && invoiceNumberError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={invoiceNumberTouched && invoiceNumberError ? '' : ''} placeholderTextColor={invoiceNumberTouched && invoiceNumberError ? 'rgba(255,0,0,0.3)' : 'lightgrey'}  />
                                        {invoiceNumberTouched && invoiceNumberError && <Text style={styles.error}>{invoiceNumberError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Amount</Text>
                                        <TextInput value={amount} onChangeText={FormikProps.handleChange('amount')} onBlur={FormikProps.handleBlur('amount')} style={{ borderWidth: 1, borderColor: amountTouched && amountError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={amountTouched && amountError ? '' : ''} placeholderTextColor={amountTouched && amountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                        {amountTouched && amountError && <Text style={styles.error}>{amountError}</Text>}
                                    </View>
                                    
                                    <View style={[styles.formElement, { alignSelf: 'stretch' }]}>
                                        <Text style={[styles.titleBox], { marginBottom: 10 }}>category</Text>
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <Picker selectedValue={category} style={{ flex: 1, height: 35 }} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('category', itemValue)}>
                                                <Picker.Item label={'Deposit'} value={2} />
                                                <Picker.Item label={'Sales'} value={3} />
                                                <Picker.Item label={'Income'} value={4} />


                                            </Picker>
                                            {categoryTouched && categoryError && <Text style={styles.error}>{categoryError}</Text>}
                                        </View>
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Customer Name</Text>
                                        <TextInput value={entityName} onChangeText={FormikProps.handleChange('entityName')} onBlur={FormikProps.handleBlur('entityName')} style={{ borderWidth: 1, borderColor: entityNameTouched && entityNameError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={entityNameTouched && entityNameError ? '' : ''} placeholderTextColor={entityNameTouched && entityNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {entityNameTouched && entityNameError && <Text style={styles.error}>{entityNameError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Customer Email</Text>
                                        <TextInput value={entityEmail} onChangeText={FormikProps.handleChange('entityEmail')} onBlur={FormikProps.handleBlur('entityEmail')} style={{ borderWidth: 1, borderColor: entityEmailTouched && entityEmailError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={entityEmailTouched && entityEmailError ? '' : ''} placeholderTextColor={entityEmailTouched && entityEmailError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {entityEmailTouched && entityEmailError && <Text style={styles.error}>{entityEmailError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Customer Phone</Text>
                                        <TextInput value={entityPhone} onChangeText={FormikProps.handleChange('entityPhone')} onBlur={FormikProps.handleBlur('entityPhone')} style={{ borderWidth: 1, borderColor: entityPhoneTouched && entityPhoneError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={entityPhoneTouched && entityPhoneError ? '' : ''} placeholderTextColor={entityPhoneTouched && entityPhoneError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                        {entityPhoneTouched && entityPhoneError && <Text style={styles.error}>{entityPhoneError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Customer Address</Text>
                                        <TextInput value={entityAddress} onChangeText={FormikProps.handleChange('entityAddress')} onBlur={FormikProps.handleBlur('entityAddress')} style={{ borderWidth: 1, borderColor: entityAddressTouched && entityAddressError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={entityAddressTouched && entityAddressError ? '' : ''} placeholderTextColor={entityAddressTouched && entityAddressError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {entityAddressTouched && entityAddressError && <Text style={styles.error}>{entityAddressError}</Text>}
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 }}>
                                    <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                    <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff' }]}>Next</Text>}
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