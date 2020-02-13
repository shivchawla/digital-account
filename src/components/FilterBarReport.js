import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, Picker, Modal, Platform } from 'react-native';
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'
import { useDispatch } from 'react-redux'
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

const FilterBarReport = (props) => {

    const nav = (screen) => {
        props.close()
        props.nav(screen)
    }

    const [currency, setCurrency] = useState(null)
    const [type, setType] = useState(null)
    const [credit_debit, setCreditDebit] = useState(null)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false

    const [iosPickerVisible, setIosPickerVisible] = useState(false)

    const openIosModal = (val) => {
        setModalContent(val)
        setIosPickerVisible(!iosPickerVisible)
    }


    const filterReportList = async () => {
        console.log(`currency : ${currency} and type : ${type} and credit/debit : ${credit_debit}`)
        const values = { currency, type, credit_debit }
        await dispatch(actionCreator.filterReportList(values))

    }

    const dispatch = useDispatch()

    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
            <Modal animationType={'slide'} visible={iosPickerVisible} presentationStyle={'pageSheet'} onRequestClose={() => console.log('modal closed')}                      >
                <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                    <TouchableOpacity onPress={() => openIosModal('type')} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'stretch', }}>
                        {modalContent === 'type' ? <Picker style={{ height: 35 }} selectedValue={type} onValueChange={(val) => setType(val)} >
                            <Picker.Item label={'Please Select'} value={undefined} />
                            <Picker.Item label={'Account Transfer'} value={'Account Transfer'} />
                            <Picker.Item label={'Fee Account Transfer'} value={'Fee Account Transfer'} />
                        </Picker> : <Picker style={{ height: 35 }} selectedValue={credit_debit} onValueChange={(val) => setCreditDebit(val)} >
                                <Picker.Item label={'Please Select'} value={undefined} />
                                <Picker.Item label={'Credit'} value={'CREDIT'} />
                                <Picker.Item label={'Debit'} value={'DEBIT'} />
                            </Picker>}

                    </View>
                </View>
            </Modal>
            <View style={{ padding: 10, flex: 1, justifyContent: 'space-evenly' }}>
                <View style={{ flex: 9, margin: 10 }}>
                    {ios ? <View style={{ margin: 10 }}>
                        <TouchableOpacity onPress={() => openIosModal('type')}>
                            <Text style={[styles.h3, { marginBottom: 5 }]}>Type</Text>
                            <View style={{ flexDirection: 'row', alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5, justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={[styles.value, { marginBottom: 5 }]}>{type || 'Please Select'}</Text>
                                <Ionicons name="ios-arrow-down" style={{ fontSize: 12, }} />
                            </View>
                        </TouchableOpacity>
                    </View> : <View style={{ alignSelf: 'stretch', marginBottom: 10 }}>
                            <Text style={[styles.h3, { marginBottom: 5 }]}>Transaction Type</Text>
                            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                <Picker style={{ height: 35 }} selectedValue={type} onValueChange={(val) => setType(val)} >
                                    <Picker.Item label={'Please Select'} value={undefined} />
                                    <Picker.Item label={'Account Transfer'} value={'Account Transfer'} />
                                    <Picker.Item label={'Fee Account Transfer'} value={'Fee Account Transfer'} />
                                </Picker>
                            </View>
                        </View>}

                    {ios ? <View style={{ margin: 10 }}>
                        <TouchableOpacity onPress={() => openIosModal('credit_debit')}>
                            <Text style={[styles.h3, { marginBottom: 5 }]}>Credit / Debit</Text>
                            <View style={{ flexDirection: 'row', alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5, justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={[styles.value, { marginBottom: 5 }]}>{credit_debit || 'Please Select'}</Text>
                                <Ionicons name="ios-arrow-down" style={{ fontSize: 12, }} />
                            </View>
                        </TouchableOpacity>
                    </View> : <View style={{ alignSelf: 'stretch', marginBottom: 10 }}>
                            <Text style={[styles.h3, { marginBottom: 5 }]}>Credit / Debit</Text>
                            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                <Picker style={{ height: 35, borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }} selectedValue={credit_debit} onValueChange={(val) => setCreditDebit(val)} >
                                    <Picker.Item label={'Please Select'} value={undefined} />
                                    <Picker.Item label={'Credit'} value={'CREDIT'} />
                                    <Picker.Item label={'Debit'} value={'DEBIT'} />
                                </Picker>
                            </View>
                        </View>}
                </View>
            </View>
            <View style={{ flexDirection: 'row', margin: 5, justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => { nav('Report') }} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                    <Text style={[styles.textDefault, { color: 'black' }]}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { filterReportList(); nav('Report') }} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }} >
                    <Text style={[styles.textDefault, { color: '#fff' }]}>Filter</Text>
                </TouchableOpacity>
            </View>
        </View >

    );
}

export default FilterBarReport