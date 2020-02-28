import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, ActivityIndicator, Alert, BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'
import { useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
// modules
import {
    handleAndroidBackButton,
    removeAndroidBackButtonHandler
} from '../components/androidBackButton';
import { ScrollView } from 'react-native-gesture-handler';
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import { CustomFormAction, CustomTextInput } from '../components/Custom'
import LayoutA from '../Layout/LayoutA';

const validationSchema = Yup.object().shape({

    cddContactPersonName: Yup
        .string()
        .min(3)
        .required()
        .label('Name'),

    cddContactPersonIc: Yup
        .string()
        .min(12)
        .required()
        .label('IC'),

    cddContactPersonNumber: Yup
        .string()
        .min(10)
        .required()
        .label('Phone Number'),

    cddContactPersonPosition: Yup
        .string()
        .min(3)
        .required()
        .label('Position'),

});

const ContactPersonScreen = (props) => {

    const exitAlert = () => {
        // Works on both Android and iOS
        Alert.alert(
            'Skip',
            'Go to Dashboard or Exit App',
            [

                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Dashboard', onPress: () => { console.log('OK Pressed'); props.navigation.navigate('Dashboard') } },
                { text: 'Exit', onPress: () => { console.log('OK Pressed'); BackHandler.exitApp() } },
            ],
            { cancelable: false },
        );
    };
    useEffect(() => {
        console.log("componentDidMount");
        handleAndroidBackButton(exitAlert)
        // return removeAndroidBackButtonHandler()
    }, []); // empty-array means don't watch for any updates
    const dispatch = useDispatch()
    const contactPerson = (values) => {
        dispatch(actionCreator.contactPerson(values))
        props.navigation.navigate('ContactPersonSuccess')

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

            onSubmit={values => contactPerson(values)}

            validationSchema={validationSchema}
        >
            {FormikProps => {

                const { cddContactPersonName, cddContactPersonIc, cddContactPersonNumber, cddContactPersonPosition } = FormikProps.values

                const cddContactPersonNameError = FormikProps.errors.cddContactPersonName
                const cddContactPersonNameTouched = FormikProps.touched.cddContactPersonName

                const cddContactPersonIcError = FormikProps.errors.cddContactPersonIc
                const cddContactPersonIcTouched = FormikProps.touched.cddContactPersonIc

                const cddContactPersonNumberError = FormikProps.errors.cddContactPersonNumber
                const cddContactPersonNumberTouched = FormikProps.touched.cddContactPersonNumber

                const cddContactPersonPositionError = FormikProps.errors.cddContactPersonPosition
                const cddContactPersonPositionTouched = FormikProps.touched.cddContactPersonPosition

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 2 }} keyboardVerticalOffset={offSet ? 30 : 0} >
                        <LayoutA
                            title={'CONTACT'}
                            screenType='registration'
                            navigation={props.navigation}
                            nopadding
                        >

                            <ScrollView style={[styles.screenMargin, { flex: 9 }]}>
                                <CustomTextInput
                                    label={`Name`}
                                    value={cddContactPersonName}
                                    handleChange={FormikProps.handleChange(`cddContactPersonName`)}
                                    handleBlur={FormikProps.handleBlur(`cddContactPersonName`)}
                                    touched={cddContactPersonNameTouched}
                                    error={cddContactPersonNameError}
                                    placeholder={'Eg: Siti binti Iskandar'}

                                />
                                 <CustomTextInput
                                    label={`MyKad Number`}
                                    value={cddContactPersonIc}
                                    handleChange={FormikProps.handleChange(`cddContactPersonIc`)}
                                    handleBlur={FormikProps.handleBlur(`cddContactPersonIc`)}
                                    touched={cddContactPersonIcTouched}
                                    error={cddContactPersonIcError}
                                    placeholder={'Eg: 800310022514'}
                                    keyboardType={'phone-pad'}
                                />
                                <CustomTextInput
                                    label={`Phone Number`}
                                    value={cddContactPersonNumber}
                                    handleChange={FormikProps.handleChange(`cddContactPersonNumber`)}
                                    handleBlur={FormikProps.handleBlur(`cddContactPersonNumber`)}
                                    touched={cddContactPersonNumberTouched}
                                    error={cddContactPersonNumberError}
                                    placeholder={'Eg: 0189852012'}
                                    keyboardType={'phone-pad'}
                                />
                                 <CustomTextInput
                                    label={`Position`}
                                    value={cddContactPersonPosition}
                                    handleChange={FormikProps.handleChange(`cddContactPersonPosition`)}
                                    handleBlur={FormikProps.handleBlur(`cddContactPersonPosition`)}
                                    touched={cddContactPersonPositionTouched}
                                    error={cddContactPersonPositionError}
                                    placeholder={'Eg: HR Officer'}
                                   
                                />
                            </ScrollView>
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



export default ContactPersonScreen