import React from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Text
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons';
const SideBar = (props) => {

    return (
        <LinearGradient
            colors={['#80A0FD', '#4F6DFB']}
            style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
            <View style={{ padding: 10 }}>

                <TouchableOpacity onPress={() => props.nav('Dashboard')} style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Ionicons name="logo-buffer" color={'#fff'} style={{ fontSize: 30, paddingRight: 10 }} />
                    <Text style={[styles.text, { color: '#fff' }]}>Dashboard</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.nav('Account')} style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Ionicons name="ios-briefcase" color={'#fff'} style={{ fontSize: 30, paddingRight: 10 }} />
                    <Text style={[styles.text, { color: '#fff' }]}>Account</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.nav('LoanApplication')} style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Ionicons name="ios-create" color={'#fff'} style={{ fontSize: 30, paddingRight: 10 }} />
                    <Text style={[styles.text, { color: '#fff' }]}>Application</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.nav('Invoice')} style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Ionicons name="ios-pricetags" color={'#fff'} style={{ fontSize: 30, paddingRight: 10 }} />
                    <Text style={[styles.text, { color: '#fff' }]}>Invoice</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.nav('Transfer')} style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Ionicons name="logo-usd" color={'#fff'} style={{ fontSize: 30, paddingRight: 10 }} />
                    <Text style={[styles.text, { color: '#fff' }]}>Expense</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.nav('Report')} style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Ionicons name="ios-podium" color={'#fff'} style={{ fontSize: 30, paddingRight: 10 }} />
                    <Text style={[styles.text, { color: '#fff' }]}>Report</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.nav('BusinessHub')} style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Ionicons name="ios-link" color={'#fff'} style={{ fontSize: 30, paddingRight: 10 }} />
                    <Text style={[styles.text, { color: '#fff' }]}>Business Hub</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.nav('Support')} style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Ionicons name="ios-help-buoy" color={'#fff'} style={{ fontSize: 30, paddingRight: 10 }} />
                    <Text style={[styles.text, { color: '#fff' }]}>Support</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.nav('Settings')} style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Ionicons name="ios-settings" color={'#fff'} style={{ fontSize: 30, paddingRight: 10 }} />
                    <Text style={[styles.text, { color: '#fff' }]}>Settings</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient >
    );
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