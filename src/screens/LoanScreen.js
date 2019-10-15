import React, { useEffect } from 'react';

import {

    View,
    TouchableOpacity,
    Text,
    Image,
    FlatList

} from 'react-native';

import * as actionCreator from '../store/actions/action'

import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { Ionicons } from '@expo/vector-icons';

import moment from 'moment'

import styles from '../styles/styles'

const LoanScreen = (props) => {

    useEffect(() => {

        dispatch(actionCreator.getLoanList())

    },

        [loanList])

    const dispatch = useDispatch()

    const { loanList } = useSelector(state => state.loanReducer, shallowEqual)

    return (

        <View style={{ flex: 1, }}>

            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>

                    <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title, { color: '#055E7C' }]}>Loan Application</Text>
                </View>

                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </TouchableOpacity>

            </View>

            <View style={[styles.screenMargin, { flex: 9, paddingLeft: 0, paddingRight: 0 }]}>

                <View style={{ marginTop: 30, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('LoanApplication')} style={{ padding: 5, paddingLeft: 8, paddingRight: 8, backgroundColor: '#34C2DB', borderRadius: 5 }}>
                        <Text style={[styles.text, { color: '#fff' }]}>New Loan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Withdraw')} style={{ padding: 5, paddingLeft: 8, paddingRight: 8, backgroundColor: '#055E7C', borderRadius: 5 }}>
                        <Text style={[styles.text, { color: '#fff' }]}>New Withdrawal</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end',paddingRight:10 }}>
                        <TouchableOpacity onPress={props.navigation.openDrawer} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                            <Text style={[styles.small, { paddingRight: 5, color: '#055E7C' }]}>Search</Text>
                            <Ionicons name="ios-search" color={'#055E7C'} style={{ fontSize: 15, paddingRight: 5 }} />
                        </TouchableOpacity>
                    </View>

                    {loanList && <FlatList data={loanList} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => props.navigation.navigate('LoanMiniDetail')} style={styles.box}>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <View style={{ flex: 1,flexDirection:'row',alignSelf:'stretch',justifyContent:'space-between' }}>
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
                                    <Text style={[styles.text, { color: item.status === 'Submitted' ? '#000000' : item.status === 'Decline' ? '#FF0000' : item.status === 'Approved' ? '#54A400' : '#FA6400' }]}>{item.status}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    } />}

                </View>

            </View >

        </View >

    );

}

LoanScreen.navigationOptions = {
    header: null,
};

export default LoanScreen;