import React from 'react';
import { Image, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, ActivityIndicator, ScrollView, Picker } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import malaysiaData from 'malaysia-city-postcode'

const validationSchema = Yup.object().shape({

    comp_addr: Yup
        .string()
        .required()
        .min(3)
        .label('Address Line 1'),

    comp_city: Yup
        .string()
        .required()
        .min(3)
        .label('City'),

    comp_state: Yup
        .string()
        .required()
        .min(3)
        .label('State'),

    cddPostcode: Yup
        .string()
        .required('Valid postcode is required')
        .min(5)
        .label('Postcode'),

});

const CompanyContactAddressInformationScreen = (props) => {

    const dispatch = useDispatch()
    const proceed = useSelector(state => state.companyInformationReducer.proceed, shallowEqual)
    const newAddress = malaysiaData;
    const save = async (values) => {
        await dispatch(actionCreator.companyInfo(values))
        await props.navigation.goBack()
    }

    // const found = newAddress.find(n => n.Postcode === '73400')
    // console.log(`Ini Hasil Pertama  ${found.State}`)

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

                const newAddress = malaysiaData;

                const checkPostcode = (cddPostcode, itemIndex) => {

                    if (cddPostcode.length > 4) {
                        const checkRequirement = newAddress.find(c => c.Postcode === cddPostcode)
                        if (checkRequirement) {
                            const { City, State } = checkRequirement
                            FormikProps.setFieldValue('comp_city', City)
                            FormikProps.setFieldValue('comp_state', State)
                            FormikProps.setFieldValue('cddPostcode', cddPostcode)
                            console.log('Ni jalan yang benar')
                        }
                        // const { City, State } = newAddress.find(c => c.Postcode === cddPostcode)
                    }
                    else {
                        console.log('Ni jalan yang salah')
                    }
                    // const { City, State } = malaysiaData.find(c => c.Postcode === cddPostcode)
                    // FormikProps.setFieldValue('comp_city', City)
                    // FormikProps.setFieldValue('comp_state', State)

                }

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 2 }} keyboardVerticalOffset={30} >
                        <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4', marginBottom: 25 }]}>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', alignItems: 'flex-start', paddingLeft: 10 }}>
                                <Text numberOfLines={1} style={styles.title} ellipsizeMode='tail'>ADDRESS</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Image source={require('../assets/images/logosmall.png')} style={{ width: 50, height: 50, borderRadius: 15 }} />
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={[{ flex: 9 }]}>
                                <ScrollView style={[styles.screenMargin]}>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: comp_addrTouched && comp_addrError ? 'rgba(255,0,0,1)' : '#5a83c2' }]}>Address Line 1</Text>
                                        <TextInput value={comp_addr} onBlur={FormikProps.handleBlur('comp_addr')} onChangeText={FormikProps.handleChange('comp_addr')} placeholder={comp_addrTouched && comp_addrError ? '' : 'Eg: 89, Jalan Bestari'} style={[styles.textInput,{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} />
                                        {comp_addrTouched && comp_addrError && <Text style={styles.error}>{comp_addrError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: comp_addr2Touched && comp_addr2Error ? 'rgba(255,0,0,1)' : '#5a83c2' }]}>Line Address 2</Text>
                                        <TextInput value={comp_addr2} onBlur={FormikProps.handleBlur('comp_addr2')} onChangeText={FormikProps.handleChange('comp_addr2')} placeholder={comp_addr2Touched && comp_addr2Error ? '' : 'Eg: Taman Enggang Utama'} style={[styles.textInput,{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} />
                                        {comp_addr2Touched && comp_addr2Error && <Text style={styles.error}>{comp_addr2Error}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: cddPostcodeTouched && cddPostcodeError ? 'rgba(255,0,0,1)' : '#5a83c2' }]}>Postcode</Text>
                                        <TextInput value={cddPostcode} onBlur={FormikProps.handleBlur('cddPostcode')} onChangeText={(val) => checkPostcode(val)} placeholder={cddPostcodeTouched && cddPostcodeError ? '' : 'Eg: 60901'} style={[styles.textInput,{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} keyboardType={'phone-pad'} />
                                        {cddPostcodeTouched && cddPostcodeError && <Text style={styles.error}>{cddPostcodeError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 5 }]}>City</Text>
                                        <TextInput editable={false} value={comp_city} onChangeText={FormikProps.handleChange('comp_city')} onBlur={FormikProps.handleBlur('comp_city')} style={[styles.textInput,{ borderWidth: 1, borderColor: comp_cityTouched && comp_cityError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={comp_cityTouched && comp_cityError ? '' : ''} placeholderTextColor={comp_cityTouched && comp_cityError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {comp_cityTouched && comp_cityError && <Text style={styles.error}>{comp_cityError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 5 }]}>State</Text>
                                        <TextInput editable={false} value={comp_state} onChangeText={FormikProps.handleChange('comp_state')} onBlur={FormikProps.handleBlur('comp_state')} style={[styles.textInput,{ borderWidth: 1, borderColor: comp_stateTouched && comp_stateError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={comp_stateTouched && comp_stateError ? '' : ''} placeholderTextColor={comp_stateTouched && comp_stateError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {comp_stateTouched && comp_stateError && <Text style={styles.error}>{comp_stateError}</Text>}
                                    </View>
                                    {/* <View style={[styles.formElement, { alignSelf: 'stretch' }]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>State</Text>
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <Picker style={{ flex: 1, height: 35 }} selectedValue={comp_state} onValueChange={(itemValue, itemIndex) =>
                                                FormikProps.setFieldValue('comp_state', itemValue)}>
                                                <Picker.Item label="Please Select" value={undefined} />
                                                <Picker.Item label="Johor Darul Ta'zim" value="Johor" />
                                                <Picker.Item label="Kedah Darul Aman" value="Kedah" />
                                                <Picker.Item label="Kelantan Darul Naim" value="Kelantan" />
                                                <Picker.Item label="Melaka" value="Melaka" />
                                                <Picker.Item label="Negeri Sembilan Darul Khusus" value="Negeri Sembilan" />
                                                <Picker.Item label="Pahang Darul Makmur" value="Pahang" />
                                                <Picker.Item label="Penang" value="Penang" />
                                                <Picker.Item label="Perak Darul Ridzuan" value="Perak" />
                                                <Picker.Item label="Perlis Indera Kayangan" value="Perlis" />
                                                <Picker.Item label="Sabah" value="Sabah" />
                                                <Picker.Item label="Sarawak" value="Sarawak" />
                                                <Picker.Item label="Selangor Darul Ehsan" value="Selangor" />
                                                <Picker.Item label="Terengganu Darul Iman" value="Terengganu" />
                                            </Picker>
                                            {comp_stateTouched && comp_stateError && <Text style={styles.error}>{comp_stateError}</Text>}
                                        </View>
                                    </View> */}
                                </ScrollView>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1,paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                                  
                                        <Text style={[styles.butang, { color: 'lightgrey' }]}>Back</Text>
                               
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