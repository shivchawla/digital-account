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
            //setSubmitting(false)
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
                    <>
                        <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.title}>LOAN</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                                </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 9, }}>
                                <ScrollView style={{ padding: 10 }}>
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
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.titleBox, { marginBottom: 10, fontSize: 16 }]}>Total Financing (MYR)</Text>
                                        <TextInput value={amount} onChangeText={FormikProps.handleChange('amount')} onBlur={FormikProps.handleBlur('amount')} style={[styles.textInput, { borderWidth: 1, borderColor: amountTouched && amountError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={amountTouched && amountError ? '' : 'Eg: RM 1000.00'} placeholderTextColor={amountTouched && amountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                        {amountTouched && amountError && <Text style={styles.error}>{amountError}</Text>}
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.titleBox, { marginBottom: 10, fontSize: 16 }]}>Purpose</Text>
                                        <TextInput value={purpose} onChangeText={FormikProps.handleChange('purpose')} onBlur={FormikProps.handleBlur('purpose')} style={[styles.textInput, { borderWidth: 1, borderColor: purposeTouched && purposeError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={purposeTouched && purposeError ? '' : 'Eg: Pay salary'} placeholderTextColor={purposeTouched && purposeError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />

                                        {purposeTouched && purposeError && <Text style={styles.error}>{purposeError}</Text>}
                                    </View>
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
                            <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                    <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.butang, { color: '#fff' }]}>Next</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )
            }}
        </Formik >
    );
}



export default LoanApplicationScreen;