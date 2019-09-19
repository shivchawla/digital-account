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

import { Formik } from 'formik';
import * as Yup from 'yup';

import styles from '../styles/styles'

import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'


const CompanyDocumentScreen = (props) => {
    const dispatch = useDispatch()
    const docPicker = useSelector(state => state.companyInformationReducer.docPicker, shallowEqual)
    const isDocument1 = useSelector(state => state.companyInformationReducer.isDocument1, shallowEqual)
    const isDocument2 = useSelector(state => state.companyInformationReducer.isDocument2, shallowEqual)
    const isDocument3 = useSelector(state => state.companyInformationReducer.isDocument3, shallowEqual)


    const submitDoc = (val) => {
        dispatch(actionCreator.submitDoc(val))
        props.navigation.navigate('CompanyDocumentSuccess')
    }

    return (

        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 2 }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#4D6BFA', }}>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', alignItems: 'flex-start', padding: 10 }}>
                    <Text numberOfLines={1} style={styles.title} ellipsizeMode='tail'>Company Documents</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', marginRight: 3, alignItems: 'flex-end' }}>
                    <Image source={require('../assets/images/logosmall.png')} style={{ width: 50, height: 50, borderRadius: 15 }} />
                </View>
            </View>
            <View>
                <Text style={[styles.text, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 14 }]}>Please fill up this form to continue the process for your company.</Text>
            </View>
            <View style={{ justifyContent: 'space-between', flex: 9 }}>
                <View style={{ flex: 9, margin: 10 }}>
                    <Text>{JSON.stringify(docPicker)}</Text>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.text, { marginBottom: 5, }]}>MyKad</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('DocumentCamera', { doc: 'mykad' })} style={{ padding: 10, borderRadius: 15, justifyContent: 'center', margin: 10, backgroundColor: '#055e7c' }}>
                                <Text style={[styles.small, { color: '#fff' }]}>Upload documents</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text>{isDocument1}</Text>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.text, { marginBottom: 5, }]}>Company Registration Document</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('DocumentCamera', { doc: 'company' })} style={{ padding: 10, borderRadius: 15, justifyContent: 'center', margin: 10, backgroundColor: '#055e7c' }}>
                                <Text style={[styles.small, { color: '#fff' }]}>Upload documents</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text>{isDocument2}</Text>
                    {/* {cddContactPersonNameTouched && cddContactPersonNameError && <Text style={styles.error}>{cddContactPersonNameError}</Text>}
                                */}
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.text, { marginBottom: 5, }]}>Business</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('DocumentCamera', { doc: 'business' })} style={{ padding: 10, borderRadius: 15, justifyContent: 'center', margin: 10, backgroundColor: '#055e7c' }}>
                                <Text style={[styles.small, { color: '#fff' }]}>Upload documents</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text>{isDocument3}</Text>
                    {/* {cddContactPersonNameTouched && cddContactPersonNameError && <Text style={styles.error}>{cddContactPersonNameError}</Text>} */}

                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>

                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1 }}>
                        <LinearGradient colors={['#A4A4A4', '#A4A4A4']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.text, { color: '#fff' }]}>Back</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => submitDoc({isDocument1,isDocument2,isDocument3})}
                        disabled={!(isDocument1 && isDocument2 && isDocument3)}
                        style={{ flex: 1 }}>
                        <LinearGradient
                            colors={(isDocument1 && isDocument2 && isDocument3) ? ['#628BFB', '#0E47E8'] : ['rgba(98, 139, 251, 0.5)', 'rgba(14, 71, 232, 0.5)']}
                            style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.text, { color: '#fff' }]}>Save</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>

            </View>

        </KeyboardAvoidingView>
    );
}

CompanyDocumentScreen.navigationOptions = { header: null, };
export default CompanyDocumentScreen