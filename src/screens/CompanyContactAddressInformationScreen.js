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
    comp_addr: Yup
        .string()
        .required()
        .label('Address Line 1'),
    comp_city: Yup
        .string()
        .required()
        .label('City'),
    comp_state: Yup
        .string()
        .required()
        .label('State'),
    cddPostcode: Yup
        .string()
        .required()
        .label('Postcode'),
});
//const { comp_addr, comp_addr2, comp_city, comp_state, cddPostcode } = FormikProps.values
const CompanyContactAddressInformationScreen = (props) => {


    const dispatch = useDispatch()
    const proceed = useSelector(state => state.companyInformationReducer.proceed, shallowEqual)

    const save = async (values) => {
        await dispatch(actionCreator.companyInfo(values))
        await props.navigation.goBack()
    }

    return (
        <Formik
            //initialValues={{ smeConnected: false }}
            onSubmit={values => {

                save(values)
                props.navigation.goBack()
            }}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                const { comp_addr, comp_addr2, comp_city, comp_state, cddPostcode } = FormikProps.values

                const comp_addrError = FormikProps.errors.comp_addr
                const comp_addrTouched = FormikProps.touched.comp_addr

                const comp_addr2Error = FormikProps.errors.comp_addr2
                const comp_addr2Touched = FormikProps.touched.comp_addr2

                const comp_cityError = FormikProps.errors.comp_city
                const comp_cityTouched = FormikProps.touched.comp_city

                const comp_stateError = FormikProps.errors.comp_state
                const comp_stateTouched = FormikProps.touched.comp_state

                const cddPostcodeError = FormikProps.errors.cddPostcode
                const cddPostcodeTouched = FormikProps.touched.cddPostcode

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 2 }}>

                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4', }}>

                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', alignItems: 'flex-start', paddingLeft: 10 }}>
                                <Text numberOfLines={1} style={styles.title} ellipsizeMode='tail'>ADDRESS</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Image source={require('../assets/images/logosmall.png')} style={{ width: 50, height: 50, borderRadius: 15 }} />
                            </View>

                        </View>

                        <View style={{ justifyContent: 'space-between', flex: 9 }}>

                            <View style={[styles.screenMargin, { flex: 9 }]}>

                                <View style={[styles.formElement]}>
                                    <Text style={[styles.text, { marginBottom: 5, borderBottomColor: comp_addrTouched && comp_addrError ? '#d94498' : '#5a83c2' }]}>Address Line 1</Text>
                                    <TextInput value={comp_addr} onBlur={FormikProps.handleBlur('comp_addr')} onChangeText={FormikProps.handleChange('comp_addr')} placeholder={comp_addrTouched && comp_addrError ? '' : 'Eg: 89, Jalan Bestari'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    {comp_addrTouched && comp_addrError && <Text style={styles.error}>{comp_addrError}</Text>}
                                </View>

                                <View style={[styles.formElement]}>
                                    <Text style={[styles.text, { marginBottom: 5, borderBottomColor: comp_addr2Touched && comp_addr2Error ? '#d94498' : '#5a83c2' }]}>Line Address 2</Text>
                                    <TextInput value={comp_addr2} onBlur={FormikProps.handleBlur('comp_addr2')} onChangeText={FormikProps.handleChange('comp_addr2')} placeholder={comp_addr2Touched && comp_addr2Error ? '' : 'Eg: Taman Enggang Utama'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    {comp_addr2Touched && comp_addr2Error && <Text style={styles.error}>{comp_addr2Error}</Text>}
                                </View>

                                <View style={[styles.formElement]}>
                                    <Text style={[styles.text, { marginBottom: 5, borderBottomColor: comp_cityTouched && comp_cityError ? '#d94498' : '#5a83c2' }]}>City</Text>
                                    <TextInput value={comp_city} onBlur={FormikProps.handleBlur('comp_city')} onChangeText={FormikProps.handleChange('comp_city')} placeholder={comp_cityTouched && comp_cityError ? '' : 'Eg: Bandar Cheras Utama'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    {comp_cityTouched && comp_cityError && <Text style={styles.error}>{comp_cityError}</Text>}
                                </View>

                                <View style={[styles.formElement]}>
                                    <Text style={[styles.text, { marginBottom: 5, borderBottomColor: comp_stateTouched && comp_stateError ? '#d94498' : '#5a83c2' }]}>State</Text>
                                    <TextInput value={comp_state} onBlur={FormikProps.handleBlur('comp_state')} onChangeText={FormikProps.handleChange('comp_state')} placeholder={comp_stateTouched && comp_stateError ? '' : 'Eg: Selangor Darul Ehsan'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    {comp_stateTouched && comp_stateError && <Text style={styles.error}>{comp_stateError}</Text>}
                                </View>

                                <View style={[styles.formElement]}>
                                    <Text style={[styles.text, { marginBottom: 5, borderBottomColor: cddPostcodeTouched && cddPostcodeError ? '#d94498' : '#5a83c2' }]}>Postcode</Text>
                                    <TextInput value={cddPostcode} onBlur={FormikProps.handleBlur('cddPostcode')} onChangeText={FormikProps.handleChange('cddPostcode')} placeholder={cddPostcodeTouched && cddPostcodeError ? '' : 'Eg: 60901'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} keyboardType={'phone-pad'} />
                                    {cddPostcodeTouched && cddPostcodeError && <Text style={styles.error}>{cddPostcodeError}</Text>}
                                </View>

                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>

                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 }}>
                                    <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.butang, { color: 'lightgrey' }]}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1, borderColor: FormikProps.isValid ? '#0A6496' : 'rgba(10,100,150,0.5)', borderWidth: 1 }}>
                                    <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> :
                                            <Text style={[styles.butang, { color: '#fff' }]}>Confirm</Text>}
                                    </LinearGradient>
                                </TouchableOpacity>

                            </View>

                        </View>

                    </KeyboardAvoidingView>)
            }}
        </Formik >

    );
}

