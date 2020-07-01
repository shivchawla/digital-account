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
import LayoutA from '../Layout/LayoutA';
import DateTimePicker from '@react-native-community/datetimepicker';

import { CustomTextInput, CustomFormAction } from '../components/Custom'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
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
    const [offSet, setOffSet] = useState(true)
    useEffect(() => {
        const open = () => setOffSet(false)
        const off = () => setOffSet(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates


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

                    <View style={{ flex: 1 }}  >
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
                        < LayoutA
                            title={'NEW INVOICE'}
                            screenType='form'
                            navigation={props.navigation}
                            nopadding
                        >
                            <View style={{ flex: 9 }}>
                                <ScrollView style={[styles.screenMargin]}>
                                    <View style={{ margin: 5 }} />
                                    {ios ? <View style={[styles.formElement, { alignSelf: 'stretch' }]}>
                                        <Text style={[styles.titleBox], { marginTop: 20 }}>Invoice Type</Text>
                                        <View style={{ marginTop: 10, alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', justifyContent: 'center' }}>
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
                                                    <TextInput editable={false} style={[styles.textInput, { flex: 1, borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} value={invoiceDate} />
                                                </View>
                                                {invoiceDateTouched && invoiceDateError && <Text style={styles.error}>{invoiceDateError}</Text>}
                                            </View>
                                            <View style={[styles.formElement]}>
                                                <Text style={[styles.titleBox, { marginBottom: 10 }]}>Due Date</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <TouchableOpacity onPress={datePicker2}>
                                                        <Image source={require('../assets/images/calendar.png')} style={{ width: 30, height: 30, marginRight: 10 }} resizeMode={'contain'} />
                                                    </TouchableOpacity>
                                                    <TextInput editable={false} style={[styles.textInput, { flex: 1, borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} value={dueDate} />
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
                                            <CustomTextInput
                                                label={invoice == 1 ? 'Customer Name' : 'Vendor Name'}
                                                value={entityName}
                                                handleChange={FormikProps.handleChange(`entityName`)}
                                                handleBlur={FormikProps.handleBlur('entityName')}
                                                touched={entityNameTouched}
                                                error={entityNameError}
                                                placeholder={'Eg:Iskandar bin Abdullah'}

                                            />
                                            <CustomTextInput
                                                label={invoice == 1 ? 'Customer Email' : 'Vendor Email'}
                                                value={entityEmail}
                                                handleChange={FormikProps.handleChange(`entityEmail`)}
                                                handleBlur={FormikProps.handleBlur('entityEmail')}
                                                touched={entityEmailTouched}
                                                error={entityEmailError}
                                                placeholder={'Eg: khalidproduction@enquiry.com'}

                                            />
                                            <CustomTextInput
                                                label={invoice == 1 ? 'Customer Phone' : 'Vendor Phone'}
                                                value={entityPhone}
                                                handleChange={FormikProps.handleChange(`entityPhone`)}
                                                handleBlur={FormikProps.handleBlur('entityPhone')}
                                                touched={entityPhoneTouched}
                                                error={entityPhoneError}
                                                placeholder={'Eg: 078967104'}
                                                keyboardType={'decimal-pad'}
                                            />
                                            <CustomTextInput
                                                label={invoice == 1 ? 'Customer Address' : 'Vendor Address'}
                                                value={entityAddress}
                                                handleChange={FormikProps.handleChange(`entityAddress`)}
                                                handleBlur={FormikProps.handleBlur('entityAddress')}
                                                touched={entityAddressTouched}
                                                error={entityAddressError}
                                                placeholder={'Eg: 67, Jalan Karisma 6, Taman Bakti, Balakong'}

                                            />
                                        </View>}
                                </ScrollView>
                            </View>
                            <CustomFormAction
                                navigation={props.navigation}
                                isValid={FormikProps.isValid}
                                handleSubmit={FormikProps.handleSubmit}
                                isSubmitting={FormikProps.isSubmitting}
                                label={`Next`}
                            />
                        </ LayoutA>
                    </View>)
            }}
        </Formik >
    );
}



export default NewInvoiceScreen;