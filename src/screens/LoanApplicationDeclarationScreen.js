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

import { LoanApplicationProvider, LoanApplicationContext } from '../contexts/LoanApplicationContext'

import CheckBox from 'react-native-check-box'
import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({

});


// const LoanApplicationDeclarationScreen = (props) => {

//     return (
//         <LoanApplicationProvider>
//             <LoanApplicationDeclaration navigation={props.navigation} />
//         </LoanApplicationProvider>
//     )

// }

const LoanApplicationDeclarationScreen = (props) => {
    const [loanData, setLoanData] = useContext(LoanApplicationContext)
    return (
        <Formik
            onSubmit={values => {
                console.log(JSON.stringify(values))
                props.navigation.navigate('ConnectedParties')
            }}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                return (
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>
                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#4D6BFA' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#4D6BFA'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.title}>Declaration</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 9, margin: 10 }}>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Is company connected with SME Bank</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <CheckBox onClick={() => console.log('test')} checked={false} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)', paddingRight: 10 }} /><Text>Yes</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <CheckBox onClick={() => console.log('test')} checked={false} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)', paddingRight: 10 }} /><Text>No</Text>
                                    </View>
                                </View>
                                <Text>
                                    {JSON.stringify(loanData)}
                                </Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity style={{ flex: 1, }}>
                                    <LinearGradient colors={['#A4A4A4', '#A4A4A4']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.text, { color: '#fff' }]}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={FormikProps.handleSubmit} style={{ flex: 1, }} >
                                    <LinearGradient colors={['#628BFB', '#0E47E8']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.text, { color: '#fff' }]}>Submit</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}

LoanApplicationDeclarationScreen.navigationOptions = {
    header: null,
};

export default LoanApplicationDeclarationScreen;
