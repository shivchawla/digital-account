import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import Dot from '../components/Dot'

import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const BusinessCheckScreen = (props) => {

    return (
        <View style={{ flex: 1, }}>
            <View style={{ flexDirection: 'row', marginBottom: 30, borderColor: 'blue', borderWidth: 1, justifyContent:'space-between' }}>
                <Text style={{ color: 'blue' }}>Business Health Check</Text>
                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
            </View>
            <View style={{ flex: 9, padding: 10 }}>
                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[styles.text, { marginBottom: 30 }]}>Account Number</Text>
                        <Text style={[styles.text, { marginBottom: 30 }]}>71640860</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[styles.text, { marginBottom: 30 }]}>Balance</Text>
                        <Text style={[styles.text, { marginBottom: 30 }]}>MYR18 839.00</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[styles.text, { marginBottom: 30 }]}>Business Health Check Result</Text>
                        <Text style={[styles.text, { marginBottom: 30 }]}>80%</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[styles.text, { marginBottom: 30 }]}>Colour Indicator</Text>
                        <Dot color='green' />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent:'space-between' }}>
                            <Text style={[styles.text, { marginBottom: 10 }]}>Status</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'space-between', flexDirection:'row' }}>
                            <Text style={[styles.text, { color: 'green'}]}>Active</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>

    );
}

BusinessCheckScreen.navigationOptions = {
    header: null,
};

export default BusinessCheckScreen;