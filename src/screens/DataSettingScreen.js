import React from 'react';

import {

    View,
    TouchableOpacity,
    Text,
    Image,

} from 'react-native';

import { useDispatch } from 'react-redux'

import * as actionCreator from '../store/actions/action'

import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'

const DataSettingScreen = (props) => {

    const dispatch = useDispatch()

    const logout = () => {

        dispatch(actionCreator.logout())
        props.navigation.navigate('Welcome')

    }

    return (

        <View style={{ flex: 1, }}>

            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>

                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]}>SETTING</Text>
                </View>

                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </TouchableOpacity>

            </View>

            <View style={[styles.screenMargin, { flex: 8 }]}>

                <View style={{ marginBottom: 20 }}>
                    <Text style={[styles.h2, { color: '#04A2BD' }]}>DATA OPTION</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>

                    <Image source={require('../assets/images/changepassword.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />

                    <TouchableOpacity onPress={() => props.navigation.navigate('Vendor')}>
                        <Text style={[styles.text, { color: 'black', marginLeft: 50 }]}>Vendor</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>

                    <Image source={require('../assets/images/emailicon.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />

                    <TouchableOpacity onPress={() => props.navigation.navigate('Customer')}>
                        <Text style={[styles.text, { color: 'black', marginLeft: 50 }]}>Customer</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>

                    <Image source={require('../assets/images/changemobilenumber.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />

                    <TouchableOpacity onPress={() => props.navigation.navigate('Item')}>
                        <Text style={[styles.text, { color: 'black', marginLeft: 50 }]}>Item</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    );
}

DataSettingScreen.navigationOptions = {

    header: null,

};

export default DataSettingScreen