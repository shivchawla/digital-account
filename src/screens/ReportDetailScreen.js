import React, { useContext } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ActivityIndicator,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import CheckBox from 'react-native-check-box'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';

const validationSchema = Yup.object().shape({
    amount: Yup
         
        .number()
        .positive()
        .required()
        .label('Amount'),
    purpose: Yup
        .string()
        .required()
        .label('Purpose'),
});

const ReportDetailScreen = (props) => {
    //const loanData = useSelector(state => state.loanApplicationReducer, shallowEqual)
    const dispatch = useDispatch()
    const setLoanData = (val) => dispatch({ type: 'SET_LOAN_DATA', payload: { ...val } });

    return (
        <Formik
            initialValues={{ smeConnected: false }}
            onSubmit={values => {
                setLoanData(values)
                props.navigation.navigate('ConnectedParties')
            }}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                const { amount, purpose, smeConnected } = FormikProps.values
                const purposeError = FormikProps.errors.purpose
                const purposeTouched = FormikProps.touched.purpose

                const amountError = FormikProps.errors.amount
                const amountTouched = FormikProps.touched.amount

                const handleCheckBox = () => {
                    FormikProps.setFieldValue('smeConnected', !smeConnected)
                }

                return (
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>

                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.title}>Report</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <View style={{ backgroundColor:'rgba(62,194,217,0.5)',borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
          </View>
                            </View>

                        </View>

                        <View style={{ justifyContent: 'space-between', flex: 9 }}>

                            <View style={[styles.titleBox, { flex: 9 }]}>

                                <ScrollView style={[styles.screenMargin]}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                        <Text style={styles.h2}>Financing</Text>
                                    </View>

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.titleBox, { marginBottom: 5 }]}>Total Financing (MYR)</Text>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>1,000.00</Text>

                                    </View>

                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.titleBox, { marginBottom: 5 }]}>Purpose</Text>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur facilisis pretium est, vitae commodo nisl rutrum nec.</Text>
                                    </View>

                                    <View style={{ marginBottom: 10 }}>

                                        <Text style={[styles.titleBox, { marginBottom: 5 }]}>Is company connected with SME Bank?</Text>

                                        <Text style={[styles.text, { marginBottom: 5 }]}>Yes</Text>

                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                        <Text style={styles.h2}>Declaration</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <CheckBox onClick={() => console.log('test')} checked={true} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)', marginRight: 25 }} />
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Your company controls, or is controlled by Connected Parties (including their close relatives in the case of individuals)</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <CheckBox onClick={() => console.log('test')} checked={false} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)', marginRight: 25 }} />
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Your company influences, or is influenced by Connected Parties (including their close relatives in the case of individuals)</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <CheckBox onClick={() => console.log('test')} checked={false} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)', marginRight: 25 }} />
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Connected Parties (including their close relatives) is a director, partner, executive officer, agent or guarantor of your company, your subsidiaries and/or entities controlled by your company.</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <CheckBox onClick={() => console.log('test')} checked={false} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)', marginRight: 25 }} />
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Your company is a subsidiary of, or an entity that is controlled by, SME Bank and its Connected Parties (including their close relatives).</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <CheckBox onClick={() => console.log('test')} checked={false} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)', marginRight: 25 }} />
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Your company is guaranteed by SME Bank's Connected Parties (including their close relatives)</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                        <Text style={styles.h3}>Connected Parties</Text>
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.titleBox]}>Capacity</Text>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Capacity</Text>

                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.titleBox]}>Name</Text>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>John Doe</Text>
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.titleBox]}>MyKad</Text>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>800112-10-1234</Text>
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.titleBox]}>Relationship</Text>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Bro</Text>
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.titleBox]}>Bank Personnel Name</Text>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>Max Power</Text>
                                    </View>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={[styles.titleBox]}>Email</Text>
                                        <Text style={[styles.text, { marginBottom: 5 }]}>email@address.com</Text>
                                    </View>

                                </ScrollView>
                            </View>

                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >

    );
}

ReportDetailScreen.navigationOptions = {
    header: null,
};

export default ReportDetailScreen;