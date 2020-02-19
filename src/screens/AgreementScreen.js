import React, { useState } from 'react';
import { Image, Platform, Text, TouchableOpacity, View, CheckBox, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import styles from '../styles/styles'
import CheckBox2 from 'react-native-check-box'
import * as actionCreator from '../store/actions/action'

const AgreementScreen = (props) => {
    const [agreement, setAgreement] = useState(false)
    const dispatch = useDispatch()
    const signUp = () => {
        dispatch(actionCreator.getToken());
        props.navigation.navigate('SignUpPersonal')
    }

    return (
        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 2 }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#055E7C', }}>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 20 }}>
                    <Text numberOfLines={1} style={[styles.title]} ellipsizeMode='head'>TERMS</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={require('../assets/images/logosmall.png')} style={{ width: 50, height: 50, borderRadius: 15 }} />
                </View>
            </View>
            <View style={{ justifyContent: 'space-between', flex: 9 }}>
                <View style={{ flex: 9, }}>
                    <ScrollView contentContainerStyle={styles.screenMargin}>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Text style={[styles.h3, { margin: 5, flexDirection: 'row' }]}>Terms and Conditions</Text>
                        </View>
                        <Text style={[styles.small, { alignSelf: 'flex-start', textAlign: 'left', margin: 5, }]}>Pursuant to the Personal Data Protection Act 2010 (“PDPA”), Niyo (“Niyo”) is mindful and committed to the protection of your personal information and your privacy.
        This Personal Data Protection Notice (“Notice”) describes how Niyo and its respective subsidiaries and associate companies ("FCGB") use your Personal Data.
FCGB is referred to as “we”, “us”, “our” or “ours”. Any person using and accessing this Site, the Content or the Services is referred to as the “User”, “you” or “yours”.</Text>
                        <Text style={[styles.h3, { margin: 5, flexDirection: 'row' }]}>Acknowledgement and Consent</Text>
                        <Text style={[styles.small, { alignSelf: 'flex-start', textAlign: 'left', margin: 5, }]}>By communicating with us, using our services, or services from us or by virtue of your engagement with us, you acknowledge that you have read and understood this Policy/Notice and agree and consent to the use, processing and transfer of your Personal Data by us as described in this Notice.
                        We shall have the right to modify, update or amend the terms of this Notice at any time by placing the updated Notice on the Websites. </Text>
                        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            {(Platform.OS == 'ios') ?
                                <CheckBox2 isChecked={agreement} onClick={() => setAgreement(!agreement)} />
                                :
                                <CheckBox value={agreement} onValueChange={() => setAgreement(!agreement)} />
                            }
                            <Text style={[styles.text, { margin: 5, marginBottom: 10 }]}> I have agreed on terms and condition  </Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1 }}>
                        <LinearGradient colors={['#fff', '#fff']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', borderColor: '#D3D3D3', borderWidth: 1 }}>
                            <Text style={[styles.butang, { color: 'lightgrey' }]}>Back</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!agreement} onPress={() => signUp()} style={{ flex: 1 }}>
                        <LinearGradient colors={agreement ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.butang, { color: '#fff' }]}>Next</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>)
}



export default AgreementScreen