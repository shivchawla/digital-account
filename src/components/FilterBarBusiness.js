import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Picker, Platform, Modal } from 'react-native';
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'
import { useDispatch } from 'react-redux'
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

const FilterBarBusiness = (props) => {

    const nav = (screen) => {
        props.close()
        props.nav(screen)
    }

    const [industry, setIndustry] = useState(null)
    const [address, setAddress] = useState(null)
    const [modalContent, setModalContent] = useState(null)

    const filterBusinessList = async () => {
        console.log(`industry : ${industry} and address : ${address} `)
        const values = { industry, address }
        await dispatch(actionCreator.filterBusinessList(values))

    }

    const dispatch = useDispatch()

    const ios = Platform.OS === "ios" ? true : false
    const [iosPickerVisible, setIosPickerVisible] = useState(false)
  
    const openIosModal = (val) => {
        setModalContent(val)
        setIosPickerVisible(!iosPickerVisible)
    }


    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
            <Modal animationType={'slide'} visible={iosPickerVisible} presentationStyle={'pageSheet'} onRequestClose={() => console.log('modal closed')}                      >
                <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                    <TouchableOpacity onPress={() => openIosModal('status')} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'stretch', }}>
                        {modalContent === 'industry' ? <Picker style={{ height: 35 }} selectedValue={industry} onValueChange={(val) => setIndustry(val)} >
                                    <Picker.Item label={'Please Select'} value={undefined} />
                                    <Picker.Item label={'Karangkraf'} value={'Karangkraf'} />
                                    <Picker.Item label={'Shipping'} value={'Shipping'} />
                                    <Picker.Item label={'Heavy Machine'} value={'Heavy Machine'} />
                                    <Picker.Item label={'Tourism'} value={'Perhotelan'} />
                                    <Picker.Item label={'Information Technology'} value={'Techonology Information'} />
                                </Picker> :   <Picker style={{ height: 35 }} selectedValue={address} onValueChange={(val) => setAddress(val)} >
                                    <Picker.Item label={'Please Select'} value={undefined} />
                                    <Picker.Item label={'Selangor'} value={'Selangor'} />
                                    <Picker.Item label={'Sabah'} value={'Sabah'} />
                                    <Picker.Item label={'Perak'} value={'Perak'} />
                                    <Picker.Item label={'Negeri Sembilan'} value={'Negeri Sembilan'} />
                                    <Picker.Item label={'Sarawak'} value={'Sarawak'} />
                                </Picker>}

                    </View>
                </View>
            </Modal>
            <View style={{ padding: 10, flex: 1, justifyContent: 'space-evenly' }}>
                <View style={{ flex: 9, margin: 10 }}>
                    {ios ? <View style={{ margin: 10 }}>
                        <TouchableOpacity onPress={() => openIosModal('industry')}>
                            <Text style={[styles.h3, { marginBottom: 5 }]}>Industry</Text>
                            <View style={{ flexDirection: 'row', alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5, justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={[styles.value, { marginBottom: 5 }]}>{industry || 'Please Select'}</Text>
                                <Ionicons name="ios-arrow-down" style={{ fontSize: 12, }} />
                            </View>
                        </TouchableOpacity>
                    </View> :
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
                        </View>}
                    {ios ? <View style={{ margin: 10 }}>
                        <TouchableOpacity onPress={() => openIosModal('address')}>
                            <Text style={[styles.h3, { marginBottom: 5 }]}>Address</Text>
                            <View style={{ flexDirection: 'row', alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5, justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={[styles.value, { marginBottom: 5 }]}>{address || 'Please Select'}</Text>
                                <Ionicons name="ios-arrow-down" style={{ fontSize: 12, }} />
                            </View>
                        </TouchableOpacity>
                    </View> :
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
                        </View>}
                </View>
            </View>
            <View style={{ flexDirection: 'row', margin: 5, justifyContent: 'center' }}>
                <TouchableOpacity onPress={()=>nav('BusinessDirectory') } style={{ width: Layout.window.width * 0.2, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                    <Text style={[styles.textDefault, { color: 'black' }]}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {filterBusinessList(); nav('BusinessDirectory') }} style={{ width: Layout.window.width * 0.2, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }} >
                    <Text style={[styles.textDefault, { color: '#fff' }]}>Filter</Text>
                </TouchableOpacity>
            </View>
        </View >

    );
}

export default FilterBarBusiness