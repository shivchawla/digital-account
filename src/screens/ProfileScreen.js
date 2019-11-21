import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Image, } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const ProfileScreen = (props) => {
    useEffect(() => {
        retrieveMerchantInfo()
    }, [])

    const dispatch = useDispatch()
    const retrieveMerchantInfo = () => { dispatch(actionCreator.retrieveMerchantInfo()) }
    const {business_name,business_reg_no,contact_no,support_email,business_address,business_postcode,status} = useSelector(state => state.merchantInfoReducer, shallowEqual)


    const {balance,currency,account_no,type} = useSelector(state => state.myAccountReducer, shallowEqual)

    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]}>PROFILE</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </View>
            </View>
            <View style={[styles.screenMargin, { flex: 9 }]}>
                <View style={{ marginTop: 10, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20, backgroundColor: '#055E7C', borderRadius: 15 }}>
                        <Text style={[styles.text, { color: '#fff' }]}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 90, height: 90, borderWidth: 1, borderColor: '#055E7C' }} />
                </View>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
                        <Text style={[styles.h2]}>Personal Information</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.boldText]}>Account Number</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, { color: '#055E7C' }]}>{account_no}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.boldText]}>Account Type</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, { color: '#055E7C' }]}>{type}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.boldText]}>Balance</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, { color: '#055E7C' }]}>{currency} {balance.toFixed(2)}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.boldText]}>Status</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                        {status=='activated'?<Text style={[styles.text, { color: '#00FD04' }]}>Active</Text>:<Text style={[styles.text, { color: 'lightgrey' }]}>Inactive</Text>}
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
                        <Text style={[styles.h2]}>Business Information</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.boldText]}>Business Reg Number</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Text style={[styles.text, { color: '#055E7C' }]}>{business_reg_no}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.boldText]}>Business Name</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Text style={[styles.text, { color: '#055E7C' }]}>{business_name}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.boldText]}>Contact Number</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Text style={[styles.text, { color: '#055E7C' }]}>{contact_no}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.boldText]}>Email</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Text style={[styles.text, { color: '#055E7C' }]}>{support_email}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.boldText]}>Address</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Text style={[styles.text, { color: '#055E7C' }]}>{business_address}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

ProfileScreen.navigationOptions = {
    header: null,
};

export default ProfileScreen;