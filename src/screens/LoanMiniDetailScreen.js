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

const LoanMiniDetailScreen = (props) => {
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
                                <Text style={styles.title}>Loan Detail</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>

                        </View>

                        <View style={{ justifyContent: 'space-between', flex: 9 }}>

                            <View style={{ flex: 9 }}>

                                <ScrollView style={[styles.screenMargin, { paddingLeft: 0, paddingRight: 0 }]}>
                                    <View style={[styles.box, { marginTop: 20 }]}>
                                        <View style={{ marginTop: 5, borderBottomWidth: 1, borderBottomColor: 'lightgrey', paddingBottom: 20 }}>
                                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                                <Text style={styles.small}>Customer Id</Text>
                                                <Ionicons name="md-arrow-dropdown" color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                                            </View>
                                            <Text style={styles.text}>1234567890</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.small}>Type</Text>
                                                <Text style={styles.text}>Loan</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.small}>Name</Text>
                                                <Text style={styles.text}>Application Form</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.small}>Status</Text>
                                                <Text style={styles.text}>Approved</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.small}>Date</Text>
                                                <Text style={styles.text}>[Date]</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 20 }}>
                                            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                <View style={{ alignItems: 'flex-end', marginTop: 20 }} >
                                                    <TouchableOpacity onPress={() => props.navigation.navigate('LoanDetail')} style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5, borderRadius: 20, borderWidth: 1 }}>
                                                        <Text style={styles.small}>See application</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5, borderRadius: 20, borderWidth: 1 }}>
                                                        <Text style={styles.small}>Repayment info</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5, borderRadius: 20, backgroundColor: '#34C2DB' }}>
                                                        <Text style={[styles.small, { color: '#fff' }]}>Pay Now!</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>

                                    </View>

                                </ScrollView>
                            </View>
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >

    );
}

LoanMiniDetailScreen.navigationOptions = {
    header: null,
};

export default LoanMiniDetailScreen;