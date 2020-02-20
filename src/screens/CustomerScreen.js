import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, FlatList, TextInput, ScrollView } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment'
import styles from '../styles/styles'
import { CustomButton } from '../components/Custom'
import LayoutA from '../Layout/LayoutA';
const CustomerScreen = (props) => {

    useEffect(() => {
        dispatch(actionCreator.getCustomerList())
    }, [customerList])
    const dispatch = useDispatch()
    const { customerList, filteredCustomerList, filterEnabled } = useSelector(state => state.customerReducer, shallowEqual)

    return (


        < LayoutA
            title={'CUSTOMER LIST'}
            screenType='form'
            navigation={props.navigation}
            nopadding
        >
            <View style={[{ flex: 9 }]}>
                <View style={[styles.screenMargin]}>
                    <View style={{ marginTop: 10, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'flex-end', paddingRight: 10 }}>
                        <CustomButton
                            navigation={() => props.navigation.navigate('CustomerAdd')}
                            label={'Add Customer'}
                            boxStyle={{ backgroundColor: '#34C2DB' }}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, flex: 1, borderWidth: 1, borderColor: 'lightgrey', padding: 10, borderRadius: 10 }}>
                                <View>
                                    <Ionicons name="ios-search" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                                </View>
                                <TextInput placeholder='Please Enter Keyword' style={[styles.searchBar, { flex: 4 }]} />
                                <TouchableOpacity onPress={props.navigation.openDrawer} >
                                    <Ionicons name="ios-options" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView>
                            {customerList && <FlatList data={filterEnabled ? filteredCustomerList : customerList} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) =>
                                <View style={styles.box}>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                            <Text style={styles.small}>{moment(item.created_at).format("MMMM Do YYYY, h:mm:ss a")}</Text>
                                            <Ionicons name="md-arrow-dropright" color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                                        </View>
                                    </View>
                                    <View><TouchableOpacity onPress={() => dispatch(actionCreator.deleteCustomer(item.id))}><Text>Delete</Text></TouchableOpacity></View>
                                    <View style={{ flexDirection: 'row', alignContent: 'stretch', marginTop: 20 }}>
                                        <View style={{ flex: 2.7 }}>
                                            <Text style={styles.small}>Name</Text>
                                            <Text style={[styles.text]}>{item.name}</Text>
                                        </View>
                                        <View style={{ flex: 5.5 }}>
                                            <Text style={styles.small}>Email</Text>
                                            <Text style={styles.text}>{item.email}</Text>
                                        </View>
                                        <View style={{ flex: 1.5 }}>
                                            <Text style={styles.small}>Currency</Text>
                                            <Text style={[styles.text]}>{item.currency}</Text>
                                        </View>
                                    </View>
                                </View>
                            } />}
                        </ScrollView>
                    </View>
                </View>
            </View >
       </ LayoutA>

    );
}



export default CustomerScreen;