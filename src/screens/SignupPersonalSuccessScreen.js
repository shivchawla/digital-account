//console.ignoredYellowBox = ['Setting a timer']
import React, { useState, useEffect, useRef } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';


import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'
import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'

const SignupPersonalSuccessScreen = (props) => {

    useEffect(() => {
        getPersonalToken()
    }, []);
    const dispatch = useDispatch()
    const getPersonalToken = () => dispatch(actionCreator.getPersonalToken())

    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <View style={{ flex: 10 }}>

                <View style={{ justifyContent: 'center', alignItems: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                </View>

                <View style={{ margin:5,justifyContent: 'center', alignItems: 'center', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Text style={[styles.h3, { margin: 5, flexDirection: 'row', justifyContent: 'flex-start' }]}>CREDENTIAL CREATED</Text>
                </View>

                <View style={{ alignSelf: 'stretch',  margin: 5 }}>
                    <Text style={[styles.text, { margin: 5 }]}>Congratulation!</Text>
                    <Text style={[styles.text, { margin: 5, marginBottom: 20 }]}>Please proceed to merchant registration or skip to dashboard</Text>
                </View>

            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>

                <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1  }}>
                    <LinearGradient colors={['#fff', '#fff']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.butang,{color:'lightgrey'}]}>Skip</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.navigation.navigate('CompanyInformation')} style={{ flex: 1, borderColor: '#0A6496', borderWidth: 1 }}>
                    <LinearGradient colors={['#0A6496', '#055E7C']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.butang, { color: '#fff' }]}>Merchant</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>

        </View>

    )
}

SignupPersonalSuccessScreen.navigationOptions = { header: null, };

export default SignupPersonalSuccessScreen