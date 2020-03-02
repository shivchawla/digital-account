import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, TextInput, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
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
    const [offSet, setOffSet] = useState(true)
    useEffect(() => {
        const open = () => setOffSet(false)
        const off = () => setOffSet(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates

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

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }} keyboardVerticalOffset={offSet ? 30 : 0}>

                        <LayoutA
                            title={'LOAN'}
                            screenType='form'
                            navigation={props.navigation}
                            nopadding
                        >

                            <View style={{ flex: 9 }}>
                                <ScrollView style={[styles.screenMargin]}>
                                    <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center', marginBottom: 5 }}>
                                        <Text style={[styles.titleBox, { marginBottom: 10, marginTop: 10, fontSize: 16 }]}>Connected Parties</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center', marginBottom: 20 }}>
                                        <View style={{ flexDirection: 'row', width: Layout.window.width / 2, justifyContent: 'space-between' }}>
                                            <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, justifyContent: 'center' }}>
                                                <View style={{ width: Layout.window.width / 2, height: 8, flexDirection: 'row' }} >
                                                    <View style={{ flex: 1, backgroundColor: '#9EDBF4' }} />
                                                    <View style={{ flex: 1, backgroundColor: '#9EDBF4' }} />
                                                </View>
                                            </View>
                                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#20B8D3', justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name="md-card" color={'#fff'} style={{ fontSize: 15, }} />
                                            </View>
                                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#20B8D3', justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 15, }} />
                                            </View>
                                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#CDCDCD', justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name="md-clipboard" color={'grey'} style={{ fontSize: 15, }} />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10 }}>
                                        <Text style={[styles.h2]}>Detail of Connected Parties</Text>
                                    </View>
                                    <CustomTextInput
                                        label={`Capacity`}
                                        value={capacity}
                                        handleChange={FormikProps.handleChange(`capacity`)}
                                        handleBlur={FormikProps.handleBlur('capacity')}
                                        touched={capacityTouched}
                                        error={capacityError}
                                        keyboardType={'phone-pad'}
                                        placeholder={'Eg: 40'}

                                    />
                                    <CustomTextInput
                                        label={`Name`}
                                        value={name}
                                        handleChange={FormikProps.handleChange(`name`)}
                                        handleBlur={FormikProps.handleBlur('name')}
                                        touched={nameTouched}
                                        error={nameError}
                                        placeholder={'Eg: Ali bin Ahmad'}

                                    />
                                    <CustomTextInput
                                        label={`MyKad`}
                                        value={myKad}
                                        handleChange={FormikProps.handleChange(`myKad`)}
                                        handleBlur={FormikProps.handleBlur('myKad')}
                                        touched={myKadTouched}
                                        error={myKadError}
                                        keyboardType={'phone-pad'}
                                        placeholder={'Eg: 670901029871'}

                                    />
                                    <CustomTextInput
                                        label={`Relationship`}
                                        value={relationship}
                                        handleChange={FormikProps.handleChange(`relationship`)}
                                        handleBlur={FormikProps.handleBlur('relationship')}
                                        touched={relationshipTouched}
                                        error={relationshipError}
                                        placeholder={'Eg: Guarantor'}
                                    />
                                    <CustomTextInput
                                        label={`Bank Personnel Name`}
                                        value={personnelName}
                                        handleChange={FormikProps.handleChange(`personnelName`)}
                                        handleBlur={FormikProps.handleBlur('personnelName')}
                                        touched={personnelNameTouched}
                                        error={personnelNameError}
                                        placeholder={'Eg: Bank ABC'}
                                    />
                                    <CustomTextInput
                                        label={`Email`}
                                        value={email}
                                        handleChange={FormikProps.handleChange(`email`)}
                                        handleBlur={FormikProps.handleBlur('email')}
                                        touched={emailTouched}
                                        error={emailError}
                                        placeholder={'abc@email.com'}
                                    />
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
                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );

}



export default ConnectedPartiesScreen;