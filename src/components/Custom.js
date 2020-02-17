import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

export const CustomTextInput = (props) => {
    const { value, handleChange, handleBlur, touched, error, label, keyboardType, placeholder, handleClick } = props
    return (
        !handleClick ?
            <View style={[styles.formElement, { marginBottom: 10 }]}>
                <Text style={[styles.titleBox, { marginTop: 10, marginBottom: 10 }]}>{label}</Text>
                <TextInput keyboardType={keyboardType} value={value} onChangeText={handleChange} onBlur={handleBlur} style={{ borderWidth: 1, borderColor: touched && error ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={touched && error ? '' : placeholder} placeholderTextColor={touched && error ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                {touched && error && <Text style={styles.error}>{error}</Text>}
            </View> :
            <View style={[styles.formElement, { marginBottom: 10 }]}>
                <TouchableOpacity onPress={handleClick}>
                    <Text style={[styles.titleBox, { marginTop: 10, marginBottom: 10 }]}>{label}</Text>
                    <TextInput editable={false} value={value} onChangeText={handleChange} onBlur={handleBlur} style={{ borderWidth: 1, borderColor: touched && error ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={touched && error ? '' : placeholder} placeholderTextColor={touched && error ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                </TouchableOpacity>
                {touched && error && <Text style={styles.error}>{error}</Text>}
            </View>
    )
}

export const CustomFormAction = (props) => {
    const { navigation, isValid, handleSubmit, authEnabled, locked } = props
    return (

        <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={!isValid} onPress={handleSubmit} style={{ flex: 1 }}>
                <LinearGradient colors={isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={[styles.butang, { color: '#fff' }]}>Submit</Text>
                    {authEnabled ? locked ? <Ionicons name='ios-lock' color={'#fff'} style={{ fontSize: 30, paddingLeft: 20 }} /> : <View /> : <View />}
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )

}

