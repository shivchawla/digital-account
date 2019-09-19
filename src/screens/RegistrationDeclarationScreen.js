import React, { useState, useContext } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';

import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import CheckBox from 'react-native-check-box'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    isDeclaration1: Yup
        .bool()
        .oneOf([true], 'Field must be checked')
        .required()
        .label('Agreement'),
});

const RegistrationDeclarationScreen = (props) => {
    const dispatch = useDispatch()
    return (
        <Formik
        onSubmit={values => dispatch(actionCreator.declaration(values))}
            validationSchema={validationSchema}
            initialValues={{ isDeclaration1: false, isDeclaration2: false }}
        >
            {FormikProps => {
                const { isDeclaration1, isDeclaration2 } = FormikProps.values
                const handleCheckBox = (field) => {
                    console.log(`field ialah ${field}`)

                    switch (field) {
                        case 'isDeclaration1':
                            FormikProps.setFieldValue('isDeclaration1', !isDeclaration1)
                            break;
                        case 'isDeclaration2':
                            FormikProps.setFieldValue('isDeclaration2', !isDeclaration2)
                            break;

                    }

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
                                <Text style={[styles.title, { color: '#055E7C' }]}>Declaration</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>

                        </View>

                        <View style={{ flex: 9 }}>

                            <View style={{ flex: 9, margin: 10, marginRight: 70 }}>

                                <View style={{ marginBottom: 10 }}>

                                    <View>
                                        <Text style={[styles.text, { marginBottom: 20, color: '#055E7C' }]}>Please state if your company is one of the following</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <CheckBox onClick={() => handleCheckBox('isDeclaration1')} isChecked={isDeclaration1} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)', marginRight: 25 }} />
                                        <Text>I agree on terms and condition listed</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <CheckBox onClick={() => handleCheckBox('isDeclaration2')} isChecked={isDeclaration2} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)', marginRight: 25 }} />
                                        <Text>Me and my company does not want to receive any marketing materials about the products and/or special offers on SME Bank</Text>
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

                    </KeyboardAvoidingView>)
            }}

        </Formik >
    );
}

RegistrationDeclarationScreen.navigationOptions = {
    header: null,
};

export default RegistrationDeclarationScreen;
