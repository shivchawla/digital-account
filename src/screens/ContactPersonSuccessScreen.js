import React from 'react';
import { Image, Text, TouchableOpacity, View, } from 'react-native';
import Constants from 'expo-constants'
import Layout from '../constants/Layout'
import styles from '../styles/styles'

const ContactPersonSuccessScreen = (props) => {

    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
        <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.5 }} resizeMode={'contain'} />
                </View>
                <View style={{ flex: 2, alignSelf: 'stretch' }}>
                    <Image source={require('../assets/images/contactsuccess.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode={'contain'} />
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={[styles.h3, { margin: 5, fontWeight: 'bold',fontSize:17 }]}>Contact Info Submitted</Text>
                    <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5, alignItems: 'center' }}>
                        <Text style={[styles.text, { margin: 5, color: 'darkturquoise' }]}>Congratulation!</Text>
                        <Text style={[styles.text, { margin: 5, marginBottom: 20, textAlign: 'center' }]}>You have entered your contact information. You can either choose to submit document or skip to the dashboard.</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' , marginTop:30}}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} style={{ width: Layout.window.width * 0.3, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'darkturquoise', borderWidth: 1 }}>
                            <Text style={[styles.textDefault]}>Skip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('CompanyDocument')} style={{ width: Layout.window.width * 0.3, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }}>
                            <Text style={[styles.textDefault, { color: 'white' }]}>Document</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </View>
    );

}

ContactPersonSuccessScreen.navigationOptions = {
    header: null,
};

export default ContactPersonSuccessScreen 