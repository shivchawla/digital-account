import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View, } from 'react-native';
import { useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'

const WithdrawSuccessScreen = (props) => {

    useEffect(() => {
        getPersonalToken()
    }, []);
    const dispatch = useDispatch()
    const getPersonalToken = () => dispatch(actionCreator.getPersonalToken())

    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 10 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.text, { margin: 5, fontWeight: 'bold', flexDirection: 'row', justifyContent: 'center' }]}>WITHDRAW MONEY</Text>
                </View>
                <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5 }}>
                    <Text style={[styles.text, { margin: 5, color: 'darkturquoise' }]}>Withdrawal Success!</Text>
                    <Text style={[styles.text, { margin: 5, marginBottom: 20 }]}>You can either choose to withdraw money again or go to the Dashboard.</Text>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} style={{ flex: 1 }}>
                    <LinearGradient colors={['#A4A4A4', '#A4A4A4']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.text]}>Skip</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('Withdraw')} style={{ flex: 1 }}>
                    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.text, { color: '#fff' }]}>Withdraw</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>

    )
}

WithdrawSuccessScreen.navigationOptions = {
    header: null,
};

export default WithdrawSuccessScreen