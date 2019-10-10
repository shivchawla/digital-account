import React from 'react';

import {

    View,
    TouchableOpacity,
    Text,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    Picker,
    ActivityIndicator

} from 'react-native';

import * as actionCreator from '../store/actions/action'

import { useDispatch } from 'react-redux'

import { LinearGradient } from 'expo-linear-gradient'

import { Ionicons } from '@expo/vector-icons';

import { Formik } from 'formik';

import * as Yup from 'yup';

import styles from '../styles/styles'

const validationSchema = Yup.object().shape({

    subject: Yup
        .string()
        .required()
        .label('Subject'),

    category: Yup
        .string()
        .required()
        .label('Category'),

    msg: Yup
        .string()
        .required()
        .label('msg'),

});

const SupportScreen = (props) => {

    const dispatch = useDispatch()

    const setSupport = (val) => dispatch({ type: 'SET_SUPPORT', payload: { ...val } });

    return (

        <Formik onSubmit={async values => {

            props.navigation.navigate("InvoiceSuccess")

            dispatch(actionCreator.passSupport(values))

            console.log(JSON.stringify(values))

        }}

            validationSchema={validationSchema}

        >
            {FormikProps => {

                const { subject, category, msg } = FormikProps.values

                const subjectError = FormikProps.errors.subject
                const subjectTouched = FormikProps.touched.subject

                const categoryError = FormikProps.errors.category
                const categoryTouched = FormikProps.touched.category

                const msgError = FormikProps.errors.msg
                const msgTouched = FormikProps.touched.msg

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>

                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>

                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>

                            </View>

                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title, { color: '#055E7C' }]}>Support</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>

                        </View>

                        <View style={{ justifyContent: 'space-between', flex: 9 }}>

                            <View style={{ flex: 9 }}>

                                <ScrollView style={styles.screenMargin}>

                                    <View style={[styles.formElement, { alignSelf: 'stretch' }]}>

                                        <Text style={styles.titleBox}>Category</Text>

                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>

                                            <Picker style={{ flex: 1, height: 35 }} selectedValue={category} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('category', itemValue)}>
                                                <Picker.Item label="General" value="General" />
                                                <Picker.Item label="Technical" value="Technical" />
                                            </Picker>

                                            {categoryTouched && categoryError && <Text style={styles.error}>{categoryError}</Text>}

                                        </View>

                                    </View>

                                    <View style={styles.formElement}>

                                        <Text style={styles.titleBox}>Subject</Text>

                                        <TextInput value={subject} onChangeText={FormikProps.handleChange('subject')} onBlur={FormikProps.handleBlur('subject')} style={{ borderWidth: 1, borderColor: subjectTouched && subjectError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={subjectTouched && subjectError ? '' : 'Subject'} placeholderTextColor={subjectTouched && subjectError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />

                                        {subjectTouched && subjectError && <Text style={styles.error}>{subjectError}</Text>}

                                    </View>

                                    <View style={styles.formElement}>

                                        <Text style={styles.titleBox}>Inquiry</Text>

                                        <TextInput value={msg} onChangeText={FormikProps.handleChange('msg')} onBlur={FormikProps.handleBlur('msg')} style={{ textAlignVertical: 'top', borderWidth: 1, borderColor: msgTouched && msgError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={msgTouched && msgError ? '' : 'Assign To'} placeholderTextColor={msgTouched && msgError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} multiline numberOfLines={5} />

                                        {msgTouched && msgError && <Text style={styles.error}>{msgError}</Text>}

                                    </View>

                                </ScrollView>

                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>

                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 }}>

                                    <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                                    </LinearGradient>

                                </TouchableOpacity>

                                <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>

                                    <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff' }]}>Submit</Text>}
                                    </LinearGradient>

                                </TouchableOpacity>

                            </View>

                        </View>

                    </KeyboardAvoidingView>)

            }}

        </Formik >

    );
}

SupportScreen.navigationOptions =

    {

        header: null,

    };

export default SupportScreen;