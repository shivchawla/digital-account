import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, } from 'react-native';
import Constants from 'expo-constants'
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import {
    handleAndroidBackButton,
    removeAndroidBackButtonHandler
} from '../components/androidBackButton';
import { CustomButton } from '../components/Custom'

const ContactPersonSuccessScreen = (props) => {
    const dispatch = useDispatch()
    const goNext = () => {

        //dispatch(actionCreator.setScreen2())
        props.navigation.navigate('CompanyDocument')
    };

    useEffect(() => {
        console.log("componentDidMount");
        handleAndroidBackButton(() => { return true; })
        return () => {
            removeAndroidBackButtonHandler()
        };
    }, []); // empty-array means don't watch for any updates

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
                        <Text style={[styles.h3, { margin: 5, fontWeight: 'bold', fontSize: 17 }]}>Contact Info Submitted</Text>
                        <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5, alignItems: 'center' }}>
                            <Text style={[styles.text, { margin: 5, color: 'darkturquoise' }]}>Congratulation!</Text>
                            <Text style={[styles.text, { margin: 5, marginBottom: 20, textAlign: 'center' }]}>You have entered your contact information. You can either choose to submit document or skip to the dashboard.</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
                            <CustomButton
                                navigation={() => props.navigation.navigate('Dashboard')}
                                label={'Skip'}
                                boxStyle={{ borderColor: 'darkturquoise', backgroundColor: '#ffffff00', margin: 10, borderWidth: 1 }}
                                textStyle={{ color: 'black' }}
                            />
                            <CustomButton
                                navigation={() => goNext()}
                                label={'Document'}
                                boxStyle={{ backgroundColor: '#09A4BF', margin: 10 }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );

}



export default ContactPersonSuccessScreen 