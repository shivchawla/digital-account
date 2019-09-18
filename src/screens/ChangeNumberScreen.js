import React, { useContext } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    FlatList,
    TextInput
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'
import Dot from '../components/Dot'

const validationSchema = Yup.object().shape({

    mobileNumber: Yup
        .string(),
    password: Yup
        .string()
});

const ChangeNumberScreen = (props) => {
    return (
        <Formik onSubmit={async values => {
            console.log(JSON.stringify(values))
        }}

            validationSchema={validationSchema}>
            {FormikProps => {

                const { mobileNumber, password } = FormikProps.values

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>

                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#055E7C' }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#055E7C'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title, { color: '#055E7C' }]}>Change Phone Number</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>

                        </View>

                        <View style={{ justifyContent: 'space-between', flex: 9 }}>

                            <View style={{ flex: 3, padding: 10, marginRight: 20 }}>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>New Phone Number</Text>
                                    <TextInput value={mobileNumber} onChangeText={FormikProps.handleChange('mobileNumber')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} keyboardType={'phone-pad'} />
                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5, color: '#055E7C' }]}>Password</Text>
                                    <TextInput value={password} onChangeText={FormikProps.handleChange('password')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                </View>

                            </View>

                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>

                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 }}>
                                <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.text, { color: '#000000' }]}>Back</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> :
                                        <Text style={[styles.text, { color: '#fff' }]}>Save</Text>}
                                </LinearGradient>
                            </TouchableOpacity>

                        </View>

                    </KeyboardAvoidingView>)

            }}

        </Formik >
    );
}

ChangeNumberScreen.navigationOptions = {
    header: null,
};

export default ChangeNumberScreen