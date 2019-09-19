//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useRef } from 'react';
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
    KeyboardAvoidingView,
    ActivityIndicator


} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import { Formik } from 'formik';
import * as Yup from 'yup';

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { DatePicker } from 'native-base'
import moment from 'moment'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'


const validationSchema = Yup.object().shape({
    cddContactPersonName: Yup
        .string()
        .required(),

    cddContactPersonIc: Yup
        .string()
        .required(),

    cddContactPersonNumber: Yup
        .string()
        .required(),

    cddContactPersonPosition: Yup
        .string()
        .required(),

});

const CompanyDocumentScreen = (props) => {
    const dispatch = useDispatch()
    const isDocument1fileName = useSelector(state => state.companyInformationReducer.isDocument1fileName, shallowEqual)
    const contactPerson = (values) => {
        dispatch(actionCreator.contactPerson(values))
        props.navigation.navigate('ContactPersonSuccess')
    }

    const pickDoc = () => {
        DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: false })
            .then(result => {
                console.log(JSON.stringify(result))

                const { uri, name } = result

                //this.props.setLoanInfo({ proposal: name })
                //this.props.saveDocument(result)
            })
    }

    return (
        <Formik
            // initialValues={{ email: '', password: '' }}
            onSubmit={values => contactPerson(values)}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                const { cddContactPersonName, cddContactPersonIc, cddContactPersonNumber, cddContactPersonPosition } = FormikProps.values

                const cddContactPersonNameError = FormikProps.errors.cddContactPersonName
                const cddContactPersonNameTouched = FormikProps.touched.cddContactPersonName

                const cddContactPersonIcError = FormikProps.errors.cddContactPersonIc
                const cddContactPersonIcTouched = FormikProps.touched.cddContactPersonIc

                const cddContactPersonNumberError = FormikProps.errors.cddContactPersonNumber
                const cddContactPersonNumberTouched = FormikProps.touched.cddContactPersonNumber

                const cddContactPersonPositionError = FormikProps.errors.cddContactPersonPosition
                const cddContactPersonPositionTouched = FormikProps.touched.cddContactPersonPosition

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
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5, borderBottomColor: cddContactPersonNameTouched && cddContactPersonNameError ? '#d94498' : '#5a83c2' }]}>MyKad</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('DocumentCamera',{doc:'mykad'})} style={{ padding: 10, borderRadius: 15, justifyContent: 'center', margin: 10, backgroundColor: '#055e7c' }}>
                                            <Text style={[styles.small, { color: '#fff' }]}>Upload documents</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Text>{isDocument1fileName}</Text>
                                {cddContactPersonNameTouched && cddContactPersonNameError && <Text style={styles.error}>{cddContactPersonNameError}</Text>}

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5, borderBottomColor: cddContactPersonNameTouched && cddContactPersonNameError ? '#d94498' : '#5a83c2' }]}>Company Registration Document</Text>
                                    <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('DocumentCamera',{doc:'company'})} style={{ padding: 10, borderRadius: 15, justifyContent: 'center', margin: 10, backgroundColor: '#055e7c' }}>
                                        <Text style={[styles.small, { color: '#fff' }]}>Upload documents</Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                                {cddContactPersonNameTouched && cddContactPersonNameError && <Text style={styles.error}>{cddContactPersonNameError}</Text>}
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5, borderBottomColor: cddContactPersonNameTouched && cddContactPersonNameError ? '#d94498' : '#5a83c2' }]}>Business</Text>
                                    <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('DocumentCamera',{doc:'business'})} style={{ padding: 10, borderRadius: 15, justifyContent: 'center', margin: 10, backgroundColor: '#055e7c' }}>
                                        <Text style={[styles.small, { color: '#fff' }]}>Upload documents</Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                                {cddContactPersonNameTouched && cddContactPersonNameError && <Text style={styles.error}>{cddContactPersonNameError}</Text>}

                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>

                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1 }}>
                                    <LinearGradient colors={['#A4A4A4', '#A4A4A4']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.text, { color: '#fff' }]}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                    <LinearGradient colors={FormikProps.isValid ? ['#628BFB', '#0E47E8'] : ['rgba(98, 139, 251, 0.5)', 'rgba(14, 71, 232, 0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> :
                                            <Text style={[styles.text, { color: '#fff' }]}>Save</Text>}
                                    </LinearGradient>
                                </TouchableOpacity>

                            </View>

                        </View>

                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}

CompanyDocumentScreen.navigationOptions = { header: null, };
export default CompanyDocumentScreen