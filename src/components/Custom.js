import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

export const CustomTextInput = (props) => {
    const { value, handleChange, handleBlur, touched, error, label, keyboardType, placeholder, handleClick } = props
    return (
        !handleClick ?
            <View style={[styles.formElement, { marginBottom: 10 }]}>
                <Text style={[styles.titleBox, { marginTop: 10, marginBottom: 10 }]}>{label}</Text>
                <TextInput keyboardType={keyboardType} value={value} onChangeText={handleChange} onBlur={handleBlur} style={{ borderWidth: 1, borderColor: touched && error ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5, fontSize: 15, fontFamily: 'Montserrat_medium' }} placeholder={touched && error ? '' : placeholder} placeholderTextColor={touched && error ? 'rgba(255,0,0,1)' : 'lightgrey'} />
                {touched && error && <Text style={styles.error}>{error}</Text>}
            </View> :
            <View style={[styles.formElement, { marginBottom: 10 }]}>
                <TouchableOpacity onPress={handleClick}>
                    <Text style={[styles.titleBox, { marginTop: 10, marginBottom: 10 }]}>{label}</Text>
                    <TextInput editable={false} value={value} onChangeText={handleChange} onBlur={handleBlur} style={{ borderWidth: 1, borderColor: touched && error ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5, fontSize: 15, fontFamily: 'Montserrat_medium' }} placeholder={touched && error ? '' : placeholder} placeholderTextColor={touched && error ? 'rgba(255,0,0,1)' : 'lightgrey'} />
                </TouchableOpacity>
                {touched && error && <Text style={styles.error}>{error}</Text>}
            </View>
    )
}

export const CustomFormAction = (props) => {
    const { navigation, isValid, handleSubmit, authEnabled, locked, isSubmitting,label,boxStyle } = props
    return (

        <View style={{ flexDirection: 'row', alignSelf: 'stretch', }} >
            <TouchableOpacity onPress={() => navigation.goBack()} style={[{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' },boxStyle]}>
                <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={!isValid} onPress={handleSubmit} style={{ flex: 1 }}>
                <LinearGradient colors={isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    {isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff' }]}>{label?label:'Submit'}</Text>}
                    {authEnabled ? locked ? <Ionicons name='ios-lock' color={'#fff'} style={{ fontSize: 30, paddingLeft: 20 }} /> : <View /> : <View />}
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )

}


export const CustomButton = (props) => {
    const { navigation, label, boxStyle, textStyle } = props
    return (
        <TouchableOpacity onPress={() => navigation()} style={[{ paddingTop: 16, paddingBottom: 16, paddingLeft: 18, paddingRight: 18, backgroundColor: '#055E7C', borderRadius: 15 }, boxStyle]}>
            <Text style={[styles.text, { color: '#fff', fontSize: 15 }, textStyle]}>{label}</Text>
        </TouchableOpacity>
    )

}


