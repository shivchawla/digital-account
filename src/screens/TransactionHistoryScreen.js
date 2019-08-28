import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'
import Dot from '../components/Dot'
import { FlatList } from 'react-native-gesture-handler';

const transactionHistoryArray = [{ status: 'out', description: 'Withdrawal Transfer', amount: 50.00 },
{ status: 'out', description: 'Account Transfer', amount: 46.00 },
{ status: 'in', description: 'Disbursement Transfer', amount: 4952.00 },
{ status: 'out', description: 'Account Transfer', amount: 100.00 },
{ status: 'out', description: 'Withdrawal Transfer', amount: 60.00 }]

const TransactionHistoryScreen = (props) => {
    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#4D6BFA' }}>

                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>
                        Account: 19927483</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 9, padding: 10 }}>
                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.h2, { marginBottom: 10, marginTop: 10 }]}>Transaction History</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <FlatList
                            data={transactionHistoryArray}
                            renderItem={({ item }) =>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginTop: 10 }}>
                                        <Dot color={item.status === 'in' ? '#228B22' : '#8B0000'} />
                                        <Text style={[styles.text]}>{item.description}</Text>
                                    </View>
                                    <View style={{flex:1}}>
                                    <Text style={[styles.text, { marginTop: 10, marginRight: 10 }]}>{item.amount}</Text>
                                    </View>
                                </View>} />
                    </View>
                </View>
            </View >
        </View >
    );
}

TransactionHistoryScreen.navigationOptions = {
    header: null,
};

export default TransactionHistoryScreen