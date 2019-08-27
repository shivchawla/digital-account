import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import AniqHeader from '../components/Aniq'

import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const AccountScreen = (props) => {

    return (
        <View style={{ flex: 1, }}>
            <AniqHeader aniq = {props.navigation} warna = {'yellow'} kepala = {'pink'} tajuk={'Account Info'}/>
            <View style={{ flex: 9, padding: 10 }}>
                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[styles.h2, {marginBottom:30}]}>Latest Transaction</Text>                        
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.text, {marginBottom:10}]}>Account Number</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, {marginBottom:10}]}>123456789</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.text, {marginBottom:10}]}>Account Type</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, {marginBottom:10}]}>Business</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.text, {marginBottom:10}]}>Balance</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, {marginBottom:10}]}>RM18,839.00</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.text, {marginBottom:10}]}>Status</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, {color: 'green', marginBottom:10}]}>Active</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>

    );
}

AccountScreen.navigationOptions = {
    header: null,
};

export default AccountScreen;