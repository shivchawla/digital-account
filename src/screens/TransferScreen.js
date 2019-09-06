import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ActivityIndicator,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';

import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'

const validationSchema = Yup.object().shape({

    account: Yup
        .string()
        .required(),
    amount: Yup
        .string()
        .required(),
    transferTo: Yup
        .string()
        .required(),
    reference: Yup
        .string()
        .required(),

});


const TransferScreen = (props) => {
    return (
        <Formik

            onSubmit={async values => {

            }}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                const { account, amount, transferTo, reference } = FormikProps.values

                const accountError = FormikProps.errors.account
                const accountTouched = FormikProps.touched.account

                const amountError = FormikProps.errors.amount
                const amountTouched = FormikProps.touched.amount

                const transferToError = FormikProps.errors.transferTo
                const transferToTouched = FormikProps.touched.transferTo

                const referenceError = FormikProps.errors.reference
                const referenceTouched = FormikProps.touched.reference

                return (
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>

                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#4D6BFA' }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#4D6BFA'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.title}>Transfer</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>

                        </View>

                        <View style={{ justifyContent: 'space-between', flex: 9 }}>

                            <View style={{ flex: 9, margin: 10 }}>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Account</Text>
                                    <TextInput value={account} onChangeText={FormikProps.handleChange('account')} onBlur={FormikProps.handleBlur('account')} style={{ borderWidth: 1, borderColor: accountTouched && accountError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={accountTouched && accountError ? '' : ''} placeholderTextColor={accountTouched && accountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {accountTouched && accountError && <Text style={styles.error}>{accountError}</Text>}
                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Amount</Text>
                                    <TextInput value={amount} onChangeText={FormikProps.handleChange('amount')} onBlur={FormikProps.handleBlur('amount')} style={{ borderWidth: 1, borderColor: amountTouched && amountError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={amountTouched && amountError ? '' : ''} placeholderTextColor={amountTouched && amountError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {amountTouched && amountError && <Text style={styles.error}>{amountError}</Text>}
                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Transfer To</Text>
                                    <TextInput value={transferTo} onChangeText={FormikProps.handleChange('transferTo')} onBlur={FormikProps.handleBlur('transferTo')} style={{ borderWidth: 1, borderColor: transferToTouched && transferToError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={transferToTouched && transferToError ? '' : ''} placeholderTextColor={transferToTouched && transferToError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {transferToTouched && transferToError && <Text style={styles.error}>{transferToError}</Text>}
                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Reference</Text>
                                    <TextInput value={reference} onChangeText={FormikProps.handleChange('reference')} onBlur={FormikProps.handleBlur('reference')} style={{ borderWidth: 1, borderColor: referenceTouched && referenceError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={referenceTouched && referenceError ? '' : ''} placeholderTextColor={referenceTouched && referenceError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {referenceTouched && referenceError && <Text style={styles.error}>{referenceError}</Text>}
                                </View>

                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>

                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1 }}>
                                    <LinearGradient colors={['#A4A4A4', '#A4A4A4']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.text, { color: '#fff' }]}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                    <LinearGradient colors={FormikProps.isValid ? ['#628BFB', '#0E47E8'] : ['rgba(98, 139, 251, 0.5)', 'rgba(14, 71, 232, 0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> :
                                            <Text style={[styles.text, { color: '#fff' }]}>Submit</Text>}
                                    </LinearGradient>
                                </TouchableOpacity>

                            </View>

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