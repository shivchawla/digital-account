import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, KeyboardAvoidingView, TextInput, Modal, FlatList, ScrollView } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'
import moment from 'moment'




const TransferScreen = (props) => {

    const transferRefNo = `TR-${moment().format('YYMMDDhhmmssSS')}`


    const dispatch = useDispatch()
    const { account_no } = useSelector(state => state.myAccountReducer, shallowEqual)
    const { userList } = useSelector(state => state.transferOutScreenReducer, shallowEqual)
    const { balance, currency } = useSelector(state => state.myAccountReducer, shallowEqual)
    const [userListView, setuserListView] = useState(false)

    useEffect(() => {
        dispatch(actionCreator.getAllUsers())
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
            dispatch(actionCreator.submitNewExpense(values))
            actions.resetForm({ wallet: account_no, references_no: transferRefNo })
            props.navigation.navigate("TransferSuccess")
            console.log(JSON.stringify(values))
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
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>
                        <Modal animationType={'slide'}
                            visible={userListView} onRequestClose={() => setuserListView(!userListView)}
                            transparent={false}>

                            <View style={{ flex: 1, }}>
                                <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                        <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                            <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.title, { color: '#055E7C' }]}>SELECT USERS</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                        <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
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
                                                    <TouchableOpacity onPress={props.navigation.openDrawer} >
                                                        <Ionicons name="ios-options" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            {userList && <FlatList data={userList} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) =>
                                                <TouchableOpacity onPress={() => setUser(item.account_no)} style={styles.box}>

                                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={styles.text}>{item.account_no}</Text>
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
                        <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title]}>TRANSFER</Text>
                            </View>
                            <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.screenMargin, { flex: 9 }]}>
                            {/* <Text>{account_no&&JSON.stringify(account_no)}</Text> */}
                            <View style={[styles.formElement]}>
                                <Text style={[styles.titleBox, { marginBottom: 10, marginTop: 10 }]}>Amount ({currency})</Text>
                                <TextInput value={amount} onChangeText={FormikProps.handleChange('amount')} onBlur={FormikProps.handleBlur('amount')} style={{ borderWidth: 1, borderColor: amountTouched && amountError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={amountTouched && amountError ? '' : '100.00'} placeholderTextColor={amountTouched && amountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
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
                                <TextInput value={references_no} onChangeText={FormikProps.handleChange('references_no')} onBlur={FormikProps.handleBlur('references_no')} style={{ borderWidth: 1, borderColor: references_noTouched && references_noError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={references_noTouched && references_noError ? '' : 'Pay salary'} placeholderTextColor={references_noTouched && references_noError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                {references_noTouched && references_noError && <Text style={styles.error}>{references_noError}</Text>}
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 }}>
                                <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff' }]}>Submit</Text>}
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}

TransferScreen.navigationOptions = {
    header: null,
};

export default TransferScreen;