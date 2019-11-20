import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView, KeyboardAvoidingView, TextInput, Picker, ActivityIndicator } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'

const validationSchema = Yup.object().shape({

    subject: Yup
        .string()
        .required()
        .min(5)
        .label('Subject'),

    type: Yup
        .string()
        .required()
        .label('type'),

    description: Yup
        .string()
        .required()
        .min(5)
        .label('description'),

});

const SupportScreen = (props) => {

    const dispatch = useDispatch()
    const setSupportData = (val) => dispatch({ type: 'SET_SUBMIT_SUPPORT', payload: { ...val } });
    const supportData = useSelector(state => state.supportReducer, shallowEqual)

    const [tag, setTag] = useState((Math.floor(100000000 + Math.random() * 900000000)).toString())

    return (

        <Formik onSubmit={async values => {
            props.navigation.navigate("SupportSuccess")
            dispatch(actionCreator.submitNewSupport({ ...values, tag }))
        }}
            validationSchema={validationSchema}
        >
            {FormikProps => {

                const { subject, type, description, priority } = FormikProps.values

                const subjectError = FormikProps.errors.subject
                const subjectTouched = FormikProps.touched.subject

                const typeError = FormikProps.errors.type
                const typeTouched = FormikProps.touched.type

                const descriptionError = FormikProps.errors.description
                const descriptionTouched = FormikProps.touched.description

                const priorityError = FormikProps.errors.priority
                const priorityTouched = FormikProps.touched.priority

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>
                        <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title]}>SUPPORT</Text>
                            </View>
                            <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 9 }}>
                                <ScrollView style={styles.screenMargin}>
                                    <View style={styles.formElement}>
                                        <Text style={[styles.titleBox], { marginBottom: 10, marginTop: 20 }}>Tag</Text>
                                        <TextInput disable={true} value={tag} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                        {/* {subjectTouched && subjectError && <Text style={styles.error}>{subjectError}</Text>} */}
                                    </View>
                                    <View style={[styles.formElement, { alignSelf: 'stretch' }]}>
                                        <Text style={[styles.titleBox], { marginBottom: 10 }}>Type</Text>
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <Picker style={{ flex: 1, height: 35 }} selectedValue={type} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('type', itemValue)}>
                                                <Picker.Item label="Question" value="Question" />
                                                <Picker.Item label="Incident" value="Incident" />
                                                <Picker.Item label="Problem" value="Problem" />
                                                <Picker.Item label="Feature Request" value="Feature Request" />
                                                <Picker.Item label="Refund" value="Refund" />
                                            </Picker>
                                            {typeTouched && typeError && <Text style={styles.error}>{typeError}</Text>}
                                        </View>
                                    </View>
                                    <View style={[styles.formElement, { alignSelf: 'stretch' }]}>
                                        <Text style={[styles.titleBox], { marginBottom: 10 }}>Priority</Text>
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <Picker style={{ flex: 1, height: 35 }} selectedValue={priority} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('priority', itemValue)}>
                                                <Picker.Item value="1" label="Low" />
                                                <Picker.Item value="2" label="Medium" />
                                                <Picker.Item value="3" label="High" />
                                                <Picker.Item value="4" label="Urgent" />
                                            </Picker>
                                            {priorityTouched && priorityError && <Text style={styles.error}>{priorityError}</Text>}
                                        </View>
                                    </View>
                                    <View style={styles.formElement}>
                                        <Text style={[styles.titleBox], { marginBottom: 10 }}>Subject</Text>
                                        <TextInput value={subject} onChangeText={FormikProps.handleChange('subject')} onBlur={FormikProps.handleBlur('subject')} style={{ borderWidth: 1, borderColor: subjectTouched && subjectError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={subjectTouched && subjectError ? '' : 'Subject'} placeholderTextColor={subjectTouched && subjectError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {subjectTouched && subjectError && <Text style={styles.error}>{subjectError}</Text>}
                                    </View>
                                    <View style={styles.formElement}>
                                        <Text style={[styles.titleBox], { marginBottom: 10 }}>Description</Text>
                                        <TextInput value={description} onChangeText={FormikProps.handleChange('description')} onBlur={FormikProps.handleBlur('description')} style={{ textAlignVertical: 'top', borderWidth: 1, borderColor: descriptionTouched && descriptionError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={descriptionTouched && descriptionError ? '' : 'Assign To'} placeholderTextColor={descriptionTouched && descriptionError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} multiline numberOfLines={5} />
                                        {descriptionTouched && descriptionError && <Text style={styles.error}>{descriptionError}</Text>}
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

SupportScreen.navigationOptions = {
    header: null,
};

export default SupportScreen;