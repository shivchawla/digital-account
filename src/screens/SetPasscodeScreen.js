import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import styles from '../styles/styles'
//import OTPInputView from '@twotalltotems/react-native-otp-input'
import Layout from '../constants/Layout'
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import CodePin from 'react-native-pin-code'
const SetPasscodeScreen = (props) => {

    const [pin, updateCode] = useState('test')
    const [codePin, setCodePin] = useState(null)
    const dispatch = useDispatch()

    const savePin = async (code) => {
        console.log(`pin yang nak save ialah ${code}`)
        await dispatch(actionCreator.savePin({ pin: pin, authType: 'passcode', authEnabled: true }))
        dispatch(actionCreator.checkAuth())
        props.navigation.navigate('AuthOption')
    }

    const changeCode = (code) => {
        updateCode(code)
        return true
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={styles.title} ellipsizeMode='tail'>PASSCODE</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                    </View>
                </View>
            </View>
            <View style={{ justifyContent: 'space-between', flex: 9 }}>
                <View style={[styles.screenMargin, { flex: 5, alignItems: 'center' }]}>
                    <View style={[styles.formElement, { justifyContent: 'center', alignItems: 'center' }]}>


                        <View style={{ backgroundColor: '#fff', alignItems: 'center' }}>

                            <CodePin
                                ref={ref => setCodePin(ref)}
                                //code="2018" // code.length is used if you not pass number prop
                                checkPinCode={(code, check) => check(changeCode(code))}
                                success={() => { console.log(`success is called :`) }} // If user fill '2018', success is called
                                text="Please Enter Passcode Below" // My title
                                error="Try again" // If user fail (fill '2017' for instance)
                                autoFocusFirst={true} // disabling auto-focus
                                keyboardType={'numeric'}
                                obfuscation={true}
                                containerStyle={{ width: Layout.window.width, height: Layout.window.height / 4, justifyContent: 'flex-start', alignItems: 'center' }}
                                textStyle={styles.text}
                            //     containerPinStyle={{ width:40, height: 40, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 20 }
                            // }
                            />
                        </View>
                    </View>
                    {/* <View style={[styles.formElement, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                        <Text style={[styles.text]}>Didn't get TAC number?</Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate('ChangeNumber')}>
                            <Text style={[styles.text, { color: '#04A2BD' }]}>Re-send TAC.</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => savePin(pin)} style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20, backgroundColor: '#055E7C', borderRadius: 15 }}>
                            <Text style={[styles.textDefault, { color: 'white' }]}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}



export default SetPasscodeScreen
