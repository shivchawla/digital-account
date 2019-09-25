//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useRef } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'

import styles from '../styles/styles'

import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import Layout from '../constants/Layout';

const CompanyDocumentScreen = (props) => {
    const dispatch = useDispatch()
    const docPicker = useSelector(state => state.companyInformationReducer.docPicker, shallowEqual)
    const isDocument1 = useSelector(state => state.companyInformationReducer.isDocument1, shallowEqual)
    const isDocument2 = useSelector(state => state.companyInformationReducer.isDocument2, shallowEqual)
    const isDocument3 = useSelector(state => state.companyInformationReducer.isDocument3, shallowEqual)

    const submitDoc = (val) => {
        dispatch(actionCreator.submitDoc1(val))
        props.navigation.navigate('CompanyDocumentSuccess')
    }

    return (

        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 2 }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4', }}>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', alignItems: 'flex-start', padding: 10 }}>
                    <Text numberOfLines={1} style={styles.title} ellipsizeMode='tail'>Company Documents</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', marginRight: 3, alignItems: 'flex-end' }}>
                    <Image source={require('../assets/images/logosmall.png')} style={{ width: 50, height: 50, borderRadius: 15 }} />
                </View>
            </View>

            <View style={{ justifyContent: 'space-between', flex: 9 }}>
                <View style={{ flex: 9, margin: 10 }}>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.text, { marginBottom: 5, }]}>MyKad</Text>
                        {isDocument1 ? <View style={{ backgroundColor: 'lightgrey', height: Layout.window.height / 6, width: Layout.window.width / 2, justifyContent: 'flex-end' }}>
                            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                                <Image source={{ uri: isDocument1 }} resizeMode={'cover'} style={{ flex: 1, width: undefined, height: undefined }} />
                            </View>
                            <TouchableOpacity onPress={() => props.navigation.navigate('DocumentCamera', { doc: 'mykad' })} style={{ alignSelf: 'stretch', backgroundColor: 'rgba(5, 94, 124, 0.5)', alignItems: 'center', padding: 5 }} >
                                <Text style={[styles.small, { color: '#fff' }]}>Replace</Text>
                            </TouchableOpacity>


                        </View> :
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => props.navigation.navigate('DocumentCamera', { doc: 'mykad' })} style={{ padding: 10, borderRadius: 20, justifyContent: 'center', margin: 10, backgroundColor: '#055e7c' }}>
                                    <Text style={[styles.small, { color: '#fff' }]}>{isDocument1 ? 'Replace' : 'Upload documents'}</Text>
                                </TouchableOpacity>
                            </View>}



                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.text, { marginBottom: 5, }]}>Company Registration Document</Text>
                        {isDocument2 ? <View style={{ backgroundColor: 'lightgrey', height: Layout.window.height / 6, width: Layout.window.width / 2, justifyContent: 'flex-end' }}>
                            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                                <Image source={{ uri: isDocument2 }} resizeMode={'cover'} style={{ flex: 1, width: undefined, height: undefined }} />
                            </View>
                            <TouchableOpacity onPress={() => props.navigation.navigate('DocumentCamera', { doc: 'company' })} style={{ alignSelf: 'stretch', backgroundColor: 'rgba(5, 94, 124, 0.5)', alignItems: 'center', padding: 5 }} >
                                <Text style={[styles.small, { color: '#fff' }]}>Replace</Text>
                            </TouchableOpacity>


                        </View> :
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => props.navigation.navigate('DocumentCamera', { doc: 'company' })} style={{ padding: 10, borderRadius: 20, justifyContent: 'center', margin: 10, backgroundColor: '#055e7c' }}>
                                    <Text style={[styles.small, { color: '#fff' }]}>{isDocument2 ? 'Replace' : 'Upload documents'}</Text>
                                </TouchableOpacity>
                            </View>}
                    </View>


                  
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.text, { marginBottom: 5, }]}>Business</Text>
                        {isDocument3 ? <View style={{ backgroundColor: 'lightgrey', height: Layout.window.height / 6, width: Layout.window.width / 2, justifyContent: 'flex-end' }}>
                            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                                <Image source={{ uri: isDocument3 }} resizeMode={'cover'} style={{ flex: 1, width: undefined, height: undefined }} />
                            </View>
                            <TouchableOpacity onPress={() => props.navigation.navigate('DocumentCamera', { doc: 'business' })} style={{ alignSelf: 'stretch', backgroundColor: 'rgba(5, 94, 124, 0.5)', alignItems: 'center', padding: 5 }} >
                                <Text style={[styles.small, { color: '#fff' }]}>Replace</Text>
                            </TouchableOpacity>


                        </View> :
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => props.navigation.navigate('DocumentCamera', { doc: 'business' })} style={{ padding: 10, borderRadius: 20, justifyContent: 'center', margin: 10, backgroundColor: '#055e7c' }}>
                                    <Text style={[styles.small, { color: '#fff' }]}>{isDocument3 ? 'Replace' : 'Upload documents'}</Text>
                                </TouchableOpacity>
                            </View>}
                    </View>
                
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>


                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 }}>
                        <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.butang, { color: 'lightgrey' }]}>Back</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => submitDoc({ isDocument1, isDocument2, isDocument3 })}
                        disabled={!(isDocument1 && isDocument2 && isDocument3)}
                        style={{ flex: 1 }}>
                        <LinearGradient
                            colors={(isDocument1 && isDocument2 && isDocument3) ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']}
                            style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.butang, { color: '#fff' }]}>Save</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>

            </View>

        </KeyboardAvoidingView>
    );
}

CompanyDocumentScreen.navigationOptions = { header: null, };
export default CompanyDocumentScreen