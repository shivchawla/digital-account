import React, { useState, useEffect } from 'react';
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
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import LayoutA from '../Layout/LayoutA';
import { CustomFormAction, CustomTextInput } from '../components/Custom'
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

    const [offSet, setOffSet] = useState(true)
    useEffect(() => {
        const open = () => setOffSet(false)
        const off = () => setOffSet(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates

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

                        
                        <LayoutA
                            title={'COMPANY INFO'}
                            screenType='registration'
                            navigation={props.navigation}
                            nopadding
                        >
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
                                        onDateChange={(val) => {
                                            FormikProps.setFieldValue('cddRegisteredDate', moment(val).format(`Y-M-D`))
                                            setChosenDate(val)
                                        }}
                                    />
                                </View>
                            </View>
                        </Modal>
                            <View style={[styles.screenMargin, { flex: 9 }]}>
                                <CustomTextInput
                                    label={`Company Name`}
                                    value={cddCompanyName}
                                    handleChange={FormikProps.handleChange(`cddCompanyName`)}
                                    handleBlur={FormikProps.handleBlur(`cddCompanyName`)}
                                    touched={cddCompanyNameTouched}
                                    error={cddCompanyNameError}
                                    placeholder={'Eg: Syarikat ABC Sdn Bhd'}

                                />
                                <CustomTextInput
                                    label={`Registration Number`}
                                    value={cddRegistrationNumber}
                                    handleChange={FormikProps.handleChange(`cddRegistrationNumber`)}
                                    handleBlur={FormikProps.handleBlur(`cddRegistrationNumber`)}
                                    touched={cddRegistrationNumberTouched}
                                    error={cddRegistrationNumberError}
                                    placeholder={'Eg: 105015-A'}

                                />
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox], { fontSize: 15 }}>Registration Date</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={datePicker}>
                                            <Image source={require('../assets/images/calendar.png')} style={{ width: 30, height: 30, marginRight: 10 }} resizeMode={'contain'} />
                                        </TouchableOpacity>
                                        <TextInput editable={false} style={{ flex: 1, alignSelf: 'center' }} value={cddRegisteredDate} style={[styles.textInput, { flex: 1, borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} />
                                    </View>
                                    {cddRegisteredDateTouched && cddRegisteredDateError && <Text style={styles.error}>{cddRegisteredDateError}</Text>}
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


export default CompanyInformationScreen