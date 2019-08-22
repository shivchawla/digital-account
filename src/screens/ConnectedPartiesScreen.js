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
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({

    capacity: Yup
        .string(),
    name: Yup
        .string(),
    myKad: Yup
        .string(),
    relationship: Yup
        .string(),
    personnelName: Yup
        .string(),
    email: Yup
        .string(),

});


const ConnectedPartiesScreen = () => {

    return (
        <Formik

            onSubmit={values => {
                console.log(JSON.stringify(values))
                //NavigationService.navigate('LoanApplicationDeclaration')
            }}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                const { capacity, name, myKad, relationship, personnelName, email } = FormikProps.values
                // const purposeError = FormikProps.errors.purpose
                // const purposeTouched = FormikProps.touched.purpose

                // const amountError = FormikProps.errors.amount
                // const amountTouched = FormikProps.touched.amount
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
                        <View>
                                <Text>Capacity</Text>
                                <TextInput value={capacity} onChangeText={FormikProps.handleChange('capacity')} />
                            </View>
                            <View>
                                <Text>Name</Text>
                                <TextInput value={name} onChangeText={FormikProps.handleChange('name')} />
                            </View>
                            <View>
                                <Text>MyKad</Text>
                                <TextInput value={myKad} onChangeText={FormikProps.handleChange('myKad')} />
                            </View>
                            <View>
                                <Text>Relationship</Text>
                                <TextInput value={relationship} onChangeText={FormikProps.handleChange('relationship')} />
                            </View>
                            <View>
                                <Text>Bank Personnel Name</Text>
                                <TextInput value={personnelName} onChangeText={FormikProps.handleChange('personnelName')} />
                            </View>
                            <View>
                                <Text>Email</Text>
                                <TextInput value={email} onChangeText={FormikProps.handleChange('email')} />
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



ConnectedPartiesScreen.navigationOptions = {
    header: null,
};

export default ConnectedPartiesScreen;
