import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, FlatList, TextInput, ScrollView } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment'
import styles from '../styles/styles'
import _ from 'lodash'
import LayoutA from '../Layout/LayoutA';

const LoanBillListScreen = (props) => {
    useEffect(() => {
        const loanNo = props.route.params?.loanNo ?? 'NA'
        console.log(`ini loan no : ${loanNo}`)
        dispatch(actionCreator.getLoanBillList(loanNo))
        //dispatch(actionCreator.getRepaymentList())
    }, [loanBillList])
    const dispatch = useDispatch()
    const { loanBillList, filterEnabled } = useSelector(state => state.loanBillReducer, shallowEqual)
    const [onScreenFilter, setOnScreenFilter] = useState(false)
    const [onScreenFilteredList, setOnScreenFilteredList] = useState([])
    // const mergedLoanList = (loanList && repaymentList) ? _.merge(loanList, repaymentList) : 'none'
    // mergedLoanList && console.log(`inilah merged : ${JSON.stringify(mergedLoanList)}`)
    loanBillList && console.log(`ini loan bill list : ${loanBillList}`)
    const searchList = (val) => {
        console.log(`keyword  ialah : ${val}`)
        if (val) {
            setOnScreenFilter(true)
            const newList = []
            loanBillList.map(b => {
                b.type.includes(val) ? newList.push(b) : b.status.includes(val) ? newList.push(b) : false
            })
            console.log(`new list length ialah : ${newList.length}`)
            setOnScreenFilteredList(newList)

        } else {
            setOnScreenFilteredList([])
            setOnScreenFilter(false)
        }
    }

    return (
        <View style={{ flex: 1, }}>
           
            <LayoutA
                title={'BILLS'}
                screenType='form'
                navigation={props.navigation}
                nopadding
            >
            <View style={[{ flex: 9 }]}>
                <ScrollView style={[styles.screenMargin]}>

                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
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
                        {loanBillList && <FlatList data={filterEnabled ? filteredloanBillList : onScreenFilter ? onScreenFilteredList : loanBillList} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => props.navigation.navigate('LoanBillDetail', { id: item.id })} style={styles.box}>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                        <Text style={styles.small}>{moment(item.created_at).format("MMMM Do YYYY, h:mm:ss a")}</Text>
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
                            </TouchableOpacity>
                        } />}
                    </View>
                </ScrollView>
            </View >
            </LayoutA>
        </View >

    );
}



export default LoanBillListScreen;