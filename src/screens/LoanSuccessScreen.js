import React from 'react';
import { Image, Text, TouchableOpacity, View,ActivityIndicator } from 'react-native';
import Constants from 'expo-constants'
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector,useDispatch } from 'react-redux'

const LoanSuccessScreen = (props) => {


    const { status,code } = useSelector(state => state.loanApplicationReducer, shallowEqual)

    const dispatch = useDispatch()
    const goDashboard = async () => {
        await dispatch(actionCreator.retrieveMerchantInfo())
        await dispatch(actionCreator.retrieveAccountInfo())
        props.navigation.navigate('Dashboard')
    }
  
    return (

        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            {code===200?status? <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.5 }} resizeMode={'contain'} />
                        </View>
                        <View style={{ flex: 2, alignSelf: 'stretch' }}>
                            <Image source={require('../assets/images/loanapplication.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode={'contain'} />
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={[styles.h3, { margin: 5, fontWeight: 'bold',fontSize:17 }]}>Loan Application Submitted</Text>
                            <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5, alignItems: 'center' }}>
                                <Text style={[styles.text, { margin: 5, color: 'darkturquoise' }]}>Congratulation!</Text>
                                <Text style={[styles.text, { margin: 5, marginBottom: 20, textAlign: 'center' }]}>Your application has been submitted. The result will be notified to you in three days time.</Text>
                            </View>
                        </View>
                        <View style = {{flex:1}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => goDashboard()} style={{ width: Layout.window.width * 0.4, paddingTop: 16, paddingBottom: 16, borderWidth: 1, borderColor: 'darkturquoise', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                <Text style={[styles.textDefault, {fontSize:15} ]}>Dashboard</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                </View>
            </View> : <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.5 }} resizeMode={'contain'} />
                        </View>
                        <View style={{ flex: 2, alignSelf: 'stretch' }}>
                            <Image source={require('../assets/images/loanfailed.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode={'contain'} />
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={[styles.h3, { margin: 5, fontWeight: 'bold',fontSize:17 }]}>Loan Application Failed!</Text>
                            <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5, alignItems: 'center' }}>
                                <Text style={[styles.text, { margin: 5, color: 'darkturquoise' }]}>Unfortunately!</Text>
                                <Text style={[styles.text, { margin: 5,marginTop:10, textAlign: 'center' }]}>Please Try Again Later.</Text>
                            </View>
                        </View>
                        <View style = {{flex:1}}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => goDashboard()} style={{ width: Layout.window.width * 0.4, paddingTop: 16, paddingBottom: 16, borderWidth: 1, borderColor: 'darkturquoise', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <Text style={[styles.textDefault,{fontSize:15}]}>Dashboard</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                        </View>
                </View>:<View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.5 }} resizeMode={'contain'} />
                    </View>
                    <View style={{ flex: 2, alignSelf: 'stretch' }}>
                        <ActivityIndicator />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }} />

                    <View style={{ flex: 1 }} />
                    
                </View>
            </View>}
        </View>

    )
}

LoanSuccessScreen.navigationOptions = { header: null, };

export default LoanSuccessScreen