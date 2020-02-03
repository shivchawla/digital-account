import React, { useEffect, useState } from 'react';
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
    const [onScreenFilter, setOnScreenFilter] = useState(false)
    const [onScreenFilteredList, setOnScreenFilteredList] = useState([])

    const searchList = (val) => {
        console.log(`keyword  ialah : ${val}`)
        if (val) {
            setOnScreenFilter(true)
            const newList = []
            invoiceList.map(b => {
                b.invoice_number.includes(val) ? newList.push(b) : b.customer_name.includes(val) ? newList.push(b) : b.currency_code.includes(val) ? newList.push(b) : b.amount.toFixed(2).includes(val) ? newList.push(b) : b.customer_phone.includes(val) ? newList.push(b) : b.customer_email.includes(val) ? newList.push(b) : false
            })
            console.log(`new list length ialah : ${newList.length}`)
            setOnScreenFilteredList(newList)

        } else {
            setOnScreenFilteredList([])
            setOnScreenFilter(false)
        }

    }

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
                    <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                    </View>
                </View>
            </View>
            <View style={{ flex: 9 }}>
                <ScrollView style={[styles.screenMargin]}>
                    <View style={{ marginTop: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('NewInvoice')} style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20, backgroundColor: '#34C2DB', borderRadius: 20 }}>
                            <Text style={[styles.text, { color: '#fff' }]}>New Invoice</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, flex: 1, borderWidth: 1, borderColor: 'lightgrey', padding: 10, borderRadius: 10 }}>
                                <View>
                                    <Ionicons name="ios-search" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                                </View>
                                <TextInput placeholder='Please Enter Keyword' style={{ flex: 4 }} onChangeText={(val) => searchList(val)} />
                                <TouchableOpacity onPress={props.navigation.openDrawer} >
                                    <Ionicons name="ios-options" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {invoiceList && <FlatList data={filterEnabled ? filterInvoicesList : onScreenFilter ? onScreenFilteredList : invoiceList} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) =>
                            <View style={styles.box}>
                                <TouchableWithoutFeedback onPress={() => dispatch(actionCreator.setMarker(index))} style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                        <Text style={styles.small}>{moment(item.invoice_date).format('MMMM Do YYYY')}</Text>
                                        <Ionicons name={item.marker ? "md-arrow-dropdown" : "md-arrow-dropright"} color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={{ flexDirection: 'row', marginTop: 5, borderBottomWidth: item.marker ? 1 : 0, borderBottomColor: 'lightgrey', }}>
                                    <View style={{ flex: 1, paddingBottom: 5 }}>
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
                                </View>}
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