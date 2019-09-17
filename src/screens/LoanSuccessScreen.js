//console.ignoredYellowBox = ['Setting a timer']
import React, { useState, useEffect, useRef } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';




import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'
import styles from '../styles/styles'



const LoanSuccessScreen = (props) => {

 

    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>

            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>

                        <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                        <Text style={[styles.text, { margin: 5, fontWeight: 'bold' }]}>Loan Application Submitted</Text>

                        <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5,alignItems:'center' }}>
                            <Text style={[styles.text, { margin: 5, color: 'darkturquoise' }]}>Congratulation!</Text>
                            <Text style={[styles.text, { margin: 5, marginBottom: 20 }]}>Your application has been submitted. The result will be notified to you in three days time.</Text>
                        </View>                       

                        <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} style={{ width: Layout.window.width * 0.4, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                            <Text style={[styles.text,]}>Dashboard</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>

        </View>

    )
}

LoanSuccessScreen.navigationOptions = { header: null, };

export default LoanSuccessScreen