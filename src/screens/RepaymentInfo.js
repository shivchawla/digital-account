import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView } from 'react-native';
import CheckBox from 'react-native-check-box'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { ScrollView } from 'react-native-gesture-handler';
import Layout from '../constants/Layout'

const LoanDetailScreen = (props) => {

    return (

        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>REPAY INFO</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </View>
            </View>
            <View style={{ justifyContent: 'space-between', flex: 9 }}>
                <View style={{ flex: 9 }}>
                    <ScrollView style={[styles.screenMargin]}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5 }]}>Total Financing (MYR)</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>10,000.00</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5 }]}>Total Financing with Interest (MYR)</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>10,300.00</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5 }]}>Loan Year Term (Year)</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>3</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5 }]}>Interest Rate (%)</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>7</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5 }]}>Monthly Payment (MYR)</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>122.62</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5 }]}>Start Month Payment</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>12</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5 }]}>Payment Method</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>System will auto deduct from your balance account (Default)</Text>
                        </View>
                        < View style={{ flexDirection: 'row', margin: 5, justifyContent: 'center' }}>
                            <TouchableOpacity style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                                <Text style={[styles.textDefault, { color: 'black' }]}>Decline</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }} >
                                <Text style={[styles.textDefault, { color: '#fff' }]}>Accept</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </KeyboardAvoidingView >)
}


LoanDetailScreen.navigationOptions = {
    header: null,
};

export default LoanDetailScreen;