import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, TextInput, KeyboardAvoidingView, ScrollView, CheckBox, Platform } from 'react-native';
import CheckBox2 from 'react-native-check-box'
import { useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Layout from '../constants/Layout';
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import { CustomFormAction, CustomTextInput } from '../components/Custom'
import LayoutA from '../Layout/LayoutA';

const validationSchema = Yup.object().shape({

    amount: Yup
        .number()
        .positive()
        .required()
        .label('Amount'),

    purpose: Yup
        .string()
        .required()
        .min(3)
        .label('Purpose'),

});

const LoanApplicationScreen = (props) => {
    const dispatch = useDispatch()
    const setLoanApplication = (val) => dispatch({ type: 'SET_LOAN_APPLICATION', payload: { ...val } });
    const [offSet, setOffSet] = useState(true)
    useEffect(() => {
        const open = () => setOffSet(false)
        const off = () => setOffSet(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates

    return (
        <Formik initialValues={{ smeConnected: true }} onSubmit={values => {
            setLoanApplication(values)
            props.navigation.navigate('ConnectedParties')
        }}
            validationSchema={validationSchema}
        >
            {FormikProps => {

                const { amount, purpose, smeConnected } = FormikProps.values

                const purposeError = FormikProps.errors.purpose
                const purposeTouched = FormikProps.touched.purpose

                const amountError = FormikProps.errors.amount
                const amountTouched = FormikProps.touched.amount

                const handleCheckBox = () => { console.log(`apa ni ${smeConnected}`); FormikProps.setFieldValue('smeConnected', !smeConnected) }

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }} keyboardVerticalOffset={offSet ? 30 : 0}>
                        <LayoutA
                            title={'LOAN'}
                            screenType='form'
                            navigation={props.navigation}
                            nopadding
                        >

                            <View style={{ flex: 9, margin: 10 }}>
                                <ScrollView style={[styles.screenMargin]}>
                                    <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center', marginBottom: 5 }}>
                                        <Text style={[styles.titleBox, { marginBottom: 10, marginTop: 10, fontSize: 16 }]}>Financing</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center', marginBottom: 20 }}>
                                        <View style={{ flexDirection: 'row', width: Layout.window.width / 2, justifyContent: 'space-between' }}>
                                            <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, justifyContent: 'center' }}>
                                                <View style={{ width: Layout.window.width / 2, height: 8, flexDirection: 'row' }} >
                                                    <View style={{ flex: 1, backgroundColor: '#9EDBF4' }} />
                                                    <View style={{ flex: 1, backgroundColor: '#CDCDCD' }} />
                                                </View>
                                            </View>
                                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#20B8D3', justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name="md-card" color={'#fff'} style={{ fontSize: 15, }} />
                                            </View>
                                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#CDCDCD', justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name="md-person" color={'grey'} style={{ fontSize: 15, }} />
                                            </View>
                                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#CDCDCD', justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name="md-clipboard" color={'grey'} style={{ fontSize: 15, }} />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                        <Text style={styles.h2}>Application Form for Financing</Text>
                                    </View>
                                    <CustomTextInput
                                        label={`Total Financing (MYR)`}
                                        value={amount}
                                        handleChange={FormikProps.handleChange(`amount`)}
                                        handleBlur={FormikProps.handleBlur('amount')}
                                        touched={amountTouched}
                                        error={amountError}
                                        placeholder={'Eg: RM 1000.00'}
                                        keyboardType={'decimal-pad'} 

                                    />
                                    <CustomTextInput
                                        label={`Purpose`}
                                        value={purpose}
                                        handleChange={FormikProps.handleChange(`purpose`)}
                                        handleBlur={FormikProps.handleBlur('purpose')}
                                        touched={purposeTouched}
                                        error={purposeError}
                                        placeholder={'Eg: Pay salary'}
                                        

                                    />
                                  
                                    <View style={{ marginBottom: 20, marginTop: 25 }}>
                                        <Text style={styles.h2}>Financing Declaration</Text>
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Is company connected with SME Bank?</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            {(Platform.OS == 'ios') ?
                                                <CheckBox2 onClick={() => handleCheckBox()} isChecked={smeConnected} style={{ paddingRight: 10 }} />
                                                :
                                                <CheckBox onValueChange={handleCheckBox} value={smeConnected} style={{ paddingRight: 10 }} />
                                            }
                                            <Text style={styles.text}>Yes</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            {(Platform.OS == 'ios') ?
                                                <CheckBox2 onClick={() => handleCheckBox()} isChecked={!smeConnected} style={{ paddingRight: 10 }} />
                                                :
                                                <CheckBox onValueChange={handleCheckBox} value={!smeConnected} style={{ paddingRight: 10 }} />
                                            }<Text style={styles.text}>No</Text>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                            <CustomFormAction
                                navigation={props.navigation}
                                isValid={FormikProps.isValid}
                                handleSubmit={FormikProps.handleSubmit}
                                isSubmitting={FormikProps.isSubmitting}
                                label={`Next`}
                            />
                     </LayoutA>
                    </KeyboardAvoidingView>
                )
            }}
        </Formik >
    );
}



export default LoanApplicationScreen;