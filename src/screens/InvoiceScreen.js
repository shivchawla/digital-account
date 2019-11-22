import React, { useEffect } from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, Image, FlatList, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment'
import styles from '../styles/styles'

const InvoiceScreen = (props) => {
    useEffect(() => {
        dispatch(actionCreator.getInvoiceList())
    }, [invoiceList])
    const dispatch = useDispatch()
    const { invoiceList, filterInvoicesList, filterEnabled } = useSelector(state => state.invoiceReducer, shallowEqual)

    return (

        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
            <View style={[{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]}>INVOICE</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </View>
            </View>
            <View style={{ flex: 9 }}>
                <ScrollView style={[styles.screenMargin]}>
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
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, flex: 1, borderWidth: 1, borderColor: 'lightgrey', padding: 10, borderRadius: 10 }}>
                                <View>
                                    <Ionicons name="ios-search" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                                </View>
                                <TextInput placeholder='Please Enter Keyword' style={{ flex: 4 }} />
                                <TouchableOpacity onPress={props.navigation.openDrawer} >
                                    <Ionicons name="ios-options" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {invoiceList && <FlatList data={filterEnabled ? filterInvoicesList : invoiceList} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) =>
                            <View style={styles.box}>
                                <TouchableWithoutFeedback onPress={() => dispatch(actionCreator.setMarker(index))} style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                        <Text style={styles.small}>{moment(item.invoice_date).format('MMMM Do YYYY')}</Text>
                                        <Ionicons name={item.marker ? "md-arrow-dropdown" : "md-arrow-dropright"} color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={{ flexDirection: 'row', marginTop: 5, borderBottomWidth: item.marker ? 1 : 0, borderBottomColor: 'lightgrey', }}>
                                    <View style={{ flex: 1,paddingBottom:5 }}>
                                        <Text style={styles.text}>{item.invoice_number}</Text>
                                    </View>
                                </View>
                                {item.marker && <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.small}>Name</Text>
                                            <Text style={styles.text}>{item.customer_name}</Text>
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
                </ScrollView>
            </View >
        </KeyboardAvoidingView>
    );
}

InvoiceScreen.navigationOptions = {
    header: null,
};

export default InvoiceScreen;