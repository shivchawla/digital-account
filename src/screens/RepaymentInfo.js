import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView, Modal, ScrollView, TextInput, ActivityIndicator, FlatList, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Layout from '../constants/Layout'
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

const validationSchema = Yup.object().shape({

    amount: Yup
        .number()
        .required()
        .label('Amount'),

});

const RepaymentInfo = (props) => {

    useEffect(() => {
        const repayItemId = props.route.params?.repayItemId??'NA'
        dispatch(actionCreator.getRepaymentDetail(repayItemId))
    }, [repaymentDetail])
    const { repaymentDetail } = useSelector(state => state.loanReducer, shallowEqual)

    useEffect(() => {
        dispatch(actionCreator.getPaymentRecordList())
    }, [paymentHistoryList])
    const { paymentHistoryList } = useSelector(state => state.paymentHistoryReducer, shallowEqual)
    const dispatch = useDispatch()

    const [modalVisible, setModalVisible] = useState(false)
    const [content, setContent] = useState(null)

    const openModal = (content) => {
        setContent(content)
        setModalVisible(!modalVisible)
    }

    const respondAgreement = (status) => {
        const id = props.route.params?.repayItemId??'NA'
        const value = { id, status }
        dispatch(actionCreator.respondAgreement(value))
        props.navigation.navigate('Loan')
    }
    return (

        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }} keyboardVerticalOffset={20}>
            <View style ={{flex:1}}>
            <Modal animationType={'slide'} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
                {content == 'pay' ? <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.title}>MANUAL PAYMENT</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                            <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                                <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                            </View>
                        </View>
                    </View>
                    <Formik onSubmit={async values => {
                        console.log(JSON.stringify(values))
                        setModalVisible(!modalVisible)
                        props.navigation.navigate("LoanPaymentSuccess")
                    }}
                        validationSchema={validationSchema}>
                        {
                            FormikProps => {
                                const { amount } = FormikProps.values
                                const amountError = FormikProps.errors.amount
                                const amountTouched = FormikProps.touched.amount

                                return (

                                    <View style={{ justifyContent: 'space-between', flex: 9 }}>
                                        <View style={[styles.screenMargin, { flex: 9 }]}>
                                            <ScrollView >
                                                <View style={[styles.formElement]}>
                                                    <Text style={[styles.titleBox, { marginBottom: 10, marginTop: 10 }]}>Account No</Text>
                                                    <TextInput editable={false} value={repaymentDetail.account_loan_no} style={[styles.textInput,{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} placeholderTextColor={'lightgrey'} />
                                                </View>
                                                <View style={[styles.formElement]}>
                                                    <Text style={[styles.titleBox, { marginBottom: 10 }]}>Amount</Text>
                                                    <TextInput value={amount} onChangeText={FormikProps.handleChange('amount')} onBlur={FormikProps.handleBlur('amount')} style={[styles.textInput,{ borderWidth: 1, borderColor: amountTouched && amountError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={amountTouched && amountError ? '' : 'Eg: 100.00'} placeholderTextColor={amountTouched && amountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                                    {amountError && amountTouched && <Text style={styles.error}>{amountError}</Text>}
                                                </View>
                                            </ScrollView>
                                        </View>
                                        <View style={{  flexDirection: 'row', alignSelf: 'stretch' }}>
                                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1,paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center'  }}>
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
                                    </View>
                                    
                                )
                            }}
                    </Formik>
                </View> : <View style={{ flex: 1, justifyContent: 'flex-end', }}>
                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.title}>PAYMENT RECORD</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                                </View>
                            </View>
                        </View>
                        <View style={[styles.screenMargin, { flex: 9, marginTop: 25 }]}>
                            {paymentHistoryList && <FlatList data={paymentHistoryList} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) =>
                                <View style={styles.box}>
                                    <TouchableWithoutFeedback onPress={() => dispatch(actionCreator.setMarkerPaymentHistory(index))} style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                            <Text style={[styles.text, { color: '#3EC2D9' }]}>{item.ID}</Text>
                                            <Text style={[styles.text]}>{item.Balance}</Text>
                                            <Ionicons name={item.marker ? "md-arrow-dropdown" : "md-arrow-dropright"} color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View style={{ flexDirection: 'row', marginTop: 5, borderBottomWidth: item.marker ? 1 : 0, borderBottomColor: 'lightgrey', }}>
                                    </View>
                                    {item.marker && <View style={{ flex: 1 }}>
                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.small}>Date</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.text}>{item.Date}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.small}>Type</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.text}>{item.Type}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.small}>Amount</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.text}>{item.Amount}</Text>
                                            </View>
                                        </View>
                                    </View>}
                                </View>
                            } />}
                        </View>
                    </View>}
                    
            </Modal>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>REPAYMENT INFO</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                    </View>
                </View>
            </View>
            <View style={{ flex:1,justifyContent: 'space-between', flex: 9 }}>
                <View style={{ flex: 9 }}>
                    {repaymentDetail && <ScrollView style={[styles.screenMargin]}>
                        <View style={{ margin: 10 }} />
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.label, { marginBottom: 5 }]}>Account No</Text>
                            <Text style={[styles.value, { marginBottom: 5 }]}>{repaymentDetail.account_loan_no}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.label, { marginBottom: 5 }]}>Total Financing (MYR)</Text>
                            <Text style={[styles.value, { marginBottom: 5 }]}>{repaymentDetail.total_request}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.label, { marginBottom: 5 }]}>Total Financing with Interest (MYR)</Text>
                            <Text style={[styles.value, { marginBottom: 5 }]}>{repaymentDetail.total_request_w_interest}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.label, { marginBottom: 5 }]}>Loan Year Term (Year)</Text>
                            <Text style={[styles.value, { marginBottom: 5 }]}>{repaymentDetail.loan_year_term}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.label, { marginBottom: 5 }]}>Interest Rate (%)</Text>
                            <Text style={[styles.value, { marginBottom: 5 }]}>{repaymentDetail.interest_rate}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.label, { marginBottom: 5 }]}>Monthly Payment (MYR)</Text>
                            <Text style={[styles.value, { marginBottom: 5 }]}>{repaymentDetail.monthly_pay}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.label, { marginBottom: 5 }]}>Start Month Payment</Text>
                            <Text style={[styles.value, { marginBottom: 5 }]}>12</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.label, { marginBottom: 5 }]}>Payment Method</Text>
                            <Text style={[styles.value, { marginBottom: 5 }]}>{repaymentDetail.payment_method}</Text>
                        </View>

                        {repaymentDetail.status == 'Pending' ?
                            < View style={{ flexDirection: 'row', margin: 5, justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => respondAgreement('Accept')} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                                    <Text style={[styles.textDefault, { color: 'black' }]}>Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => respondAgreement('Reject')} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                                    <Text style={[styles.textDefault, { color: 'black' }]}>Reject</Text>
                                </TouchableOpacity>
                            </View> :
                            < View style={{ flexDirection: 'row', margin: 5, justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => openModal('history')} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                                    <Text style={[styles.textDefault, { color: 'black' }]}>History</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => openModal('pay')} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }} >
                                    <Text style={[styles.textDefault, { color: '#fff' }]}>Pay</Text>
                                </TouchableOpacity>
                            </View>}

                    </ScrollView>}
                </View>
            </View>
            </View>
        </KeyboardAvoidingView >)
}

RepaymentInfo.navigationOptions = {
    header: null,
};

export default RepaymentInfo;