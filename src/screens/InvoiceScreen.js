import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import Dot from '../components/Dot'
import AniqDrawer from '../components/AniqDrawer'

import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const InvoiceScreen = (props) => {

    return (
        <View style={{ flex: 1, }}>
            <AniqDrawer aniq = {props.navigation}/>
            <View style={{ flex: 9, padding: 10 }}>
                <View style={{ marginTop: 10 }}>
                    <View style={{flexDirection:'row', marginTop:5, marginBottom:15, alignItems: 'center'}}>
                        <Dot color='#A20F0F' />
                        <Text style={styles.text}>Withdrawal Transfer</Text>
                        <Text style={[styles.text, { color: 'red' }]}>-MYR 50.00</Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop:5, marginBottom:15, alignItems: 'center'}}>
                        <Dot color='red' />
                        <Text style={styles.text}>Account Transfer</Text>
                        <Text style={[styles.text, { color: 'red' }]}>-MYR 46.00</Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop:5, marginBottom:15, alignItems: 'center'}}>
                        <Dot color='green' />
                        <Text style={styles.text}>Disbursement Transfer</Text>
                        <Text style={[styles.text, { color: 'green' }]}>+MYR 4952.00</Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop:5, marginBottom:15, alignItems: 'center'}}>
                        <Dot color='red' />
                        <Text style={styles.text}>Account Transfer</Text>
                        <Text style={[styles.text, { color: 'red' }]}>-MYR 100.00</Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop:5, marginBottom:15, alignItems: 'center'}}>
                        <Dot color='red' />
                        <Text style={styles.text}>Account Transfer</Text>
                        <Text style={[styles.text, { color: 'red' }]}>-MYR 60.00</Text>
                    </View>
                </View>
            </View>
        </View >

    );
}

InvoiceScreen.navigationOptions = {
    header: null,
};

export default InvoiceScreen;