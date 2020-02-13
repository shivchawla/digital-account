import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, ActivityIndicator, DatePickerAndroid, DatePickerIOS, Platform, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'
import { useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment'

const validationSchema = Yup.object().shape({

    cddCompanyName: Yup
        .string()
        .required()
        .min(3)
        .label('Company Name'),

    cddRegistrationNumber: Yup
        .string()
        .required()
        .min(3)
        .label('Registration No'),

    cddRegisteredDate: Yup
        .string()
        .required()

});

const CompanyInformationScreen = (props) => {

    const [iosDatePickerShow, setIosDatePickerShow] = useState(false)
    const [chosenDate, setChosenDate] = useState(new Date())

    const dispatch = useDispatch()
    const companyInfo = (values) => {
        dispatch(actionCreator.companyInfo(values))
        props.navigation.navigate('CompanyContactInformation')
    }

    return (

        <Formik onSubmit={values => {
            companyInfo(values)
            console.log(` ini formik ${JSON.stringify(values)}`)
        }}

            validationSchema={validationSchema}
        >
            {FormikProps => {
                const datePicker = async () => {
                    if (Platform.OS === 'android') {
                        try {
                            const { action, year, month, day } = await DatePickerAndroid.open({
                                // Use `new Date()` for current date.
                                // May 25 2020. Month 0 is January.
                                date: new Date(2020, 4, 25),
                            });
                            if (action !== DatePickerAndroid.dismissedAction) {
                                // Selected year, month (0-11), day
                                FormikProps.setFieldValue('cddRegisteredDate', `${year}-${month}-${day}`)
                            }
                        } catch ({ code, message }) {
                            console.warn('Cannot open date picker', message);
                        }
                    } else {
                        setIosDatePickerShow(true)
                    }

                }

                const { cddCompanyName, cddRegistrationNumber, cddRegisteredDate } = FormikProps.values

                const cddCompanyNameError = FormikProps.errors.cddCompanyName
                const cddCompanyNameTouched = FormikProps.touched.cddCompanyName

                const cddRegistrationNumberError = FormikProps.errors.cddRegistrationNumber
                const cddRegistrationNumberTouched = FormikProps.touched.cddRegistrationNumber

                const cddRegisteredDateError = FormikProps.errors.cddRegisteredDate
                const cddRegisteredDateTouched = FormikProps.touched.cddRegisteredDate

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 2 }} keyboardVerticalOffset={30} >
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={iosDatePickerShow}
                            onRequestClose={() => {
                                console.log(`test`)
                            }}>
                            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                                <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4', marginBottom: 25 }]}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                        <TouchableOpacity onPress={() => setIosDatePickerShow(!iosDatePickerShow)} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                            <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.title, { color: '#055E7C' }]}>Select Date</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 9, justifyContent: 'flex-start' }}>
                                    
                                    <DatePickerIOS
                                        mode={'date'}
                                        date={chosenDate}
                                        //onDateChange={()FormikProps.setFieldValue('cddRegisteredDate', `${year}-${month}-${day}`)}
                                        onDateChange={(val) => {FormikProps.setFieldValue('cddRegisteredDate', moment(val).format(`Y-M-D`))
                                    setChosenDate(val)}}
                                    />
                                </View>
                            </View>
                        </Modal>
                        <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4', marginBottom: 25 }]}>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 10 }}>
                                <Text numberOfLines={1} style={[styles.title]} ellipsizeMode='tail'>COMPANY INFO</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={require('../assets/images/logosmall.png')} style={{ width: 50, height: 50, borderRadius: 15 }} />
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={[styles.screenMargin, { flex: 9 }]}>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: cddCompanyNameTouched && cddCompanyNameError ? '#d94498' : '#5a83c2',fontSize:15 }]}>Company Name</Text>
                                    <TextInput value={cddCompanyName} onBlur={FormikProps.handleBlur('cddCompanyName')} onChangeText={FormikProps.handleChange('cddCompanyName')} placeholder={cddCompanyNameTouched && cddCompanyNameError ? '' : 'Eg: Syarikat ABC Sdn Bhd'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    {cddCompanyNameTouched && cddCompanyNameError && <Text style={styles.error}>{cddCompanyNameError}</Text>}
                                </View>

                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: cddRegistrationNumberTouched && cddRegistrationNumberError ? '#d94498' : '#5a83c2',fontSize:15}]}>Registration Number</Text>
                                    <TextInput value={cddRegistrationNumber} onBlur={FormikProps.handleBlur('cddRegistrationNumber')} onChangeText={FormikProps.handleChange('cddRegistrationNumber')} placeholder={cddRegistrationNumberTouched && cddRegistrationNumberError ? '' : 'Eg: 105015-A'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    {cddRegistrationNumberTouched && cddRegistrationNumberError && <Text style={styles.error}>{cddRegistrationNumberError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox],{fontSize:15}}>Registration Date</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={datePicker}>
                                            <Image source={require('../assets/images/calendar.png')} style={{ width: 30, height: 30, marginRight: 10 }} resizeMode={'contain'} />
                                        </TouchableOpacity>
                                        <TextInput editable={false} style={{ flex: 1, alignSelf: 'center' }} value={cddRegisteredDate} style={{ flex: 1, borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    </View>
                                    {cddRegisteredDateTouched && cddRegisteredDateError && <Text style={styles.error}>{cddRegisteredDateError}</Text>}
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1,paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    
                                        <Text style={[styles.butang, { color: 'lightgrey' }]}>Back</Text>
                                   
                                </TouchableOpacity>
                                <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1, borderColor: FormikProps.isValid ? '#0A6496' : 'rgba(10,100,150,0.5)', borderWidth: 1 }}>
                                    <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
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

CompanyInformationScreen.navigationOptions = {
    header: null,
};

export default CompanyInformationScreen