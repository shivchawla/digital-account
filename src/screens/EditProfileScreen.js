import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';

import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'

const validationSchema = Yup.object().shape({

    companyName: Yup
        .string(),
    registrationNumber: Yup
        .string(),
    companyAddress: Yup
        .string(),
    companyPostcode: Yup
        .string(),
    companyRegisteredDate: Yup
        .string(),

});

const EditProfileScreen = (props) => {
    //const [loanData, setLoanData] = useContext(LoanApplicationContext)
    return (

        <Formik

            onSubmit={async values => {
                // console.log(JSON.stringify(values))
                // await setLoanData({...loanData,connectedParties:[values]})
                // props.navigation.navigate('LoanApplicationDeclaration')
            }}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                const { companyName, companyRegNum, companyAddress, companyPostcode, companyRegisteredDate } = FormikProps.values
                // const purposeError = FormikProps.errors.purpose
                // const purposeTouched = FormikProps.touched.purpose

                // const amountError = FormikProps.errors.amount
                // const amountTouched = FormikProps.touched.amount
                return (
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>

                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title]}>Edit Profile</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>

                        </View>

                        <View style={{ justifyContent: 'space-between', flex: 9 }}>

                            <View style={[styles.screenMargin, { flex: 9 }]}>

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10 }}>
                                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 90, height: 90, }} />
                                </View>

                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5 }]}>Company Name</Text>
                                    <TextInput value={companyName} onChangeText={FormikProps.handleChange('companyName')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                </View>

                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5 }]}>Registration Number</Text>
                                    <TextInput value={companyRegNum} onChangeText={FormikProps.handleChange('companyRegNum')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                </View>

                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5 }]}>Company Addresss</Text>
                                    <TextInput value={companyAddress} onChangeText={FormikProps.handleChange('companyAddress')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                </View>

                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5 }]}>Postcode</Text>
                                    <TextInput value={companyPostcode} onChangeText={FormikProps.handleChange('companyPostcode')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} keyboardType={'phone-pad'} />
                                </View>

                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5 }]}>Company Registered Date</Text>
                                    <TextInput value={companyRegisteredDate} onChangeText={FormikProps.handleChange('companyRegisteredDate')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                </View>

                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>

                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 }}>
                                    <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                    <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> :
                                            <Text style={[styles.butang, { color: '#fff' }]}>Save</Text>}
                                    </LinearGradient>
                                </TouchableOpacity>

                            </View>

                        </View>

                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}

EditProfileScreen.navigationOptions = {
    header: null,
};


export default EditProfileScreen;