//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    TextInput,
    AsyncStorage,
    ImageBackground,
    CheckBox

} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'


const CompanyInfoSuccessScreen = (props) => {


    const done = async () => {
        //await this.props.companyInfo()
        //this.props.contactPerson()
        // this.props.doneForNow()
        // this.props.navigation.navigate('Agreement')
    }

    const skip = () => {
        // this.props.initiateCompanyInfo()
        // this.props.navigation.navigate('Dashboard')
    }

    // componentDidMount() {
    //     this.props.initiateListWorkers()
    // }

    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <View style={{ flex: 10 }}>

                <Image source={require('../assets/images/logo.png')} style={{ flexDirection:'row', height: Layout.window.height * 0.2, width: Layout.window.width * 0.7, justifyContent: 'center' }} resizeMode={'contain'} />
                <Text style={[styles.text, { margin: 5, fontWeight: 'bold', flexDirection:'row', justifyContent:'center' }]}>COMPANY INFO</Text>

                <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5 }}>
                    <Text style={[styles.text, { margin: 5, color: 'darkturquoise' }]}>Congratulation!</Text>
                    <Text style={[styles.text, { margin: 5, marginBottom: 20 }]}>You have entered your company information. You can either choose to enter merchant's info or skip to the dashboard.</Text>
                </View>

            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>

                <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} style={{ flex: 1 }}>
                    <LinearGradient colors={['#A4A4A4', '#A4A4A4']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.text,]}>Skip</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.navigation.navigate(`ContactPerson`)} style={{ flex: 1 }}>
                    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.text, { color: '#fff' }]}>Merchant</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>

        </View>

    )
}

// function mapStateToProps(state) {
//     return {
//         listWorkers: state.listWorkersReducer.listWorkers,
//     }
// }
// function mapDispatchToProps(dispatch) {
//     return {

//         initiateListWorkers: () => dispatch(actionCreator.initiateListWorkers()),
//         doneForNow: () => dispatch(actionCreator.doneForNow()),
//         initiateCompanyInfo: () => dispatch(actionCreator.initiateCompanyInfo())
//     }
// }

CompanyInfoSuccessScreen.navigationOptions = { header: null, };

export default CompanyInfoSuccessScreen