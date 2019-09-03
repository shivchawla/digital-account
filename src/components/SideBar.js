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
            <View style={{ padding: 10 }}>

                <View style={{ marginBottom: 20, marginTop: 20 }}>
                    <TouchableOpacity onPress={() => props.nav('Dashboard')} style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Image source={require('../assets/images/dashboard.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        <Text style={[styles.text, { color: '#fff', fontSize: 20, marginLeft: 15 }]}>Dashboard</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 20, marginTop: 20 }}>
                    <TouchableOpacity onPress={() => props.nav('Account')} style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Image source={require('../assets/images/account.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        <Text style={[styles.text, { color: '#fff', fontSize: 20, marginLeft: 15 }]}>Account</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 20, marginTop: 20 }}>
                    <TouchableOpacity onPress={() => props.nav('LoanApplication')} style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Image source={require('../assets/images/application.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        <Text style={[styles.text, { color: '#fff', fontSize: 20, marginLeft: 15 }]}>Application</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 20, marginTop: 20 }}>
                    <TouchableOpacity onPress={() => props.nav('Invoice')} style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Image source={require('../assets/images/invoice.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        <Text style={[styles.text, { color: '#fff', fontSize: 20, marginLeft: 15 }]}>Invoice</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 20, marginTop: 20 }}>
                    <TouchableOpacity onPress={() => props.nav('Transfer')} style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Image source={require('../assets/images/expenses.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        <Text style={[styles.text, { color: '#fff', fontSize: 20, marginLeft: 15 }]}>Expense</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 20, marginTop: 20 }}>
                    <TouchableOpacity onPress={() => props.nav('Report')} style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Image source={require('../assets/images/report.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        <Text style={[styles.text, { color: '#fff', fontSize: 20, marginLeft: 15 }]}>Report</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 20, marginTop: 20 }}>
                    <TouchableOpacity onPress={() => props.nav('BusinessHub')} style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Image source={require('../assets/images/businesshub.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        <Text style={[styles.text, { color: '#fff', fontSize: 20, marginLeft: 15 }]}>Business Hub</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 20, marginTop: 20 }}>
                    <TouchableOpacity onPress={() => props.nav('Support')} style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Image source={require('../assets/images/report.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        <Text style={[styles.text, { color: '#fff', fontSize: 20, marginLeft: 15 }]}>Support</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 20, marginTop: 20 }}>
                    <TouchableOpacity onPress={() => props.nav('Settings')} style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Image source={require('../assets/images/setting.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        <Text style={[styles.text, { color: '#fff', fontSize: 20, marginLeft: 15 }]}>Settings</Text>
                    </TouchableOpacity>
                </View>
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