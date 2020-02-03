import React from 'react';
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView, TextInput,ActivityIndicator } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({

    customerName: Yup
        .string()
        .required()
        .min(3)
        .label('Customer Name'),

    customerEmail: Yup
        .string()
        .email()
        .required()
        .label('Customer Email'),

    currency: Yup
        .string()
        .required()
        .label('Currency'),

});

const CustomerAddScreen = (props) => {

    const dispatch = useDispatch()
    const setCustomer = (val) => dispatch({ type: 'SET_CUSTOMER_DATA', payload: { ...val } });

    return (

        <Formik onSubmit={async values => {
           
            dispatch(actionCreator.passCustomerData(values))
            props.navigation.navigate("CustomerAddSuccess")
            console.log(JSON.stringify(values))
        }}

            validationSchema={validationSchema}>

            {FormikProps => {
                const { customerName, customerEmail, currency } = FormikProps.values

                const customerNameError = FormikProps.errors.customerName
                const customerNameTouched = FormikProps.touched.customerName

                const customerEmailError = FormikProps.errors.customerEmail
                const customerEmailTouched = FormikProps.touched.customerEmail

                const currencyError = FormikProps.errors.currency
                const currencyTouched = FormikProps.touched.currency

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center' }} keyboardVerticalOffset={20}>
                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title, { color: '#055E7C' }]}>CUSTOMER DETAILS</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <View style={{ backgroundColor:'rgba(62,194,217,0.5)',borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
          </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={[styles.screenMargin, { flex: 3, marginRight: 20 }]}>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, marginTop: 25 }]}>Customer Name</Text>
                                    <TextInput value={customerName} onChangeText={FormikProps.handleChange('customerName')} onBlur={FormikProps.handleBlur('customerName')} style={{ borderWidth: 1, borderColor: customerNameTouched && customerNameError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={customerNameTouched && customerNameError ? '' : 'Siti binti Ali'} placeholderTextColor={customerNameTouched && customerNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {customerNameTouched && customerNameError && <Text style={styles.error}>{customerNameError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5 }]}>Customer E-mail</Text>
                                    <TextInput value={customerEmail} onChangeText={FormikProps.handleChange('customerEmail')} onBlur={FormikProps.handleBlur('customerEmail')} style={{ borderWidth: 1, borderColor: customerEmailTouched && customerEmailError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={customerEmailTouched && customerEmailError ? '' : 'example@email.com'} placeholderTextColor={customerEmailTouched && customerEmailError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {customerEmailTouched && customerEmailError && <Text style={styles.error}>{customerEmailError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5 }]}>Preferred Currency</Text>
                                    <TextInput value={currency} onChangeText={FormikProps.handleChange('currency')} onBlur={FormikProps.handleBlur('currency')} style={{ borderWidth: 1, borderColor: currencyTouched && currencyError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={currencyTouched && currencyError ? '' : 'MYR'} placeholderTextColor={currencyTouched && currencyError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {currencyTouched && currencyError && <Text style={styles.error}>{currencyError}</Text>}
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                                        
                                            <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                                        
                                    </TouchableOpacity>
                            <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff' }]}>Submit</Text>}
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}

CustomerAddScreen.navigationOptions = {
    header: null,
};

export default CustomerAddScreen