import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    FlatList,
    ScrollView
} from 'react-native';

import styles from '../styles/styles'
import Dot from '../components/Dot'
import { Ionicons } from '@expo/vector-icons';

const transactionHistoryArray = [{ status: 'out', description: 'Withdrawal Transfer', amount: 'RM 50.00' },
{ status: 'out', description: 'Account Transfer', amount: 'RM 46.00' },
{ status: 'in', description: 'Disbursement Transfer', amount: 'RM 52.00' },
{ status: 'out', description: 'Account Transfer', amount: 'RM 100.00' },
{ status: 'out', description: 'Withdrawal Transfer', amount: 'RM 60.00' }]

const TransactionHistoryScreen = (props) => {

    return (

        <View style={{ flex: 1 }}>

            <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={props.navigation.openDrawer} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="md-more" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title, { color: '#055E7C' }]}>Account: 19927483</Text>
                </View>

                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </TouchableOpacity>

            </View>

            <View style={{ flex: 9 }}>

                <ScrollView>

                    <View style={[styles.screenMargin]}>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.h2, { marginBottom: 10, marginTop: 10 }]}>Transaction History</Text>
                        </View>

                        <FlatList
                            data={transactionHistoryArray}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>

                                <View style={{ flexDirection: 'row', marginTop: 5 }}>

                                    <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                        <Dot color={item.status === 'in' ? '#228B22' : '#8B0000'} />
                                        <Text style={[styles.text]}>{item.description}</Text>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.text, { marginTop: 10, marginRight: 5, color: item.status === 'in' ? '#228B22' : '#8B0000' }]}>{item.amount}</Text>
                                    </View>

                                </View>
                            } />

                    </View>

                </ScrollView>

            </View >

        </View >

    );
}

TransactionHistoryScreen.navigationOptions = {
    header: null,
};

export default TransactionHistoryScreen