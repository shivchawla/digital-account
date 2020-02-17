import React, { useEffect, useState, useCallback } from 'react';
import { View, TouchableOpacity, Text, Image, FlatList, TextInput, RefreshControl } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment'
import styles from '../styles/styles'
import LayoutA from '../Layout/LayoutA';
import { CustomButton } from '../components/Custom'

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}


const WithdrawScreen = (props) => {

    useEffect(() => {
        dispatch(actionCreator.getWithdrawList())
    }, [withdrawList])
    const dispatch = useDispatch()
    const { withdrawList, filteredWithdrawList, filterEnabled } = useSelector(state => state.withdrawReducer, shallowEqual)
    const { currency } = useSelector(state => state.myAccountReducer, shallowEqual)
    const [onScreenFilter, setOnScreenFilter] = useState(false)
    const [onScreenFilteredList, setOnScreenFilteredList] = useState([])

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        console.log(`tengah refresh kettew`)
        setRefreshing(true);
        dispatch(actionCreator.getWithdrawList())
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    const searchList = (val) => {
        console.log(`keyword  ialah : ${val}`)
        if (val) {
            setOnScreenFilter(true)
            const newList = []
            withdrawList.map(b => {
                b.type.includes(val) ? newList.push(b) : b.status.includes(val) ? newList.push(b) : b.amount.toFixed(2).includes(val) ? newList.push(b) : false
            })
            console.log(`new list length ialah : ${newList.length}`)
            setOnScreenFilteredList(newList)

        } else {
            setOnScreenFilteredList([])
            setOnScreenFilter(false)
        }

    }

    return (
        <LayoutA title={'WITHDRAWAL'} navigation={props.navigation}>
            <View style={{ marginTop: 10, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'flex-end', paddingRight: 10 }}>
                {/* <TouchableOpacity onPress={() => props.navigation.navigate('WithdrawalApplication')} style={{ paddingTop: 16, paddingBottom: 16, paddingLeft: 18, paddingRight: 18, backgroundColor: '#055E7C', borderRadius: 15 }}>
                    <Text style={[styles.text, { color: '#fff', fontSize: 15 }]}>New Withdrawal</Text>
                </TouchableOpacity> */}
                <CustomButton navigation={()=>props.navigation.navigate('WithdrawalApplication')} label={'New Withdrawal'}  />
            </View>
            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, flex: 1, borderWidth: 1, borderColor: 'lightgrey', padding: 10, borderRadius: 10 }}>
                        <View>
                            <Ionicons name="ios-search" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                        </View>
                        <TextInput placeholder='Please Enter Keyword' style={{ flex: 4 }} onChangeText={(val) => searchList(val)} />
                        <TouchableOpacity onPress={props.navigation.openDrawer} >
                            <Ionicons name="ios-options" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                {withdrawList && <FlatList
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    onEndReached={val => console.log(`onEndReached ialah : ${JSON.stringify(val)}`)}
                    data={filterEnabled ? filteredWithdrawList : onScreenFilter ? onScreenFilteredList : withdrawList} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => props.navigation.navigate('WithdrawalDetail', { id: item.id })} style={styles.box}>
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
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.text, { color: item.status === 'New' ? '#34C2DB' : item.status === 'Rejected' ? '#FF0000' : item.status === 'Approved' ? '#54A400' : '#FA6400' }]}>{item.status}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.small}>Amount</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.text}>{currency} {item.amount}</Text>
                            </View>
                        </TouchableOpacity>
                    } />}
            </View>
        </LayoutA>

    );
}

WithdrawScreen.navigationOptions = {
    header: null,
};

export default WithdrawScreen;