import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
} from 'react-native';


import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const ProfileScreen = (props) => {

    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#4D6BFA' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#4D6BFA'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>Profile</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </View>
            </View>
            <View style={{ flex: 9, padding: 10 }}>
            <View style={{ marginTop: 10, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ padding: 5, paddingLeft: 8, paddingRight: 8, backgroundColor: '#4D6BFA', borderRadius: 5 }}>
                        <Text style={[styles.text, { color: '#fff' }]}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10 }}>
                                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 90, height: 90, borderWidth:1,borderColor:'lightgrey' }} />
                                </View>
                <View>
                   
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text style={styles.h2}>Personal Information</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.text}>Account Number</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>123456789</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.text}>Account Type</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>Business</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.text}>Balance</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>RM18,839.00</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.text}>Balance</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>RM18,839.00</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.text}>Status</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>Active</Text>
                        </View>
                    </View>
                </View>
                <View>
                   
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text style={styles.h2}>Account Information</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.text}>Account Number</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>123456789</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.text}>Account Type</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>Business</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.text}>Balance</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>RM18,839.00</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.text}>Balance</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>RM18,839.00</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.text}>Status</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>Active</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>

    );
}

ProfileScreen.navigationOptions = {
    header: null,
};

export default ProfileScreen;
