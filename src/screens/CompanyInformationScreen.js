import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, ActivityIndicator, DatePickerAndroid, DatePickerIOS, Platform, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import DateTimePicker from '@react-native-community/datetimepicker';
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



    const ios = Platform.OS === "ios" ? true : false

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);





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



                const onChange = (event, selectedDate) => {
                    const currentDate = selectedDate || date;
                    //console.log(`selected date ialah ${moment(currentDate).format('Y-M-D')}`)
                    setShow(ios);
                    setDate(currentDate);
                    FormikProps.setFieldValue('cddRegisteredDate', moment(currentDate).format('Y-M-D'))
                };

                const showMode = currentMode => {
                    setShow(true);
                    setMode(currentMode);
                };

                const showDatepicker = () => {
                    showMode('date');
                };

              

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
                        <Modal animationType={'slide'}
                            visible={ios && show} onRequestClose={() => {
                                console.log(`test`)
                                setIosDatePickerShow(!iosDatePickerShow)

                            }}>
                            <View style={styles.container}>
                                <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4', marginBottom: 25 }]}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                        <TouchableOpacity onPress={() => setShow(!ios)} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                            <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.title, { color: '#055E7C' }]}>Select Date</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 9, justifyContent: 'flex-start' }}>

                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        //timeZoneOffsetInMinutes={0}
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
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
                                <Text style={[styles.titleBox], { fontSize: 15 }}>Registration </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => showDatepicker()}>
                                        <Image source={require('../assets/images/calendar.png')} style={{ width: 30, height: 30, marginRight: 10 }} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                    <TextInput editable={false} style={{ flex: 1, alignSelf: 'center' }} value={cddRegisteredDate} style={[styles.textInput, { flex: 1, borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} />
                                </View>
                                {cddRegisteredDateTouched && cddRegisteredDateError && <Text style={styles.error}>{cddRegisteredDateError}</Text>}
                            </View>
                            {!ios && show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    timeZoneOffsetInMinutes={0}
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}

                        </View>
                        <CustomFormAction
                            navigation={props.navigation}
                            isValid={FormikProps.isValid}
                            handleSubmit={FormikProps.handleSubmit}
                            isSubmitting={FormikProps.isSubmitting}
                            label={`Next`}
                        />

                    </LayoutA>
                )
            }}
        </Formik >

    );

}


export default CompanyInformationScreen