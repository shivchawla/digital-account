import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, KeyboardAvoidingView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import LayoutA from '../Layout/LayoutA';
import { CustomTextInput,CustomFormAction } from '../components/Custom'

const validationSchema = Yup.object().shape({
    newEmail: Yup
        .string()
        .email(),

    password: Yup
        .string()
        .min(6, 'Too Short'),
});

const ChangeEmailScreen = (props) => {

    const [offSet, setOffSet] = useState(true)
    useEffect(() => {
        const open = () => setOffSet(false)
        const off = () => setOffSet(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates


    return (
        <Formik onSubmit={async values => {
            props.navigation.navigate("EmailSuccess")
            console.log(JSON.stringify(values))
        }}
            validationSchema={validationSchema}>
            {FormikProps => {
                const { newEmail, password } = FormikProps.values

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }} keyboardVerticalOffset={offSet ? 30 : 0}>
                        <LayoutA
                            title={'CHANGE EMAIL'}
                            screenType='form'
                            navigation={props.navigation}
                            nopadding
                        >
                            <View style={{ justifyContent: 'space-between', flex: 9 }}>
                                <View style={[styles.screenMargin, { flex: 3 }]}>
                                <CustomTextInput
                                    label={`New Email Address`}
                                    value={newEmail}
                                    handleChange={FormikProps.handleChange(`newEmail`)}
                                    handleBlur={FormikProps.handleBlur(`newEmail`)}
                                    placeholder={'new@email.com'}
                                />
                                <CustomTextInput
                                    label={`Password`}
                                    secureText={true}
                                    value={password}
                                    handleChange={FormikProps.handleChange(`password`)}
                                    handleBlur={FormikProps.handleBlur(`password`)}
                                    placeholder={'******'}
                                   
                                />
                                </View>
                            </View>
                            <CustomFormAction
                                navigation={props.navigation}
                                isValid={FormikProps.isValid}
                                handleSubmit={FormikProps.handleSubmit}
                                isSubmitting={FormikProps.isSubmitting}
                                label={`Save`}
                            />
                            </LayoutA>
                    </KeyboardAvoidingView>)
                }}
        </Formik >
                );
            }


export default ChangeEmailScreen