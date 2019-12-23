import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView, Modal, ScrollView, TextInput, ActivityIndicator } from 'react-native';
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
        const repayItemId = props.navigation.getParam('repayItemId', 'NA')
        dispatch(actionCreator.getRepaymentDetail(repayItemId))

    }, [repaymentDetail])
    const dispatch = useDispatch()
    const { repaymentDetail } = useSelector(state => state.loanReducer, shallowEqual)

    const [modalVisible, setModalVisible] = useState(false)
    const [content, setContent] = useState(null)

    const openModal = (content) => {
        setContent(content)
        setModalVisible(!modalVisible)
    }

    return (

        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
            <Modal animationType={'slide'}
                visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}
            >
                {content == 'pay' ?
                    <View style={{ flex: 1, justifyContent: 'flex-end', }}>
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
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
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
                                                        <TextInput editable={false} value={repaymentDetail.account_loan_no} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} placeholderTextColor={'lightgrey'} />
                                                    </View>
                                                    <View style={[styles.formElement]}>
                                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Amount</Text>
                                                        <TextInput value={amount} onChangeText={FormikProps.handleChange('amount')} onBlur={FormikProps.handleBlur('amount')} style={{ borderWidth: 1, borderColor: amountTouched && amountError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={amountTouched && amountError ? '' : 'Eg: 100.00'} placeholderTextColor={amountTouched && amountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                                        {amountError && amountTouched && <Text style={styles.error}>{amountError}</Text>}
                                                    </View>
                                                </ScrollView>
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
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>
                        </View>
                        <View style={{ flex: 9, justifyContent: 'flex-end' }}>
                            <ScrollView style={[styles.screenMargin]}>
                                <TouchableOpacity onPress={() => console.log('wow')} style={styles.box}>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                            <Text style={styles.small}>RP0002</Text>
                                            <Ionicons name="md-arrow-dropright" color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>Date</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>20/03/19</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>Type</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>Auto</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>Amount</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>122.60</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>Balance</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>8000</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('wow')} style={styles.box}>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                            <Text style={styles.small}>RP0002</Text>
                                            <Ionicons name="md-arrow-dropright" color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>Date</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>20/03/19</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>Type</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>Auto</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>Amount</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>122.60</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>Balance</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>8000</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('wow')} style={styles.box}>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                            <Text style={styles.small}>RP0002</Text>
                                            <Ionicons name="md-arrow-dropright" color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>Date</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>20/03/19</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>Type</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>Auto</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>Amount</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>122.60</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>Balance</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>8000</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                            </ScrollView>
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
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </View>
            </View>
            <View style={{ justifyContent: 'space-between', flex: 9 }}>
                <View style={{ flex: 9 }}>
                    {repaymentDetail && <ScrollView style={[styles.screenMargin]}>
                        <View style={{ margin: 10 }} />
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5, fontWeight: 'bold' }]}>Account No</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>{repaymentDetail.account_loan_no}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5, fontWeight: 'bold' }]}>Total Financing (MYR)</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>{repaymentDetail.total_request}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5, fontWeight: 'bold' }]}>Total Financing with Interest (MYR)</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>{repaymentDetail.total_request_w_interest}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5, fontWeight: 'bold' }]}>Loan Year Term (Year)</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>{repaymentDetail.loan_year_term}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5, fontWeight: 'bold' }]}>Interest Rate (%)</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>{repaymentDetail.interest_rate}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5, fontWeight: 'bold' }]}>Monthly Payment (MYR)</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>{repaymentDetail.monthly_pay}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5, fontWeight: 'bold' }]}>Start Month Payment</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>12</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5, fontWeight: 'bold' }]}>Payment Method</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>{repaymentDetail.payment_method}</Text>
                        </View>
                        < View style={{ flexDirection: 'row', margin: 5, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => openModal('history')} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                                <Text style={[styles.textDefault, { color: 'black' }]}>History</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openModal('pay')} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }} >
                                <Text style={[styles.textDefault, { color: '#fff' }]}>Pay</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>}
                </View>
            </View>
        </KeyboardAvoidingView >)
}

RepaymentInfo.navigationOptions = {
    header: null,
};

export default RepaymentInfo;