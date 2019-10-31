import React, { useEffect } from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const InvoiceScreen = (props) => {
    useEffect(() => {
        dispatch(actionCreator.getInvoiceList())
    }, [invoiceList])
    const dispatch = useDispatch()
    const { invoiceList } = useSelector(state => state.invoiceReducer, shallowEqual)

    return (

        <View style={{ flex: 1, }}>
            <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={props.navigation.openDrawer} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="md-more" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title, { color: '#055E7C' }]}>Invoice</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </TouchableOpacity>
            </View>
            <View style={[styles.screenMargin, { flex: 9 }]}>
                <View style={{ marginTop: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('NewInvoice')} style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20, backgroundColor: '#34C2DB', borderRadius: 20 }}>
                        <Text style={[styles.text, { color: '#fff' }]}>New Invoice</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Aging')} style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20, backgroundColor: '#055E7C', borderRadius: 20 }}>
                        <Text style={[styles.text, { color: '#fff' }]}>Aging Report</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
                        <TouchableOpacity onPress={props.navigation.openDrawer} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                            <Text style={[styles.small, { paddingRight: 5, color: '#055E7C' }]}>Search</Text>
                            <Ionicons name="ios-search" color={'#055E7C'} style={{ fontSize: 15, paddingRight: 5 }} />
                        </TouchableOpacity>
                    </View>

                    {invoiceList && <FlatList data={invoiceList} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) =>
                        <View style={styles.box}>
                            <TouchableWithoutFeedback onPress={() => dispatch(actionCreator.setMarker(index))} style={{ flexDirection: 'row', marginTop: 5 }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                    <Text style={styles.small}>Invoice No</Text>
                                    <Ionicons name={item.marker ? "md-arrow-dropdown" : "md-arrow-dropright"} color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={{ flexDirection: 'row', marginTop: 5, borderBottomWidth: item.marker ? 1 : 0, borderBottomColor: 'lightgrey', }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.text}>{item.invoice_number}</Text>
                                </View>
                            </View>
                            {item.marker && <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.small}>Name</Text>
                                        <Text style={styles.text}>{item.customer_name}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.small}>Date</Text>
                                        <Text style={styles.text}>{item.invoice_date}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.small}>Currency</Text>
                                        <Text style={styles.text}>{item.currency_code}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.small}>Amount</Text>
                                        <Text style={styles.text}>{item.amount}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.small}>Phone Number</Text>
                                        <Text style={styles.text}>{item.customer_phone}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.small}>Email</Text>
                                        <Text style={styles.text}>{item.customer_email}</Text>
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

InvoiceScreen.navigationOptions =
    {
        header: null,
    };

export default InvoiceScreen;