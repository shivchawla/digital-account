import React from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView,TextInput } from 'react-native';
import CheckBox from 'react-native-check-box'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Layout from '../constants/Layout';
import * as actionCreator from '../store/actions/action'
import { useDispatch } from 'react-redux'

const validationSchema = Yup.object().shape({
});

const LoanApplicationDeclarationScreen = (props) => {
    const dispatch = useDispatch()
    const setLoanData = (val) => dispatch({ type: 'SET_LOAN_APPLICATION', payload: { ...val } });
    return (

        <Formik onSubmit={async values => {
            await setLoanData(values)
            await dispatch(actionCreator.submitLoanApplication())
            props.navigation.navigate("LoanSuccess")

        }}
            validationSchema={validationSchema}
            initialValues={{ control: false, influence: false, internal: false, subsidiary: false, guaranteed: false,truth:false }}
        >
            {FormikProps => {

                const { control, influence, internal, subsidiary, guaranteed,declareName,declarePosition,truth} = FormikProps.values

                const declareNameError = FormikProps.errors.declareName
                const declareNameTouched = FormikProps.touched.declareName

                const declarePositionError= FormikProps.errors.declarePosition
                const declarePositionTouched = FormikProps.touched.declarePosition

                const handleCheckBox = (field) => {
                    console.log(`field ialah ${field}`)

                    switch (field) {

                        case 'control':
                            FormikProps.setFieldValue('control', !control)
                            break;

                        case 'influence':
                            FormikProps.setFieldValue('influence', !influence)
                            break;

                        case 'internal':
                            FormikProps.setFieldValue('internal', !internal)
                            break;

                        case 'subsidiary':
                            FormikProps.setFieldValue('subsidiary', !subsidiary)
                            break;

                        case 'guaranteed':
                            FormikProps.setFieldValue('guaranteed', !guaranteed)
                            break;
                            case 'truth':
                            FormikProps.setFieldValue('truth', !truth)
                            break;

                    }
                }

                return (
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
                        <View style={[{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title]}>LOAN</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 9 }}>
                                <ScrollView style={[styles.screenMargin]}>
                                    <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center', marginBottom: 5 }}>
                                        <Text style={[styles.titleBox, { marginBottom: 5 }]}>Financing</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center', marginBottom: 20 }}>
                                        <View style={{ flexDirection: 'row', width: Layout.window.width / 2, justifyContent: 'space-between' }}>
                                            <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, justifyContent: 'center' }}>
                                                <View style={{ width: Layout.window.width / 2, height: 8, flexDirection: 'row' }} >
                                                    <View style={{ flex: 1, backgroundColor: '#9EDBF4' }} />
                                                    <View style={{ flex: 1, backgroundColor: '#9EDBF4' }} />
                                                </View>
                                            </View>
                                            <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#20B8D3', justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name="md-card" color={'#fff'} style={{ fontSize: 15 }} />
                                            </View>
                                            <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#20B8D3', justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 15 }} />
                                            </View>
                                            <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#20B8D3', justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name="md-clipboard" color={'#fff'} style={{ fontSize: 15 }} />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <View>
                                            <Text style={[styles.text, { marginBottom: 20, color: '#055E7C' }]}>Please state if your company is one of the following</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                            <CheckBox onClick={() => handleCheckBox('control')} isChecked={control} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                            <Text style={{ flex: 1, flexWrap: 'wrap', paddingLeft: 20 }}>Your company controls, or is controlled by Connected Parties (including their close relatives in the case of individuals)</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                            <CheckBox onClick={() => handleCheckBox('influence')} isChecked={influence} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                            <Text style={{ flex: 1, flexWrap: 'wrap', paddingLeft: 20 }}>Your company influences, or is influenced by Connected Parties (including their close relatives in the case of individuals)</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                            <CheckBox onClick={() => handleCheckBox('internal')} isChecked={internal} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />

                                            <Text style={{ flex: 1, flexWrap: 'wrap', paddingLeft: 20 }}>Connected Parties (including their close relatives) is a director, partner, executive officer, agent or guarantor of your company, your subsidiaries and/or entities controlled by your company.</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                            <CheckBox onClick={() => handleCheckBox('subsidiary')} isChecked={subsidiary} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                            <Text style={{ flex: 1, flexWrap: 'wrap', paddingLeft: 20 }}>Your company is a subsidiary of, or an entity that is controlled by, SME Bank and its Connected Parties (including their close relatives).</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                            <CheckBox onClick={() => handleCheckBox('guaranteed')} isChecked={guaranteed} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                            <Text style={{ flex: 1, flexWrap: 'wrap', paddingLeft: 20 }}>Your company is guaranteed by SME Bank's Connected Parties (including their close relatives)</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={[styles.text, { marginBottom: 10, color: '#055E7C' }]}>Application Declaration</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <CheckBox onClick={() => handleCheckBox('truth')} isChecked={truth} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                        <Text style={{ flex: 1, flexWrap: 'wrap', paddingLeft: 20 }}>It is now hereby declared that the information and particulars furnished above are true and correct to the best of my/our knowledge and belief and nothing had been concealed.</Text>
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Name</Text>
                                        <TextInput value={declareName} onChangeText={FormikProps.handleChange('declareName')} onBlur={FormikProps.handleBlur('declareName')} style={{ borderWidth: 1, borderColor: declareNameTouched && declareNameError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={declareNameTouched && declareNameError ? '' : ''} placeholderTextColor={declareNameTouched && declareNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />

                                        {declareNameTouched && declareNameError && <Text style={styles.error}>{declareNameError}</Text>}
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Position</Text>
                                        <TextInput value={declarePosition} onChangeText={FormikProps.handleChange('declarePosition')} onBlur={FormikProps.handleBlur('declarePosition')} style={{ borderWidth: 1, borderColor: declarePositionTouched && declarePositionError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={declarePositionTouched && declarePositionError ? '' : ''} placeholderTextColor={declarePositionTouched && declarePositionError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />

                                        {declarePositionTouched && declarePositionError && <Text style={styles.error}>{declarePositionError}</Text>}
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 }}>
                                    <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                    <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff' }]}>Next</Text>}
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                )
            }}
        </Formik >
    );
}

LoanApplicationDeclarationScreen.navigationOptions = {
    header: null,
};

export default LoanApplicationDeclarationScreen;