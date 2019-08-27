import React, { useContext } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView

} from 'react-native';
import CheckBox from 'react-native-check-box'

import { LoanApplicationProvider, LoanApplicationContext } from '../contexts/LoanApplicationContext'
import { createAppContainer, createStackNavigator } from 'react-navigation'

import LoanApplicationScreen from '../screens/LoanApplicationScreen'

import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';
import LoanApplicationDeclarationScreen from '../screens/LoanApplicationDeclarationScreen';
import ConnectedPartiesScreen from '../screens/ConnectedPartiesScreen';


const validationSchema = Yup.object().shape({

    amount: Yup
        .string(),
    // .required(),
    purpose: Yup
        .string()

});



const LoanAppStack = createStackNavigator(
    {
        LoanApplication: LoanApplicationScreen,
        ConnectedParties:ConnectedPartiesScreen,
        LoanApplicationDeclaration: LoanApplicationDeclarationScreen,
      
    },
);

LoanAppStack.navigationOptions = {
    tabBarLabel: 'Links',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
    ),
};

LoanAppStack.path = '';

const LoanApplicationSt = createAppContainer(LoanAppStack)

const LoanApplicationStack = (props) => {
    return (
        <LoanApplicationProvider >
            <LoanApplicationSt />
        </LoanApplicationProvider>
    )
}

export default LoanApplicationStack;
