import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, KeyboardAvoidingView, TextInput, Modal, FlatList, ScrollView } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'
import moment from 'moment'
import CodePin from 'react-native-pin-code'
import Layout from '../constants/Layout';

import ScanFinger from '../components/ScanFinger'

const SampleScreen = (props) => {

    const unlock = () => {
        setLock(false)
        setAuthRequestVisible(false)
    }

    const checkCode = (code) => {
        console.log(`periksa code`)
        return code === '1234'
    }

    const transferRefNo = `TR-${moment().format('YYMMDDhhmmssSS')}`
    const dispatch = useDispatch()
    const { account_no } = useSelector(state => state.myAccountReducer, shallowEqual)
    const { userList } = useSelector(state => state.transferOutScreenReducer, shallowEqual)
    const { balance, currency } = useSelector(state => state.myAccountReducer, shallowEqual)
    const [userListView, setuserListView] = useState(false)
    const [locked, setLock] = useState(true)

    const [code, updateCode] = useState("")

    const [authRequestVisible, setAuthRequestVisible] = useState(false)

    const { authEnabled, authType } = useSelector(state => state.authReducer, shallowEqual)

    useEffect(() => {
        dispatch(actionCreator.getAllUsers())
    }, [])

    useEffect(() => {
        dispatch(actionCreator.checkAuth())
    }, [])

    const validationSchema = Yup.object().shape({

        amount: Yup
            .number()
            .min(10)
            .max(balance)
            .required(),

        recipient: Yup
            .string()
            .min(3)
            .required(),

        references_no: Yup
            .string()
            .min(4)
            .required(),

    });

    return (

        <Formik onSubmit={(values, actions) => {
            if (authEnabled && locked) {
                setAuthRequestVisible(true)

            } else {
                dispatch(actionCreator.submitNewExpense(values))
                actions.resetForm({ wallet: account_no, references_no: transferRefNo })
            }
        }}
            initialValues={{ wallet: account_no, references_no: transferRefNo }}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                const { amount, recipient, references_no, wallet } = FormikProps.values
                const amountError = FormikProps.errors.amount
                const amountTouched = FormikProps.touched.amount
                const recipientError = FormikProps.errors.recipient
                const recipientTouched = FormikProps.touched.recipient
                const references_noError = FormikProps.errors.references_no
                const references_noTouched = FormikProps.touched.references_no
                const setUser = (account_no) => {
                    FormikProps.setFieldValue("recipient", account_no.toString())
                    setuserListView(!userListView)
                }

                return (
                    <KeyboardAvoidingView behavior="padding"  enabled style={{ flex: 1 }}  >
                        <View style={{ flex: 1 }}>
                            <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                                    <TouchableOpacity onPress={() => { }} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.title]}>TRANSFER</Text>
                                </View>
                                <TouchableOpacity onPress={() => { }} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                    <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                                        <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={[{ flex: 9, justifyContent: 'space-between' }]}>
                                <View style={styles.screenMargin}>
                                   
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10, marginTop: 10 }]}>Amount ({currency})</Text>
                                        <TextInput value={amount} onChangeText={FormikProps.handleChange('amount')} onBlur={FormikProps.handleBlur('amount')} style={{ borderWidth: 1, borderColor: amountTouched && amountError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={amountTouched && amountError ? '' : '100.00'} placeholderTextColor={amountTouched && amountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                        {amountTouched && amountError && <Text style={styles.error}>{amountError}</Text>}
                                    </View>
                                    <View style={[styles.formElement, { marginBottom: 10 }]}>
                                        <TouchableOpacity onPress={() => setuserListView(!userListView)}>
                                            <Text style={[styles.titleBox, { marginBottom: 10 }]}>Recipient</Text>
                                            <TextInput editable={false} value={recipient} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={recipientTouched && recipientError ? '' : '123456789'} placeholderTextColor={recipientTouched && recipientError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        </TouchableOpacity>
                                        {recipientTouched && recipientError && <Text style={styles.error}>{recipientError}</Text>}
                                    </View>
                                    <View style={[styles.formElement, { marginBottom: 10 }]}>
                                        <Text style={[styles.titleBox, { marginTop: 10, marginBottom: 10 }]}>Reference No</Text>
                                        <TextInput value={references_no} onChangeText={FormikProps.handleChange('references_no')} onBlur={FormikProps.handleBlur('references_no')} style={{ borderWidth: 1, borderColor: references_noTouched && references_noError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={references_noTouched && references_noError ? '' : 'Pay salary'} placeholderTextColor={references_noTouched && references_noError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {references_noTouched && references_noError && <Text style={styles.error}>{references_noError}</Text>}
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1, paddingTop: 20,paddingBottom: 20 }}>
                                        <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                        <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                            <Text style={[styles.butang, { color: '#fff' }]}>Submit</Text>
                                            {authEnabled ? locked ? <Ionicons name='ios-lock' color={'#fff'} style={{ fontSize: 30, paddingLeft: 20 }} /> : <Ionicons name='ios-unlock' color={'#fff'} style={{ fontSize: 30, paddingLeft: 20 }} /> : <View />}
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

export default SampleScreen;