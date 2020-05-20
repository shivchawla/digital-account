import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, ActivityIndicator, ScrollView, Picker } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import malaysiaData from 'malaysia-city-postcode'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import { CustomFormAction, CustomTextInput } from '../components/Custom'
import LayoutA from '../Layout/LayoutA';

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
        await props.navigation.navigate('CompanyContactInformation')
    }

    // const found = newAddress.find(n => n.Postcode === '73400')
    // console.log(`Ini Hasil Pertama  ${found.State}`)

    const [offSet, setOffSet] = useState(true)
    useEffect(() => {
        const open = () => setOffSet(false)
        const off = () => setOffSet(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates

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

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 2 }} keyboardVerticalOffset={offSet ? 30 : 0}>
                        <LayoutA
                            title={'ADDRESS'}
                            screenType='registration'
                            navigation={props.navigation}
                            nopadding
                        >

                            <View style={[{ flex: 9 }]}>
                                <ScrollView style={[styles.screenMargin]}>
                                    <CustomTextInput
                                        label={`Address Line 1`}
                                        value={comp_addr}
                                        handleChange={FormikProps.handleChange(`comp_addr`)}
                                        handleBlur={FormikProps.handleBlur(`comp_addr`)}
                                        touched={comp_addrTouched}
                                        error={comp_addrError}
                                        placeholder={'Eg: 89, Jalan Bestari'}

                                    />
                                    <CustomTextInput
                                        label={`Line Address 2`}
                                        value={comp_addr2}
                                        handleChange={FormikProps.handleChange(`comp_addr2`)}
                                        handleBlur={FormikProps.handleBlur(`comp_addr2`)}
                                        touched={comp_addr2Touched}
                                        error={comp_addr2Error}
                                        placeholder={'Eg: Taman Enggang Utama'}

                                    />
                                    <CustomTextInput
                                        label={`Postcode`}
                                        value={cddPostcode}
                                        handleChange={FormikProps.handleChange(`cddPostcode`)}
                                        handleBlur={FormikProps.handleBlur(`cddPostcode`)}
                                        touched={cddPostcodeTouched}
                                        error={cddPostcodeError}
                                        placeholder={'Eg: 60901'}
                                        keyboardType={'phone-pad'}
                                    />
                                    <CustomTextInput
                                        label={`City`}
                                        value={comp_city}
                                        handleChange={FormikProps.handleChange(`comp_city`)}
                                        handleBlur={FormikProps.handleBlur(`comp_city`)}
                                        touched={comp_cityTouched}
                                        error={comp_cityError}
                                        placeholder={''}
                                       
                                        
                                    />
                                     <CustomTextInput
                                        label={`State`}
                                        value={comp_state}
                                        handleChange={FormikProps.handleChange(`comp_state`)}
                                        handleBlur={FormikProps.handleBlur(`comp_state`)}
                                        touched={comp_stateTouched}
                                        error={comp_stateError}
                                        placeholder={''}
                                        
                                        
                                    />
                            
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
                            <CustomFormAction
                                navigation={props.navigation}
                                isValid={FormikProps.isValid}
                                handleSubmit={FormikProps.handleSubmit}
                                isSubmitting = {FormikProps.isSubmitting}
                                label={`Save`}
                            />
                        </LayoutA>
                    </KeyboardAvoidingView>)
            }}
        </Formik >

    );
}



export default CompanyContactAddressInformationScreen