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


const validationSchema = Yup.object().shape({

    amount: Yup
        .string(),
    // .required(),
    purpose: Yup
        .string()

});

// const LoanApplicationScreen = (props) => {
//     return (
//         <LoanApplicationProvider >
//             <LoanApplication navigation={props.navigation} />
//         </LoanApplicationProvider>
//     )

// }


// const LoanApplicationScreen = (props) => {
//     const [loanData, setLoanData, test] = useContext(LoanApplicationContext)
//     return (

//         <Formik
//             onSubmit={async values => {
//                 console.log(JSON.stringify(values))
//                 await setLoanData(values)
//                 props.navigation.navigate('LoanApplicationDeclaration')
//             }}
//             validationSchema={validationSchema}
//         >
//             {FormikProps => {
//                 const { amount, purpose } = FormikProps.values
//                 const purposeError = FormikProps.errors.purpose
//                 const purposeTouched = FormikProps.touched.purpose

//                 const amountError = FormikProps.errors.amount
//                 const amountTouched = FormikProps.touched.amount
//                 return (
//                     <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>
//                         <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#4D6BFA' }}>
//                             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
//                                 <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
//                                     <Ionicons name="ios-arrow-back" color={'#4D6BFA'} style={{ fontSize: 30, paddingLeft: 20 }} />
//                                 </TouchableOpacity>
//                             </View>
//                             <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
//                                 <Text style={styles.title}>Loan </Text>
//                             </View>
//                             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
//                                 <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
//                             </View>
//                         </View>
//                         <View style={{ justifyContent: 'space-between', flex: 9 }}>
//                             <View style={{ flex: 9, margin: 10 }}>
//                                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
//                                     <Text style={styles.h3}>Financing</Text>
//                                 </View>
//                                 <View style={{ marginBottom: 10 }}>
//                                     <Text style={[styles.text, { marginBottom: 5 }]}>Total Financing (MYR)</Text>
//                                     <TextInput value={amount} onChangeText={FormikProps.handleChange('amount')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
//                                 </View>
//                                 <View style={{ marginBottom: 10 }}>
//                                     <Text style={[styles.text, { marginBottom: 5 }]}>Purpose</Text>
//                                     <TextInput value={purpose} onChangeText={FormikProps.handleChange('purpose')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
//                                 </View>
//                                 <View style={{ marginBottom: 10 }}>
//                                     <Text style={[styles.text, { marginBottom: 5 }]}>Is company connected with SME Bank</Text>
//                                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                         <CheckBox onClick={() => console.log('test')} checked={false} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)', paddingRight: 10 }} /><Text>Yes</Text>
//                                     </View>
//                                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                         <CheckBox onClick={() => console.log('test')} checked={false} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)', paddingRight: 10 }} /><Text>No</Text>
//                                     </View>
//                                 </View>
//                                 <Text>
//                                     {JSON.stringify(loanData)}
//                                 </Text>

//                             </View>
//                             <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
//                                 <TouchableOpacity style={{ flex: 1, }}>
//                                     <LinearGradient colors={['#A4A4A4', '#A4A4A4']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
//                                         <Text style={[styles.text, { color: '#fff' }]}>Back</Text>
//                                     </LinearGradient>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity onPress={FormikProps.handleSubmit} style={{ flex: 1, }} >
//                                     <LinearGradient colors={['#628BFB', '#0E47E8']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
//                                         <Text style={[styles.text, { color: '#fff' }]}>Submit</Text>
//                                     </LinearGradient>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </KeyboardAvoidingView>)
//             }}
//         </Formik >

//     );
// }



// LoanApplicationScreen.navigationOptions = {
//     header: null,
// };


const LoanAppStack = createStackNavigator(
    {
        LoanApplication: LoanApplicationScreen,
        LoanApplicationDeclaration:LoanApplicationDeclarationScreen
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
        <LoanApplicationProvider>
            <LoanApplicationSt />
        </LoanApplicationProvider>
    )
}

export default LoanApplicationStack;