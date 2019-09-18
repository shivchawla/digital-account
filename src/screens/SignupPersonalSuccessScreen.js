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

                <View style={{ justifyContent: 'center', alignItems: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.text, { margin: 5, fontWeight: 'bold', flexDirection: 'row', justifyContent: 'center' }]}>USER REGISTRATION</Text>
                </View>

                <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5 }}>
                    <Text style={[styles.text, { margin: 5, color: 'darkturquoise' }]}>Congratulation!</Text>
                    <Text style={[styles.text, { margin: 5, marginBottom: 20 }]}>Please proceed to merchant registration or skip to dashboard</Text>
                </View>

            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>

                <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} style={{ flex: 1 }}>
                    <LinearGradient colors={['#A4A4A4', '#A4A4A4']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.text,]}>Skip</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.navigation.navigate('CompanyInformation')} style={{ flex: 1 }}>
                    <LinearGradient colors={['#628BFB', '#0E47E8']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.text, { color: '#fff' }]}>Merchant</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>

        </View>

    )
}

SignupPersonalSuccessScreen.navigationOptions = { header: null, };

export default SignupPersonalSuccessScreen