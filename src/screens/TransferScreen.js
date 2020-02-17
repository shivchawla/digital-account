import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, KeyboardAvoidingView, FlatList, ScrollView, Platform, Modal, TextInput } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'
import moment from 'moment'
import CodePin from 'react-native-pin-code'
import Layout from '../constants/Layout';

import { CustomFormAction,CustomTextInput } from '../components/Custom'

// let Modal;

// if (Platform.OS !== 'web') {
//     Modal = require('react-native').Modal;
// } else {
//     Modal = require('../components/WebModal').default;
// }

import ScanFinger from '../components/ScanFinger'
import LayoutA from '../Layout/LayoutA';

const TransferScreen = (props) => {

    const dispatch = useDispatch()

    const transferRefNo = `TR-${moment().format('YYMMDDhhmmssSS')}`

    const my_account_number = useSelector(state => state.myAccountReducer.account_no, shallowEqual)

    const { userList } = useSelector(state => state.transferOutScreenReducer, shallowEqual)
    const { balance, currency } = useSelector(state => state.myAccountReducer, shallowEqual)
    const { authEnabled, authType } = useSelector(state => state.authReducer, shallowEqual)

    const [userListView, setuserListView] = useState(false)
    const [locked, setLock] = useState(true)
    const [code, updateCode] = useState("")
    const [authRequestVisible, setAuthRequestVisible] = useState(false)

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
            console.log(`values ialah ${JSON.stringify(values)}`)
            if (authEnabled && locked) {
                setAuthRequestVisible(true)
            } else {
                dispatch(actionCreator.submitNewExpense(values))
                actions.resetForm({ wallet: my_account_number, references_no: transferRefNo })
                props.navigation.navigate('TransferSuccess')
            }
        }}
            initialValues={{ wallet: my_account_number, references_no: transferRefNo }}
            validationSchema={validationSchema}
            navigation={props.navigation}
        >
            {FormikProps => {
                const { amount, recipient, references_no, wallet } = FormikProps.values
                const amountError = FormikProps.errors.amount
                const amountTouched = FormikProps.touched.amount
                const recipientError = FormikProps.errors.recipient
                const recipientTouched = FormikProps.touched.recipient
                const references_noError = FormikProps.errors.references_no
                const references_noTouched = FormikProps.touched.references_no

                const setUser = (account_number) => {
                    FormikProps.setFieldValue("recipient", account_number.toString())
                    setuserListView(!userListView)
                }

                return (
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }} keyboardVerticalOffset={20} navigation={props.navigation} >
                        <Popup
                            setUser={setUser}
                            userList={userList}
                            userListView={userListView}
                            authEnabled={authEnabled}
                            authType={authType}
                            locked={locked}
                            setLock={setLock}
                            code={code}
                            updateCode={updateCode}
                            authRequestVisible={authRequestVisible}
                            setAuthRequestVisible={setAuthRequestVisible}
                        />
                        <LayoutA
                            title={'TRANSFER'}
                            screenType='form'
                            navigation={props.navigation}
                        >
                            <View style={styles.screenMargin}>
                                <CustomTextInput
                                    label={`Amount(${currency})`}
                                    value={amount}
                                    handleChange={FormikProps.handleChange(`amount`)}
                                    handleBlur={FormikProps.handleBlur('amount')}
                                    touched={amountTouched}
                                    error={amountError}
                                    keyboardType={'decimal-pad'}
                                    placeholder={'Enter Amount'}

                                />

                                <CustomTextInput
                                    handleClick={() => setuserListView(!userListView)}
                                    label={'Recipient'}
                                    value={recipient}
                                    // handleChange={FormikProps.handleChange(`references_no`)}
                                    // handleBlur={FormikProps.handleBlur('references_no')}
                                    touched={recipientTouched}
                                    error={recipientError}
                                    placeholder={'Select recipient'}

                                />

                                <CustomTextInput
                                    label={'Reference No'}
                                    value={references_no}
                                    handleChange={FormikProps.handleChange(`references_no`)}
                                    handleBlur={FormikProps.handleBlur('references_no')}
                                    touched={references_noTouched}
                                    error={references_noError}

                                />
                            </View>
                            <CustomFormAction
                             navigation={props.navigation} 
                             isValid={FormikProps.isValid} 
                             handleSubmit={FormikProps.handleSubmit} 
                             authEnabled={authEnabled} 
                             locked={locked}
                            />

                            {/* <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                    <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                        <Text style={[styles.butang, { color: '#fff' }]}>Submit</Text>
                                        {authEnabled ? locked ? <Ionicons name='ios-lock' color={'#fff'} style={{ fontSize: 30, paddingLeft: 20 }} /> : <View /> : <View />}
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View> */}
                        </LayoutA>
                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}

const Popup = (props) => {
    const unlock = () => {
        setLock(false)
        setAuthRequestVisible(false)
    }

    const checkCode = (code) => {
        console.log(`periksa code`)
        return code === '1234'
    }

    const setUser = props.setUser
    const userList = props.userList
    const userListView = props.userListView
    const authEnabled = props.authEnabled
    const authType = props.authType
    const locked = props.locked
    const setLock = props.setLock
    const code = props.code
    const updateCode = props.updateCode
    const authRequestVisible = props.authRequestVisible
    const setAuthRequestVisible = props.setAuthRequestVisible
    return (<>
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
        <Modal animationType={'slide'} visible={userListView} onRequestClose={() => setuserListView(!userListView)} transparent={false}>
            <View style={{ flex: 1, }}>
                <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                        <TouchableOpacity onPress={() => setuserListView(!userListView)} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                            <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.title, { color: '#055E7C' }]}>SELECT USERS</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                        <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'space-between', flex: 9 }}>
                    <ScrollView style={[styles.screenMargin]}>
                        <View style={{ marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, flex: 1, borderWidth: 1, borderColor: 'lightgrey', padding: 10, borderRadius: 10 }}>
                                    <View>
                                        <Ionicons name="ios-search" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                                    </View>
                                    <TextInput placeholder='Please Enter Keyword' style={{ flex: 4 }} />
                                    <TouchableOpacity onPress={() => console.log(`advance search for user`)} >
                                        <Ionicons name="ios-options" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {userList && <FlatList data={userList} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => setUser(item.account_number)} style={styles.box}>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.text}>{item.account_number}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>{item.owner_name}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>{item.business_name}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            } />}
                        </View>
                    </ScrollView>
                </View >
            </View >
        </Modal>
    </>)
}

TransferScreen.navigationOptions = {
    header: null,
};
export default TransferScreen;
