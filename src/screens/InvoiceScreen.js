import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, Image, FlatList, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment'
import styles from '../styles/styles'
import LayoutA from '../Layout/LayoutA';
import { CustomButton } from '../components/Custom'
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
                b.invoice_number.includes(val) ? newList.push(b) : b.customer_name.includes(val) ? newList.push(b) : b.currency.includes(val) ? newList.push(b) : b.amount.toFixed(2).includes(val) ? newList.push(b) : b.customer_phone.includes(val) ? newList.push(b) : b.customer_email.includes(val) ? newList.push(b) : false
            })
            console.log(`new list length ialah : ${newList.length}`)
            setOnScreenFilteredList(newList)

        } else {
            setOnScreenFilteredList([])
            setOnScreenFilter(false)
        }

    }


    return (

        <LayoutA title={'INVOICE'} navigation={props.navigation} nopadding>
            <View style={{ marginTop: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingLeft: 20, paddingRight: 30 }}>
                <CustomButton
                    navigation={() => props.navigation.navigate('NewInvoice')}
                    label={'New Invoice'}
                    boxStyle={{ backgroundColor: '#34C2DB' }}
                />
            </View>
            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10, paddingLeft: 20, paddingRight: 30 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, flex: 1, borderWidth: 1, borderColor: 'lightgrey', padding: 10, borderRadius: 10 }}>
                        <View>
                            <Ionicons name="ios-search" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                        </View>
                        <TextInput placeholder='Please Enter Keyword' 
                        style={[styles.searchBar, { flex: 4 }]} 
                        //onChangeText={(val) => searchList(val)}
                        //disabled function search temporarily since API no longer support it

                         />
                        <TouchableOpacity 
                        //onPress={props.navigation.openDrawer} 
//do nothing first until we know what to filter
                        >
                            <Ionicons name="ios-options" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                {invoiceList && <FlatList contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }} data={filterEnabled ? filterInvoicesList : onScreenFilter ? onScreenFilteredList : invoiceList} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) =>
                    <View style={styles.box}>
                        <TouchableWithoutFeedback onPress={() => dispatch(actionCreator.setMarker(index))} style={{ flexDirection: 'row', marginTop: 5 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                <Text style={styles.small}>{item.invoice_number}</Text>
                                <Ionicons name={item.marker ? "md-arrow-dropdown" : "md-arrow-dropright"} color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{ flexDirection: 'row', marginTop: 5, borderBottomWidth: item.marker ? 1 : 0, borderBottomColor: 'lightgrey', paddingBottom: 10 }}>
                            <View style={{ flex: 1, paddingBottom: 5 }}>
                                <Text style={styles.small}>Issue </Text>
                                <Text style={styles.text}>{item.invoice_date}</Text>
                            </View>
                            <View style={{ flex: 1, paddingBottom: 5 }}>
                                <Text style={styles.small}>Due </Text>
                                <Text style={styles.text}>{item.due_date}</Text>
                            </View>

                        </View>
                        {!item.marker && <View style={{ flexDirection: 'row', marginTop: 5, }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>Currency</Text>
                                <Text style={styles.text}>{item.currency}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>Amount</Text>
                                <Text style={styles.text}>{item.amount}</Text>
                            </View>
                        </View>}
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
                                    <Text style={styles.text}>{item.currency}</Text>
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

        </LayoutA >
    );
}



export default InvoiceScreen;