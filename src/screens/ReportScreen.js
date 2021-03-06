import React, { useEffect, useState, useCallback } from 'react';
import { View, TouchableOpacity, Text, Image, FlatList, TouchableWithoutFeedback, TextInput, RefreshControl } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment'
import styles from '../styles/styles'
import _ from 'lodash'
import LayoutA from '../Layout/LayoutA';

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const ReportScreen = (props) => {
    useEffect(() => {
        dispatch(actionCreator.getReportList())
    }, [reportList])
    const dispatch = useDispatch()
    const { reportList, filterReportList, filterEnabled } = useSelector(state => state.reportReducer, shallowEqual)
    const [onScreenFilter, setOnScreenFilter] = useState(false)
    const [onScreenFilteredList, setOnScreenFilteredList] = useState([])

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        console.log(`tengah refresh kettew`)
        setRefreshing(true);
        dispatch(actionCreator.getReportList())
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    const transactionAndFee = _.values(_.groupBy(reportList, rl => rl.transaction_no)) || 0
    const transactionAndFeeFinal = []
    const nakTengok = []
    transactionAndFee && transactionAndFee.map(taf => {
        if (taf.length == 2) {
            if (!taf[0].type.includes('Fee')) {
                transactionAndFeeFinal.push({ ...taf[0], fee: taf[1].amount })
            } else {
                transactionAndFeeFinal.push({ ...taf[1], fee: taf[0].amount })
            }
        }
    }

    )
    console.log(`reportList ialah ${JSON.stringify(reportList)}`)
    console.log(`dengan fee final ialah ${JSON.stringify(transactionAndFeeFinal)}`)
    console.log(`nak tengok ialah ${JSON.stringify(nakTengok)}`)
    // reportList&&reportList.map(rl=>{

    // })

    const searchList = (val) => {
        console.log(`keyword  ialah : ${val}`)
        if (val) {
            setOnScreenFilter(true)
            const newList = []
            reportList.map(b => {
                b.type.includes(val) ? newList.push(b) : b.credit_debit.includes(val) ? newList.push(b) : b.from_to.includes(val) ? newList.push(b) : b.amount.toFixed(2).includes(val) ? newList.push(b) : b.status.includes(val) ? newList.push(b) : false
            })
            console.log(`new list length ialah : ${newList.length}`)
            setOnScreenFilteredList(newList)

        } else {
            setOnScreenFilteredList([])
            setOnScreenFilter(false)
        }

    }

    return (

        <LayoutA title={'REPORT'} navigation={props.navigation} nopadding>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10, marginTop: 20, marginLeft: 20, marginRight: 20 }}>
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
                {/* {reportList && <FlatList data={filterEnabled ? filterReportList : onScreenFilter ? onScreenFilteredList : reportList} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) =>
                   */}
                {transactionAndFeeFinal && <FlatList contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    onEndReached={val => console.log(`onEndReached ialah : ${JSON.stringify(val)}`)}
                    data={filterEnabled ? transactionAndFeeFinal : onScreenFilter ? transactionAndFeeFinal : transactionAndFeeFinal} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) =>
                        <View style={styles.box}>
                            <TouchableWithoutFeedback onPress={() => dispatch(actionCreator.setMarkerReportList(item.id))} style={{ flexDirection: 'row', marginTop: 5 }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>

                                    <Text style={styles.small}>{item.created_at}</Text>
                                    <Ionicons name={item.marker ? "md-arrow-dropdown" : "md-arrow-dropright"} color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={{ flexDirection: 'row', marginTop: 5, borderBottomWidth: item.marker ? 1 : 0, borderBottomColor: 'lightgrey', paddingBottom: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.h3]}>{item.type} </Text>
                                    <Ionicons name={item.credit_debit == 'DEBIT' ? "md-remove-circle-outline" : "md-add-circle-outline"} color={item.credit_debit == 'DEBIT' ? '#A20F0F' : '#7ED321'} style={{ fontSize: 15, paddingRight: 20 }} />
                                  

                                </View>
                            </View>
                            {!item.marker && <View style={{ flexDirection: 'row', marginTop: 5, }}>
                                {/* <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[styles.label]}>Total</Text>
                                </View> */}
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.value]}>{item.currency||`MYR `}{item.fee + item.amount}</Text>
                                </View>
                            </View>}
                            {item.marker && <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={[styles.label]}>Transaction</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.value]}>{item.transaction_no}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={[styles.label]}>Date</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.value]}>{item.created_at}</Text>
                                    </View>
                                </View>


                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={[styles.label]}>{item.credit_debit == 'DEBIT' ? 'Origin' : 'Recipient'} </Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.value]}> {item.from_to}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={[styles.label]}>Amount</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.value]}>{item.currency}{item.amount.toFixed(2)}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={[styles.label]}>Fee</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.value]}>{item.currency}{item.fee}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={[styles.label]}>Total</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.value]}>{item.currency||`MYR`}{item.fee + item.amount}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={[styles.label]}>Status</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.value]}>{item.status}</Text>
                                    </View>
                                </View>

                            </View>}

                        </View>
                    } />}
            </View>

        </LayoutA >
    );
}


export default ReportScreen;