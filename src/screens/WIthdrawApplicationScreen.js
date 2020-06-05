import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, TextInput, KeyboardAvoidingView, ScrollView, Picker, Modal, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';
import CodePin from 'react-native-pin-code'
import Layout from '../constants/Layout';

import ScanFinger from '../components/ScanFinger'
import { checkCodeApi } from '../store/actions/common';

import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import LayoutA from '../Layout/LayoutA';
import { CustomFormAction, CustomTextInput } from '../components/Custom'

const WIthdrawApplicationScreen = (props) => {

    const unlock = () => {
        setLock(false)
        setAuthRequestVisible(false)
    }

    const checkCode = async (code) => {
        // console.log(`periksa code`);
        // const result=await checkCodeApi(code);
        // console.log(`result ialah ${JSON.stringify(result)}`);
        // return result;
        //dispatch(actionCreator.checkPIN(code))
        //
        return code === '1234'
    }

    const [bankLabelActive, setbankLabelActive] = useState(false)
    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [locked, setLock] = useState(true)
    const [code, updateCode] = useState("")
    const [authRequestVisible, setAuthRequestVisible] = useState(false)
    const { authEnabled, authType } = useSelector(state => state.authReducer, shallowEqual)

    useEffect(() => {
        const open = () => { console.log(`dibuka`); setOffSet(false) }
        const off = () => { console.log(`ditutup`); setOffSet(true) }
        console.log("componentDidMount");
        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates

    useEffect(() => {
        dispatch(actionCreator.checkAuth())
    }, [])

    const [offSet, setOffSet] = useState(true)

    const ios = Platform.OS === "ios" ? true : false

    const withDraw = (values) => {
        const newValues = { ...values, ...values.bankDetail }
        const { bankDetail, ...cleanValue } = newValues
        console.log(`values ialah : ${JSON.stringify(cleanValue)}`)
        dispatch(actionCreator.withDraw(cleanValue))
        props.navigation.navigate('WithdrawSuccess')
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionCreator.bankList())
    }, [bankList])

    const { balance, currency } = useSelector(state => state.myAccountReducer, shallowEqual)

    const { bankList } = useSelector(state => state.bankListReducer, shallowEqual)
    const [selectedBank, setSelectedBank] = useState(null)
    const bankExists = bankList ? true : false
    const selectedBankDetail = selectedBank ? bankList.find(b => b.bankLabel === selectedBank) : null

    const validationSchema = Yup.object().shape({

        bankLabel: Yup
            .string()
            .required()
            .label('Bank Account No'),


        amount: Yup
            .number()
            .min(1000)
            .max(balance)
            .required()
            .label('Amount'),

        remark: Yup
            .string()
            .required()
            .min(3)
            .label('Remark'),

    });

    return (
        <Formik onSubmit={(values, actions) => {
            withDraw(values)
            actions.resetForm({})
        }}
            onSubmit={(values, actions) => {
                if (authEnabled && locked) {
                    setAuthRequestVisible(true)
                } else {
                    withDraw(values)
                    actions.resetForm({})
                }
            }}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                const { bankLabel, amount, remark, bankDetail } = FormikProps.values
                const bankLabelError = FormikProps.errors.bankLabel
                const bankLabelTouched = FormikProps.touched.bankLabel
                const amountError = FormikProps.errors.amount
                const amountTouched = FormikProps.touched.amount
                const remarkError = FormikProps.errors.remark
                const remarkTouched = FormikProps.touched.remark

                const populateBankInfo = (itemValue) => {
                    setSelectedBank(itemValue)
                    const bankDetail = bankList.find(b => b.account_holder_name === itemValue)
                    FormikProps.setFieldValue('bankDetail', bankDetail)
                }

                return (
                    <>
                    <Modal transparent={true} animationType={'slide'} visible={authRequestVisible} onRequestClose={() => setAuthRequestVisible(!authRequestVisible)} >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(1,1,1,0.5)' }}>
                            <View style={{ flex: 3 }} />
                            <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                                {(authType === 'passcode') ? <CodePin
                                    //code="2018" // code.length is used if you not pass number prop
                                    checkPinCode={(code, check) => check(checkCode(code))}
                                    success={() => unlock()} // If user fill '2018', success is called
                                    text="Please Enter PIN" // My title
                                    error="Try again" // If user fail (fill '2017' for instance)
                                    autoFocusFirst={true} // disabling auto-focus
                                    keyboardType={'numeric'}
                                    containerStyle={{ width: Layout.window.width, height: Layout.window.height / 4 }}
                                /> : <ScanFinger unlock={unlock} />}
                            </View>
                        </View>
                    </Modal>

                        <Modal animationType={'slide'} visible={iosPickerVisible} presentationStyle={'pageSheet'} onRequestClose={() => console.log('modal closed')}                      >
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
                                    {bankList && <Picker style={{ flex: 1, height: 35 }} selectedValue={bankLabel} onValueChange={(itemValue, itemIndex) => {
                                        FormikProps.setFieldValue('bankLabel', itemValue);
                                        setSelectedBank(itemValue)
                                        populateBankInfo(itemValue)
                                    }
                                    }>
                                        <Picker.Item label={'Please Select'} value={undefined} />
                                        {bankList && bankList.map((b, i) => <Picker.Item key={i} label={b.bank_name} value={b.bank_name} />)}
                                    </Picker>}
                                </View>
                            </View>
                        </Modal>
                        <LayoutA
                            title={'WITHDRAWAL'}
                            screenType='form'
                            navigation={props.navigation}
                            nopadding
                        >
                            <View style={[{ flex: 9 }]}>
                                <ScrollView style={{ padding: 10 }}>
                                    {ios ? <View style={[styles.formElement, { marginTop: 20 }]}>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 10 }}>
                                            <Text style={[styles.titleBox, { marginRight: 5 }]}>Bank</Text>
                                            <TouchableWithoutFeedback onPress={() => props.navigation.navigate(`BankList`)} style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                <Text style={[styles.small, { color: '#0A6496', textAlignVertical: 'bottom' }]}>Manage</Text>
                                            </TouchableWithoutFeedback></View>

                                        {(bankExists && bankList) ?
                                            <View>
                                                <TouchableOpacity onPress={() => setIosPickerVisible(!iosPickerVisible)} style={{ flexDirection: 'row', alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5, justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Text style={[styles.text]}>{bankLabel ? bankLabel : `Select Bank`} </Text>
                                                    <Ionicons name="ios-arrow-down" style={{ fontSize: 12, }} />
                                                </TouchableOpacity>

                                            </View> : <TouchableWithoutFeedback onPress={() => props.navigation.navigate(`BankList`)}>
                                                <Text style={[styles.small, { color: '#0A6496' }]}>Click Here to Add Bank</Text>
                                            </TouchableWithoutFeedback>}
                                        {bankLabelTouched && bankLabelError && <Text style={styles.error}>{bankLabelError}</Text>}
                                    </View> : <View style={[styles.formElement, { marginTop: 20 }]}>
                                            <Text style={[styles.titleBox, { marginBottom: 10 }]}>Bank</Text>
                                            {(bankExists && bankList) ?
                                                <View>
                                                    <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                                        <Picker style={{ flex: 1, height: 35 }} selectedValue={bankLabel} onValueChange={(itemValue, itemIndex) => {
                                                            FormikProps.setFieldValue('bankLabel', itemValue);
                                                            populateBankInfo(itemValue)

                                                        }
                                                        }>
                                                            <Picker.Item label={'Please Select'} value={undefined} />
                                                            {bankList && bankList.map((b, i) => <Picker.Item key={i} label={b.account_holder_name} value={b.account_holder_name} />)}
                                                        </Picker>
                                                    </View>
                                                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate(`BankList`)}>
                                                        <Text style={[styles.small, { color: '#0A6496', margin: 10 }]}>Manage Bank</Text>
                                                    </TouchableWithoutFeedback>
                                                </View> : <TouchableWithoutFeedback onPress={() => props.navigation.navigate(`BankList`)}>
                                                    <Text style={[styles.small, { color: '#0A6496' }]}>Click Here to Add Bank</Text>
                                                </TouchableWithoutFeedback>}
                                            {bankLabelTouched && bankLabelError && <Text style={styles.error}>{bankLabelError}</Text>}
                                        </View>
                                    }
                                    {selectedBankDetail && <View>
                                        <View style={[styles.formElement]}>
                                            <Text style={[styles.titleBox, { marginBottom: 10 }]}>Bank Name</Text>
                                            <Text style={[styles.text]}>{selectedBankDetail.bankAccountName}</Text>
                                        </View>
                                        <View style={[styles.formElement]}>
                                            <Text style={[styles.titleBox, { marginBottom: 10 }]}>Account No</Text>
                                            <Text style={[styles.text]}>{selectedBankDetail.bankAccountNo}</Text>
                                        </View>
                                        <View style={[styles.formElement]}>
                                            <Text style={[styles.titleBox, { marginBottom: 10 }]}>Bank Address</Text>
                                            <Text style={[styles.text]}>{selectedBankDetail.bankAddress}</Text>
                                        </View>
                                        <View style={[styles.formElement]}>
                                            <Text style={[styles.titleBox, { marginBottom: 10 }]}>Bank Country</Text>
                                            <Text style={[styles.text]}>{selectedBankDetail.bankCountry}</Text>
                                        </View>
                                    </View>}
                                    {/* {selectedBankDetail && FormikProps.setFieldValue('test', {bankAccountName:selectedBankDetail.bankAccountName,bankAddress:selectedBankDetail.bankAddress,bankCountry:selectedBankDetail.bankCountry})
                                     
                                    }  */}
                                    <CustomTextInput
                                        label={`Amount(${currency})`}
                                        value={amount}
                                        handleChange={FormikProps.handleChange(`amount`)}
                                        handleBlur={FormikProps.handleBlur('amount')}
                                        touched={amountTouched}
                                        error={amountError}
                                        keyboardType={'decimal-pad'}
                                        placeholder={'Eg: 890.00'}

                                    />
                                    <CustomTextInput
                                        label={`Remark`}
                                        value={remark}
                                        handleChange={FormikProps.handleChange(`remark`)}
                                        handleBlur={FormikProps.handleBlur('remark')}
                                        touched={remarkTouched}
                                        error={remarkError}
                                        placeholder={'Eg: For reference'}

                                    />
                                </ScrollView>
                            </View>
                            <CustomFormAction
                                navigation={props.navigation}
                                isValid={FormikProps.isValid}
                                handleSubmit={FormikProps.handleSubmit}
                                authEnabled={authEnabled}
                                locked={locked}
                            />
                        </LayoutA>
                    </>)
            }}
        </Formik >
    );
}


export default WIthdrawApplicationScreen;