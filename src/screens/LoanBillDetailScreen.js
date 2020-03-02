import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView } from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment'
import LayoutA from '../Layout/LayoutA';
const LoanBillDetailScreen = (props) => {
    // const billDetail = useSelector(state => state.loanApplicationReducer, shallowEqual)
    // const dispatch = useDispatch()
    const setbillDetail = (val) => dispatch({ type: 'SET_LOAN_DATA', payload: { ...val } });

    useEffect(() => {
        const id = props.route.params?.id ?? 'NA'
        dispatch(actionCreator.getBillDetail(id))
    }, [billDetail])

    const dispatch = useDispatch()

    const { billDetail } = useSelector(state => state.loanBillReducer, shallowEqual)
    billDetail && console.log(`bill detail ialah : ${JSON.stringify(billDetail)}`)

    const repayInfo = () => {
        const repayItem = repaymentList.find(x => x.application_id == billDetail.id)
        const repayItemId = repayItem.id
        props.navigation.navigate('RepayInfo', { repayItemId })
    }

    const billList = () => {
        const loan = repaymentList.find(x => x.application_id == billDetail.id)
        const loanNo = loan.account_loan_no
        props.navigation.navigate('LoanBillList', { loanNo })
    }

    return (

        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
            
            <LayoutA
                title={'BILL DETAIL'}
                screenType='form'
                navigation={props.navigation}
                nopadding
            >
                <View style={{ justifyContent: 'space-between', flex: 9 }}>
                    <View style={{ flex: 9 }}>
                        <ScrollView style={[styles.screenMargin, { paddingLeft: 0, paddingRight: 0 }]}>
                            {billDetail && <View style={[styles.box, { marginTop: 20 }]}>



                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.label}>Bill ID</Text>
                                        <Text style={styles.value}>{billDetail.id}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.label}>Type</Text>
                                        <Text style={styles.value}>{billDetail.type}</Text>
                                    </View>
                                </View>


                                <View style={{ flexDirection: 'row', marginTop: 20 }}>

                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.label}>Method</Text>
                                        <Text style={styles.value}>{billDetail.payment_method}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.label}>Date</Text>
                                        <Text style={styles.value}>{moment(billDetail.created_at).format('D/MM/YY')}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.label}>Reference</Text>
                                        <Text style={styles.value}>{billDetail.payment_no}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.label}>To</Text>
                                        <Text style={styles.value}>{billDetail.pay_to}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>

                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.label}>Amount </Text>
                                        <Text style={styles.value}>{billDetail.currency} {billDetail.amount}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.label}>Status</Text>
                                        <Text style={[styles.value, { color: billDetail.status === 'New' ? '#000000' : billDetail.status === 'Rejected' ? '#FF0000' : billDetail.status === 'Approved' ? '#54A400' : '#FA6400' }]}>{billDetail.status}</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <View style={{ alignItems: 'flex-end', marginTop: 20 }} >
                                            <TouchableOpacity onPress={() => console.log(`pay button pushed`)} style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5, borderRadius: 20, borderWidth: 1 }}>
                                                <Text style={styles.small}>Pay</Text>
                                            </TouchableOpacity>
                                            {/* {repaymentList && repaymentList.find(x => x.application_id == billDetail.id) && <TouchableOpacity onPress={() => repayInfo()} style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5, borderRadius: 20, borderWidth: 1 }}>
                                            <Text style={styles.small}>Repayment info </Text>
                                        </TouchableOpacity>}
                                        {repaymentList && repaymentList.find(x => x.application_id == billDetail.id) && <TouchableOpacity onPress={() => billList()} style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5, borderRadius: 20, backgroundColor: '#34C2DB' }}>
                                            <Text style={[styles.small, { color: '#fff' }]}>Bill</Text>
                                        </TouchableOpacity>} */}
                                        </View>
                                    </View>
                                </View>
                            </View>}
                        </ScrollView>
                    </View>
               
            </View>
            </LayoutA>
        </KeyboardAvoidingView>)
    }
    
    
    
export default LoanBillDetailScreen;