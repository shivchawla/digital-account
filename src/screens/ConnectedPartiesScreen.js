import React from 'react';
import { View, TouchableOpacity, Text, Image, TextInput, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Layout from '../constants/Layout';

const validationSchema = Yup.object().shape({

    capacity: Yup
         .string()
      
        .required()
        .label('Capacity'),

    name: Yup
        .string()
        .required()
        .min(3)
        .label('Name'),

    myKad: Yup
        .string()
        .required()
        .min(12)
        .label('My Kad'),

    relationship: Yup
        .string()
        .required()
        .min(3)
        .label('Relationship'),

    personnelName: Yup
        .string()
        .required()
        .min(3)
        .label('Name'),

    email: Yup
        .string()
        .email()
        .required()
        .label('Email'),

});

const ConnectedPartiesScreen = (props) => {

    const loanData = useSelector(state => state.loanApplicationReducer, shallowEqual)
    const dispatch = useDispatch()
    const setLoanData = (val) => dispatch({ type: 'SET_LOAN_APPLICATION', payload: { ...val } });

    return (

        <Formik onSubmit={values => {
            setLoanData(values)
            props.navigation.navigate('LoanApplicationDeclaration')
        }}

            validationSchema={validationSchema}>

            {FormikProps => {

                const { capacity, name, myKad, relationship, personnelName, email } = FormikProps.values

                const capacityError = FormikProps.errors.capacity
                const capacityTouched = FormikProps.touched.capacity

                const nameError = FormikProps.errors.name
                const nameTouched = FormikProps.touched.name

                const myKadError = FormikProps.errors.myKad
                const myKadTouched = FormikProps.touched.myKad

                const relationshipError = FormikProps.errors.relationship
                const relationshipTouched = FormikProps.touched.relationship

                const personnelNameError = FormikProps.errors.personnelName
                const personnelNameTouched = FormikProps.touched.personnelName

                const emailError = FormikProps.errors.email
                const emailTouched = FormikProps.touched.email

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }} keyboardVerticalOffset={20}>
                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.title}>LOAN</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <View style={{ backgroundColor:'rgba(62,194,217,0.5)',borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
          </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 9 }}>
                                <ScrollView style={[styles.screenMargin]}>
                                    <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center', marginBottom: 5 }}>
                                        <Text style={[styles.titleBox, { marginBottom: 10, marginTop: 10 }]}>Connected Parties</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center', marginBottom: 20 }}>
                                        <View style={{ flexDirection: 'row', width: Layout.window.width / 2, justifyContent: 'space-between' }}>
                                            <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, justifyContent: 'center' }}>
                                                <View style={{ width: Layout.window.width / 2, height: 8, flexDirection: 'row' }} >
                                                    <View style={{ flex: 1, backgroundColor: '#9EDBF4' }} />
                                                    <View style={{ flex: 1, backgroundColor: '#9EDBF4' }} />
                                                </View>
                                            </View>
                                            <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#20B8D3', justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name="md-card" color={'#fff'} style={{ fontSize: 15, }} />
                                            </View>
                                            <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#20B8D3', justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 15, }} />
                                            </View>
                                            <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#CDCDCD', justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name="md-clipboard" color={'grey'} style={{ fontSize: 15, }} />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10 }}>
                                        <Text style={[styles.h2]}>Detail of Connected Parties</Text>
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Capacity</Text>
                                        <TextInput value={capacity} onChangeText={FormikProps.handleChange('capacity')} onBlur={FormikProps.handleBlur('capacity')} style={{ borderWidth: 1, borderColor: capacityTouched && capacityError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={capacityTouched && capacityError ? '' : 'Eg: 40'} placeholderTextColor={capacityTouched && capacityError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                        {capacityTouched && capacityError && <Text style={styles.error}>{capacityError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Name</Text>
                                        <TextInput value={name} onChangeText={FormikProps.handleChange('name')} onBlur={FormikProps.handleBlur('name')} style={{ borderWidth: 1, borderColor: nameTouched && nameError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={nameTouched && nameError ? '' : 'Eg: Ali bin Ahmad'} placeholderTextColor={nameTouched && nameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {nameTouched && nameError && <Text style={styles.error}>{nameError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>MyKad</Text>
                                        <TextInput value={myKad} onChangeText={FormikProps.handleChange('myKad')} onBlur={FormikProps.handleBlur('myKad')} style={{ borderWidth: 1, borderColor: myKadTouched && myKadError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={myKadTouched && myKadError ? '' : 'Eg: 670901029871'} placeholderTextColor={myKadTouched && myKadError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                        {myKadTouched && myKadError && <Text style={styles.error}>{myKadError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Relationship</Text>
                                        <TextInput value={relationship} onChangeText={FormikProps.handleChange('relationship')} onBlur={FormikProps.handleBlur('relationship')} style={{ borderWidth: 1, borderColor: relationshipTouched && relationshipError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={relationshipTouched && relationshipError ? '' : 'Eg: Guarantor'} placeholderTextColor={relationshipTouched && relationshipError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {relationshipTouched && relationshipError && <Text style={styles.error}>{relationshipError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Bank Personnel Name</Text>
                                        <TextInput value={personnelName} onChangeText={FormikProps.handleChange('personnelName')} onBlur={FormikProps.handleBlur('personnelName')} style={{ borderWidth: 1, borderColor: personnelNameTouched && personnelNameError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={personnelNameTouched && personnelNameError ? '' : 'Eg: Bank ABC'} placeholderTextColor={personnelNameTouched && personnelNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {personnelNameTouched && personnelNameError && <Text style={styles.error}>{personnelNameError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Email</Text>
                                        <TextInput value={email} onChangeText={FormikProps.handleChange('email')} onBlur={FormikProps.handleBlur('email')} style={{ borderWidth: 1, borderColor: emailTouched && emailError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={emailTouched && emailError ? '' : 'abc@email.com'} placeholderTextColor={emailTouched && emailError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {emailTouched && emailError && <Text style={styles.error}>{emailError}</Text>}
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                                        
                                            <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                                        
                                    </TouchableOpacity>
                                <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                    <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff' }]}>Next</Text>}
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );

}

ConnectedPartiesScreen.navigationOptions = {
    header: null,
};

export default ConnectedPartiesScreen;