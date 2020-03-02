import React,{useEffect,useState} from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import CheckBox from 'react-native-check-box'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Layout from '../constants/Layout';
import * as actionCreator from '../store/actions/action'
import { useDispatch } from 'react-redux'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import LayoutA from '../Layout/LayoutA';

const validationSchema = Yup.object().shape({
});

const LoanApplicationDeclarationScreen = (props) => {
    const dispatch = useDispatch()
    const setLoanData = (val) => dispatch({ type: 'SET_LOAN_APPLICATION', payload: { ...val } });
    const [offSet, setOffSet] = useState(true)
    useEffect(() => {
        const open = () => setOffSet(false)
        const off = () => setOffSet(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates

    return (

        <Formik onSubmit={async values => {
            await setLoanData(values)
            await dispatch(actionCreator.submitLoanApplication())
            props.navigation.navigate("LoanSuccess")

        }}
            validationSchema={validationSchema}
            initialValues={{ control: false, influence: false, internal: false, subsidiary: false, guaranteed: false, truth: false }}
        >
            {FormikProps => {

                const { control, influence, internal, subsidiary, guaranteed, declareName, declarePosition, truth } = FormikProps.values

                const declareNameError = FormikProps.errors.declareName
                const declareNameTouched = FormikProps.touched.declareName

                const declarePositionError = FormikProps.errors.declarePosition
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
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }} keyboardVerticalOffset={offSet ? 30 : 0} >
                        
                        <LayoutA
                            title={'LOAN'}
                            screenType='form'
                            navigation={props.navigation}
                            nopadding
                        >
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 9 }}>
                                <ScrollView style={[styles.screenMargin]}>
                                    <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center', marginBottom: 5, marginTop: 5 }}>
                                        <Text style={[styles.titleBox, { marginBottom: 5, fontSize: 16 }]}>Financing</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center', marginBottom: 20 }}>
                                        <View style={{ flexDirection: 'row', width: Layout.window.width / 2, justifyContent: 'space-between' }}>
                                            <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, justifyContent: 'center' }}>
                                                <View style={{ width: Layout.window.width / 2, height: 8, flexDirection: 'row' }} >
                                                    <View style={{ flex: 1, backgroundColor: '#9EDBF4' }} />
                                                    <View style={{ flex: 1, backgroundColor: '#9EDBF4' }} />
                                                </View>
                                            </View>
                                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#20B8D3', justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name="md-card" color={'#fff'} style={{ fontSize: 15 }} />
                                            </View>
                                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#20B8D3', justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 15 }} />
                                            </View>
                                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#20B8D3', justifyContent: 'center', alignItems: 'center' }}>
                                                <Ionicons name="md-clipboard" color={'#fff'} style={{ fontSize: 15 }} />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <View>
                                            <Text style={[styles.text, { marginBottom: 20, color: '#055E7C', fontSize: 17 }]}>Please state if your company is one of the following</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                            <CheckBox onClick={() => handleCheckBox('control')} isChecked={control} checkBoxColor={'rgba(62,194,217,1)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                            <Text style={[styles.text, { flex: 1, flexWrap: 'wrap', paddingLeft: 20, fontSize: 15 }]}>Your company controls, or is controlled by Connected Parties (including their close relatives in the case of individuals)</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                            <CheckBox onClick={() => handleCheckBox('influence')} isChecked={influence} checkBoxColor={'rgba(62,194,217,1)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                            <Text style={[styles.text, { flex: 1, flexWrap: 'wrap', paddingLeft: 20, fontSize: 15 }]}>Your company influences, or is influenced by Connected Parties (including their close relatives in the case of individuals)</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                            <CheckBox onClick={() => handleCheckBox('internal')} isChecked={internal} checkBoxColor={'rgba(62,194,217,1)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />

                                            <Text style={[styles.text, { flex: 1, flexWrap: 'wrap', paddingLeft: 20, fontSize: 15 }]}>Connected Parties (including their close relatives) is a director, partner, executive officer, agent or guarantor of your company, your subsidiaries and/or entities controlled by your company.</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                            <CheckBox onClick={() => handleCheckBox('subsidiary')} isChecked={subsidiary} checkBoxColor={'rgba(62,194,217,1)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                            <Text style={[styles.text, { flex: 1, flexWrap: 'wrap', paddingLeft: 20, fontSize: 15 }]}>Your company is a subsidiary of, or an entity that is controlled by, SME Bank and its Connected Parties (including their close relatives).</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                            <CheckBox onClick={() => handleCheckBox('guaranteed')} isChecked={guaranteed} checkBoxColor={'rgba(62,194,217,1)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                            <Text style={[styles.text, { flex: 1, flexWrap: 'wrap', paddingLeft: 20, fontSize: 15 }]}>Your company is guaranteed by SME Bank's Connected Parties (including their close relatives)</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={[styles.text, { marginBottom: 10, color: '#055E7C', fontSize: 17 }]}>Application Declaration</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <CheckBox onClick={() => handleCheckBox('truth')} isChecked={truth} checkBoxColor={'rgba(62,194,217,1)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                        <Text style={[styles.text, { flex: 1, flexWrap: 'wrap', paddingLeft: 20, fontSize: 15 }]}>It is now hereby declared that the information and particulars furnished above are true and correct to the best of my/our knowledge and belief and nothing had been concealed.</Text>
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.titleBox, { marginBottom: 10, fontSize: 16 }]}>Name</Text>
                                        <TextInput value={declareName} onChangeText={FormikProps.handleChange('declareName')} onBlur={FormikProps.handleBlur('declareName')} style={[styles.textInput, { borderWidth: 1, borderColor: declareNameTouched && declareNameError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={declareNameTouched && declareNameError ? '' : ''} placeholderTextColor={declareNameTouched && declareNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {declareNameTouched && declareNameError && <Text style={styles.error}>{declareNameError}</Text>}
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.titleBox, { marginBottom: 10, fontSize: 16 }]}>Position</Text>
                                        <TextInput value={declarePosition} onChangeText={FormikProps.handleChange('declarePosition')} onBlur={FormikProps.handleBlur('declarePosition')} style={[styles.textInput, { borderWidth: 1, borderColor: declarePositionTouched && declarePositionError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={declarePositionTouched && declarePositionError ? '' : ''} placeholderTextColor={declarePositionTouched && declarePositionError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />

                                        {declarePositionTouched && declarePositionError && <Text style={styles.error}>{declarePositionError}</Text>}
                                    </View>
                                </ScrollView>
                            </View>
                            <CustomFormAction
                                navigation={props.navigation}
                                isValid={FormikProps.isValid}
                                handleSubmit={FormikProps.handleSubmit}
                                isSubmitting={FormikProps.isSubmitting}
                                label={`Next`}
                            />
                        </View>
                        </LayoutA>
                    </KeyboardAvoidingView>
                )
            }}
        </Formik >
    );
}


export default LoanApplicationDeclarationScreen;