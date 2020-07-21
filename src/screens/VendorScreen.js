import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, FlatList, TextInput, ScrollView } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment'
import styles from '../styles/styles'
import { CustomButton } from '../components/Custom'
import LayoutA from '../Layout/LayoutA';
const VendorScreen = (props) => {

    useEffect(() => {
        dispatch(actionCreator.getVendorList())
    }, [vendorList])
    const dispatch = useDispatch()
    const { vendorList, filteredVendorList, filterEnabled } = useSelector(state => state.vendorReducer, shallowEqual)

    return (


        < LayoutA
            title={'VENDOR LIST'}
            screenType='form'
            navigation={props.navigation}
            nopadding
        >
            <View style={[{ flex: 9 }]}>
                <View style={{ marginTop: 10, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'flex-end', paddingLeft: 20, paddingRight: 30 }}>
                    <CustomButton
                        navigation={() => props.navigation.navigate('VendorApplication')}
                        label={'Add Vendor'}
                        boxStyle={{ backgroundColor: '#34C2DB' }}
                    />
                </View>

                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingLeft: 20, paddingRight: 30  }}>
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
                    {vendorList && <FlatList contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }} data={filterEnabled ? filteredVendorList : vendorList} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) =>
                        // <TouchableOpacity onPress={() => props.navigation.navigate('VendorDetail', { id: item.id })} style={styles.box}>
                        <View style={styles.box}>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                    <Text style={styles.small}>{moment(item.created_at).format("MMMM Do YYYY, h:mm:ss a")}</Text>
                                    <Ionicons name="md-arrow-dropright" color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                                </View>
                            </View>
                            <View><TouchableOpacity onPress={() => dispatch(actionCreator.deleteVendor(item.id))}><Text>Delete</Text></TouchableOpacity></View>

                            <View style={{ flexDirection: 'row', alignContent: 'stretch', marginTop: 20 }}>
                                <View style={{ flex: 2.7 }}>
                                    <Text style={styles.small}>Name</Text>
                                    <Text style={[styles.text]}>{item.name}</Text>
                                </View>
                                <View style={{ flex: 3 }}>
                                    <Text style={styles.small}>Email</Text>
                                    <Text style={styles.text}>{item.email}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignContent: 'stretch', marginTop: 20 }}>
                                <View style={{ flex: 2.7 }}>
                                    <Text style={styles.small}>Currency</Text>
                                    <Text style={[styles.text]}>{item.currency}</Text>
                                </View>
                                <View style={{ flex: 3 }}>
                                    <Text style={styles.small}>Address</Text>
                                    <Text style={styles.text}>{item.address}</Text>
                                </View>
                            </View>
                        </View>
                    } />}
                </View>
            </View>

        </LayoutA>

    );
}


export default VendorScreen;