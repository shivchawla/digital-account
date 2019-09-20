import React, { useContext } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ActivityIndicator,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import CheckBox from 'react-native-check-box'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    amount: Yup
        .number()
        .positive()
        .required()
        .label('Amount'),
    purpose: Yup
        .string()
        .required()
        .label('Purpose'),
});

const LoanApplicationScreen = (props) => {
    //const loanData = useSelector(state => state.loanApplicationReducer, shallowEqual)
    
    const dispatch = useDispatch()
    const setLoanData = (val) => dispatch({ type: 'SET_LOAN_DATA', payload: { ...val } });

    return (
        <Formik
            initialValues={{ smeConnected: false }}
            onSubmit={values => {
                setLoanData(values)
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

                const handleCheckBox = () => {
                    FormikProps.setFieldValue('smeConnected', !smeConnected)
                }

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>

                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#055E7C' }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#055E7C'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title, {color: '#055E7C'}]}>Loan</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>

                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>

                            <View style={{ flex: 9, margin: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                    <Text style={[styles.h3, {color: '#055E7C'}]}>Financing</Text>
                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Total Financing (MYR)</Text>
                                    <TextInput value={amount} onChangeText={FormikProps.handleChange('amount')} onBlur={FormikProps.handleBlur('amount')} style={{ borderWidth: 1, borderColor: amountTouched && amountError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={amountTouched && amountError ? '' : ''} placeholderTextColor={amountTouched && amountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                    {amountTouched && amountError && <Text style={styles.error}>{amountError}</Text>}
                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Purpose</Text>
                                    <TextInput value={purpose} onChangeText={FormikProps.handleChange('purpose')} onBlur={FormikProps.handleBlur('purpose')} style={{ borderWidth: 1, borderColor: purposeTouched && purposeError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={purposeTouched && purposeError ? '' : ''} placeholderTextColor={purposeTouched && purposeError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {purposeTouched && purposeError && <Text style={styles.error}>{purposeError}</Text>}
                                </View>

                                <View style={{ marginBottom: 10 }}>

                                    <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Is company connected with SME Bank</Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <CheckBox onClick={() => handleCheckBox()} isChecked={smeConnected} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)', paddingRight: 10 }} /><Text>Yes</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <CheckBox onClick={handleCheckBox} isChecked={!smeConnected} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)', paddingRight: 10 }} /><Text>No</Text>
                                    </View>

                                </View>
                            </View>

                             <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>

                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 }}>
                                    <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.text, { color: '#000000' }]}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                    <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> :
                                            <Text style={[styles.text, { color: '#fff' }]}>Next</Text>}
                                    </LinearGradient>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </KeyboardAvoidingView>
                    )
            }}
        </Formik >

    );
}

LoanApplicationScreen.navigationOptions = {
    header: null,
};

export default LoanApplicationScreen;