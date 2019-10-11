import React, { useState, useEffect, useRef } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
//import { useDispatch } from 'react-redux'
import Constants from 'expo-constants'
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'

const SignupPersonalSuccessScreen = (props) => {
    useEffect(() => {
        getPersonalToken()
    }, []);
    const dispatch = useDispatch()
    const getPersonalToken = () => dispatch(actionCreator.getPersonalToken())

    const { emailVerified } = useSelector(state => state.notificationScreenReducer, shallowEqual)

    return (

        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: Layout.window.width * 0.85, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                        <Image source={require('../assets/images/signupsuccess.png')} style={{ height: Layout.window.height * 0.3, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                        {emailVerified?<View style={{justifyContent:'center',alignItems:'center'}}>
                            <Text style={[styles.h3, { margin: 5, fontWeight: 'bold' }]}>Credential Created</Text>
                            <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5, alignItems: 'center' }}>
                                <Text style={[styles.text, { margin: 5, color: 'darkturquoise' }]}>Congratulation!</Text>
                                <Text style={[styles.text, { margin: 5, marginBottom: 20,textAlign:'center' }]}>Please proceed to merchant registration or skip to dashboard.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                                    <Text style={[styles.textDefault]}>Skip</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => props.navigation.navigate('CompanyInformation')} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }}>
                                    <Text style={[styles.textDefault, { color: 'white' }]}>Merchant</Text>
                                </TouchableOpacity>
                            </View>
                        </View>:
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={[styles.h3, { margin: 5, fontWeight: 'bold' }]}>Credential Created</Text>
                    <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5, alignItems: 'center' }}>
                        <Text style={[styles.text, { margin: 5, color: 'darkturquoise' }]}>Email Verification</Text>
                        <Text style={[styles.text, { margin: 5, marginBottom: 20,textAlign:'center' }]}>Please check your email inbox and follow the instruction for verification.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                            <Text style={[styles.textDefault]}>Skip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={!emailVerified} onPress={() => props.navigation.navigate('CompanyInformation')} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: emailVerified?'#09A4BF':'rgba(9,164,191,0.5)' }}>
                            <Text style={[styles.textDefault, { color: 'white' }]}>Merchant</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
                    </View>
                </View>
            </View>
        </View>
    )
}

SignupPersonalSuccessScreen.navigationOptions = { header: null, };

export default SignupPersonalSuccessScreen