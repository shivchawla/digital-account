import React,{useEffect} from 'react';
import { Image, Text, TouchableOpacity, View,ActivityIndicator} from 'react-native';
import Constants from 'expo-constants'
import Layout from '../constants/Layout'
import styles from '../styles/styles'

import { shallowEqual, useSelector, useDispatch } from 'react-redux'

const InvoiceSuccessScreen = (props) => {

    const dispatch = useDispatch()
    const { status,code } = useSelector(state => state.invoiceReducer, shallowEqual)
    const resetCode = () => {
        dispatch({ type: 'SET_INVOICE_APPLICATION', payload: { status:false,code:false,proceedMain: false } })
    }
    useEffect(() => {
        dispatch({ type: 'SET_INVOICE_APPLICATION', payload: { items: null } })
    }, [])

    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            {code ? status ? <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.5 }} resizeMode={'contain'} />
                    </View>
                    <View style={{ flex: 2, alignSelf: 'stretch' }}>
                        <Image source={require('../assets/images/invoicesuccess.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode={'contain'} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={[styles.h3, { margin: 5, fontWeight: 'bold' }]}>Invoice Created</Text>
                        <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5, alignItems: 'center' }}>
                            <Text style={[styles.text, { margin: 5, color: 'darkturquoise' }]}>Congratulation!</Text>
                            <Text style={[styles.text, { margin: 5, marginBottom: 20, textAlign: 'center' }]}>Proceed to create new invoice again or skip to the dashboard</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => {resetCode();props.navigation.navigate('Dashboard')}} style={{ width: Layout.window.width * 0.3, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10,  borderColor: 'darkturquoise', borderWidth: 1 }}>
                                <Text style={[styles.textDefault]}>Dashboard</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {resetCode();props.navigation.navigate('Invoice')}} style={{ width: Layout.window.width * 0.3, paddingTop: 16, paddingBottom: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }}>
                                <Text style={[styles.textDefault, { color: 'white' }]}>Invoice</Text>
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
                        <Image source={require('../assets/images/invoicefailed.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode={'contain'} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={[styles.h3, { margin: 5, fontWeight: 'bold' }]}>Invoice Create Failed!</Text>
                        <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5, alignItems: 'center' }}>
                            <Text style={[styles.text, { margin: 5, color: 'darkturquoise' }]}>Unfortunately!</Text>
                            <Text style={[styles.text, { margin: 5, marginBottom: 20, textAlign: 'center' }]}>Please Try Again Later.</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => {resetCode();props.navigation.navigate('Dashboard')}} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10,  borderColor: 'darkturquoise', borderWidth: 1 }}>
                                <Text style={[styles.textDefault]}>Dashboard</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {resetCode();props.navigation.navigate('Invoice')}} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }}>
                                <Text style={[styles.textDefault, { color: 'white' }]}>Invoice</Text>
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



export default InvoiceSuccessScreen