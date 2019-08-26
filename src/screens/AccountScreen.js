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
            <AniqHeader aniq = {props.navigation} warna = {'yellow'} kepala = {'pink'} tajuk={'Account'}/>
            <View style={{ flex: 9, padding: 10 }}>
                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.h2}>Latest Transaction</Text>                        
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.text}>Account Number</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>123456789</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.text}>Account Type</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>Business</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.text}>Balance</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>RM18,839.00</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.text}>Balance</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>RM18,839.00</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.text}>Status</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>Active</Text>
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