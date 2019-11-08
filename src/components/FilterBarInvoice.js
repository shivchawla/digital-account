import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, Picker } from 'react-native';
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'
import { useDispatch } from 'react-redux'

const FilterBarInvoice = (props) => {

    const nav = (screen) => {
        props.close()
        props.nav(screen)
    }

    const [currency_code, setCurrencyCode] = useState(null)
    const [customer_name, setCustomerName] = useState(null)

    const filterInvoicesList = async () => {
        console.log(`currency_code : ${currency_code} and customer_name : ${customer_name}`)
        const values = { currency_code, customer_name }
        await dispatch(actionCreator.filterInvoicesList(values))
    }

    const dispatch = useDispatch()

    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
            <View style={{ padding: 10, flex: 1, justifyContent: 'space-evenly' }}>
                <View style={{ flex: 9, margin: 10 }}>
                    <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', marginBottom: 10 }}>
                        <Text style={[styles.h3, { marginBottom: 5 }]}>Currency</Text>
                        <Picker style={{ height: 35 }} selectedValue={currency_code} onValueChange={(val) => setCurrencyCode(val)} >
                            <Picker.Item label={'MYR'} value={'myr'} />
                        </Picker>
                    </View>
                    <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', marginBottom: 10 }}>
                        <Text style={[styles.h3, { marginBottom: 5 }]}>Name</Text>
                        <Picker style={{ height: 35 }} selectedValue={customer_name} onValueChange={(val) => setCustomerName(val)} >
                            <Picker.Item label={'Adiyaaa Aloyaa'} value={'aa'} />
                        </Picker>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.h3, { marginBottom: 5 }]}>Date</Text>
                        <TextInput style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', margin: 5, justifyContent: 'center' }}>
                <TouchableOpacity style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                    <Text style={[styles.textDefault, { color: 'black' }]}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => filterInvoicesList()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }} >
                    <Text style={[styles.textDefault, { color: '#fff' }]}>Filter</Text>
                </TouchableOpacity>
            </View>
        </View >

    );
}

export default FilterBarInvoice