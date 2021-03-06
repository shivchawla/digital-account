import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const ProfileScreen = (props) => {
    // useEffect(() => {
    //     retrieveMerchantInfo()
    // }, [])

    const dispatch = useDispatch()
    //const retrieveMerchantInfo = () => { dispatch(actionCreator.retrieveMerchantInfo()) }
    const { business_name, business_reg_no, contact_no, support_email, business_address, business_postcode, status } = useSelector(state => state.merchantInfoReducer, shallowEqual)
    const { balance, currency, account_no, type } = useSelector(state => state.myAccountReducer, shallowEqual)
    const { first_name, last_name, email, name } = useSelector(state => state.personalInformationScreenReducer, shallowEqual)

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
                    <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                    </View>
                </View>
            </View>
            <View style={[{ flex: 9 }]}>
                <ScrollView style={[styles.screenMargin]}>
                    <View style={{ marginTop: 20, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ paddingTop: 13, paddingBottom: 13, paddingLeft: 15, paddingRight: 15, backgroundColor: '#055E7C', borderRadius: 15 }}>
                            <Text style={[styles.text, { color: '#fff', fontSize: 12 }]}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10 }}>
                        <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 1, width: 90, height: 90, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 60 }} />
                        </View>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
                            <Text style={[styles.h2]}>Personal Information</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.label]}>Name</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={[styles.value, { color: '#055E7C' }]}>{name} {!name && first_name} {!name && last_name}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.label]}>Email</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={[styles.value, { color: '#055E7C' }]}>{email}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.label]}>Account Number</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={[styles.value, { color: '#055E7C' }]}>{account_no}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.label]}>Account Type</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={[styles.value, { color: '#055E7C' }]}>{type}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.label]}>Balance</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={[styles.value, { color: '#055E7C' }]}>{currency} {balance ? balance : '0'}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.label]}>Status</Text>
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row', alignSelf: 'stretch', }}>
                                {status == 'activated' ? <Text style={[styles.value, { color: 'limegreen' }]}>Active</Text>
                                    : <Text style={[styles.value, { color: 'lightgrey' }]}>Inactive</Text>}
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
                            <Text style={[styles.h2]}>Business Information</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.label]}>Business Reg Number</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={[styles.value, { color: '#055E7C' }]}>{business_reg_no}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.label]}>Business Name</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={[styles.value, { color: '#055E7C' }]}>{business_name}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.label]}>Contact Number</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={[styles.value, { color: '#055E7C' }]}>{contact_no}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.label]}>Support Email</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={[styles.value, { color: '#055E7C' }]}>{support_email}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.label]}>Address</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={[styles.value, { color: '#055E7C' }]}>{business_address}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}



export default ProfileScreen;