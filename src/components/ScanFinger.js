import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Modal, TouchableHighlight, Button, Image, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as LocalAuthentication from 'expo-local-authentication';
import Layout from '../constants/Layout';

const ScanFinger = (props) => {

    const [authenticate, setAuthenticate] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [failedCount, setFailedCount] = useState(0)

    // setModalVisible(visible) {
    //   this.setState({ modalVisible: visible });
    // }

    const clearState = () => {
        // this.setState({ authenticated: false, failedCount: 0 });
        setAuthenticate(false)
        setFailedCount(0)
    };

    useEffect(() => {
        scanFingerPrint()
    }, [authenticate])

    const scanFingerPrint = async () => {
        try {
            let results = await LocalAuthentication.authenticateAsync();
            if (results.success) {
                setAuthenticate(true)
                setFailedCount(0)
                console.log(`berjaya scan `)
                props.unlock()
            } else {
                console.log(`TAK berjaya scan `)
                setFailedCount(failedCount + 1)
            }
        } catch (e) {
            console.log(e);
        }
    };
    if (Platform.OS === 'android') {
        return (
            <View style={{ width: Layout.window.width, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ paddingBottom: 10 }}>Place Your Finger To Verify</Text>
                <Image style={{ width: 110, height: 110 }} source={require('../assets/images/fingerprint.png')} />
                {failedCount > 0 && (<Text style={{ color: 'red', fontSize: 14 }}>Failed To Verify Yourself. Please Try Again!</Text>)}
            </View>
        );
    } else {
        return (
            <View />
        );
    }

}

export default ScanFinger