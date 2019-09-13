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
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>

            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>

                        <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>COMPANY INFO</Text>

                        <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5 }}>
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkturquoise' }]}>Congratulation!</Text>
                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 20 }]}>You have entered your company information</Text>
                        </View>

                        <TouchableOpacity onPress={() => props.navigation.navigate(`ContactPerson`)} style={{ width: Layout.window.width * 0.4, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#4A90E2' }}>
                            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{ paddingTop: 5, paddingBottom: 5, alignItems: 'center', borderRadius: 15, width: Layout.window.width * 0.4, }}>
                                <Text style={[styles.textDefault, { color: '#fff' }]}>Next</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} style={{ width: Layout.window.width * 0.4, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                            <Text style={[styles.textDefault,]}>Skip</Text>
                        </TouchableOpacity>

                    </View>

                </View>

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


CompanyInfoSuccessScreen.navigationOptions = { header: null, };

export default CompanyInfoSuccessScreen