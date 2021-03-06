import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import styles from '../styles/styles'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Layout from '../constants/Layout'
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

const TransferConfirmScreen = (props) => {

    const [code, updateCode] = useState("")
    const dispatch = useDispatch()

    const savePin = async () => {
        await dispatch(actionCreator.savePin({ pin: code, authType: 'passcode' }))
        props.navigation.navigate('AuthOption')
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
                <View style={[styles.screenMargin, { flex: 5 }]}>
                    <Text style={[styles.titleBox, { marginTop: 25, justifyContent: 'center', flexDirection: 'row' }]}>Enter PASSCODE below</Text>
                    <View style={[styles.formElement, { justifyContent: 'center' }]}>
                        <OTPInputView  style={{ width: '80%', height: 100 }} pinCount={4} code={code} autoFocusOnLoad codeInputFieldStyle={styles.borderStyleBase} codeInputHighlightStyle={styles.borderStyleHighLighted}
                            //codeInputFieldStyle={styles.underlineStyleBase}
                            //codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled={code => {
                                updateCode(code);
                                console.log(`Code is ${code}, you are good to go!`)
                                props.navigation.navigate('TransferConfirm')
                            }}
                            onCodeChanged={code => {
                                updateCode(code);
                                console.log(`Code is ${code} wei, you are good to go!`)
                            }}
                            clearInputs={true}
                        />
                    </View>
                    {/* <View style={[styles.formElement, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                        <Text style={[styles.text]}>Didn't get TAC number?</Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate('ChangeNumber')}>
                            <Text style={[styles.text, { color: '#04A2BD' }]}>Re-send TAC.</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => savePin()} style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20, backgroundColor: '#055E7C', borderRadius: 15 }}>
                            <Text style={[styles.textDefault, { color: 'white' }]}>Submit</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => updateCode('')} style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20, backgroundColor: '#055E7C', borderRadius: 15 }}>
                            <Text style={[styles.textDefault, { color: 'white' }]}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}



export default TransferConfirmScreen