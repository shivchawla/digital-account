import React from 'react';
import { View, TouchableOpacity, Text, Image, FlatList, ScrollView } from 'react-native';
import styles from '../styles/styles'
import { Ionicons } from '@expo/vector-icons';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
// const transactionHistoryArray = [{ status: 'out', description: 'Withdrawal Transfer', amount: '- RM 50.00' },
// { status: 'out', description: 'Account Transfer', amount: '- RM 46.00' },
// { status: 'in', description: 'Disbursement Transfer', amount: '+ RM 52.00' },
// { status: 'out', description: 'Account Transfer', amount: '- RM 100.00' },
// { status: 'out', description: 'Withdrawal Transfer', amount: '- RM 60.00' }]



const TransactionHistoryScreen = (props) => {
    const { reportList } = useSelector(state => state.reportReducer, shallowEqual)
    return (
        <View style={{ flex: 1 }}>
            <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: 'rgba(163, 0, 0, 0.5)' }]}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#DE4848'} style={{ fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]}>ACCOUNT: 19927483</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <View style={{ backgroundColor:'rgba(163, 0, 0, 0.5)',borderColor: "#DE4848", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
          </View>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 9 }}>
                <ScrollView>
                    <View style={[styles.screenMargin]}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.h2, { marginBottom: 10, marginTop: 25 }]}>Transaction History</Text>
                        </View>
                        {reportList && <FlatList data={reportList.filter(rl => !rl.type.includes('Fee'))} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) =>
            <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', }}>
                <Ionicons name={item.credit_debit == 'DEBIT' ? "md-remove-circle-outline" : "md-add-circle-outline"} color={item.credit_debit == 'DEBIT' ? '#A20F0F' : '#7ED321'} style={{ fontSize: 12, paddingRight: 20 }} />
                <Text style={[styles.text, { fontSize: 12, color: 'darkgrey' }]}>{item.type} ({moment(item.updated_at).format('D/MM/YY')})</Text>
              </View>
              <View style={{}}>
                <Text style={[styles.text, { color: item.credit_debit == 'DEBIT' ? '#A20F0F' : '#7ED321', fontSize: 12 }]}>{item.credit_debit == 'DEBIT' ? '-' : '+'} {item.currency ? item.currency : 'MYR'} {item.amount}</Text>
              </View>
            </View>
          } />}
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