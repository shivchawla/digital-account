import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';

import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'

const validationSchema = Yup.object().shape({

    name: Yup
        .string()
        .label('Name'),

    email: Yup
        .string()
        .email()
        .label('Email'),

    phoneNo: Yup
        .string()
        .label('Phone Number'),

    contact: Yup
        .string()
        .required()
        .label('Contact'),

    cc: Yup
        .string()
        .label('CC'),

    subject: Yup
        .string()
        .required()
        .label('Subject'),

    status: Yup
        .string()
        .required()
        .label('Status'),

    priority: Yup
        .string()
        .required()
        .label('Priority'),

    assignTo: Yup
        .string()
        .required()
        .label('Assign To'),

    description: Yup
        .string()
        .required()
        .label('description'),

    tag: Yup
        .string()
        .required()
        .label('Tag'),

});

const SupportScreen = (props) => {

    return (
        <Formik

            onSubmit={async values => {

            }}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                const { name, email, phoneNo, contact, cc, subject, status, priority, assignTo, description, tag } = FormikProps.values

                const nameError = FormikProps.errors.name
                const nameTouched = FormikProps.touched.name

                const emailError = FormikProps.errors.email
                const emailTouched = FormikProps.touched.email

                const phoneNoError = FormikProps.errors.phoneNo
                const phoneNoTouched = FormikProps.touched.phoneNo

                const contactError = FormikProps.errors.contact
                const contactTouched = FormikProps.touched.contact

                const ccError = FormikProps.errors.cc
                const ccTouched = FormikProps.touched.cc

                const subjectError = FormikProps.errors.subject
                const subjectTouched = FormikProps.touched.subject

                const statusError = FormikProps.errors.status
                const statusTouched = FormikProps.touched.status

                const priorityError = FormikProps.errors.priority
                const priorityTouched = FormikProps.touched.priority

                const assignToError = FormikProps.errors.assignTo
                const assignToTouched = FormikProps.touched.assignTo

                const descriptionError = FormikProps.errors.description
                const descriptionTouched = FormikProps.touched.description

                const tagError = FormikProps.errors.tag
                const tagTouched = FormikProps.touched.tag

                return (
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>

                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#4D6BFA' }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#4D6BFA'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.title}>Support</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>

                        </View>

                        <View style={{ justifyContent: 'space-between', flex: 9 }}>

                            <View style={{ flex: 9, margin: 10 }}>

                                <ScrollView>

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Name</Text>
                                        <TextInput value={name} onChangeText={FormikProps.handleChange('name')} onBlur={FormikProps.handleBlur('name')} style={{ borderWidth: 1, borderColor: nameTouched && nameError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={nameTouched && nameError ? '' : 'Name'} placeholderTextColor={nameTouched && nameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>

                                    {nameTouched && nameError && <Text style={styles.error}>{nameError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Email</Text>
                                        <TextInput value={email} onChangeText={FormikProps.handleChange('email')} onBlur={FormikProps.handleBlur('email')} style={{ borderWidth: 1, borderColor: emailTouched && emailError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={emailTouched && emailError ? '' : 'Email'} placeholderTextColor={emailTouched && emailError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>

                                    {emailTouched && emailError && <Text style={styles.error}>{emailError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Phone No</Text>
                                        <TextInput value={phoneNo} onChangeText={FormikProps.handleChange('phoneNo')} onBlur={FormikProps.handleBlur('phoneNo')} style={{ borderWidth: 1, borderColor: phoneNoTouched && phoneNoError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={phoneNoTouched && phoneNoError ? '' : 'Phone No'} placeholderTextColor={phoneNoTouched && phoneNoError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>

                                    {phoneNoTouched && phoneNoError && <Text style={styles.error}>{phoneNoError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Contact</Text>
                                        <TextInput value={contact} onChangeText={FormikProps.handleChange('contact')} onBlur={FormikProps.handleBlur('contact')} style={{ borderWidth: 1, borderColor: contactTouched && contactError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={contactTouched && contactError ? '' : 'Contact'} placeholderTextColor={contactTouched && contactError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>

                                    {contactTouched && contactError && <Text style={styles.error}>{contactError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>CC</Text>
                                        <TextInput value={cc} onChangeText={FormikProps.handleChange('cc')} onBlur={FormikProps.handleBlur('cc')} style={{ borderWidth: 1, borderColor: ccTouched && ccError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={ccTouched && ccError ? '' : 'CC'} placeholderTextColor={ccTouched && ccError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>

                                    {ccTouched && ccError && <Text style={styles.error}>{ccError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Subject</Text>
                                        <TextInput value={subject} onChangeText={FormikProps.handleChange('subject')} onBlur={FormikProps.handleBlur('subject')} style={{ borderWidth: 1, borderColor: subjectTouched && subjectError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={subjectTouched && subjectError ? '' : 'Subject'} placeholderTextColor={subjectTouched && subjectError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>

                                    {subjectTouched && subjectError && <Text style={styles.error}>{subjectError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Status</Text>
                                        <TextInput value={status} onChangeText={FormikProps.handleChange('status')} onBlur={FormikProps.handleBlur('status')} style={{ borderWidth: 1, borderColor: statusTouched && statusError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={statusTouched && statusError ? '' : 'Status'} placeholderTextColor={statusTouched && statusError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>

                                    {statusTouched && statusError && <Text style={styles.error}>{statusError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Priority</Text>
                                        <TextInput value={priority} onChangeText={FormikProps.handleChange('priority')} onBlur={FormikProps.handleBlur('priority')} style={{ borderWidth: 1, borderColor: priorityTouched && priorityError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={priorityTouched && priorityError ? '' : 'Priority'} placeholderTextColor={priorityTouched && priorityError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>

                                    {priorityTouched && priorityError && <Text style={styles.error}>{priorityError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Assign To</Text>
                                        <TextInput value={assignTo} onChangeText={FormikProps.handleChange('assignTo')} onBlur={FormikProps.handleBlur('assignTo')} style={{ borderWidth: 1, borderColor: assignToTouched && assignToError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={assignToTouched && assignToError ? '' : 'Assign To'} placeholderTextColor={assignToTouched && assignToError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>

                                    {assignToTouched && assignToError && <Text style={styles.error}>{assignToError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Tag</Text>
                                        <TextInput value={tag} onChangeText={FormikProps.handleChange('tag')} onBlur={FormikProps.handleBlur('tag')} style={{ borderWidth: 1, borderColor: tagTouched && tagError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={tagTouched && tagError ? '' : 'Assign To'} placeholderTextColor={tagTouched && tagError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>

                                    {tagTouched && tagError && <Text style={styles.error}>{tagError}</Text>}

                                </ScrollView>

                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>

                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1 }}>
                                    <LinearGradient colors={['#A4A4A4', '#A4A4A4']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.text, { color: '#fff' }]}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                    <LinearGradient colors={FormikProps.isValid ? ['#628BFB', '#0E47E8'] : ['rgba(98, 139, 251, 0.5)', 'rgba(14, 71, 232, 0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> :
                                            <Text style={[styles.text, { color: '#fff' }]}>Submit</Text>}
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