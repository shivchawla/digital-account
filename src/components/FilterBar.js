import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    TextInput
} from 'react-native';
import Layout from '../constants/Layout'
import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

const FilterBar = (props) => {

    const nav = (screen) => {
        props.close()
        props.nav(screen)
    }

    const [type, setType] = useState(null)
    const [status, setStatus] = useState(null)

    const filterLoanList = () => {
        console.log(`type : ${type} and status : ${status}`)
        const values = { type, status }
        dispatch(actionCreator.filterLoanList(values))
    }

    const dispatch = useDispatch()

    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
            <View style={{ padding: 10, flex: 1, justifyContent: 'space-evenly' }}>
                <View style={{ flex: 9, margin: 10 }}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.h3, { marginBottom: 5 }]}>Type</Text>
                        <TextInput onChangeText={(val) => setType(val)} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} keyboardType={'decimal-pad'} />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.h3, { marginBottom: 5 }]}>Status</Text>
                        <TextInput onChangeText={(val) => setStatus(val)} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
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

                <TouchableOpacity onPress={() => filterLoanList()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }} >
                    <Text style={[styles.textDefault, { color: '#fff' }]}>Filter</Text>
                </TouchableOpacity>

            </View>

        </View >

    );
}

export default FilterBar