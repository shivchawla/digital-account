import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import styles from '../styles/styles'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Layout from '../constants/Layout'

const TACScreen = (props) => {

    const [code, updateCode] = useState("")

    return (

        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: 'rgba(163, 0, 0, 0.5)' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#DE4848'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={styles.title} ellipsizeMode='tail'>TAC</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <View style={{ backgroundColor:'rgba(163, 0, 0, 0.5)',borderColor: "#DE4848", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
          </View>
                </View>
            </View>
            <View style={{ justifyContent: 'space-between', flex: 9 }}>
                <View style={[styles.screenMargin, { flex: 5 }]}>
                    <Text style={[styles.titleBox, { marginTop: 25, justifyContent: 'center', flexDirection: 'row' }]}>We have sent TAC to your new number.</Text>
                    <View style={[styles.formElement, { justifyContent: 'center' }]}>
                        <OTPInputView style={{ width: '80%', height: 100 }} pinCount={4} code={code} autoFocusOnLoad codeInputFieldStyle={styles.borderStyleBase} codeInputHighlightStyle={styles.borderStyleHighLighted}
                            //codeInputFieldStyle={styles.underlineStyleBase}
                            //codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled={code => {
                                updateCode(code);
                                console.log(`Code is ${code}, you are good to go!`)
                            }}
                            onCodeChanged={code => {
                                updateCode(code);
                                console.log(`Code is ${code} wei, you are good to go!`)
                            }}
                        />
                    </View>
                    <View style={[styles.formElement, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                        <Text style={[styles.text]}>Didn't get TAC number?</Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate('ChangeNumber')}>
                            <Text style={[styles.text, { color: '#DE4848' }]}>Re-send TAC.</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('NumberSuccess')} style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20, backgroundColor: '#A30000', borderRadius: 15 }}>
                            <Text style={[styles.textDefault, { color: 'white' }]}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

TACScreen.navigationOptions = {
    header: null,
};

export default TACScreen