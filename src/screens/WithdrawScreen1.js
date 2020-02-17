import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Text,
    Image,
    ActivityIndicator,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Picker,
    Modal,
    Platform
} from 'react-native';

import * as actionCreator from '../store/actions/action'


import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    bankLabel: Yup
        .string()
        .required()
        .label('Bank Account No'),
    bankAccountName: Yup
        .string()
        .required()
        .label('Bank Account Name'),
    bankAddress: Yup
        .string()
        .required()
        .label('Bank Address'),
    bankCountry: Yup
        .string()
        .required()
        .label('Bank Country'),
    amount: Yup
       
        .number()
        .positive()
        .required()
        .label('Amount'),
    remark: Yup
        .string()
        .required()
        .label('Remark'),

});

const WithdrawScreen = (props) => {

    const [bankLabelActive, setbankLabelActive] = useState(false)
    const [iosPickerVisible, setIosPickerVisible] = useState(false)

    const ios = Platform.OS === "ios" ? true : false

    // const dispatch = useDispatch()

    const withDraw = (values) => {
        // dispatch(actionCreator.withDraw(values))
        props.navigation.navigate('WithdrawSuccess')
    }


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionCreator.bankList())

    }, [bankList])

    const { bankList } = useSelector(state => state.bankListReducer, shallowEqual)
    const [selectedBank, setSelectedBank] = useState(null)
    const bankExists = bankList ? true : false

    const selectedBankDetail = selectedBank ? bankList.find(b => b.bankLabel === selectedBank) : null

    return (
        <Formik
            onSubmit={values => withDraw(values)}
            validationSchema={validationSchema}
        >

            {FormikProps => {
                const { bankLabel, amount, remark } = FormikProps.values
                const bankLabelError = FormikProps.errors.bankLabel
                const bankLabelTouched = FormikProps.touched.bankLabel
                const amountError = FormikProps.errors.amount
                const amountTouched = FormikProps.touched.amount
                const remarkError = FormikProps.errors.remark
                const remarkTouched = FormikProps.touched.remark

                return (
                    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20} enabled style={{ flex: 1, }}>
                        <Modal animationType={'slide'}
                            visible={iosPickerVisible}
                            presentationStyle={'pageSheet'}
                            onRequestClose={() => console.log('modal closed')}
                        >
                            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', paddingTop: 30 }}>
                                <Picker
                                    style={{ flex: 1, height: 35 }}
                                    selectedValue={bankLabel}
                                    onValueChange={(itemValue, itemIndex) => {
                                        FormikProps.setFieldValue('bankLabel', itemValue);
                                        setSelectedBank(itemValue)
                                    }
                                    }>
                                    <Picker.Item label={'Please Select'} value={undefined} />
                                    {bankList && bankList.map((b, i) => <Picker.Item key={i} label={b.bankLabel} value={b.bankLabel} />)}
                                </Picker>
                                <TouchableOpacity onPress={() => setIosPickerVisible(!iosPickerVisible)}><Text>Close Modal</Text></TouchableOpacity>
                            </View>
                        </Modal>
                        <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title, { color: '#055E7C' }]}>Withdrawal</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <View style={{ backgroundColor:'rgba(62,194,217,0.5)',borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
          </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={[{ flex: 9 }]}>
                                <ScrollView style={[styles.screenMargin]}>


                                    {ios ? <View style={[styles.formElement, { marginTop: 20 }]}>
                                        <Text style={[styles.titleBox, { marginBottom: 5 }]}>Bank</Text>
                                        {(bankExists && bankList) ?
                                            <View>

                                                <TouchableOpacity onPress={() => setIosPickerVisible(!iosPickerVisible)} style={{ marginTop: 5 }}>
                                                    <Text style={[styles.small, { color: '#0A6496' }]}>Select Bank</Text>
                                                    </TouchableOpacity>

                                                <TouchableWithoutFeedback onPress={() => props.navigation.navigate(`BankList`)} style={{ marginTop: 5 }}>
                                                    <Text style={[styles.small, { color: '#0A6496' }]}>Manage Bank</Text>
                                                </TouchableWithoutFeedback>
                                            </View> : <TouchableWithoutFeedback onPress={() => props.navigation.navigate(`BankList`)}>
                                                <Text style={[styles.small, { color: '#0A6496' }]}>Click Here to Add Bank</Text>
                                            </TouchableWithoutFeedback>}
                                        {bankLabelTouched && bankLabelError && <Text style={styles.error}>{bankLabelError}</Text>}
                                    </View>
                                        :
                                        <View style={[styles.formElement, { marginTop: 20 }]}>
                                            <Text style={[styles.titleBox, { marginBottom: 5 }]}>Bank</Text>
                                            {(bankExists && bankList) ?
                                                <View>
                                                    <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                                        <Picker
                                                            style={{ flex: 1, height: 35 }}
                                                            selectedValue={bankLabel}
                                                            onValueChange={(itemValue, itemIndex) => {
                                                                FormikProps.setFieldValue('bankLabel', itemValue);
                                                                setSelectedBank(itemValue)
                                                            }
                                                            }>
                                                            <Picker.Item label={'Please Select'} value={undefined} />
                                                            {bankList && bankList.map((b, i) => <Picker.Item key={i} label={b.bankLabel} value={b.bankLabel} />)}
                                                        </Picker>
                                                    </View>
                                                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate(`BankList`)}>
                                                        <Text style={[styles.small, { color: '#0A6496' }]}>Manage Bank</Text>
                                                    </TouchableWithoutFeedback>
                                                </View> : <TouchableWithoutFeedback onPress={() => props.navigation.navigate(`BankList`)}>
                                                    <Text style={[styles.small, { color: '#0A6496' }]}>Click Here to Add Bank</Text>
                                                </TouchableWithoutFeedback>}
                                            {bankLabelTouched && bankLabelError && <Text style={styles.error}>{bankLabelError}</Text>}
                                        </View>
                                    }
                                    {selectedBankDetail &&
                                        <View>
                                            <View style={[styles.formElement]}>
                                                <Text style={[styles.titleBox, { marginBottom: 5 }]}>Bank Name</Text>
                                                <Text style={[styles.text]}>{selectedBankDetail.bankAccountName}</Text>
                                            </View>
                                            <View style={[styles.formElement]}>
                                                <Text style={[styles.titleBox, { marginBottom: 5 }]}>Account No</Text>
                                                <Text style={[styles.text]}>{selectedBankDetail.bankAccountNo}</Text>
                                            </View>
                                            <View style={[styles.formElement]}>
                                                <Text style={[styles.titleBox, { marginBottom: 5 }]}>Bank Address</Text>
                                                <Text style={[styles.text]}>{selectedBankDetail.bankAddress}</Text>
                                            </View>
                                            <View style={[styles.formElement]}>
                                                <Text style={[styles.titleBox, { marginBottom: 5 }]}>Bank Country</Text>
                                                <Text style={[styles.text]}>{selectedBankDetail.bankCountry}</Text>
                                            </View>
                                        </View>}
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 5 }]}>Amount</Text>
                                        <TextInput value={amount} onChangeText={FormikProps.handleChange('amount')} onBlur={FormikProps.handleBlur('amount')} style={{ borderWidth: 1, borderColor: amountTouched && amountError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={amountTouched && amountError ? '' : 'Eg: RM890.00'} placeholderTextColor={amountTouched && amountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                        {amountTouched && amountError && <Text style={styles.error}>{amountError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 5 }]}>Remark</Text>
                                        <TextInput value={remark} onChangeText={FormikProps.handleChange('remark')} onBlur={FormikProps.handleBlur('remark')} style={{ borderWidth: 1, borderColor: remarkTouched && remarkError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={remarkTouched && remarkError ? '' : 'Eg: For reference'} placeholderTextColor={remarkTouched && remarkError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {remarkTouched && remarkError && <Text style={styles.error}>{remarkError}</Text>}
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
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
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}

WithdrawScreen.navigationOptions = {
    header: null,
};

export default WithdrawScreen;
