import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    TextInput,
    CheckBox
} from 'react-native';

import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
//import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, Card, CardItem, Thumbnail, Grid, Col, Row } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({

    amount: Yup
        .string()
        .required(),
    purpose: Yup
        .string()

});


const LoanApplicationScreen = (props) => {

    return (
        <Formik

            onSubmit={values => {
                console.log(JSON.stringify(values))
                NavigationService.navigate('LoanApplicationDeclaration')
            }}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                const { amount, purpose } = FormikProps.values
                const purposeError = FormikProps.errors.purpose
                const purposeTouched = FormikProps.touched.purpose

                const amountError = FormikProps.errors.amount
                const amountTouched = FormikProps.touched.amount
                return (<View style={{ flex: 1, }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10 }}>
                            <TouchableOpacity onPress={props.navigation.openDrawer} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                <Ionicons name="md-more" color={'#4D6BFA'} style={{ fontSize: 30,paddingRight:20 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.title}>Loan Application</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                            <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                        </View>
                    </View>
                    <View style={{ flex: 9, padding: 10 }}>

                        <View style={{ marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.h2}>Latest Transaction</Text>
                                <Text style={styles.small}>More</Text>
                            </View>
                            <View>
                                <Text>Total Financing (MYR)</Text>
                                <TextInput value={amount} onChangeText={FormikProps.handleChange('amount')} />
                            </View>
                            <View>
                                <Text>Purpose</Text>
                                <TextInput value={purpose} onChangeText={FormikProps.handleChange('purpose')} />
                            </View>
                            <View>
                                <Text>Is company connected with SME Bank</Text>
                                <View>
                                    <CheckBox checked={false} /><Text>Yes</Text>
                                    <CheckBox checked={false} /><Text>No</Text>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Text>Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={FormikProps.handleSubmit} >
                                    <Text>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>)
            }}
        </Formik >
    );
}


const styles = StyleSheet.create({
    text: {
        fontSize: 17,
        fontFamily: 'Montserrat_medium',
        color: '#000'
    },
    title: {
        fontSize: 17,
        fontFamily: 'Montserrat_medium',
        color: '#4D6BFA',
        fontSize: 17 * 1.4
    },
    h3: {
        fontSize: 17,
        fontFamily: 'Montserrat_medium',
        color: '#000',
        fontSize: 17 * 1.2
    },
    h2: {
        fontSize: 17,
        fontFamily: 'Montserrat_medium',
        color: '#000',
        fontSize: 17 * 1.3
    },
    h1: {
        fontSize: 17,
        fontFamily: 'Montserrat_medium',
        color: '#000',
        fontSize: 17 * 1.4
    }, small: {
        fontSize: 17,
        fontFamily: 'Montserrat_medium',
        color: '#000',
        fontSize: 17 * 0.8
    }
})

LoanApplicationScreen.navigationOptions = {
    header: null,
};

export default LoanApplicationScreen;
