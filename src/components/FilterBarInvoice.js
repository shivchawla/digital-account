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
    const [status, setStatus] = useState(null)

    const filterInvoicesList = async () => {
        console.log(`currency_code : ${currency_code} and status : ${status}`)
        const values = { currency_code, status }
        await dispatch(actionCreator.filterInvoicesList(values))
    }

    const dispatch = useDispatch()

    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
            <View style={{ padding: 10, flex: 1, justifyContent: 'space-evenly' }}>
                <View style={{ flex: 9, margin: 10 }}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.h3, { marginBottom: 5 }]}>Currency</Text>
                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                            <Picker style={{ height: 35 }} selectedValue={currency_code} onValueChange={(val) => setCurrencyCode(val)} >
                                <Picker.Item label={'Please Select'} value={undefined} />
                                <Picker.Item label={'MYR'} value={'MYR'} />
                            </Picker>
                        </View>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.h3, { marginBottom: 5 }]}>Status</Text>
                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                            <Picker style={{ height: 35 }} selectedValue={status} onValueChange={(val) => setStatus(val)} >
                                <Picker.Item label={'Please Select'} value={undefined} />
                                <Picker.Item label={'Draft'} value={'Draft'} />
                                <Picker.Item label={'Paid'} value={'Paid'} />
                                <Picker.Item label={'Sent'} value={'sent'} />
                            </Picker>
                        </View>
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