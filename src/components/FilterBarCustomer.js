import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Picker } from 'react-native';
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'
import { useDispatch } from 'react-redux'

const FilterBarCustomer = (props) => {

    const nav = (screen) => {
        props.close()
        props.nav(screen)
    }

    const [currency, setCurrency] = useState(null)
    const [email, setEmail] = useState(null)

    const filterCustomerList = async () => {
        console.log(`currency : ${currency}and email : ${email}`)
        const values = { currency, email }
        //await  dispatch(actionCreator.getLoanList())
        await dispatch(actionCreator.filterCustomerList(values))
    }

    const dispatch = useDispatch()

    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
            <View style={{ padding: 10, flex: 1, justifyContent: 'space-evenly' }}>
                <View style={{ flex: 9, margin: 10 }}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.h3, { marginBottom: 5 }]}>Currency</Text>
                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                            <Picker style={{ height: 35 }} selectedValue={currency} onValueChange={(val) => setCurrency(val)} >
                                <Picker.Item label={'Please Select'} value={undefined} />
                                <Picker.Item label={'MYR'} value={'MYR'} />
                            </Picker>
                        </View>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.h3, { marginBottom: 5 }]}>Email</Text>
                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                            <Picker style={{ height: 35 }} selectedValue={email} onValueChange={(val) => setEmail(val)} >
                                <Picker.Item label={'Please Select'} value={undefined} />
                                <Picker.Item label={'imannajwamohdrazly@gmail.com'} value={'imannajwamohdrazly@gmail.com'} />
                                <Picker.Item label={'sarimah@gmail.com'} value={'sarimah@gmail.com'} />
                            </Picker>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', margin: 5, justifyContent: 'center' }}>
                <TouchableOpacity style={{ width: Layout.window.width * 0.2, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                    <Text style={[styles.textDefault, { color: 'black' }]}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => filterCustomerList()} style={{ width: Layout.window.width * 0.2, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }} >
                    <Text style={[styles.textDefault, { color: '#fff' }]}>Filter</Text>
                </TouchableOpacity>
            </View>
        </View >

    );
}

export default FilterBarCustomer