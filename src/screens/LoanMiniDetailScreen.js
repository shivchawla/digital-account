import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView } from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { ScrollView } from 'react-native-gesture-handler';

const LoanMiniDetailScreen = (props) => {
    // const loanData = useSelector(state => state.loanApplicationReducer, shallowEqual)
    // const dispatch = useDispatch()
    const setLoanData = (val) => dispatch({ type: 'SET_LOAN_DATA', payload: { ...val } });

    useEffect(() => {
        const id = props.navigation.getParam('id', 'NO-ID')
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

    return (

        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>LOAN DETAIL</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </View>
            </View>
            <View style={{ justifyContent: 'space-between', flex: 9 }}>
                <View style={{ flex: 9 }}>
                    <ScrollView style={[styles.screenMargin, { paddingLeft: 0, paddingRight: 0 }]}>
                        {loanData && <View style={[styles.box, { marginTop: 20 }]}>
                            <View style={{ marginTop: 5, borderBottomWidth: 1, borderBottomColor: 'lightgrey', paddingBottom: 20 }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                    <Text style={styles.boldText}>Application ID</Text>
                                    <Ionicons name="md-arrow-dropdown" color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                                </View>
                                <Text style={styles.text}>{loanData.application_id}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.boldText}>Status</Text>
                                    <Text style={[styles.text, { color: loanData.status === 'New' ? '#000000' : loanData.status === 'Rejected' ? '#FF0000' : loanData.status === 'Approved' ? '#54A400' : '#FA6400' }]}>{loanData.status}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                    <Text style={styles.boldText}>Amount</Text>
                                    <Text style={styles.text}>{loanData.total_request}</Text>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.boldText}>Type</Text>
                                    <Text style={styles.text}>{loanData.type}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.boldText}>Reason</Text>
                                    <Text style={styles.text}>{loanData.reason_request}</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <View style={{ alignItems: 'flex-end', marginTop: 20 }} >
                                        <TouchableOpacity onPress={() => props.navigation.navigate('LoanDetail')} style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5, borderRadius: 20, borderWidth: 1 }}>
                                            <Text style={styles.small}>See application</Text>
                                        </TouchableOpacity>
                                        {repaymentList && repaymentList.find(x => x.application_id == loanData.id) && <TouchableOpacity onPress={() => repayInfo()} style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5, borderRadius: 20, borderWidth: 1 }}>
                                            <Text style={styles.small}>Repayment info </Text>
                                        </TouchableOpacity>}
                                        {repaymentList && repaymentList.find(x => x.application_id == loanData.id) && <TouchableOpacity style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5, borderRadius: 20, backgroundColor: '#34C2DB' }}>
                                            <Text style={[styles.small, { color: '#fff' }]}>Pay Now!</Text>
                                        </TouchableOpacity>}
                                    </View>
                                </View>
                            </View>
                        </View>}
                    </ScrollView>
                </View>
            </View>
        </KeyboardAvoidingView>)
}

LoanMiniDetailScreen.navigationOptions = {
    header: null,
};

export default LoanMiniDetailScreen;