import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, Alert, BackHandler } from 'react-native';
import Constants from 'expo-constants'
import Layout from '../constants/Layout'
import styles from '../styles/styles'

// modules
import {
    handleAndroidBackButton,
    removeAndroidBackButtonHandler
} from '../components/androidBackButton';

const AdminApprovalScreen = (props) => {

    const exitAlert = () => {
        // Works on both Android and iOS
        Alert.alert(
            'Exit App',
            'Exit App and Come Back Later ',
            [

                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => { console.log('OK Pressed'); BackHandler.exitApp() } },
            ],
            { cancelable: false },
        );
    };

    useEffect(() => {
        console.log("componentDidMount");
        handleAndroidBackButton(exitAlert)
    }, []); // empty-array means don't watch for any updates

    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: Layout.window.width * 0.85, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.5 }} resizeMode={'contain'} />
                        <Image source={require('../assets/images/contactsuccess.png')} style={{ height: Layout.window.height * 0.3, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                        <Text style={[styles.h3, { margin: 5, fontWeight: 'bold' }]}>Admin Approval</Text>
                        <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5, alignItems: 'center' }}>
                            <Text style={[styles.text, { margin: 5, color: 'darkturquoise' }]}>Account Under Review!</Text>
                            <Text style={[styles.text, { margin: 5, marginBottom: 20 }]}>Thank you for registering. You will be notified once the account is approved.</Text>
                        </View>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                                <Text style={[styles.textDefault]}>Skip</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.navigate('CompanyDocument')} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }}>
                                <Text style={[styles.textDefault, { color: 'white' }]}>Document</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </View>
            </View>
        </View>
    );

}

AdminApprovalScreen.navigationOptions = {
    header: null,
};

export default AdminApprovalScreen 