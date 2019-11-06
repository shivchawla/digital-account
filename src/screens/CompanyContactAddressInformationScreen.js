import React from 'react';
import { Image, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'
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

const CompanyContactAddressInformationScreen = (props) => {

    const dispatch = useDispatch()
    const proceed = useSelector(state => state.companyInformationReducer.proceed, shallowEqual)
    const save = async (values) => {
        await dispatch(actionCreator.companyInfo(values))
        await props.navigation.goBack()
    }

    return (

        <Formik onSubmit={values => {
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
                        <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4', marginBottom: 25 }]}>
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
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: comp_addrTouched && comp_addrError ? '#d94498' : '#5a83c2' }]}>Address Line 1</Text>
                                    <TextInput value={comp_addr} onBlur={FormikProps.handleBlur('comp_addr')} onChangeText={FormikProps.handleChange('comp_addr')} placeholder={comp_addrTouched && comp_addrError ? '' : 'Eg: 89, Jalan Bestari'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    {comp_addrTouched && comp_addrError && <Text style={styles.error}>{comp_addrError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: comp_addr2Touched && comp_addr2Error ? '#d94498' : '#5a83c2' }]}>Line Address 2</Text>
                                    <TextInput value={comp_addr2} onBlur={FormikProps.handleBlur('comp_addr2')} onChangeText={FormikProps.handleChange('comp_addr2')} placeholder={comp_addr2Touched && comp_addr2Error ? '' : 'Eg: Taman Enggang Utama'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    {comp_addr2Touched && comp_addr2Error && <Text style={styles.error}>{comp_addr2Error}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: comp_cityTouched && comp_cityError ? '#d94498' : '#5a83c2' }]}>City</Text>
                                    <TextInput value={comp_city} onBlur={FormikProps.handleBlur('comp_city')} onChangeText={FormikProps.handleChange('comp_city')} placeholder={comp_cityTouched && comp_cityError ? '' : 'Eg: Bandar Cheras Utama'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    {comp_cityTouched && comp_cityError && <Text style={styles.error}>{comp_cityError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: comp_stateTouched && comp_stateError ? '#d94498' : '#5a83c2' }]}>State</Text>
                                    <TextInput value={comp_state} onBlur={FormikProps.handleBlur('comp_state')} onChangeText={FormikProps.handleChange('comp_state')} placeholder={comp_stateTouched && comp_stateError ? '' : 'Eg: Selangor Darul Ehsan'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    {comp_stateTouched && comp_stateError && <Text style={styles.error}>{comp_stateError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: cddPostcodeTouched && cddPostcodeError ? '#d94498' : '#5a83c2' }]}>Postcode</Text>
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
                                        {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff' }]}>Confirm</Text>}
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >

    );
}

CompanyContactAddressInformationScreen.navigationOptions = {
    header: null,
};

export default CompanyContactAddressInformationScreen