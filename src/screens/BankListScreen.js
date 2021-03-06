import React, { useEffect } from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const BankListScreen = (props) => {
    // useEffect(() => {
    //     //dispatch(actionCreator.getInvoiceList())
    // }, [invoiceList])
    useEffect(() => {
        dispatch(actionCreator.bankList())
    }, [bankList])
    const dispatch = useDispatch()
    const { invoiceList } = useSelector(state => state.invoiceReducer, shallowEqual)
    const { bankList } = useSelector(state => state.bankListReducer, shallowEqual)



    return (

        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title, { color: '#055E7C' }]}>BANK</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={[styles.screenMargin, { flex: 9, paddingLeft: 0, paddingRight: 0 }]}>
                <View style={{ marginTop: 20, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'flex-end', paddingRight: 10 }}>
                    <View style={{ marginTop: 10, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('AddBank')} style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20, backgroundColor: '#055E7C', borderRadius: 20 }}>
                            <Text style={[styles.text, { color: '#fff' }]}>Add Bank</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    {bankList && <FlatList data={bankList} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) =>
                        <View style={styles.box}>
                            <TouchableWithoutFeedback onPress={() => dispatch(actionCreator.setMarkerBankList(index))} style={{ flexDirection: 'row', marginTop: 5 }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                    <Text style={styles.small}>{item.bank_name}</Text>
                                    <Ionicons name={item.marker ? "md-arrow-dropdown" : "md-arrow-dropright"} color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                                </View>
                            </TouchableWithoutFeedback>
                           
                            <View style={{ flexDirection: 'row', marginTop: 5, borderBottomWidth: item.marker ? 1 : 0, borderBottomColor: 'lightgrey', }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.text}>{item.account_no}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingRight: 10 }}>
                                <TouchableOpacity onPress={() => dispatch(actionCreator.deleteBank(item.id))} style={{ flexDirection: 'row', alignItems: 'center',  }}>
                                    <Text style={[styles.small, { paddingRight: 5, color: 'red' }]}>Remove </Text>
                                    <Ionicons name="md-close-circle-outline" color={'red'} style={{ fontSize: 15, paddingRight: 5 }} />
                                </TouchableOpacity>
                            </View>
                            {item.marker &&
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>Bank Name</Text>
                                            <Text style={styles.text}>{item.bank_name}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>Bank Address</Text>
                                            <Text style={styles.text}>{item.bank_address}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>Bank Country</Text>
                                            <Text style={styles.text}>{item.country}</Text>
                                        </View>
                                    </View>
                                </View>
                            }
                        </View>
                    } />}
                </View>
            </View >
        </View >
    );
}



export default BankListScreen;