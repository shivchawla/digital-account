import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    TextInput,
    CheckBox,
    KeyboardAvoidingView
} from 'react-native';

import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({

    capacity: Yup
        .string(),
    name: Yup
        .string(),
    myKad: Yup
        .string(),
    relationship: Yup
        .string(),
    personnelName: Yup
        .string(),
    email: Yup
        .string(),

});


const ConnectedPartiesScreen = (props) => {

    return (
        <Formik

            onSubmit={values => {
                console.log(JSON.stringify(values))
                //NavigationService.navigate('LoanApplicationDeclaration')
            }}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                const { capacity, name, myKad, relationship, personnelName, email } = FormikProps.values
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
                                <Text style={styles.title}>Connected  Parties</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 9, margin: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                    <Text style={styles.h3}>Connected Parties</Text>
                                </View>
                               
                                <View style={{ marginBottom: 10 }}>
                                <Text style={[styles.text, { marginBottom: 5 }]}>Capacity</Text>
                                    <TextInput value={capacity} onChangeText={FormikProps.handleChange('capacity')}  style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }}  />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                <Text style={[styles.text, { marginBottom: 5 }]}>Name</Text>
                                    <TextInput value={name} onChangeText={FormikProps.handleChange('name')}  style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }}  />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                <Text style={[styles.text, { marginBottom: 5 }]}>MyKad</Text>
                                    <TextInput value={myKad} onChangeText={FormikProps.handleChange('myKad')}  style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }}  />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                <Text style={[styles.text, { marginBottom: 5 }]}>Relationship</Text>
                                    <TextInput value={relationship} onChangeText={FormikProps.handleChange('relationship')}  style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }}  />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                <Text style={[styles.text, { marginBottom: 5 }]}>Bank Personnel Name</Text>
                                    <TextInput value={personnelName} onChangeText={FormikProps.handleChange('personnelName')}  style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }}  />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                <Text style={[styles.text, { marginBottom: 5 }]}>Email</Text>
                                    <TextInput value={email} onChangeText={FormikProps.handleChange('email')}  style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }}  />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity style={{ flex: 1, }}>
                                    <LinearGradient colors={['#A4A4A4', '#A4A4A4']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.text, { color: '#fff' }]}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={FormikProps.handleSubmit} style={{ flex: 1, }} >
                                    <LinearGradient colors={['#628BFB', '#0E47E8']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.text, { color: '#fff' }]}>Submit</Text>
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
