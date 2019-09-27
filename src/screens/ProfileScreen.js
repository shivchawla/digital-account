import React, { useEffect, useRef } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,

} from 'react-native';

import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const ProfileScreen = (props) => {

    useEffect(() => {
        retrieveMerchantInfo()
    }, [])

    const dispatch = useDispatch()

    const retrieveMerchantInfo = () => { dispatch(actionCreator.retrieveMerchantInfo()) }

    const business_name = useSelector(state => state.merchantInfoReducer.business_name, shallowEqual)
    const business_reg_no = useSelector(state => state.merchantInfoReducer.business_reg_no, shallowEqual)
    const contact_no = useSelector(state => state.merchantInfoReducer.contact_no, shallowEqual)

    return (

        <View style={{ flex: 1, }}>

            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]}>Profile</Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </View>

            </View>

            <View style={[styles.screenMargin, { flex: 9 }]}>

                <View style={{ marginTop: 10, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ padding: 5, paddingLeft: 8, paddingRight: 8, backgroundColor: '#055E7C', borderRadius: 5 }}>
                        <Text style={[styles.text, { color: '#fff' }]}>Edit</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 90, height: 90, borderWidth: 1, borderColor: '#055E7C' }} />
                </View>

                <View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text style={[styles.h2]}>Personal Information</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.text]}>Account Number</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, { color: '#055E7C' }]}>123456789</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.text]}>Account Type</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, { color: '#055E7C' }]}>Business</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.text]}>Balance</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, { color: '#055E7C' }]}>RM18,839.00</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.text]}>Status</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, { color: '#00FD04' }]}>Active</Text>
                        </View>

                    </View>

                </View>

                <View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text style={[styles.h2]}>Business Information</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.text]}>Business Registration Number</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, { color: '#055E7C' }]}>{business_reg_no}</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.text]}>Business Name</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, { color: '#055E7C' }]}>{business_name}</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.text]}>Contact Number</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, { color: '#055E7C' }]}>{contact_no}</Text>
                        </View>

                    </View>

                </View>

            </View>

        </View>

    );
}

ProfileScreen.navigationOptions = {
    header: null,
};

export default ProfileScreen;