import React from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView, } from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const AccountScreen = (props) => {

    const { business_name, business_reg_no, contact_no, support_email, business_address, business_postcode, status } = useSelector(state => state.merchantInfoReducer, shallowEqual)

    const { balance, currency, account_no, type } = useSelector(state => state.myAccountReducer, shallowEqual)

    return (

        <View style={{ flex: 1 }}>
            <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]}>ACCOUNT: {account_no}</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 9 }}>
                <ScrollView style={[styles.screenMargin]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.h2, { marginBottom: 10, marginTop: 10 }]}>Account Information</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 5, flex: 1, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 15, flex: 1 }} >
                            <Image source={require('../assets/images/accountNumber.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                            <Text style={[styles.label, { marginLeft: 5 }]}>Account</Text>
                        </View>
                        <Text style={[styles.value, { color: 'black', marginLeft: 10, flex: 2, }]}>{account_no}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 5, flex: 1, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 15,flex:1 }} >
                            <Image source={require('../assets/images/accountType.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                            <Text style={[styles.label, { marginLeft: 5 }]}>Type</Text>
                        </View>
                        <Text style={[styles.value, { color: 'black', marginLeft: 10, flex: 2, }]}>{type}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 5, flex: 1, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 15,flex:1 }} >
                            <Image source={require('../assets/images/balanceReport.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                            <Text style={[styles.label, { marginLeft: 5 }]}>Balance</Text>
                            </View>
                            <Text style={[styles.value, { color: 'black', marginLeft: 10, flex: 2, }]}>{currency} {balance}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 5, flex: 1, alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 15,flex:1 }} >
                                <Image source={require('../assets/images/accountStatus.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                                <Text style={[styles.label, { marginLeft: 5 }]}>Status</Text>
                            </View>
                            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start',flex:2 }} >
                                {status == 'activated' ? <View style={{ paddingTop: 16, paddingBottom: 16, paddingLeft: 18, paddingRight: 18, borderRadius: 15, backgroundColor: '#00d800',marginLeft:10 }}>
                                    <Text style={[styles.text, { color: 'white' }]}>Active</Text>
                                </View> : <View style={{ paddingTop: 16, paddingBottom: 16, paddingLeft: 18, paddingRight: 18, borderRadius: 15, backgroundColor: 'lightgrey', marginLeft: 10 }}>
                                        <Text style={[styles.text, { color: 'black' }]}>Inactive</Text>
                                    </View>}
                            </View>
                        </View>
                </ScrollView>
            </View>
            </View >

            );
        
        }
        
AccountScreen.navigationOptions = {
                header: null,
        };
        
export default AccountScreen;