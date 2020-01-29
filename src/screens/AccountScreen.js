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
            <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: 'rgba(163, 0, 0, 0.5)' }]}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#DE4848'} style={{ fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]}>ACCOUNT: {account_no}</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <View style={{ backgroundColor:'rgba(163, 0, 0, 0.5)',borderColor: "#DE4848", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
          </View>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 9 }}>
                <ScrollView style={[styles.screenMargin]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.h2, { marginBottom: 10, marginTop: 10 }]}>Account Information</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 5 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 15 }} >
                            <Image source={require('../assets/images/accountNumber.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={[styles.text, { marginLeft: 10 }]}>Account Number</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={[styles.boldText, { color: 'black', marginLeft: 15 }]}>{account_no}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 5 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 15 }} >
                            <Image source={require('../assets/images/accountType.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={[styles.text, { marginLeft: 10 }]}>Account Type</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={[styles.boldText, { color: 'black', marginLeft: 45 }]}>{type}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 5 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 15 }} >
                            <Image source={require('../assets/images/balanceReport.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={[styles.text, { marginLeft: 10 }]}>Balance Report</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={[styles.boldText, { color: 'black', marginLeft: 30 }]}>{currency} {balance}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 5 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 15 }} >
                            <Image source={require('../assets/images/accountStatus.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={[styles.text, { marginLeft: 10 }]}>Account Status</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                            {status == 'activated' ? <Text style={[styles.text, { color: '#00FD04', marginLeft: 30 }]}>Active</Text> : <Text style={[styles.text, { color: 'lightgrey', marginLeft: 30 }]}>Inactive</Text>}
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