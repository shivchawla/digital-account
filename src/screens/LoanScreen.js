import React, { useEffect, useState, useCallback } from 'react';
import { View, TouchableOpacity, Text, Image, FlatList, TextInput, RefreshControl } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment'
import styles from '../styles/styles'
import _ from 'lodash'

const wait=(timeout)=> {
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
            <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.title]}>LOAN APPLICATION</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={[{ flex: 9 }]}>
                <View style={[styles.screenMargin]}>
                    <View style={{ marginTop: 30, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('LoanApplication')} style={{ paddingTop: 17, paddingBottom: 17, paddingLeft: 19, paddingRight: 19, backgroundColor: '#34C2DB', borderRadius: 15 }}>
                            <Text style={[styles.text, { color: '#fff',fontSize:15 }]}>New Loan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Withdraw')} style={{ paddingTop: 17, paddingBottom: 17, paddingLeft: 19, paddingRight: 19, backgroundColor: '#055E7C', borderRadius: 15 }}>
                            <Text style={[styles.text, { color: '#fff',fontSize:15 }]}>New Withdrawal</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, flex: 1, borderWidth: 1, borderColor: 'lightgrey', padding: 10, borderRadius: 10 }}>
                                <View>
                                    <Ionicons name="ios-search" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                                </View>
                                 <TextInput placeholder='Please Enter Keyword' style={[styles.searchBar, { flex: 4 }]}  onChangeText={(val) => searchList(val)} />
                                <TouchableOpacity onPress={props.navigation.openDrawer} >
                                    <Ionicons name="ios-options" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {loanList && <FlatList
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                            onEndReached={val => console.log(`onEndReached ialah : ${JSON.stringify(val)}`)}
                            data={filterEnabled ? filteredLoanList : onScreenFilter ? onScreenFilteredList : loanList} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => props.navigation.navigate('LoanMiniDetail', { id: item.id })} style={styles.box}>
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
            </View >
        </View >

    );
}

LoanScreen.navigationOptions = {
    header: null,
};

export default LoanScreen;