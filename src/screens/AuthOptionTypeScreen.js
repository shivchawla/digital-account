
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import * as LocalAuthentication from 'expo-local-authentication';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

const AuthOptionScreen = (props) => {
    const { authEnabled, authType } = useSelector(state => state.authReducer, shallowEqual)
    const dispatch = useDispatch()
    useEffect(() => {
        checkDeviceForHardware();
    });

    const setPasscode = () => {
        dispatch(actionCreator.setAuth({ authType: 'passcode' }))
        props.navigation.navigate('SetPasscode')
    }

    const [compatible, setCompatible] = useState(false)

    const [biometricEnable, setBiometricEnable] = useState(false)
    const [passcodeEnable, setPasscodeEnable] = useState(false)

    const [authType1, setAuthType] = useState(authType)
    const [enrolled, setEnrolled] = useState('NA')

    const checkDeviceForHardware = async () => {
        let compatible = await LocalAuthentication.hasHardwareAsync();
        setCompatible(compatible)
        if (!compatible) {
            //showIncompatibleAlert();
            console.log(`takde biometric : ${compatible}`)

        }
        else {
            console.log(`ada biometric : ${compatible}`)
            const authType = await LocalAuthentication.supportedAuthenticationTypesAsync()
            const enrolled = await LocalAuthentication.isEnrolledAsync()
            console.log(`type : ${JSON.stringify(authType)} and enrolled is ${JSON.stringify(enrolled)}`)
            setEnrolled(enrolled)
            setAuthType(authType)
        }
    };

    const biometricToggle = (value) => {
        console.log(JSON.stringify(value))
        setBiometricEnable(value)
        setPasscodeEnable(!value)
    }

    const passcodeToggle = (value) => {
        console.log(JSON.stringify(value))
        if (compatible && enrolled) { setBiometricEnable(!value) }
        setPasscodeEnable(value)
        value && props.navigation.navigate('SetPasscode')
    }

    const setAuth = () => {
        if (biometricEnable) {
            dispatch(actionCreator.savePin({ authType: 'biometric' }))

        } else {
            dispatch(actionCreator.savePin({ authType: 'passcode' }))
        }
        props.navigation.navigate('AuthOption')
    }

    return (

        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4', marginBottom: 25 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={styles.title} ellipsizeMode='tail'>Authentication Type</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                    </View>
                </View>
            </View>
            <View style={{ justifyContent: 'space-between', flex: 9 }}>
                <View style={{ flex: 9 }}>
                    <View style={styles.screenMargin}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View>
                                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                    <Text style={[styles.text, { color: (!compatible || !enrolled) ? null : 'lightgrey' }]}>Local Authentication</Text>
                                    <Switch style={{ marginLeft: 35, marginRight: 15 }} onValueChange={value => biometricToggle(value)} value={biometricEnable} disabled={(!compatible || !enrolled) ? true : false} />
                                </View>
                                {/* {!authType?!enrolled?<Text style={styles.small}>Please enroll your authentication data to enable</Text>:  <Text style={styles.small}>Your device does not support Local Authentication</Text>} */}
                                {compatible ? enrolled ? <View /> : <Text>Please enrolled</Text> : <Text style={styles.small}>Your device does not support Local Authentication</Text>}

                                <View>
                                    {biometricEnable && <View>
                                        <Text>Authentication Type : {JSON.stringify(authType1)}</Text>
                                        <Text>Enrolled? : {JSON.stringify(enrolled)}</Text>
                                    </View>}
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                    <Text style={[styles.text]}>Passcode</Text>
                                    <Switch style={{ marginLeft: 15, marginRight: 15 }} onValueChange={value => passcodeToggle(value)} value={passcodeEnable} />

                                </View>
                                {passcodeEnable && <View>
                                    <TouchableOpacity onPress={() => setPasscode()}>
                                        <Text>Set passcode</Text>
                                    </TouchableOpacity>

                                </View>}
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 }}>
                        <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!true} onPress={() => setAuth()} style={{ flex: 1 }}>
                        <LinearGradient colors={true ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.butang, { color: '#fff' }]}>Confirm</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
}

AuthOptionScreen.navigationOptions = {
    header: null,
};

export default AuthOptionScreen