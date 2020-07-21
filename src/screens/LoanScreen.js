import React, { useEffect, useState, useCallback } from 'react';
import { View, TouchableOpacity, Text, Image, FlatList, TextInput, RefreshControl } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment'
import styles from '../styles/styles'
import _ from 'lodash'
import { CustomButton } from '../components/Custom'
import LayoutA from '../Layout/LayoutA';

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}


const LoanScreen = (props) => {
    useEffect(() => {
        dispatch(actionCreator.getLoanList())
        dispatch(actionCreator.getRepaymentList())
    }, [loanList, repaymentList])
    const dispatch = useDispatch()
    const { repaymentList, loanList, filteredLoanList, filterEnabled } = useSelector(state => state.loanReducer, shallowEqual)
    const [onScreenFilter, setOnScreenFilter] = useState(false)
    const [onScreenFilteredList, setOnScreenFilteredList] = useState([])
    // const mergedLoanList = (loanList && repaymentList) ? _.merge(loanList, repaymentList) : 'none'
    // mergedLoanList && console.log(`inilah merged : ${JSON.stringify(mergedLoanList)}`)

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        console.log(`tengah refresh kettew`)

        setRefreshing(true);
        dispatch(actionCreator.getLoanList())
        dispatch(actionCreator.getRepaymentList())
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    const searchList = (val) => {
        console.log(`keyword  ialah : ${val}`)
        if (val) {
            setOnScreenFilter(true)
            const newList = []
            loanList.map(b => {
                b.reason_request.includes(val) ? newList.push(b) : b.status.includes(val) ? newList.push(b) : false
            })
            console.log(`new list length ialah : ${newList.length}`)
            setOnScreenFilteredList(newList)

        } else {
            setOnScreenFilteredList([])
            setOnScreenFilter(false)
        }

    }
    loanList&&console.log(JSON.stringify(loanList))
    return (

        <LayoutA title={'LOAN APPLICATION'} list={true} navigation={props.navigation} nopadding>

            <View style={{ flex: 1,justifyContent:'center' }}>
                <View style={{  flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-around', paddingLeft: 20, paddingRight: 20 }}>

                    <CustomButton boxStyle={{ backgroundColor: '#34C2DB' }} navigation={() => props.navigation.navigate('LoanApplication')} label={'New Loan'} />
                    <CustomButton navigation={() => props.navigation.navigate('Withdraw')} label={'New Withdrawal'} />
                </View>
            </View>
            <View style={{ flex: 1,justifyContent:'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingLeft: 20, paddingRight: 30 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, flex: 1, borderWidth: 1, borderColor: 'lightgrey', padding: 10, borderRadius: 10 }}>
                        <View>
                            <Ionicons name="ios-search" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                        </View>
                        <TextInput placeholder='Please Enter Keyword' style={[styles.searchBar, { flex: 4 }]} onChangeText={(val) => searchList(val)} />
                        <TouchableOpacity onPress={props.navigation.openDrawer} >
                            <Ionicons name="ios-options" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flex: 7}}>
                <View style={{}}>

                    {loanList && <FlatList contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        onEndReached={val => console.log(`onEndReached ialah : ${JSON.stringify(val)}`)}
                        data={filterEnabled ? filteredLoanList : onScreenFilter ? onScreenFilteredList : loanList} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => props.navigation.navigate('LoanMiniDetail', { id: item.id })} style={styles.box}>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                        <Text style={styles.small}>{item.created_at}</Text>
                                        <Ionicons name="md-arrow-dropright" color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.text}>{item.type}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.small}>Status</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.text, { color: item.status === 'New' ? '#000000' : item.status === 'Rejected' ? '#FF0000' : item.status === 'Approved' ? '#54A400' : '#FA6400' }]}>{item.status}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.small}>Amount</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.text]}>{item.total_request}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        } />}
                </View>
            </View>



        </LayoutA>

    );
}



export default LoanScreen;