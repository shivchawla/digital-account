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
import moment from 'moment'

const validationSchema = Yup.object().shape({

    invoiceType: Yup
        .string()
        .required()
        .label('invoiceType'),

    entityId: Yup
        .string()
        .required()
        .label('Customer'),

    invoiceDate: Yup
        .string()
        .required()
        .label('Issue Date'),

    dueDate: Yup
        .string()
        .required()
        .label('Due Date'),

    category: Yup
        .string()
        .required()
        .label('Category'),

    entityName: Yup
        .string()
        .min(3, 'Too short!')
        .required()
        .label('Customer Name'),

    entityEmail: Yup
        .string()
        .email()
        .required()
        .label('Customer Email'),

    entityPhone: Yup
        .string()
        .min(3, 'Too short!')
        .required()
        .label('Customer Phone'),

    entityAddress: Yup
        .string()
        .min(3, 'Too short!')
        .required()
        .label('Customer Address'),

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
    const { vendorList } = useSelector(state => state.vendorReducer, shallowEqual)
    const [entityPicker, setEntityPicker] = useState(null)
    const [invoice, setInvoice] = useState(null)
    const invoiceNumber = `INV${moment().format('YYMMDDhhmmssSS')}`

    useEffect(() => {
        dispatch(actionCreator.getCustomerList());
        dispatch(actionCreator.getVendorList())
    }, [])

    return (

        <Formik onSubmit={values => {
            console.log(` ini formik ${JSON.stringify(values)}`)
            setInvoiceData(values)
            props.navigation.navigate("NewInvoiceItems")

        }}
            initialValues={{ currency: 'MYR', invoiceNumber, invoiceDate: moment().format('YYYY-M-D').toString(), dueDate: moment().format('YYYY-M-D').toString(), invoiceType: undefined }}
            validationSchema={validationSchema}
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

                const { invoiceType, invoiceDate, dueDate, category, entityId, entityName, entityEmail, entityPhone, entityAddress } = FormikProps.values

                const invoiceTypeError = FormikProps.errors.invoiceType
                const invoiceTypeTouched = FormikProps.touched.invoiceType

                const invoiceDateError = FormikProps.errors.invoiceDate
                const invoiceDateTouched = FormikProps.touched.invoiceDate

                const dueDateError = FormikProps.errors.dueDate
                const dueDateTouched = FormikProps.touched.dueDate

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

                //entityId&&FormikProps.setFieldValue('entityName','kucing')

                const changeCustomerDetail = (itemValue, itemIndex) => {
                    if (itemValue != null) {
                        const { name, email, address } = entityPicker.find(c => c.id === itemValue)
                        FormikProps.setFieldValue('entityId', itemValue)
                        FormikProps.setFieldValue('entityName', name)
                        FormikProps.setFieldValue('entityEmail', email)
                        FormikProps.setFieldValue('entityAddress', address)
                    }
                }

                const changeInvoiceType = (itemValue, itemIndex) => {
                    FormikProps.setFieldValue('invoiceType', itemValue)
                    console.log(`inilah item value : ${itemValue}`)
                    console.log(`inilah customer list : ${JSON.stringify(customerList)}`)
                    console.log(`inilah vendor list : ${JSON.stringify(vendorList)}`)
                    setEntityPicker(itemValue == 1 ? customerList : vendorList)
                    setInvoice(itemValue)
                }

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }} keyboardVerticalOffset={20} >
                        <Modal animationType={'slide'}
                            visible={iosPickerVisible} onRequestClose={() => FormikProps.setFieldValue('dueDate', tarikh.toString())}
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
                                    {(modalContent === "invoiceType") ?
                                        <Picker selectedValue={invoiceType} style={{ flex: 1, height: 35 }} onValueChange={(itemValue, itemIndex) => changeInvoiceType(itemValue, itemIndex)}>
                                            <Picker.Item label="Please Select Type" value={null} />
                                            <Picker.Item label="To Customer" value={1} />
                                            <Picker.Item label="From Vendor" value={2} />
                                        </Picker> : (modalContent === "category") ?
                                            <Picker selectedValue={category} style={{ flex: 1, height: 35 }} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('category', itemValue)}>
                                                <Picker.Item label={'Please Select Category'} value={null} />
                                                <Picker.Item label={'Deposit'} value={2} />
                                                <Picker.Item label={'Sales'} value={3} />
                                                <Picker.Item label={'Others'} value={4} />
                                            </Picker> : (modalContent === "entity") ? <Picker selectedValue={entityId} style={{ flex: 1, height: 35 }} onValueChange={(itemValue, itemIndex) => changeCustomerDetail(itemValue, itemIndex)}>
                                                <Picker.Item label={'Please select'} value={null} />
                                                {entityPicker && entityPicker.map(c => <Picker.Item label={c.email} value={c.id} key={c.id} />)}
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
                                <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 9 }}>
                                <ScrollView style={[styles.screenMargin]}>
                                    <View style={{ margin: 5 }} />
                                    {ios ? <View style={[styles.formElement, { alignSelf: 'stretch' }]}>
                                        <Text style={[styles.titleBox], { marginTop: 20 }}>Invoice Type</Text>
                                        <View style={{ marginTop:10,alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', justifyContent: 'center' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('invoiceType')}>
                                                <Text style={[styles.titleBox]}>{invoiceType == 1 ? 'To Customer' : invoiceType == 2 ? 'From Vendor' : 'Select invoiceType'}</Text>
                                            </TouchableOpacity></View>
                                    </View> : <View style={[styles.formElement, { alignSelf: 'stretch' }]}>
                                            <Text style={[styles.titleBox], { marginBottom: 10 }}>Invoice Type</Text>
                                            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                                <Picker selectedValue={invoiceType} style={{ flex: 1, height: 35 }} onValueChange={(itemValue, itemIndex) => changeInvoiceType(itemValue, itemIndex)}>
                                                    <Picker.Item label="Please Select Type" value={null} />
                                                    <Picker.Item label="To Customer" value={1} />
                                                    <Picker.Item label="From Vendor" value={2} />
                                                </Picker>
                                                {invoiceTypeTouched && invoiceTypeError && <Text style={styles.error}>{invoiceTypeError}</Text>}
                                            </View>
                                        </View>}

                                    {invoice &&
                                        <View>
                                            {ios ? <View style={[styles.formElement, { alignSelf: 'stretch' }]}>
                                                <Text style={[styles.titleBox], { marginTop: 20 }}>Category</Text>
                                                <View style={{ marginTop: 10, alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', justifyContent: 'center' }}>
                                                    <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('category')}>
                                                        <Text style={[styles.titleBox]}>{category === 2 ? 'Deposit' : category === 3 ? 'Sales' : category === 2 ? 'Others' : 'Select Category'}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View> :
                                                <View style={[styles.formElement, { alignSelf: 'stretch' }]}>
                                                    <Text style={[styles.titleBox], { marginBottom: 10 }}>Category</Text>
                                                    <View style={{ marginTop: 10, alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                                        {invoice == 1 && <Picker selectedValue={category} style={{ flex: 1, height: 35 }} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('category', itemValue)}>
                                                            <Picker.Item label={'Please Select Category'} value={null} />
                                                            <Picker.Item label={'Deposit'} value={2} />
                                                            <Picker.Item label={'Sales'} value={3} />
                                                            <Picker.Item label={'Others'} value={4} />
                                                        </Picker>}
                                                        {invoice == 2 && <Picker selectedValue={category} style={{ flex: 1, height: 35 }} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('category', itemValue)}>
                                                            <Picker.Item label="Please Select Type" value={null} />
                                                            <Picker.Item label={'Others'} value={4} />
                                                        </Picker>}
                                                        {categoryTouched && categoryError && <Text style={styles.error}>{categoryError}</Text>}
                                                    </View>
                                                </View>}
                                            <View style={[styles.formElement]}>
                                                <Text style={[styles.titleBox, { marginBottom: 10 }]}>Issue Date</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <TouchableOpacity onPress={datePicker}>
                                                        <Image source={require('../assets/images/calendar.png')} style={{ width: 30, height: 30, marginRight: 10, justifyContent: 'center', alignItems: 'center' }} resizeMode={'contain'} />
                                                    </TouchableOpacity>
                                                    <TextInput editable={false} style={[styles.textInput,{ flex: 1, borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} value={invoiceDate} />
                                                </View>
                                                {invoiceDateTouched && invoiceDateError && <Text style={styles.error}>{invoiceDateError}</Text>}
                                            </View>
                                            <View style={[styles.formElement]}>
                                                <Text style={[styles.titleBox, { marginBottom: 10 }]}>Due Date</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <TouchableOpacity onPress={datePicker2}>
                                                        <Image source={require('../assets/images/calendar.png')} style={{ width: 30, height: 30, marginRight: 10 }} resizeMode={'contain'} />
                                                    </TouchableOpacity>
                                                    <TextInput editable={false} style={[styles.textInput,{ flex: 1, borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} value={dueDate} />
                                                </View>
                                                {dueDateTouched && dueDateError && <Text style={styles.error}>{dueDateError}</Text>}
                                            </View>
                                            {ios ? <View style={[styles.formElement, { alignSelf: 'stretch' }]}>
                                                <Text style={[styles.titleBox], { marginBottom: 10 }}>{invoice == 1 ? 'Customer' : 'Vendor'}</Text>

                                                <View style={{ marginTop: 10, alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', justifyContent: 'center' }}>
                                                    <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('entity')}>
                                                        <Text style={[styles.titleBox]}>{entityId ? `Change ${invoice == 1 ? 'Customer' : 'Vendor'}` : `Select ${invoice == 1 ? 'Customer' : 'Vendor'}`}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View> :
                                                <View style={[styles.formElement, { alignSelf: 'stretch' }]}>
                                                    <Text style={[styles.titleBox], { marginBottom: 10 }}>{invoice == 1 ? 'Customer' : 'Vendor'}</Text>
                                                    <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                                        {entityPicker && <Picker selectedValue={entityId} style={{ flex: 1, height: 35 }} onValueChange={(itemValue, itemIndex) => changeCustomerDetail(itemValue, itemIndex)}>
                                                            <Picker.Item label={'Please select'} value={null} />
                                                            {entityPicker && entityPicker.map(c => <Picker.Item label={c.email} value={c.id} key={c.id} />)}
                                                        </Picker>}
                                                        {entityIdTouched && entityIdError && <Text style={styles.error}>{entityIdError}</Text>}
                                                    </View>
                                                </View>}
                                            <View style={[styles.formElement]}>
                                                <Text style={[styles.titleBox, { marginBottom: 10 }]}>{invoice == 1 ? 'Customer' : 'Vendor'} Name</Text>
                                                <TextInput value={entityName} onChangeText={FormikProps.handleChange('entityName')} onBlur={FormikProps.handleBlur('entityName')} style={[styles.textInput,{ borderWidth: 1, borderColor: entityNameTouched && entityNameError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={entityNameTouched && entityNameError ? '' : 'Eg:Iskandar bin Abdullah'} placeholderTextColor={entityNameTouched && entityNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                                {entityNameTouched && entityNameError && <Text style={styles.error}>{entityNameError}</Text>}
                                            </View>
                                            <View style={[styles.formElement]}>
                                                <Text style={[styles.titleBox, { marginBottom: 10 }]}>{invoice == 1 ? 'Customer' : 'Vendor'} Email</Text>
                                                <TextInput value={entityEmail} onChangeText={FormikProps.handleChange('entityEmail')} onBlur={FormikProps.handleBlur('entityEmail')} style={[styles.textInput,{ borderWidth: 1, borderColor: entityEmailTouched && entityEmailError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={entityEmailTouched && entityEmailError ? '' : 'Eg: khalidproduction@enquiry.com'} placeholderTextColor={entityEmailTouched && entityEmailError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                                {entityEmailTouched && entityEmailError && <Text style={styles.error}>{entityEmailError}</Text>}
                                            </View>
                                            <View style={[styles.formElement]}>
                                                <Text style={[styles.titleBox, { marginBottom: 10 }]}>{invoice == 1 ? 'Customer' : 'Vendor'} Phone</Text>
                                                <TextInput value={entityPhone} onChangeText={FormikProps.handleChange('entityPhone')} onBlur={FormikProps.handleBlur('entityPhone')} style={[styles.textInput,{ borderWidth: 1, borderColor: entityPhoneTouched && entityPhoneError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={entityPhoneTouched && entityPhoneError ? '' : 'Eg: 078967104'} placeholderTextColor={entityPhoneTouched && entityPhoneError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                                {entityPhoneTouched && entityPhoneError && <Text style={styles.error}>{entityPhoneError}</Text>}
                                            </View>
                                            <View style={[styles.formElement]}>
                                                <Text style={[styles.titleBox, { marginBottom: 10 }]}>{invoice == 1 ? 'Customer' : 'Vendor'} Address</Text>
                                                <TextInput value={entityAddress} onChangeText={FormikProps.handleChange('entityAddress')} onBlur={FormikProps.handleBlur('entityAddress')} style={[styles.textInput,{ borderWidth: 1, borderColor: entityAddressTouched && entityAddressError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={entityAddressTouched && entityAddressError ? '' : 'Eg: 67, Jalan Karisma 6, Taman Bakti, Balakong'} placeholderTextColor={entityAddressTouched && entityAddressError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                                {entityAddressTouched && entityAddressError && <Text style={styles.error}>{entityAddressError}</Text>}
                                            </View>
                                        </View>}
                                </ScrollView>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>

                                    <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>

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



export default NewInvoiceScreen;