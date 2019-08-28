import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    TextInput,

    KeyboardAvoidingView
} from 'react-native';

import { LoanApplicationProvider, LoanApplicationContext } from '../contexts/LoanApplicationContext'

import CheckBox from 'react-native-check-box'
import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({

});


// const LoanApplicationDeclarationScreen = (props) => {

//     return (
//         <LoanApplicationProvider>
//             <LoanApplicationDeclaration navigation={props.navigation} />
//         </LoanApplicationProvider>
//     )

// }

const LoanApplicationDeclarationScreen = (props) => {
    const [capacityNumber, setCapacityNumber] = useState(null)
    const [textName, setTextName] = useState(null)
    const [icNumber, setICNumber] = useState(null)
    const [relationshipText, setRelationshipText] = useState(null)
    const [textBank, setTextBank] = useState(null)
    const [textEmail, setTextEmail] = useState(null)

    const display = () => {
        console.log(`capacity is ${capacityNumber},text name is ${textName},`)

    }
    return (
        <Formik
            onSubmit={async values => {
                console.log(JSON.stringify(values))

            }}
        // validationSchema={validationSchema}
        >
            {Aniq => {
                 const { capacity, name, ic, relationship, bank, email } = Aniq.values
                // const purposeError = FormikProps.errors.purpose
                // const purposeTouched = FormikProps.touched.purpose

                // const amountError = FormikProps.errors.amount
                // const amountTouched = FormikProps.touched.amount
                return (
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>
                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#4D6BFA' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#4D6BFA'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.title}>Loan Application</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', marginBottom: 30 }}>
                            <Text style={{ marginTop: 20, alignItems: 'center', fontSize: 15, fontWeight: 'bold' }}>Connected Parties </Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 9, margin: 10 }}>
                                <View style={{ marginBottom: 10 }}>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Capacity</Text>
                                        <TextInput style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }}
                                            value={capacity} onChangeText={Aniq.handleChange('capacity')}>
                                        </TextInput>
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Name</Text>
                                        <TextInput style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }}
                                            value={name} onChangeText={Aniq.handleChange('name')}>
                                        </TextInput>
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>MyKad</Text>
                                        <TextInput style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }}
                                            value={ic} onChangeText={Aniq.handleChange('ic')}>

                                        </TextInput>
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Relationship</Text>
                                        <TextInput style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }}
                                            value={relationship} onChangeText={Aniq.handleChange('relationship')}>
                                        </TextInput>
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Name Personnel Bank</Text>
                                        <TextInput style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }}
                                            value={bank} onChangeText={Aniq.handleChange('bank')}>
                                        </TextInput>
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Email</Text>
                                        <TextInput style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }}
                                            value={email} onChangeText={Aniq.handleChange('email')}>
                                        </TextInput>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity style={{ flex: 1, }}>
                                    <LinearGradient colors={['#A4A4A4', '#A4A4A4']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.text, { color: '#fff' }]}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={Aniq.handleSubmit}>
                                    <LinearGradient colors={['#628BFB', '#0E47E8']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.text, { color: '#fff' }]}>Submit</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                )
            }}
        </Formik>)
}

LoanApplicationDeclarationScreen.navigationOptions = {
    header: null,
};

export default LoanApplicationDeclarationScreen;