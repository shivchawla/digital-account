import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import LayoutA from '../Layout/LayoutA';
import { CustomFormAction, CustomTextInput } from '../components/Custom'
const validationSchema = Yup.object().shape({

    cddEmail: Yup
        .string()
        .email()
        .required()
        .label('Email'),

    cddTelephone: Yup
        .string()
        .required()
        .min(10)
        .label('Telephone'),

});

const CompanyContactInformationScreen = (props) => {

    const dispatch = useDispatch()

    const { comp_addr, comp_addr2, comp_city, comp_state, comp_postcode } = useSelector(state => state.companyInformationReducer, shallowEqual)

    const companyInfo = async (values) => {

        await dispatch(actionCreator.companyInfo(values))
        await dispatch(actionCreator.registerCompany())
        props.navigation.navigate('CompanyInfoSuccess')

    }

    const [offSet, setOffSet] = useState(true)
    useEffect(() => {
        const open = () => setOffSet(false)
        const off = () => setOffSet(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates

    return (
        <Formik
            onSubmit={values => companyInfo(values)}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                const { cddTelephone, cddEmail } = FormikProps.values
                const cddTelephoneError = FormikProps.errors.cddTelephone
                const cddTelephoneTouched = FormikProps.touched.cddTelephone
                const cddEmailError = FormikProps.errors.cddEmail
                const cddEmailTouched = FormikProps.touched.cddEmail
                return (
                        <LayoutA
                            title={'COMPANY CONTACT'}
                            screenType='registration'
                            navigation={props.navigation}
                            nopadding
                        >

                            <View style={[styles.screenMargin, { flex: 9 }]}>
                                <CustomTextInput
                                    label={`Phone Number`}
                                    value={cddTelephone}
                                    handleChange={FormikProps.handleChange(`cddTelephone`)}
                                    handleBlur={FormikProps.handleBlur(`cddTelephone`)}
                                    touched={cddTelephoneTouched}
                                    error={cddTelephoneError}
                                    placeholder={'Eg: 6076541258'}
                                    keyboardType={'phone-pad'}
                                />
                                  <CustomTextInput
                                    label={`Email Address`}
                                    value={cddEmail}
                                    handleChange={FormikProps.handleChange(`cddEmail`)}
                                    handleBlur={FormikProps.handleBlur(`cddEmail`)}
                                    touched={cddEmailTouched}
                                    error={cddEmailError}
                                    placeholder={'Eg: abc@email.com'}
                                
                                />
                                <View style={[styles.formElement]}>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('CompanyContactAddressInformation')}>
                                        <Text style={[styles.titleBox, { marginBottom: 5 }]}>Address</Text>
                                        {!comp_state ? <TextInput editable={false} value={comp_addr} style={[styles.textInput, { borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} />
                                            :
                                            <View style={{ marginRight: 3, padding: 5, borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                                <Text>{comp_addr}</Text>
                                                {comp_addr2 && <Text>{comp_addr2}</Text>}
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text>{comp_postcode}</Text>
                                                    <Text>{comp_city}</Text>
                                                </View>
                                                <Text>{comp_state}</Text>
                                            </View>}
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <CustomFormAction
                                navigation={props.navigation}
                                isValid={FormikProps.isValid}
                                handleSubmit={FormikProps.handleSubmit}
                                isSubmitting = {FormikProps.isSubmitting}
                                label={`Next`}
                            />
                        </LayoutA>
                 )

            }}

        </Formik >

    );

}

CompanyContactInformationScreen.navigationOptions =

{
    header: null,
};

export default CompanyContactInformationScreen