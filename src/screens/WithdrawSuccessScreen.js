import React from 'react';
import { Image, Text, TouchableOpacity, View ,ActivityIndicator} from 'react-native';
import Constants from 'expo-constants'
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector,useDispatch } from 'react-redux'

const WithdrawSuccessScreen = (props) => {

    const { status,code } = useSelector(state => state.withdrawReducer, shallowEqual)
    const dispatch = useDispatch()
    const goDashboard = async () => {
        await dispatch(actionCreator.retrieveMerchantInfo())
        await dispatch(actionCreator.retrieveAccountInfo())
        props.navigation.navigate('Dashboard')
    }
    const goWithdraw = async () => {
        await dispatch(actionCreator.retrieveMerchantInfo())
        await dispatch(actionCreator.retrieveAccountInfo())
        props.navigation.navigate('WithdrawalApplication')
    }
    const resetCode = () => {
        dispatch({ type: 'SET_NEW_WITHDRAWAL', payload: { status:false,code:false,proceedMain: false } })
    }

    return (

        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
           {code===200?status ? <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.5 }} resizeMode={'contain'} />
                    </View>
                    <View style={{ flex: 2, alignSelf: 'stretch' }}>
                        <Image source={require('../assets/images/withdrawalsuccess.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode={'contain'} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={[styles.h3, { margin: 5, fontWeight: 'bold' }]}>Withdrawal Success!</Text>
                        <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5, alignItems: 'center' }}>
                            <Text style={[styles.text, { margin: 5, color: 'darkturquoise' }]}>Congratulation!</Text>
                            <Text style={[styles.text, { margin: 5, marginBottom: 20, textAlign: 'center' }]}>Withdrawal again or skip to the dashboard</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => {resetCode();props.navigation.navigate('Dashboard')}} style={{ width: Layout.window.width * 0.3, paddingTop: 16, paddingBottom:16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10,  borderColor: 'darkturquoise', borderWidth: 1 }}>
                                <Text style={[styles.textDefault]}>Dashboard</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {resetCode();props.navigation.navigate('WithdrawalApplication')}} style={{ width: Layout.window.width * 0.3, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }}>
                                <Text style={[styles.textDefault, { color: 'white' }]}>Withdraw</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View> : <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.5 }} resizeMode={'contain'} />
                        </View>
                        <View style={{ flex: 2, alignSelf: 'stretch' }}>
                            <Image source={require('../assets/images/withdrawalfailed.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode={'contain'} />
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={[styles.h3, { margin: 5, fontWeight: 'bold' }]}>Withdrawal Failed!</Text>
                            <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5, alignItems: 'center' }}>
                                <Text style={[styles.text, { margin: 5, color: 'darkturquoise' }]}>Unfortunately!</Text>
                                <Text style={[styles.text, { margin: 5, marginBottom: 20, textAlign: 'center' }]}>Please Try Again Later.</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => {resetCode();props.navigation.navigate('Dashboard')}} style={{ width: Layout.window.width * 0.3, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10,  borderColor: 'darkturquoise',borderWidth: 1 }}>
                                    <Text style={[styles.textDefault]}>Dashboard</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {resetCode();props.navigation.navigate('WithdrawalApplication')}} style={{ width: Layout.window.width * 0.3, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }}>
                                    <Text style={[styles.textDefault, { color: 'white' }]}>Withdraw</Text>
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

WithdrawSuccessScreen.navigationOptions = {
    header: null,
};

export default WithdrawSuccessScreen