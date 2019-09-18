import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    Picker

} from 'react-native';

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

    return (
        <Formik
            onSubmit={values => console.log(JSON.stringify(values))}
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

                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#055E7C' }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#4D6BFA'} style={{ fontSize: 30, paddingLeft: 20 }} />
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

                                <ScrollView style={{ padding: 10 }}>

                                    <View style={{ marginBottom: 10, alignSelf: 'stretch' }}>

                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Category</Text>
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>

                                            <Picker
                                                style={{ flex: 1, height: 35 }}
                                                selectedValue={category}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    FormikProps.setFieldValue('category', itemValue)
                                                }>
                                                <Picker.Item label="General" value="General" />
                                                <Picker.Item label="Technical" value="Technical" />
                                            </Picker>

                                        </View>

                                    </View>

                                    {categoryTouched && categoryError && <Text style={styles.error}>{categoryError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Subject</Text>
                                        <TextInput value={subject} onChangeText={FormikProps.handleChange('subject')} onBlur={FormikProps.handleBlur('subject')} style={{ borderWidth: 1, borderColor: subjectTouched && subjectError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={subjectTouched && subjectError ? '' : 'Subject'} placeholderTextColor={subjectTouched && subjectError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>

                                    {subjectTouched && subjectError && <Text style={styles.error}>{subjectError}</Text>}

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Inquiry</Text>
                                        <TextInput value={msg} onChangeText={FormikProps.handleChange('msg')} onBlur={FormikProps.handleBlur('msg')} style={{ textAlignVertical: 'top', borderWidth: 1, borderColor: msgTouched && msgError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={msgTouched && msgError ? '' : 'Assign To'} placeholderTextColor={msgTouched && msgError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} multiline numberOfLines={5} />
                                    </View>

                                    {msgTouched && msgError && <Text style={styles.error}>{msgError}</Text>}

                                </ScrollView>

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