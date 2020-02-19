import React from 'react';
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView, TextInput, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const validationSchema = Yup.object().shape({

    mobileNumber: Yup
         .string()
         .min(10)
        .required(),

    password: Yup
        .string()
        .min(6)
        .required(),

});

const ChangeNumberScreen = (props) => {

    return (

        <Formik onSubmit={async values => {
            props.navigation.navigate("TAC")
            console.log(JSON.stringify(values))

        }}
            validationSchema={validationSchema}>

            {FormikProps => {

                const { mobileNumber, password } = FormikProps.values

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }} keyboardVerticalOffset={20}  >
                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.navigate("DataSetting")} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text numberOfLines={1} style={styles.title} ellipsizeMode='tail'>CHANGE NUMBER</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <View style={{ backgroundColor:'rgba(62,194,217,0.5)',borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
          </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={[styles.screenMargin, { flex: 3, marginTop: 25 }]}>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5 }]}>New Phone Number</Text>
                                    <TextInput value={mobileNumber} onChangeText={FormikProps.handleChange('mobileNumber')} style={[styles.textInput,{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} keyboardType={'phone-pad'} placeholder={'0198907819'} />
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5 }]}>Password</Text>
                                    <TextInput value={password} onChangeText={FormikProps.handleChange('password')} style={[styles.textInput,{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={'******'} />
                                </View>
                            </View>
                        </View>
                        <View style={{  flexDirection: 'row', alignSelf: 'stretch' }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                                        
                                            <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                                        
                                    </TouchableOpacity>
                            <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff' }]}>Save</Text>}
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}



export default ChangeNumberScreen