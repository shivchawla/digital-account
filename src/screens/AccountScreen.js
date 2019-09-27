import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import Dot from '../components/Dot'
import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const AccountScreen = (props) => {

    return (

        <View style={{ flex: 1, }}>

            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]}>Account</Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </View>

            </View>

            <View style={[styles.screenMargin, { flex: 9 }]}>

                <View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text style={[styles.h2]}>Account Information</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.text]}>Account Number</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>123456789</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.text]}>Account Type</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>Business</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.text]}>Balance</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>RM 18,839.00</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.text]}>Business Health</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>80%</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.text]}>Status</Text>
                        </View>

                        <View style={{ flex: 1, marginTop: 5 }}>
                            <Dot color='#00FD04' />
                        </View>

                    </View>

                </View>

            </View>

        </View>

    );
}

AccountScreen.navigationOptions = {
    header: null,
};

export default AccountScreen;
