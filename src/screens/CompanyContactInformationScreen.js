import React from 'react';
import { Image, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'

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
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 2 }} keyboardVerticalOffset={30}>
                        <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4', marginBottom: 25 }]}>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', alignItems: 'flex-start', paddingLeft: 10 }}>
                                <Text numberOfLines={1} style={[styles.title]} ellipsizeMode='tail'>COMPANY CONTACT</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Image source={require('../assets/images/logosmall.png')} style={{ width: 50, height: 50, borderRadius: 15 }} />
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={[styles.screenMargin, { flex: 9 }]}>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: cddTelephoneTouched && cddTelephoneError ? '#d94498' : '#5a83c2' }]}>Phone Number</Text>
                                    <TextInput value={cddTelephone} onBlur={FormikProps.handleBlur('cddTelephone')} onChangeText={FormikProps.handleChange('cddTelephone')} placeholder={cddTelephoneTouched && cddTelephoneError ? '' : 'Eg: 6076541258'} style={[styles.textInput,{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} keyboardType={'phone-pad'} />

                                    {cddTelephoneTouched && cddTelephoneError && <Text style={styles.error}>{cddTelephoneError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: cddEmailTouched && cddEmailError ? '#d94498' : '#5a83c2' }]}>Email Address</Text>
                                    <TextInput value={cddEmail} onBlur={FormikProps.handleBlur('cddEmail')} onChangeText={FormikProps.handleChange('cddEmail')} placeholder={cddEmailTouched && cddEmailError ? '' : 'Eg: abc@email.com'} style={[styles.textInput,{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} />

                                    {cddEmailTouched && cddEmailError && <Text style={styles.error}>{cddEmailError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('CompanyContactAddressInformation')}>
                                        <Text style={[styles.titleBox, { marginBottom: 5 }]}>Address</Text>
                                        {!comp_state ? <TextInput editable={false} value={comp_addr} style={[styles.textInput,{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} />
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
                            <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 ,paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center'  }}>
                                    <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.butang, { color: 'lightgrey' }]}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={!(FormikProps.isValid && comp_addr)} onPress={FormikProps.handleSubmit} style={{ flex: 1, borderColor: FormikProps.isValid ? '#0A6496' : 'rgba(10,100,150,0.5)', borderWidth: 1 }}>

                                    <LinearGradient colors={(FormikProps.isValid && comp_addr) ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff' }]}>Next</Text>}
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>)

            }}

        </Formik >

    );

}

CompanyContactInformationScreen.navigationOptions =

{
    header: null,
};

export default CompanyContactInformationScreen