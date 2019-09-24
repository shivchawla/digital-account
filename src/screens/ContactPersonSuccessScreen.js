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


const ContactPersonSuccessScreen = (props) => {


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

                <View style={{ justifyContent: 'center', alignItems: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                </View>
                <View style={{ margin: 5, justifyContent: 'center', alignItems: 'center', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Text style={[styles.h3, { margin: 5, flexDirection: 'row', justifyContent: 'flex-start' }]}>CONTACT INFO SUBMITTED</Text>
                </View>
                <View style={{ alignSelf: 'stretch', margin: 5 }}>
                    <Text style={[styles.text, { margin: 5, color: '#09A4BF' }]}>Congratulation!</Text>
                    <Text style={[styles.text, { margin: 5, marginBottom: 20 }]}>You have entered your contact information. You can either choose to submit document or skip to the dashboard.</Text>
                </View>

            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>

                <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 }}>
                    <LinearGradient colors={['#fff', '#fff']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.butang, { color: 'lightgrey' }]}>Skip</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.navigation.navigate('CompanyDocument')} style={{ flex: 1, borderColor: '#0A6496', borderWidth: 1 }}>
                    <LinearGradient colors={['#0A6496', '#055E7C']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.butang, { color: '#fff' }]}>Document</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
        </View>

    );
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


ContactPersonSuccessScreen.navigationOptions = { header: null, };

export default ContactPersonSuccessScreen 