import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Picker } from 'react-native';
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'
import { useDispatch } from 'react-redux'

const FilterBarBusiness = (props) => {

    const nav = (screen) => {
        props.close()
        props.nav(screen)
    }

    const [industry, setIndustry] = useState(null)
    const [address, setAddress] = useState(null)

    const filterBusinessList = async () => {
        console.log(`industry : ${industry} and address : ${address} `)
        const values = { industry, address }
        await dispatch(actionCreator.filterBusinessList(values))

    }

    const dispatch = useDispatch()

    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
            <View style={{ padding: 10, flex: 1, justifyContent: 'space-evenly' }}>
                <View style={{ flex: 9, margin: 10 }}>
                    <View style={{ alignSelf: 'stretch', marginBottom: 10 }}>
                        <Text style={[styles.h3, { marginBottom: 5 }]}>Industry</Text>
                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                            <Picker style={{ height: 35 }} selectedValue={industry} onValueChange={(val) => setIndustry(val)} >
                                <Picker.Item label={'Please Select'} value={undefined} />
                                <Picker.Item label={'Karangkraf'} value={'Karangkraf'} />
                                <Picker.Item label={'Shipping'} value={'Shipping'} />
                                <Picker.Item label={'Heavy Machine'} value={'Heavy Machine'} />
                                <Picker.Item label={'Tourism'} value={'Perhotelan'} />
                                <Picker.Item label={'Information Technology'} value={'Techonology Information'} />
                            </Picker>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'stretch', marginBottom: 10 }}>
                        <Text style={[styles.h3, { marginBottom: 5 }]}>Address</Text>
                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                            <Picker style={{ height: 35 }} selectedValue={address} onValueChange={(val) => setAddress(val)} >
                                <Picker.Item label={'Please Select'} value={undefined} />
                                <Picker.Item label={'Selangor'} value={'Selangor'} />
                                <Picker.Item label={'Sabah'} value={'Sabah'} />
                                <Picker.Item label={'Perak'} value={'Perak'} />
                                <Picker.Item label={'Negeri Sembilan'} value={'Negeri Sembilan'} />
                                <Picker.Item label={'Sarawak'} value={'Sarawak'} />
                            </Picker>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', margin: 5, justifyContent: 'center' }}>
                <TouchableOpacity style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                    <Text style={[styles.textDefault, { color: 'black' }]}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => filterBusinessList()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }} >
                    <Text style={[styles.textDefault, { color: '#fff' }]}>Filter</Text>
                </TouchableOpacity>
            </View>
        </View >

    );
}

export default FilterBarBusiness