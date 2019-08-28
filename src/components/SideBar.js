import React from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Text,
    Image
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons';
const SideBar = (props) => {

    return (
        <LinearGradient
            colors={['#80A0FD', '#4F6DFB']}
            style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
            <View style={{ padding: 10, flexDirection: 'column', justifyContent: 'space-evenly' }}>

                <TouchableOpacity onPress={() => props.nav('Dashboard')} style={{ flexDirection: 'row', marginTop: 5, marginBottom: 15  }}>
                    <Image source={require('../assets/images/dashboard.png')}  style={{ width: 50, height: 50, paddingRight: 10, marginBottom: 15 }} />
                    <Text style={[styles.text, { color: '#fff', marginLeft: 20 }]}>Dashboard</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.nav('Account')} style={{ flexDirection: 'row', marginTop: 5, marginBottom: 15 }}>
                <Image source={require('../assets/images/account.png')}  style={{ width: 50, height: 50, paddingRight: 10, marginBottom: 15 }} />
                    <Text style={[styles.text, { color: '#fff', marginLeft: 20 }]}>Account</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.nav('LoanApplication')} style={{ flexDirection: 'row', marginTop: 5, marginBottom: 15 }}>
                <Image source={require('../assets/images/application.png')}  style={{ width: 50, height: 50, paddingRight: 10, marginBottom: 15 }} />
                    <Text style={[styles.text, { color: '#fff', marginLeft: 20 }]}>Loan Application</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.nav('Invoices')} style={{ flexDirection: 'row', marginTop: 5, marginBottom: 15 }}>
                <Image source={require('../assets/images/invoice.png')}  style={{ width: 50, height: 50, paddingRight: 10, marginBottom: 15 }} />
                    <Text style={[styles.text, { color: '#fff', marginLeft: 20 }]}>Invoice</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.nav('Settings')} style={{ flexDirection: 'row', marginTop: 5, marginBottom: 15 }}>
                <Image source={require('../assets/images/expenses.png')}  style={{ width: 50, height: 50, paddingRight: 10, marginBottom: 15 }} />
                    <Text style={[styles.text, { color: '#fff', marginLeft: 20 }]}>Expense</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.nav('Settings')} style={{ flexDirection: 'row', marginTop: 5, marginBottom: 15 }}>
                <Image source={require('../assets/images/report.png')}  style={{ width: 50, height: 50, paddingRight: 10, marginBottom: 15 }} />
                    <Text style={[styles.text, { color: '#fff', marginLeft: 20 }]}>Report</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.nav('BusinessCheck')} style={{ flexDirection: 'row', marginTop: 5, marginBottom: 15 }}>
                <Image source={require('../assets/images/business-hub.png')}  style={{ width: 50, height: 50, paddingRight: 10, marginBottom: 15 }} />
                    <Text style={[styles.text, { color: '#fff', marginLeft: 20 }]}>Business Hub</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.nav('Settings')} style={{ flexDirection: 'row', marginTop: 5, marginBottom: 15 }}>
                <Image source={require('../assets/images/support.png')}  style={{ width: 50, height: 50, paddingRight: 10, marginBottom: 15 }} />
                    <Text style={[styles.text, { color: '#fff', marginLeft: 20 }]}>Support</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.nav('Settings')} style={{ flexDirection: 'row', marginTop: 5, marginBottom: 15 }}>
                <Image source={require('../assets/images/setting.png')}  style={{ width: 50, height: 50, paddingRight: 10, marginBottom: 15 }} />
                    <Text style={[styles.text, { color: '#fff', marginLeft: 20 }]}>Settings</Text>
                </TouchableOpacity>
            </View>

        </LinearGradient >
    );
}

const Dot = (props) => {
    return (
        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: props.color, marginRight: 20 }} />
    )
}



const styles = StyleSheet.create({
    text: {
        fontSize: 17,
        fontFamily: 'Montserrat_medium',
        color: '#000'
    },
    title: {
        fontSize: 17,
        fontFamily: 'Montserrat_medium',
        color: '#4D6BFA',
        fontSize: 17 * 1.4
    },
    h3: {
        fontSize: 17,
        fontFamily: 'Montserrat_medium',
        color: '#000',
        fontSize: 17 * 1.2
    },
    h2: {
        fontSize: 17,
        fontFamily: 'Montserrat_medium',
        color: '#000',
        fontSize: 17 * 1.3
    },
    h1: {
        fontSize: 17,
        fontFamily: 'Montserrat_medium',
        color: '#000',
        fontSize: 17 * 1.4
    }, small: {
        fontSize: 17,
        fontFamily: 'Montserrat_medium',
        color: '#000',
        fontSize: 17 * 0.8
    }
})

export default SideBar