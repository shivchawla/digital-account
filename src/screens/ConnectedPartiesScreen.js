import React, { useContext } from 'react';
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
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({

    capacity: Yup
        .string(),
    name: Yup
        .string()
        .required(),
    myKad: Yup
        .string()
        .required(),
    relationship: Yup
        .string()
        .required(),
    personnelName: Yup
        .string()
        .required(),
    email: Yup
        .string(),

});

const ConnectedPartiesScreen = (props) => {
    const loanData = useSelector(state => state.loanApplicationReducer, shallowEqual)
    const dispatch = useDispatch()
    const setLoanData = (val) => dispatch({ type: 'SET_LOAN_DATA', payload: { ...val } });
    return (
        <Formik

            onSubmit={values => {
                // console.log(JSON.stringify(values))
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
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
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
                                <Text>Apa ni : {JSON.stringify(loanData)}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                    <Text style={styles.h3}>Connected Parties</Text>
                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Capacity</Text>
                                    <TextInput value={capacity} onChangeText={FormikProps.handleChange('capacity')} onBlur={FormikProps.handleBlur('capacity')} style={{ borderWidth: 1, borderColor: capacityTouched && capacityError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={capacityTouched && capacityError ? '' : 'Capacity'} placeholderTextColor={capacityTouched && capacityError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {capacityTouched && capacityError && <Text style={styles.error}>{capacityError}</Text>}
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Name</Text>
                                    <TextInput value={name} onChangeText={FormikProps.handleChange('name')} onBlur={FormikProps.handleBlur('name')} style={{ borderWidth: 1, borderColor: nameTouched && nameError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={nameTouched && nameError ? '' : 'Name'} placeholderTextColor={nameTouched && nameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {nameTouched && nameError && <Text style={styles.error}>{nameError}</Text>}
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>MyKad</Text>
                                    <TextInput value={myKad} onChangeText={FormikProps.handleChange('myKad')} onBlur={FormikProps.handleBlur('myKad')} style={{ borderWidth: 1, borderColor: myKadTouched && myKadError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={myKadTouched && myKadError ? '' : 'Name'} placeholderTextColor={myKadTouched && myKadError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {myKadTouched && myKadError && <Text style={styles.error}>{myKadError}</Text>}
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Relationship</Text>
                                    <TextInput value={relationship} onChangeText={FormikProps.handleChange('relationship')} onBlur={FormikProps.handleBlur('relationship')} style={{ borderWidth: 1, borderColor: relationshipTouched && relationshipError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={relationshipTouched && relationshipError ? '' : 'Name'} placeholderTextColor={relationshipTouched && relationshipError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {relationshipTouched && relationshipError && <Text style={styles.error}>{relationshipError}</Text>}
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Bank Personnel Name</Text>
                                    <TextInput value={personnelName} onChangeText={FormikProps.handleChange('personnelName')} onBlur={FormikProps.handleBlur('personnelName')} style={{ borderWidth: 1, borderColor: personnelNameTouched && personnelNameError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={personnelNameTouched && personnelNameError ? '' : 'Name'} placeholderTextColor={personnelNameTouched && personnelNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {personnelNameTouched && personnelNameError && <Text style={styles.error}>{personnelNameError}</Text>}
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Email</Text>
                                    <TextInput value={email} onChangeText={FormikProps.handleChange('email')} onBlur={FormikProps.handleBlur('email')} style={{ borderWidth: 1, borderColor: emailTouched && emailError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={emailTouched && emailError ? '' : 'Name'} placeholderTextColor={emailTouched && emailError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {emailTouched && emailError && <Text style={styles.error}>{emailError}</Text>}</View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, }}>
                                    <LinearGradient colors={['#A4A4A4', '#A4A4A4']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.text, { color: '#fff' }]}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={FormikProps.handleSubmit} style={{ flex: 1 }} >
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