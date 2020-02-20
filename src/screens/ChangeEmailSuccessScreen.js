import React from 'react';
import { Image, Text, TouchableOpacity, View, } from 'react-native';
import Constants from 'expo-constants'
import Layout from '../constants/Layout'
import styles from '../styles/styles'

const ChangeEmailSuccessScreen = (props) => {

    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
        <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.5 }} resizeMode={'contain'} />
                </View>
                <View style={{ flex: 2, alignSelf: 'stretch' }}>
                    <Image source={require('../assets/images/emailsuccess.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode={'contain'} />
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={[styles.h3, { margin: 5, fontWeight: 'bold',fontSize:17 }]}>Email Changed!</Text>
                    <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5, alignItems: 'center' }}>
                        <Text style={[styles.text, { margin: 5, color: 'darkturquoise' }]}>Congratulation!</Text>
                        <Text style={[styles.text, { margin: 5, marginBottom: 20, textAlign: 'center' }]}>Your new email has been successfully updated.</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} style={{ width: Layout.window.width * 0.3, paddingTop:16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'darkturquoise', borderWidth: 1 }}>
                            <Text style={[styles.textDefault]}>Dashboard</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('DataSetting')} style={{ width: Layout.window.width * 0.3, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }}>
                            <Text style={[styles.textDefault, { color: 'white' }]}>Setting</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </View>
    );

}



export default ChangeEmailSuccessScreen 