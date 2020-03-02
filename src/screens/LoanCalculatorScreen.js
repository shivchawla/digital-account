import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import Layout from '../constants/Layout'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';
import LayoutA from '../Layout/LayoutA';

const validationSchema = Yup.object().shape({

    loanAmount: Yup
        .string()
        .required()
        .label('Loan Amount'),

    interestRate: Yup
        .string()
        .required()
        .label('Interest Rate'),

    loanTerm: Yup
        .string()
        .required()
        .label('Loan Term'),

});

const LoanCalculatorScreen = (props) => {
    const [monthly, setMonthly] = useState(null)
    const calc = (values) => {
        const { loanAmount, interestRate, loanTerm } = values
        const monthly = (loanAmount * (1 + interestRate / 100) / loanTerm).toFixed(2)
        return monthly;
    }

    return (

        <Formik onSubmit={async (values, actions) => {
            console.log(JSON.stringify(values))
            setMonthly(calc(values).toString())
            actions.setSubmitting(false);
        }}

            validationSchema={validationSchema}>

            {FormikProps => {

                const { loanAmount, interestRate, loanTerm } = FormikProps.values

                const loanAmountError = FormikProps.errors.loanAmount
                const loanAmountTouched = FormikProps.touched.loanAmount

                const interestRateError = FormikProps.errors.interestRate
                const interestRateTouched = FormikProps.touched.interestRate

                const loanTermError = FormikProps.errors.loanTerm
                const loanTermTouched = FormikProps.touched.loanTerm

                return (

                    <View style={{ flex: 1, }}>
                        <LayoutA
                            title={'LOAN CALCULATOR'}
                            screenType='form'
                            navigation={props.navigation}
                            nopadding
                        >
                            <View style={{ flex: 9, padding: 10 }}>
                                <ScrollView>
                                    <View style={styles.box}>
                                        <View style={[styles.formElement]}>
                                            <Text style={[styles.titleBox]}>Loan Amount</Text>
                                            <TextInput value={loanAmount} onChangeText={FormikProps.handleChange('loanAmount')} onBlur={FormikProps.handleBlur('loanAmount')} style={{ borderWidth: 1, borderColor: loanAmountTouched && loanAmountError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={loanAmountTouched && loanAmountError ? '' : '5000.00'} placeholderTextColor={loanAmountTouched && loanAmountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                            {loanAmountTouched && loanAmountError && <Text style={styles.error}>{loanAmountError}</Text>}
                                        </View>
                                        <View style={[styles.formElement]}>
                                            <Text style={[styles.titleBox]}>Interest Rate</Text>
                                            <TextInput value={interestRate} onChangeText={FormikProps.handleChange('interestRate')} onBlur={FormikProps.handleBlur('interestRate')} style={{ borderWidth: 1, borderColor: interestRateTouched && interestRateError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={interestRateTouched && interestRateError ? '' : '3'} placeholderTextColor={interestRateTouched && interestRateError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                            {interestRateTouched && interestRateError && <Text style={styles.error}>{interestRateError}</Text>}
                                        </View>
                                        <View style={[styles.formElement]}>
                                            <Text style={[styles.titleBox]}>Loan Term (Month)</Text>
                                            <TextInput value={loanTerm} onChangeText={FormikProps.handleChange('loanTerm')} onBlur={FormikProps.handleBlur('loanTerm')} style={{ borderWidth: 1, borderColor: loanTermTouched && loanTermError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={loanTermTouched && loanTermError ? '' : '3'} placeholderTextColor={loanTermTouched && loanTermError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                            {loanTermTouched && loanTermError && <Text style={styles.error}>{loanTermError}</Text>}
                                        </View>
                                        <View style={{ flexDirection: 'row', margin: 5 }}>
                                            <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ padding: 5, paddingLeft: 8, paddingRight: 8, backgroundColor: FormikProps.isValid ? '#09A4BF' : 'rgba(9,164,191,0.5)', borderRadius: 15 }}>
                                                <Text style={[styles.text, { color: '#fff' }]}>Calculate</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={styles.title}>Result</Text>
                                    </View>
                                    <View style={styles.box}>
                                        <View style={[styles.formElement]}>
                                            <Text style={[styles.text]}>Mothly Repayment</Text>
                                            <TextInput value={monthly} style={{ borderWidth: 1, borderColor: loanAmountTouched && loanAmountError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={loanAmountTouched && loanAmountError ? '' : '5000.00'} placeholderTextColor={loanAmountTouched && loanAmountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />

                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                            </LayoutA>
                    </View>)
                }}
        </Formik >
                );
            }


export default LoanCalculatorScreen