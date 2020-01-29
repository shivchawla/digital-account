import React,{useEffect,useState} from 'react';
import { Image, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, ActivityIndicator,Alert,BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'
import { useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
// modules
import {
    handleAndroidBackButton,
    removeAndroidBackButtonHandler
} from '../components/androidBackButton';
const validationSchema = Yup.object().shape({

    cddContactPersonName: Yup
        .string()
        .min(3)
        .required()
        .label('Name'),

    cddContactPersonIc: Yup
        .string()
        .min(12)
        .required()
        .label('IC'),

    cddContactPersonNumber: Yup
        .string()
        .min(10)
        .required()
        .label('Phone Number'),

    cddContactPersonPosition: Yup
        .string()
        .min(3)
        .required()
        .label('Position'),

});

const ContactPersonScreen = (props) => {

    const exitAlert = () => {
        // Works on both Android and iOS
        Alert.alert(
            'Skip',
            'Go to Dashboard or Exit App',
            [

                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Dashboard', onPress: () => { console.log('OK Pressed'); props.navigation.navigate('Dashboard') } },
                { text: 'Exit', onPress: () => { console.log('OK Pressed'); BackHandler.exitApp() } },
            ],
            { cancelable: false },
        );
    };
    useEffect(() => {
        console.log("componentDidMount");
        handleAndroidBackButton(exitAlert)
        // return removeAndroidBackButtonHandler()
    }, []); // empty-array means don't watch for any updates
    const dispatch = useDispatch()
    const contactPerson = (values) => {
        dispatch(actionCreator.contactPerson(values))
        props.navigation.navigate('ContactPersonSuccess')

    }

    return (
        <Formik

            onSubmit={values => contactPerson(values)}

            validationSchema={validationSchema}
        >
            {FormikProps => {

                const { cddContactPersonName, cddContactPersonIc, cddContactPersonNumber, cddContactPersonPosition } = FormikProps.values

                const cddContactPersonNameError = FormikProps.errors.cddContactPersonName
                const cddContactPersonNameTouched = FormikProps.touched.cddContactPersonName

                const cddContactPersonIcError = FormikProps.errors.cddContactPersonIc
                const cddContactPersonIcTouched = FormikProps.touched.cddContactPersonIc

                const cddContactPersonNumberError = FormikProps.errors.cddContactPersonNumber
                const cddContactPersonNumberTouched = FormikProps.touched.cddContactPersonNumber

                const cddContactPersonPositionError = FormikProps.errors.cddContactPersonPosition
                const cddContactPersonPositionTouched = FormikProps.touched.cddContactPersonPosition

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 2 }}>
                        <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: 'rgba(163, 0, 0, 0.5)', marginBottom: 25 }]}>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', alignItems: 'flex-start', padding: 10 }}>
                                <Text style={styles.title} >CONTACT</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', marginRight: 3, alignItems: 'flex-end' }}>
                                <Image source={require('../assets/images/logosmall.png')} style={{ width: 50, height: 50, borderRadius: 15 }} />
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={[styles.screenMargin, { flex: 9 }]}>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: cddContactPersonNameTouched && cddContactPersonNameError ? '#d94498' : '#5a83c2' }]}>Name</Text>
                                    <TextInput value={cddContactPersonName} onBlur={FormikProps.handleBlur('cddContactPersonName')} onChangeText={FormikProps.handleChange('cddContactPersonName')} placeholder={cddContactPersonNameTouched && cddContactPersonNameError ? '' : 'Eg: Siti binti Iskandar'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    {cddContactPersonNameTouched && cddContactPersonNameError && <Text style={styles.error}>{cddContactPersonNameError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: cddContactPersonIcTouched && cddContactPersonIcError ? '#d94498' : '#5a83c2' }]}>MyKad Number</Text>
                                    <TextInput value={cddContactPersonIc} onBlur={FormikProps.handleBlur('cddContactPersonIc')} onChangeText={FormikProps.handleChange('cddContactPersonIc')} placeholder={cddContactPersonIcTouched && cddContactPersonIcError ? '' : 'Eg: 800310022514'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} keyboardType={'phone-pad'} />
                                    {cddContactPersonIcTouched && cddContactPersonIcError && <Text style={styles.error}>{cddContactPersonIcError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: cddContactPersonNumberTouched && cddContactPersonNumberError ? '#d94498' : '#5a83c2' }]}>Phone Number</Text>
                                    <TextInput value={cddContactPersonNumber} onBlur={FormikProps.handleBlur('cddContactPersonNumber')} onChangeText={FormikProps.handleChange('cddContactPersonNumber')} placeholder={cddContactPersonNumberTouched && cddContactPersonNumberError ? '' : 'Eg: 0189852012'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} keyboardType={'phone-pad'} />
                                    {cddContactPersonNumberTouched && cddContactPersonNumberError && <Text style={styles.error}>{cddContactPersonNumberError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, borderBottomColor: cddContactPersonPositionTouched && cddContactPersonPositionError ? '#d94498' : '#5a83c2' }]}>Position</Text>
                                    <TextInput value={cddContactPersonPosition} onBlur={FormikProps.handleBlur('cddContactPersonPosition')} onChangeText={FormikProps.handleChange('cddContactPersonPosition')} placeholder={cddContactPersonPositionTouched && cddContactPersonPositionError ? '' : 'Eg: HR Officer'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                    {cddContactPersonPositionTouched && cddContactPersonPositionError && <Text style={styles.error}>{cddContactPersonPositionError}</Text>}
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 }}>
                                    <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.butang, { color: 'lightgrey' }]}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={!(FormikProps.isValid)} onPress={FormikProps.handleSubmit} style={{ flex: 1, borderColor: FormikProps.isValid ? 'rgba(163, 0, 0, 0.5)' : 'rgba(10,100,150,0.5)', borderWidth: 1 }}>
                                    <LinearGradient colors={(FormikProps.isValid) ? ['rgba(163, 0, 0, 0.5)', '#A30000'] : ['rgba(163, 0, 0, 0.5)', 'rgba(163, 0, 0, 0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff' }]}>Save</Text>}
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >

    );

}

ContactPersonScreen.navigationOptions = {
    header: null,
};

export default ContactPersonScreen