CompanyContactAddressInformationScreen.navigationOptions = { header: null, };

// class CompanyContactAddressInformationScreen extends React.PureComponent {
//     static navigationOptions = {
//         header: null,
//     };

//     async Save() {
//         await this.props.companyContactAddress()
//     }

//     render() {
//         this.props.proceedContact && this.props.navigation.goBack()

//         var addressBorderColor = '#5a83c2'
//         const addressError = this.props.error && this.props.errorColor.find(test => test == "Address")
//         if (addressError == "Address") {
//             addressBorderColor = '#d94498'
//         }

//         var cityBorderColor = '#5a83c2'
//         const cityError = this.props.errorColor && this.props.errorColor.find(test => test == "City")
//         if (cityError == "City") {
//             cityBorderColor = '#d94498'
//         }

//         var stateBorderColor = '#5a83c2'
//         const stateError = this.props.error && this.props.errorColor.find(test => test == "State")
//         if (stateError == "State") {
//             stateBorderColor = '#d94498'
//         }

//         var postcodeBorderColor = '#5a83c2'
//         const postcodeError = this.props.error && this.props.errorColor.find(test => test == "Postcode")
//         if (postcodeError == "Postcode") {
//             postcodeBorderColor = '#d94498'
//         }

//         var addressErrorHint = ''
//         var cityErrorHint = ''
//         var stateErrorHint = ''
//         var postcodeErrorHint = ''

//         this.props.error && this.props.error.map(err => {
//             if (err.title == 'address') { addressErrorHint = err.desc }
//             if (err.title == 'city') { cityErrorHint = err.desc }
//             if (err.title == 'state') { stateErrorHint = err.desc }
//             if (err.title == 'postcode') { postcodeErrorHint = err.desc }
//         })
//         return (
//             <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
//                 {/* <View style={{ flex: 1, justifyContent: 'space-between' }}>
//                     <View style={{ alignItems: 'flex-start' }}><Image source={require('../assets/images/topLeft.png')} style={{ width: 79, height: 120 }} /></View>
//                     <View style={{ alignItems: 'flex-end' }}><Image source={require('../assets/images/bottomRight.png')} style={{ width: 106, height: 92 }} /></View>

