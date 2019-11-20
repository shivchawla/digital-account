import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, Picker } from 'react-native';
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'
import { useDispatch } from 'react-redux'

const FilterBarReport = (props) => {

    const nav = (screen) => {
        props.close()
        props.nav(screen)
    }

    const [currency, setCurrency] = useState(null)
    const [type, setType] = useState(null)
    const [credit_debit, setCreditDebit] = useState(null)

    const filterReportList = async () => {
        console.log(`currency : ${currency} and type : ${type} and credit/debit : ${credit_debit}`)
        const values = { currency, type, credit_debit }
        await dispatch(actionCreator.filterReportList(values))

    }

    const dispatch = useDispatch()

    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
            <View style={{ padding: 10, flex: 1, justifyContent: 'space-evenly' }}>
                <View style={{ flex: 9, margin: 10 }}>
                    <View style={{ alignSelf: 'stretch', marginBottom: 10 }}>
                        <Text style={[styles.h3, { marginBottom: 5 }]}>Currency</Text>
                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                            <Picker style={{ height: 35 }} selectedValue={currency} onValueChange={(val) => setCurrency(val)} >
                                <Picker.Item label={'Please Select'} value={undefined} />
                                <Picker.Item label={'MYR'} value={'MYR'} />
                                <Picker.Item label={'IDR'} value={'IDR'} />
                            </Picker>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'stretch', marginBottom: 10 }}>
                        <Text style={[styles.h3, { marginBottom: 5 }]}>Transaction Type</Text>
                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                            <Picker style={{ height: 35 }} selectedValue={type} onValueChange={(val) => setType(val)} >
                                <Picker.Item label={'Please Select'} value={undefined} />
                                <Picker.Item label={'Loan Payment'} value={'Loan Payment'} />
                                <Picker.Item label={'Disbursement Transfer'} value={'Disbursement Transfer'} />
                            </Picker>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'stretch', marginBottom: 10 }}>
                        <Text style={[styles.h3, { marginBottom: 5 }]}>Credit / Debit</Text>
                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                            <Picker style={{ height: 35, borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }} selectedValue={credit_debit} onValueChange={(val) => setCreditDebit(val)} >
                                <Picker.Item label={'Please Select'} value={undefined} />
                                <Picker.Item label={'Credit'} value={'CREDIT'} />
                                <Picker.Item label={'Debit'} value={'DEBIT'} />
                            </Picker>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', margin: 5, justifyContent: 'center' }}>
                <TouchableOpacity style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                    <Text style={[styles.textDefault, { color: 'black' }]}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => filterReportList()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }} >
                    <Text style={[styles.textDefault, { color: '#fff' }]}>Filter</Text>
                </TouchableOpacity>
            </View>
        </View >

    );
}

export default FilterBarReport