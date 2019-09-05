import React from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Text,
    Image
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'
import styles from '../styles/styles'
const SideBar = (props) => {

    const nav = (screen) => {
        props.close()
        props.nav(screen)
    }

    return (
        <LinearGradient
            colors={['#80A0FD', '#4F6DFB']}
            style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
            <View style={{ padding: 10, flex: 1, justifyContent: 'space-evenly' }}>
                <TouchableOpacity onPress={() => nav('Dashboard')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../assets/images/dashboard.png')} style={{ width: 40, height: 40 }} resizeMode={'contain'} />
                    <Text style={[styles.text, { color: '#fff', marginLeft: 15 }]}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => nav('Account')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../assets/images/account.png')} style={{ width: 40, height: 40 }} resizeMode={'contain'} />
                    <Text style={[styles.text, { color: '#fff', marginLeft: 15 }]}>Account</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => nav('Loan')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../assets/images/application.png')} style={{ width: 40, height: 40 }} resizeMode={'contain'} />
                    <Text style={[styles.text, { color: '#fff', marginLeft: 15 }]}>Application</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => nav('Invoice')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../assets/images/invoice.png')} style={{ width: 40, height: 40 }} resizeMode={'contain'} />
                    <Text style={[styles.text, { color: '#fff', marginLeft: 15 }]}>Invoice</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => nav('Transfer')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../assets/images/expenses.png')} style={{ width: 40, height: 40 }} resizeMode={'contain'} />
                    <Text style={[styles.text, { color: '#fff', marginLeft: 15 }]}>Expenses</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => nav('Report')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../assets/images/report.png')} style={{ width: 40, height: 40 }} resizeMode={'contain'} />
                    <Text style={[styles.text, { color: '#fff', marginLeft: 15 }]}>Report</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => nav('BusinessHub')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../assets/images/business-hub.png')} style={{ width: 40, height: 40 }} resizeMode={'contain'} />
                    <Text style={[styles.text, { color: '#fff', marginLeft: 15 }]}>Business Hub</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => nav('Support')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../assets/images/support1.png')} style={{ width: 40, height: 40 }} resizeMode={'contain'} />
                    <Text style={[styles.text, { color: '#fff', marginLeft: 15 }]}>Support</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => nav('DataSetting')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../assets/images/setting.png')} style={{ width: 40, height: 40 }} resizeMode={'contain'} />
                    <Text style={[styles.text, { color: '#fff', marginLeft: 15 }]}>Settings</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient >
    );
}



export default SideBar