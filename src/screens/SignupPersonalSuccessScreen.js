import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, Switch, Alert, BackHandler } from 'react-native';
import Constants from 'expo-constants'
import Layout from '../constants/Layout'
import styles from '../styles/styles'

// modules
import {
    handleAndroidBackButton,
    removeAndroidBackButtonHandler
} from '../components/androidBackButton';

import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'

const SignupPersonalSuccessScreen = (props) => {

    const exitAlert = () => {
        // Works on both Android and iOS
        Alert.alert(
            'Skip',
            'Go to Dashboard or Exit App',
            [

                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Dashboard', onPress: () => { console.log('OK Pressed'); props.navigation.navigate('Dashboard') } },
                { text: 'Exit', onPress: () => { console.log('OK Pressed'); BackHandler.exitApp() } },
            ],
            { cancelable: false },
        );
    };

    useEffect(() => {
        const prevScreen = props.route.params?.prevScreen??'NA'
        prevScreen != 'Dashboard' && dispatch(actionCreator.getPersonalToken())
    }, []);

    useEffect(() => {
        console.log("componentDidMount");
        handleAndroidBackButton(exitAlert)
        // return removeAndroidBackButtonHandler()
    }, []); // empty-array means don't watch for any updates

    const dispatch = useDispatch()
    //const getPersonalToken = () => dispatch(actionCreator.getPersonalToken())

    const { emailVerified } = useSelector(state => state.notificationScreenReducer, shallowEqual)

    const [emailInitial, setEmailInitial] = useState(emailVerified)

    const prevScreen = props.route.params?.prevScreen??'NA'
    console.log(`prevScreen ialah : ${prevScreen}`)
    //prevScreen != 'Dashboard' && getPersonalToken()

    const clearEmail = () => {
        dispatch({ type: 'RESET_EMAIL_VERIFIED', payload: { emailVerified: null } })
        console.log(`emailVerified : ${emailVerified}`)
        props.navigation.navigate('CompanyInformation')
    };
    return (

        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            {emailVerified ? <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.5 }} resizeMode={'contain'} />
                    </View>
                    <View style={{ flex: 2, alignSelf: 'stretch' }}>
                        <Image source={require('../assets/images/signupsuccess.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode={'contain'} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={[styles.h3, { margin: 5, fontWeight: 'bold',fontSize:17}]}>Credential Created</Text>
                        <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5, alignItems: 'center' }}>
                            <Text style={[styles.text, { margin: 5, color: 'darkturquoise' }]}>Congratulation!</Text>
                            <Text style={[styles.text, { margin: 5, marginBottom: 20, textAlign: 'center' }]}>Please proceed to merchant registration or skip to dashboard.</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} style={{ width: Layout.window.width * 0.3, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                                <Text style={[styles.textDefault]}>Skip</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => clearEmail()} style={{ width: Layout.window.width * 0.3, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }}>
                                <Text style={[styles.textDefault, { color: 'white' }]}>Merchant</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View> : <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.5 }} resizeMode={'contain'} />
                        </View>
                        <View style={{ flex: 2, alignSelf: 'stretch' }}>
                            <Image source={require('../assets/images/signupsuccess.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode={'contain'} />
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={[styles.h3, { margin: 5, fontWeight: 'bold' }]}>Credential Created</Text>
                            <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5, alignItems: 'center' }}>
                                <Text style={[styles.text, { margin: 5, color: 'darkturquoise' }]}>Email Verification</Text>
                                {prevScreen == 'Dashboard' && <TouchableOpacity onPress={() => dispatch(actionCreator.resendVerification())} style={{ width: Layout.window.width * 0.3, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }}>
                                    <Text style={[styles.textDefault, { color: 'white' }]}>Resend</Text>
                                </TouchableOpacity>}
                                <Text style={[styles.text, { margin: 5, marginBottom: 20, textAlign: 'center' }]}>Please check your email inbox and follow the instruction for verification.</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => props.navigation.navigate('Main')} style={{ width: Layout.window.width * 0.3, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                                    <Text style={[styles.textDefault]}>Skip</Text>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={!emailVerified} onPress={() => clearEmail()} style={{ width: Layout.window.width * 0.3, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: emailVerified ? '#09A4BF' : 'rgba(9,164,191,0.5)' }}>
                                    <Text style={[styles.textDefault, { color: 'white' }]}>Merchant</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>}
        </View>
        

        
    )
}



export default SignupPersonalSuccessScreen