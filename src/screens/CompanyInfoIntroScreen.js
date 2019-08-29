//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants'
import Layout from '../constants/Layout'
import styles from '../styles/styles'

const CompanyInfoIntroScreen = () => {
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
                        <Text style={[styles.textDefault, { margin: 20 }]}>Phone Verified.Proceed to company registration or skip to dashboard for now</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('CompanyInformation')} style={{ width: Layout.window.width * 0.4, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#4A90E2' }}>
                            <LinearGradient
                                colors={['#4c669f', '#3b5998', '#192f6a']}
                                style={{ paddingTop: 5, paddingBottom: 5, alignItems: 'center', borderRadius: 15, width: Layout.window.width * 0.4, }}>
                                <Text style={[styles.textDefault, { color: '#fff' }]}>Company Info</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')} style={{ width: Layout.window.width * 0.4, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                            <Text style={[styles.textDefault,]}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
    );
}
CompanyInfoIntroScreen.navigationOptions = {
    header: null,
};

export default CompanyInfoIntroScreen