import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, Picker } from 'react-native';
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'
import { useDispatch } from 'react-redux'

const FilterBarItem = (props) => {

    const nav = (screen) => {
        props.close()
        props.nav(screen)
    }

    const [name, setName] = useState(null)
    const [brand, setBrand] = useState(null)

    const filterItemList = async () => {
        console.log(`name : ${name} and brand : ${brand}`)
        const values = { name, brand }
        //await  dispatch(actionCreator.getLoanList())
        await dispatch(actionCreator.filterItemList(values))
    }

    const dispatch = useDispatch()

    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
            <View style={{ padding: 10, flex: 1, justifyContent: 'space-evenly' }}>
                <View style={{ flex: 9, margin: 10 }}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.h3, { marginBottom: 5 }]}>Name</Text>
                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                            <Picker style={{ height: 35 }} selectedValue={name} onValueChange={(val) => setName(val)} >
                                <Picker.Item label={'Please Select'} value={undefined} />
                                <Picker.Item label={'Paint'} value={'Paint'} />
                            </Picker>
                        </View>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.h3, { marginBottom: 5 }]}>Brand</Text>
                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                            <Picker style={{ height: 35 }} selectedValue={brand} onValueChange={(val) => setBrand(val)} >
                                <Picker.Item label={'Please Select'} value={undefined} />
                                <Picker.Item label={'Nippon'} value={'Nippon'} />
                            </Picker>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', margin: 5, justifyContent: 'center' }}>
                <TouchableOpacity style={{ width: Layout.window.width * 0.2, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                    <Text style={[styles.textDefault, { color: 'black' }]}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => filterItemList()} style={{ width: Layout.window.width * 0.2, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }} >
                    <Text style={[styles.textDefault, { color: '#fff' }]}>Filter</Text>
                </TouchableOpacity>
            </View>
        </View >

    );
}

export default FilterBarItem