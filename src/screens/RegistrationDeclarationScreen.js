import React from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import CheckBox from 'react-native-check-box'
import { LinearGradient } from 'expo-linear-gradient'
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    isDeclaration_one: Yup
        .bool()
        .oneOf([true], 'Field must be checked')
        .required()
        .label('Agreement'),
});

const RegistrationDeclarationScreen = (props) => {
    const dispatch = useDispatch()

    return (
        <Formik onSubmit={values => { 
            dispatch(actionCreator.declaration(values)); 
            props.navigation.navigate('AdminApproval') }}
            validationSchema={validationSchema}
            initialValues={{ isDeclaration_one: 0, isDeclaration_two: 0 }}
        >
            {FormikProps => {
                const { isDeclaration_one, isDeclaration_two } = FormikProps.values
                const handleCheckBox = (field) => {
                    console.log(`field ialah ${field}`)
                    switch (field) {
                        case 'isDeclaration_one':
                            FormikProps.setFieldValue('isDeclaration_one', isDeclaration_one == 0 ? 1 : 0)
                            break;
                        case 'isDeclaration_two':
                            FormikProps.setFieldValue('isDeclaration_two', isDeclaration_two == 0 ? 1 : 0)
                            break;
                    }
                }

                return (
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
                        <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4', marginBottom: 25 }]}>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', alignItems: 'flex-start', padding: 10 }}>
                                <Text numberOfLines={1} style={styles.title} ellipsizeMode='tail'>DECLARATION</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', marginRight: 3, alignItems: 'flex-end' }}>
                                <Image source={require('../assets/images/logosmall.png')} style={{ width: 50, height: 50, borderRadius: 15 }} />
                            </View>
                        </View>
                        <View style={{ flex: 9 }}>
                            <View style={[styles.screenMargin, { flex: 9 }]}>
                                <View style={{ marginBottom: 10 }}>
                                    <View>
                                        <Text style={[styles.text, { marginBottom: 20, }]}>Please state if your company is one of the following</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <CheckBox onClick={() => handleCheckBox('isDeclaration_one')} isChecked={isDeclaration_one == 1} checkBoxColor={'rgba(62,194,217,1)'} style={{ borderColor: 'rgba(0,0,0,0.3)', marginRight: 25 }} />
                                        <Text style={styles.text}>I agree on terms and condition listed</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <CheckBox onClick={() => handleCheckBox('isDeclaration_two')} isChecked={isDeclaration_two == 1} checkBoxColor={'rgba(62,194,217,1)'} style={{ borderColor: 'rgba(0,0,0,0.3)', marginRight: 25 }} />
                                        <Text style={[styles.text, { flex: 1, flexWrap: 'wrap' }]}>Me and my company does not want to receive any marketing materials about the products and/or special offers on SME Bank</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 }}>
                                    <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.butang, { color: 'lightgrey' }]}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                    <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff' }]}>Dashboard</Text>}
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