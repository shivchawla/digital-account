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
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={styles.title} ellipsizeMode='tail'>TAC</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </View>
            </View>
            <View style={{ justifyContent: 'space-between', flex: 9 }}>
                <View style={[styles.screenMargin, { flex: 8 }]}>
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
                    <View style={[styles.formElement, { flexDirection: 'row' }]}>
                        <Text style={[styles.text]}>Didn't get TAC number?</Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate('ChangeNumber')}>
                            <Text style={[styles.text, { color: '#04A2BD' }]}>Re-send TAC.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('NumberSuccess')} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }}>
                        <Text style={[styles.textDefault, { color: 'white' }]}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

TACScreen.navigationOptions = {
    header: null,
};

export default TACScreen