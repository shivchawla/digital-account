import React from 'react';
import { Image, Text, TouchableOpacity, View, } from 'react-native';
import Constants from 'expo-constants'
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { CustomButton } from '../components/Custom'
const CompanyDocumentSuccessScreen = (props) => {
    const dispatch = useDispatch()

    const goNext = () => {

        //dispatch(actionCreator.setScreen2())
        props.navigation.navigate('RegistrationDeclaration')
    };

    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.5 }} resizeMode={'contain'} />
                    </View>
                    <View style={{ flex: 2, alignSelf: 'stretch' }}>
                        <Image source={require('../assets/images/documentsubmit.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode={'contain'} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={[styles.h3, { margin: 5, fontWeight: 'bold', fontSize: 17 }]}>Document Submitted</Text>
                        <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5, alignItems: 'center' }}>
                            <Text style={[styles.text, { margin: 5, color: 'darkturquoise' }]}>Congratulation!</Text>
                            <Text style={[styles.text, { margin: 5, marginBottom: 20, textAlign: 'center' }]}>Proceed to the next screen or skip to the dashboard.</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <CustomButton
                                navigation={() => props.navigation.navigate('Dashboard')}
                                label={'Skip'}
                                boxStyle={{ borderColor: 'darkturquoise', backgroundColor: '#ffffff00', margin: 10, borderWidth: 1 }}
                                textStyle={{ color: 'black' }}
                            />
                            <CustomButton
                                navigation={() => goNext()}
                                label={'Declaration'}
                                boxStyle={{ backgroundColor:'#09A4BF', margin: 10 }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}



export default CompanyDocumentSuccessScreen