//                 </View> */}
//                 <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
//                     <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                         <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
//                             <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
//                             <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>COMPANY ADDRESS</Text>
//                             <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
//                                 <Image source={require('../assets/images/address.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
//                                 <TextInput value={this.props.comp_addr} onChangeText={(comp_addr) => this.props.setCompanyInfo({ comp_addr })} style={{ marginLeft: 5, flex: 1 }} placeholder={(addressErrorHint.length > 0) ? addressErrorHint : 'Address Line 1'} placeholderTextColor={(addressErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
//                             </View>
//                             <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
//                                 <Image source={require('../assets/images/address.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
//                                 <TextInput placeholder={'Address Line 2'} value={this.props.comp_addr_2} onChangeText={(comp_addr_2) => this.props.setCompanyInfo({ comp_addr_2 })} style={{ marginLeft: 5, flex: 1 }} />
//                             </View>
//                             <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
//                                 <Image source={require('../assets/images/city.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
//                                 <TextInput value={this.props.comp_city} onChangeText={(comp_city) => this.props.setCompanyInfo({ comp_city })} style={{ marginLeft: 5, flex: 1 }} placeholder={(cityErrorHint.length > 0) ? cityErrorHint : 'City'} placeholderTextColor={(cityErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
//                             </View>
//                             <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
//                                 <Image source={require('../assets/images/state.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
//                                 <TextInput value={this.props.comp_state} onChangeText={(comp_state) => this.props.setCompanyInfo({ comp_state })} style={{ marginLeft: 5, flex: 1 }} placeholder={(stateErrorHint.length > 0) ? stateErrorHint : 'State'} placeholderTextColor={(stateErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
//                             </View>
//                             <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
//                                 <Image source={require('../assets/images/compRegNum.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
//                                 <TextInput keyboardType={'phone-pad'} value={this.props.cddPostcode} onChangeText={(cddPostcode) => this.props.setCompanyInfo({ cddPostcode })} style={{ marginLeft: 5, flex: 1 }} placeholder={(postcodeErrorHint.length > 0) ? postcodeErrorHint : 'Post code'} placeholderTextColor={(postcodeErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
//                             </View>
//                             <View style={{ flexDirection: 'row', margin: 5 }}>
//                                 <TouchableOpacity onPress={() => this.Save()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
//                                     <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
//                                         <Text style={[styles.textDefault, { color: '#fff' }]}>Save</Text>
//                                     </LinearGradient>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#5A647F' }} >
//                                     <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </KeyboardAvoidingView>
//                 </View>
//             </View>
//         );
//     }
// }


// function mapStateToProps(state) {
//     return {
//         comp_phone: state.companyInformationReducer.comp_phone,
//         comp_email: state.companyInformationReducer.comp_email,
//         comp_addr: state.companyInformationReducer.comp_addr,
//         comp_addr_2: state.companyInformationReducer.comp_addr_2,
//         comp_city: state.companyInformationReducer.comp_city,
//         comp_state: state.companyInformationReducer.comp_state,
//         cddPostcode: state.companyInformationReducer.cddPostcode,

//         proceedContact: state.companyInformationReducer.proceedContact,
//         error: state.companyInformationReducer.error,
//         errorColor: state.companyInformationReducer.errorColor,
//     }
// }
// function mapDispatchToProps(dispatch) {
//     return {
//         setCompanyInfo: (value) => dispatch({ type: 'SET_COMPANY_INFO', payload: { ...value } }),
//         companyContactAddress: () => dispatch(actionCreator.companyContactAddress())
//     }
// }
export default CompanyContactAddressInformationScreen