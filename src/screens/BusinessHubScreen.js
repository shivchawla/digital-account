import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'



const BusinessHubScreen = (props) => {
    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#4D6BFA' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#4D6BFA'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>
                        Business Hub</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 9, padding: 10 }}>
                <View style={{ marginTop: 10 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="ios-contacts" color={'#000'} style={{ fontSize: 50, paddingRight: 5 }} />
                            <Text style={[styles.small, { paddingRight: 5 }]}>Business Directory</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="ios-pie" color={'#000'} style={{ fontSize: 50, paddingRight: 5 }} />
                            <Text style={[styles.small, { paddingRight: 5 }]}>Zakat</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="ios-thumbs-up" color={'#000'} style={{ fontSize: 50, paddingRight: 5 }} />
                            <Text style={[styles.small, { paddingRight: 5 }]}>Payroll</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="ios-cash" color={'#000'} style={{ fontSize: 50, paddingRight: 5 }} />
                            <Text style={[styles.small, { paddingRight: 5 }]}>Remittance</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
    );
}

BusinessHubScreen.navigationOptions = {
    header: null,
};


export default BusinessHubScreen;