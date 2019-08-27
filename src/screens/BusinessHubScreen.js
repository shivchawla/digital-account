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
                <View style={{ marginTop: 10, flexDirection: 'row',alignSelf:'stretch',justifyContent:'flex-end' }}>
                    
                    <TouchableOpacity onPress={() => props.navigation.navigate('NewInvoice')}>
                        <Text style={[styles.text, { color: '#525252' }]}>New Invoice</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.h2}>Invoices</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.small, { paddingRight: 5 }]}>Search</Text>
                            <Ionicons name="ios-arrow-forward" color={'#000'} style={{ fontSize: 15, paddingRight: 5 }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>Ref</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>Date</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>Type</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>Currency</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>Action</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.small]}>112009</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.small]}>12/3/2019</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.small]}>Item</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.small]}>RM</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.small]}>View</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.small]}>112009</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.small]}>12/3/2019</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.small]}>Item</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.small]}>RM</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.small]}>View</Text>
                        </View>
                    </View>
                </View>
            </View >
        </View >
    );
}

BusinessHubScreen.navigationOptions = {
    header: null,
};


export default BusinessHubScreen;