//console.ignoredYellowBox = ['Setting a timer']
import React, { useState } from 'react';
import {
    Image,
    Platform,
    Text,
    TouchableOpacity,
    View,
    CheckBox
} from 'react-native';
//import NavigationService from '../navigation/NavigationService'

import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import CheckBox2 from 'react-native-check-box'


const AgreementScreen = (props) => {
    const [agreement, setAgreement] = useState(false)
    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            {/* <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'flex-start' }}><Image source={require('../assets/images/topLeft.png')} style={{ width: 79, height: 120 }} /></View>
                <View style={{ alignItems: 'flex-end' }}><Image source={require('../assets/images/bottomRight.png')} style={{ width: 106, height: 92 }} /></View>

            </View> */}
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                        <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 12 }]}>Terms and Conditions</Text>


                        <Text style={[styles.caption, { alignSelf: 'flex-start', textAlign: 'left' }]}>Pursuant to the Personal Data Protection Act 2010 (“PDPA”), BXcess (“BXcess”) is mindful and committed to the protection of your personal information and your privacy.
This Personal Data Protection Notice (“Notice”) describes how BXcess and its respective subsidiaries and associate companies ("FCGB") use your Personal Data.
FCGB is referred to as “we”, “us”, “our” or “ours”. Any person using and accessing this Site, the Content or the Services is referred to as the “User”, “you” or “yours”.</Text>

                        <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 12 }]}>Acknowledgement and Consent</Text>
                        <Text style={[styles.caption, { alignSelf: 'flex-start', textAlign: 'left' }]}>By communicating with us, using our services, or services from us or by virtue of your engagement with us, you acknowledge that you have read and understood this Policy/Notice and agree and consent to the use, processing and transfer of your Personal Data by us as described in this Notice.
                        We shall have the right to modify, update or amend the terms of this Notice at any time by placing the updated Notice on the Websites. </Text>
                        {/* <Text style={[styles.caption, { alignSelf: 'flex-start', textAlign: 'left' }]}>Collection of Personal Data</Text>
                        <Text style={[styles.caption, { alignSelf: 'flex-start', textAlign: 'left' }]}>“Personal Data” means information about you, from which you are identifiable, including but not limited to your name, identification card number, birth certificate number, passport number, nationality, address, telephone number, fax number, bank details, credit card details, race, gender, date of birth, marital status, resident status, education background, financial background, personal interests, email address, your occupation, your designation in your company, your company details, the industry in which you work in, any information about you which you have provided to us in registration forms, application forms or any other similar forms and/or any information about you that has been or may be collected, stored, used and processed by us from time to time and includes sensitive personal data such as data relating to health, religious or other similar beliefs.</Text> */}

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            {(Platform.OS == 'ios') ?

                                <CheckBox2 isChecked={agreement} onClick={() => setAgreement(!agreement)} />
                                :
                                <CheckBox value={agreement} onValueChange={() => setAgreement(!agreement)} />
                        }
                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 12 }]}>
                                I have agree on terms and condition
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <TouchableOpacity disabled={!agreement} onPress={() => props.navigation.navigate('SignUpPersonal')} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                <LinearGradient colors={agreement ? ['#4DCB3E', '#269B1D'] : ['rgba(77, 203, 62, 0.5)', 'rgba(38, 155, 29, 0.5)']} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                    <Text style={[styles.textDefault, { color: '#fff' }]}>Next</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Welcome')} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#5A647F' }} >
                                <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View >
    );
}

AgreementScreen.navigationOptions = {
    header: null,
};

export default AgreementScreen