import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, FlatList, TextInput, ScrollView } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment'
import styles from '../styles/styles'

const VendorScreen = (props) => {

    useEffect(() => {
        dispatch(actionCreator.getVendorList())
    }, [vendorList])
    const dispatch = useDispatch()
    const { vendorList, filteredVendorList, filterEnabled } = useSelector(state => state.vendorReducer, shallowEqual)

    return (

        <View style={{ flex: 1, }}>
            <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('DataSetting')} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]}>VENDOR LIST</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={[{ flex: 9 }]}>
                <ScrollView style={[styles.screenMargin]}>
                    <View style={{ marginTop: 30, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'flex-end', paddingRight: 10 }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('VendorApplication')} style={{ paddingTop: 17, paddingBottom: 17, paddingLeft: 19, paddingRight: 19, backgroundColor: '#34C2DB', borderRadius: 15 }}>
                            <Text style={[styles.text, { color: '#fff' }]}>Add Vendor</Text>
                        </TouchableOpacity>
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
                        {vendorList && <FlatList data={filterEnabled ? filteredVendorList : vendorList} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) =>
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
                </ScrollView>
            </View >
        </View >

    );
}

VendorScreen.navigationOptions = {
    header: null,
};

export default VendorScreen;