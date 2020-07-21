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
    const save = (values) => {
        dispatch(actionCreator.companyInfo(values))
        //await props.navigation.navigate('CompanyContactInformation')
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
            dispatch(actionCreator.companyInfo(values))
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


                const getCoordinate = (poskod) => {

                    if (poskod) {
                        if (poskod.length === 5) {
                            const coordinate = malaysiaData.find(x => x.Postcode == poskod)

                            if (coordinate) {
                                console.log(`result coor : ${JSON.stringify(coordinate)}`)
                                FormikProps.setFieldValue('cddPostcode', poskod)
                                FormikProps.setFieldValue(`comp_city`, coordinate.City)
                                FormikProps.setFieldValue(`comp_state`, coordinate.State)
                            } else {
                                console.log(`no result found`)
                                FormikProps.setFieldValue('cddPostcode', poskod)
                            }

                        } else {
                            console.log(`do nothing`)
                            FormikProps.setFieldValue('cddPostcode', poskod)
                        }

                    } else {
                        FormikProps.setFieldValue('cddPostcode', '')
                    }

                }

                return (

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
                                {/* <CustomTextInput
                                        label={`Postcode`}
                                        value={cddPostcode}
                                        handleChange={FormikProps.handleChange(`cddPostcode`)}
                                        handleBlur={FormikProps.handleBlur(`cddPostcode`)}
                                        touched={cddPostcodeTouched}
                                        error={cddPostcodeError}
                                        placeholder={'Eg: 60901'}
                                        keyboardType={'phone-pad'}
                                    /> */}
                                <CustomTextInput

                                    label={`Postcode`}
                                    value={cddPostcode}
                                    handleChange={value => getCoordinate(value)}
                                    handleBlur={FormikProps.handleBlur(`cddPostcode`)}
                                    touched={cddPostcodeTouched}
                                    error={cddPostcodeError}
                                    placeholder={'Poskod'}
                                    keyboardType={'decimal-pad'}
                                />

                                <CustomTextInput
                                    //disabled={true}
                                    label={`City`}
                                    value={comp_city}
                                    handleChange={FormikProps.handleChange(`comp_city`)}
                                    handleBlur={FormikProps.handleBlur(`comp_city`)}
                                    touched={comp_cityTouched}
                                    error={comp_cityError}
                                    placeholder={''}

                                />
                                <CustomTextInput
                                    //disabled={true}
                                    label={`State`}
                                    value={comp_state}
                                    handleChange={FormikProps.handleChange(`comp_state`)}
                                    handleBlur={FormikProps.handleBlur(`comp_state`)}
                                    touched={comp_stateTouched}
                                    error={comp_stateError}
                                    placeholder={''}
                                />


                            </ScrollView>
                        </View>
                        <CustomFormAction
                            navigation={props.navigation}
                            isValid={FormikProps.isValid}
                            handleSubmit={FormikProps.handleSubmit}
                            isSubmitting={FormikProps.isSubmitting}
                            label={`Save`}
                        />
                    </LayoutA>
                )
            }}
        </Formik >

    );
}



export default CompanyContactAddressInformationScreen