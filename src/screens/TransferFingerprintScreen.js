import React, { useState } from 'react';
import { Text, View, StyleSheet, Modal, TouchableHighlight, Button, Image, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as LocalAuthentication from 'expo-local-authentication';

const TransferFingerprintScreen = (props) => {

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

    const scanFingerPrint = async () => {
        try {
            let results = await LocalAuthentication.authenticateAsync();
            if (results.success) {
                setAuthenticate(true)
                setFailedCount(0)
                setModalVisible(false)
            } else {
                setFailedCount(failedCount + 1)
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={[styles.container, modalVisible ? { backgroundColor: '#b7b7b7' } : { backgroundColor: 'white' }]}>
            <Button title={authenticate ? 'Reset and begin Authentication again' : 'Push Me To Verify!'}
                onPress={() => {
                    clearState();
                    if (Platform.OS === 'android') {
                        setModalVisible(!modalVisible);
                    } else {
                        scanFingerPrint();
                    }
                }}
            />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {authenticate && (<TouchableOpacity onPress={() => props.navigation.navigate('TransferSuccess')} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                    <Text style={[styles.textDefault]}>Next</Text>
                </TouchableOpacity>)}
            </View>
            <Modal animationType="slide" transparent={true} visible={modalVisible} onShow={scanFingerPrint}>
                <View style={styles.modal}>
                    <View style={styles.innerContainer}>
                        <Text>Place Your Fingerprint!</Text>
                        <Image style={{ width: 128, height: 128 }} source={require('../assets/images/fingerprint.png')} />
                        {failedCount > 0 && (<Text style={{ color: 'red', fontSize: 14 }}>Failed To Verify Yourself. Please Try Again!</Text>)}
                        <TouchableHighlight onPress={async () => {
                            LocalAuthentication.cancelAuthenticate();
                            setModalVisible(!modalVisible);
                        }}>
                            <Text style={{ color: 'red', fontSize: 16 }}>Cancel</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default TransferFingerprintScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: Constants.statusBarHeight,
        padding: 8,
    },
    modal: {
        flex: 1,
        marginTop: '90%',
        backgroundColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        marginTop: '30%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        alignSelf: 'center',
        fontSize: 22,
        paddingTop: 20,
    },
});