import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, Switch, Modal, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import * as LocalAuthentication from 'expo-local-authentication';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import CodePin from 'react-native-pin-code'
import Layout from '../constants/Layout';

import ScanFinger from '../components/ScanFinger'
const AuthOptionScreen = (props) => {



    const unlock = () => {
        setLock(false)
        dispatch(actionCreator.savePin({ authEnabled: false, authType: 'NA' }))
        setAuthRequestVisible(false)
    }

    const scanFingerPrint = async () => {
        try {
            let results = await LocalAuthentication.authenticateAsync();
            if (results.success) {
                // setAuthenticate(true)
                // setFailedCount(0)
                // console.log(`berjaya scan `)
                // props.unlock()
                setAuthRequestVisible(true)
                dispatch(actionCreator.savePin({ authEnabled: false, authType: 'NA' }))
                setNotificationEnable(!notificationEnable)
            } else {
                console.log(`TAK berjaya scan `)
                setFailedCount(failedCount + 1)
            }
        } catch (e) {
            console.log(e);
        }
    };

    // const checkCode = (code) => {
    //     console.log(`periksa code`)
    //     return code === '1234'
    //     // return code === pin
    // }

    const [locked, setLock] = useState(true)
    const [code, updateCode] = useState("")
    const [authRequestVisible, setAuthRequestVisible] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionCreator.checkAuth())
    }, [])

    // const disableAuth = () => {
    //     dispatch(actionCreator.setAuth({ authType: 'passcode' }))
    //     props.navigation.navigate('SetPasscode')
    // }

    const { authEnabled, authType, pin } = useSelector(state => state.authReducer, shallowEqual)

    const allAuth = useSelector(state => state.authReducer, shallowEqual)

    const access = useSelector(state => state.apiReducer, shallowEqual)

    allAuth && console.log(`all auth ialah ${JSON.stringify(allAuth)}`)
    //authEnabled && console.log(`authEnabled ialah ${JSON.stringify(authEnabled)}`)

    const [notificationEnable, setNotificationEnable] = useState()

    //authEnabled && setNotificationEnable(authEnabled)

    const notificationToggle = () => {

        if (authEnabled == 1) {
            //buka dulu authentication screen
            if (Platform.OS === 'android') {
                setAuthRequestVisible(true)
                setNotificationEnable(!notificationEnable)
            } else {
                scanFingerPrint()
            }


        } else {
            setNotificationEnable(!notificationEnable)
            dispatch(actionCreator.setAuth({ authEnabled: !notificationEnable }))
            props.navigation.navigate('AuthOptionType')
            //setNotificationEnable(value)
        }
    }

    const checkCodeFunction = async (pin) => {

        const body = JSON.stringify({ pin, access_credential: 'api' })
        const { token_type, access_token } = access
        const method = 'POST'
        const Accept = 'application/json'
        const Authorization = token_type + ' ' + access_token
        const headers = { 'Content-Type': 'application/json', Accept, Authorization }

        // let response = await fetch(`https://tuah.niyo.my/api/auth/validate_pin`, { method, headers, body })
        // let responseJson = await response.json()
        let kucing = await fetch(`https://uat.niyo.my/api/auth/validate_pin`, { method, headers, body })
            .then(async response => await response.json())
            .then(async responseJson => {
                const { message, status } = await responseJson
                //await dispatch({ type: 'SET_VENDOR_SUBMIT', payload: { status, code, proceedMain: true } })
                await console.log(`validate pin api status:${status}, message :${message}`)
                return responseJson

            });
        console.log(`'kucing ialah : ${JSON.stringify(kucing)}`)
        return kucing

    }

    const checkCode = async (pin) => {
        const responseJson = await checkCodeFunction(pin)
        const { status } = responseJson
        console.log(`dah abih run ${status}`)
        if (status)
            return 'nice'
        else
            return 'notnice'

    }

    return (
        <View style={{ flex: 1, }}>
            {Platform.OS === 'android' ? <Modal transparent={true} animationType={'slide'} visible={authRequestVisible} onRequestClose={() => setAuthRequestVisible(!authRequestVisible)} >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(1,1,1,0.5)' }}>
                    <View style={{ flex: 3 }} />
                    <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                        {(authType === 'passcode') ? <CodePin
                            //code="2018" // code.length is used if you not pass number prop
                            checkPinCode={async (code, check) => { const test = await checkCode(code); check('nice' === test) }}
                            success={() => unlock()} // If user fill '2018', success is called
                            text="Please Enter PIN" // My title
                            error="Try again" // If user fail (fill '2017' for instance)
                            autoFocusFirst={true} // disabling auto-focus
                            keyboardType={'numeric'}
                            containerStyle={{ width: Layout.window.width, height: Layout.window.height / 4, justifyContent: 'flex-start', alignItems: 'center' }}
                        //     containerPinStyle={{ width:40, height: 40, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 20 }
                        // }
                        /> : <ScanFinger unlock={unlock} />}

                    </View>
                </View>
            </Modal> : <View />}

            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("DataSetting")} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={styles.title} ellipsizeMode='tail'>AUTHENTICATION SETTING</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                    </View>
                </View>
            </View>
            <View style={[styles.screenMargin, { flex: 9 }]}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                    <View>
                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Text style={[styles.text], { padding: 5 }}>Enable Authentication</Text>
                            <Switch style={{ marginLeft: 35, marginRight: 15 }} onValueChange={value => notificationToggle(value)} value={authEnabled == 1} />
                        </View>
                        {authEnabled ? <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Text style={[styles.text], { padding: 5 }}>Authentication Type : {authType}</Text>
                        </View> : <View />}
                    </View>
                </View>
            </View >
        </View >
    );
}



export default AuthOptionScreen