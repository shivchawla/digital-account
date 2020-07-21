import React from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView, } from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import LayoutA from '../Layout/LayoutA';

const AccountScreen = (props) => {

    const { business_name, business_reg_no, contact_no, support_email, business_address, business_postcode, status } = useSelector(state => state.merchantInfoReducer, shallowEqual)

    const { balance, currency, account_no, type } = useSelector(state => state.myAccountReducer, shallowEqual)

    return (

        <LayoutA title={`ACCOUNT ${account_no}`} navigation={props.navigation}>

            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.h2, { marginBottom: 10, marginTop: 10 }]}>Account Information</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 5, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 15, flex: 1 }} >
                    <Image source={require('../assets/images/accountNumber.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                    <Text style={[styles.label, { marginLeft: 5 }]}>Account</Text>
                </View>
                <Text style={[styles.value, { color: 'black', marginLeft: 10, flex: 2, }]}>{account_no}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 5, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 15, flex: 1 }} >
                    <Image source={require('../assets/images/accountType.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                    <Text style={[styles.label, { marginLeft: 5 }]}>Type</Text>
                </View>
                <Text style={[styles.value, { color: 'black', marginLeft: 10, flex: 2, }]}>{type}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 5, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 15, flex: 1 }} >
                    <Image source={require('../assets/images/balanceReport.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                    <Text style={[styles.label, { marginLeft: 5 }]}>Balance</Text>
                </View>
                <Text style={[styles.value, { color: 'black', marginLeft: 10, flex: 2, }]}>{currency} {balance}</Text>

            </View>
            <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 5, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 15, flex: 1 }} >
                    <Image source={require('../assets/images/accountStatus.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                    <Text style={[styles.label, { marginLeft: 5 }]}>Status</Text>
                </View>
                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flex: 2, marginLeft: 10 }} >
                    {status == 'activated' ? <Text style={[styles.value, { color: 'limegreen' }]}>Active</Text>
                        : <Text style={[styles.value, { color: 'lightgrey' }]}>Inactive</Text>}
                </View>
            </View>


        </LayoutA >

    );

}



export default AccountScreen;