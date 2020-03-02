import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView, TextInput, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import { CustomFormAction, CustomTextInput } from '../components/Custom'
import LayoutA from '../Layout/LayoutA';

const validationSchema = Yup.object().shape({

    mobileNumber: Yup
        .string()
        .min(10)
        .required(),

    password: Yup
        .string()
        .min(6)
        .required(),

});

const ChangeNumberScreen = (props) => {

    const [offSet, setOffSet] = useState(true)
    useEffect(() => {
        const open = () => setOffSet(false)
        const off = () => setOffSet(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates


    return (

        <Formik onSubmit={async values => {
            props.navigation.navigate("TAC")
            console.log(JSON.stringify(values))

        }}
            validationSchema={validationSchema}>

            {FormikProps => {

                const { mobileNumber, password } = FormikProps.values

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }} keyboardVerticalOffset={offSet ? 30 : 0}>
                        <LayoutA
                            title={'CHANGE EMAIL'}
                            screenType='form'
                            navigation={props.navigation}
                            nopadding
                        >
                            <View style={[styles.screenMargin, { flex: 3, marginTop: 25 }]}>
                                <CustomTextInput
                                    label={`New Phone Number`}
                                    value={mobileNumber}
                                    handleChange={FormikProps.handleChange(`mobileNumber`)}
                                    handleBlur={FormikProps.handleBlur(`mobileNumber`)}
                                    placeholder={'0198907819'}
                                    keyboardType={'phone-pad'}
                                />
                                <CustomTextInput
                                    label={`Password`}
                                    value={password}
                                    secureText={true}
                                    handleChange={FormikProps.handleChange(`password`)}
                                    handleBlur={FormikProps.handleBlur(`password`)}
                                    placeholder={'******'}
                                   
                                />
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



export default ChangeNumberScreen