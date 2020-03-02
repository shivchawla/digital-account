import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView } from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { ScrollView } from 'react-native-gesture-handler';
import LayoutA from '../Layout/LayoutA';

const LoanMiniDetailScreen = (props) => {
    // const loanData = useSelector(state => state.loanApplicationReducer, shallowEqual)
    // const dispatch = useDispatch()
    const setLoanData = (val) => dispatch({ type: 'SET_LOAN_DATA', payload: { ...val } });

    useEffect(() => {
        const id = props.route.params?.id??'NA'
        dispatch(actionCreator.getLoanData(id))
    }, [loanData])

    const dispatch = useDispatch()

    const { loanData } = useSelector(state => state.loanApplicationReducer, shallowEqual)
    const { repaymentList } = useSelector(state => state.loanReducer, shallowEqual)
    repaymentList && console.log(`repayment list : ${JSON.stringify(repaymentList)}`)

    const repayInfo = () => {
        const repayItem = repaymentList.find(x => x.application_id == loanData.id)
        const repayItemId = repayItem.id
        props.navigation.navigate('RepayInfo', { repayItemId })
    }

    const billList = () => {
        const loan = repaymentList.find(x => x.application_id == loanData.id)
        const loanNo = loan.account_loan_no
        props.navigation.navigate('LoanBillList', { loanNo })
    }

    return (
        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
            <LayoutA
                title={'LOAN DETAIL'}
                screenType='form'
                navigation={props.navigation}
                nopadding
            >
           
                <View style={{ flex: 9 }}>
                    <ScrollView style={[styles.screenMargin, { paddingLeft: 0, paddingRight: 0 }]}>
                        {loanData && <View style={[styles.box, { marginTop: 20 }]}>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.label}>Application ID</Text>
                                    <Text style={styles.value}>{loanData.application_id}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.label}>Status</Text>
                                    <Text style={[styles.value, { color: loanData.status === 'New' ? '#000000' : loanData.status === 'Rejected' ? '#FF0000' : loanData.status === 'Approved' ? '#54A400' : '#FA6400' }]}>{loanData.status}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                    <Text style={styles.label}>Amount</Text>
                                    <Text style={styles.value}>{loanData.total_request}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.label}>Type</Text>
                                    <Text style={styles.value}>{loanData.type}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.label}>Reason</Text>
                                    <Text style={styles.value}>{loanData.reason_request}</Text>
                                </View>
                            </View>
                            {loanData.status === 'Approved' &&
                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.small}>Your account will be credited once you agree on the Repayment terms</Text>
                                    </View>
                                </View>}

                            <View style={{ marginTop: 20 }}>
                                <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-start'}}>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('LoanDetail')} style={{ marginTop: 10, paddingLeft: 14, paddingRight: 14, paddingTop: 12, paddingBottom: 12, borderRadius: 20, borderWidth: 1 }}>
                                            <Text style={[styles.small,{fontSize:10}]}>See application</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', }}>
                                        {loanData.status !== 'New' ? repaymentList && repaymentList.find(x => x.application_id == loanData.id) && <TouchableOpacity onPress={() => repayInfo()} style={{ marginTop: 10, paddingLeft: 14, paddingRight: 14, paddingTop: 12, paddingBottom: 12, borderRadius: 20, borderWidth: 1 }}>
                                            <Text style={[styles.small,{fontSize:10}]}>Repayment info </Text>
                                        </TouchableOpacity> : <View />}
                                    </View>
                                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end', marginLeft: 10 }}>
                                        {loanData.status === 'Disbursed' ? repaymentList && repaymentList.find(x => x.application_id == loanData.id) && <TouchableOpacity onPress={() => billList()} style={{ marginTop: 10, paddingLeft: 15, paddingRight: 15, paddingTop:12, paddingBottom: 12, borderRadius: 20, backgroundColor: '#34C2DB' }}>
                                            <Text style={[styles.small, { color: '#fff',fontSize:10 }]}>Bill</Text>
                                        </TouchableOpacity> : <View />}
                                    </View>


                                </View>
                            </View>
                        </View>}
                    </ScrollView>
                </View>
            </LayoutA>
        </KeyboardAvoidingView>)
}



export default LoanMiniDetailScreen;