import React from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, KeyboardAvoidingView, TextInput } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'

const validationSchema = Yup.object().shape({

    

    amount: Yup
        .string()
        .required(),

    recipient: Yup
        .string()
        .required(),

    references_no: Yup
        .string()
        .required(),

});

const TransferScreen = (props) => {

    const dispatch = useDispatch()
    const setExpenseData = (val) => dispatch({ type: 'SET_NEW_EXPENSE', payload: { ...val } });
    const expenseData = useSelector(state => state.expenseReducer, shallowEqual)
    const accountInfo=useSelector(state => state.myAccountReducer.account_no, shallowEqual)

    return (

        <Formik onSubmit={async values => {
            dispatch(actionCreator.submitNewExpense(values))
            props.navigation.navigate("TransferSuccess")
          
            console.log(JSON.stringify(values))
        }}
        initialValues={{wallet:accountInfo}}
            validationSchema={validationSchema}
        >
            {FormikProps => {

                const {amount, recipient, references_no,wallet } = FormikProps.values


                const amountError = FormikProps.errors.amount
                const amountTouched = FormikProps.touched.amount

                const recipientError = FormikProps.errors.recipient
                const recipientTouched = FormikProps.touched.recipient

                const references_noError = FormikProps.errors.references_no
                const references_noTouched = FormikProps.touched.references_no

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>
                        <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title]}>TRANSFER</Text>
                            </View>
                            <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.screenMargin, { flex: 9 }]}>
                            <Text>{accountInfo&&JSON.stringify(accountInfo)}</Text>
                           
                            <View style={[styles.formElement]}>
                                <Text style={[styles.titleBox, { marginBottom: 10 }]}>Amount</Text>
                                <TextInput value={amount} onChangeText={FormikProps.handleChange('amount')} onBlur={FormikProps.handleBlur('amount')} style={{ borderWidth: 1, borderColor: amountTouched && amountError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={amountTouched && amountError ? '' : 'RM 100.00'} placeholderTextColor={amountTouched && amountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                {amountTouched && amountError && <Text style={styles.error}>{amountError}</Text>}
                            </View>
                            <View style={[styles.formElement]}>
                                <Text style={[styles.titleBox, { marginBottom: 10 }]}>Transfer To</Text>
                                <TextInput value={recipient} onChangeText={FormikProps.handleChange('recipient')} onBlur={FormikProps.handleBlur('recipient')} style={{ borderWidth: 1, borderColor: recipientTouched && recipientError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={recipientTouched && recipientError ? '' : 'Iskandar Samad'} placeholderTextColor={recipientTouched && recipientError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                {recipientTouched && recipientError && <Text style={styles.error}>{recipientError}</Text>}
                            </View>
                            <View style={[styles.formElement, { marginBottom: 10 }]}>
                                <Text style={[styles.titleBox]}>reference No</Text>
                                <TextInput value={references_no} onChangeText={FormikProps.handleChange('references_no')} onBlur={FormikProps.handleBlur('references_no')} style={{ borderWidth: 1, borderColor: references_noTouched && references_noError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={references_noTouched && references_noError ? '' : 'Pay salary'} placeholderTextColor={references_noTouched && references_noError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                {references_noTouched && references_noError && <Text style={styles.error}>{references_noError}</Text>}
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
                                    {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff' }]}>Submit</Text>}
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}

TransferScreen.navigationOptions = {
    header: null,
};

export default TransferScreen;