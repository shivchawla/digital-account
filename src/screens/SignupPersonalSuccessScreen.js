import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, Switch, Alert, BackHandler } from 'react-native';
import Constants from 'expo-constants'
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import { CustomButton } from '../components/Custom'
// modules
import {
    handleAndroidBackButton,
    removeAndroidBackButtonHandler
} from '../components/androidBackButton';

import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'

const SignupPersonalSuccessScreen = (props) => {



    useEffect(() => {
        const prevScreen = props.route.params?.prevScreen ?? 'NA';
        console.log(`prevScreen ialah : ${prevScreen}`);
        // dispatch(actionCreator.getPersonalToken())
        // dispatch(actionCreator.retrievePersonalInfo());
        (prevScreen != 'Dashboard') ? dispatch(actionCreator.getPersonalToken()) : dispatch(actionCreator.retrievePersonalInfo())
    }, []);

    useEffect(() => {
        console.log("componentDidMount");
        handleAndroidBackButton(() => { return true; })
        return () => {
            removeAndroidBackButtonHandler()
        };
    }, []); // empty-array means don't watch for any updates

    const dispatch = useDispatch()
    //const getPersonalToken = () => dispatch(actionCreator.getPersonalToken())

    const { emailVerified } = useSelector(state => state.notificationScreenReducer, shallowEqual)
    const { activated } = useSelector(state => state.personalInformationScreenReducer, shallowEqual)

    const [emailInitial, setEmailInitial] = useState(emailVerified)
    const [emailResent, setEmailResent] = useState(false)
    const prevScreen = props.route.params?.prevScreen ?? 'NA'
    //console.log(`prevScreen ialah : ${prevScreen}`)
    //prevScreen != 'Dashboard' && getPersonalToken()

    const clearEmail = () => {
        dispatch({ type: 'RESET_EMAIL_VERIFIED', payload: { emailVerified: null } })
        console.log(`emailVerified : ${emailVerified}`)
        //dispatch(actionCreator.setScreen2())
        props.navigation.navigate('CompanyInformation')
    };

    const resendVerification = () => {
        setEmailResent(true)
        dispatch(actionCreator.resendVerification())
    }
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
                        <Text style={[styles.h3, { margin: 5, fontWeight: 'bold', fontSize: 17 }]}>Credential Created</Text>
                        <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5, alignItems: 'center' }}>
                            <Text style={[styles.text, { margin: 5, color: 'darkturquoise' }]}>Congratulation!</Text>
                            <Text style={[styles.text, { margin: 5, marginBottom: 20, textAlign: 'center' }]}>Please proceed to merchant registration or skip to dashboard.</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} style={{ width: Layout.window.width * 0.3, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                                <Text style={[styles.textDefault]}>Skip</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => clearEmail()} style={{ width: Layout.window.width * 0.3, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }}>
                                <Text style={[styles.textDefault, { color: 'white' }]}>Merchant</Text>
                            </TouchableOpacity>
                        </View> */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <CustomButton
                                navigation={() => props.navigation.navigate('Dashboard')}
                                label={'Skip'}
                                boxStyle={{ borderColor: 'darkturquoise', backgroundColor: '#ffffff00', margin: 10, borderWidth: 1 }}
                                textStyle={{ color: 'black' }}
                            />
                            <CustomButton
                                navigation={() => clearEmail()}
                                label={'Merchant'}
                                disabledButton={!emailVerified}
                                boxStyle={{ backgroundColor: emailVerified ? '#09A4BF' : 'rgba(9,164,191,0.5)', margin: 10 }}
                            />
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
                                <Text style={[styles.text, { margin: 5, marginBottom: 20, textAlign: 'center' }]}>Please check your email inbox and follow the instruction for verification.</Text>


                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                {prevScreen == 'Dashboard' && !activated && !emailResent ?
                                    <CustomButton
                                        navigation={() => resendVerification()}
                                        label={'Resend Email'}
                                        //disabledButton={!emailVerified}
                                        boxStyle={{ backgroundColor: '#09A4BF', margin: 10 }}
                                    /> : <>
                                        <CustomButton
                                            navigation={() => props.navigation.navigate('Dashboard')}
                                            label={'Skip'}
                                            boxStyle={{ borderColor: 'darkturquoise', backgroundColor: '#ffffff00', margin: 10, borderWidth: 1 }}
                                            textStyle={{ color: 'black' }}
                                        />
                                        <CustomButton
                                            navigation={() => clearEmail()}
                                            label={'Merchant'}
                                            disabledButton={emailVerified ? false : activated ? false : true}
                                            boxStyle={{ backgroundColor: emailVerified || activated ? '#09A4BF' : 'rgba(9,164,191,0.5)', margin: 10 }}
                                        /></>}

                            </View>
                        </View>
                    </View>
                </View>}
        </View>



    )
}



export default SignupPersonalSuccessScreen