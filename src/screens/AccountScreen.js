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

const AccountScreen = (props) => {
    const score = 80

    const scoreColor = score > 66 ? '#7ED321' : score > 33 ? 'yellow' : 'red'

    return (

        <View style={{ flex: 1, }}>

            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#055E7C' }}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#055E7C'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title, {color: '#055E7C'}]}>Account</Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </View>

            </View>

            <View style={{ flex: 9, padding: 10 }}>

                <View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text style={[styles.h2, {color: '#055E7C'}]}>Health</Text>
                    </View>

                    <View style={{ marginTop: 5 }}>

                        <View style={{ width: Layout.window.width - 100, borderRadius: 10, borderWidth: 1, borderColor: 'lightgrey', flexDirection: 'row', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                            <LinearGradient start={[0.0, 0.5]} end={[1.0, 0.5]} locations={[0.0, 1.0]} colors={[scoreColor, '#fff',]} style={{ flex: score, padding: 10, borderRadius: 10, }} />
                            <View style={{ flex: 100 - score, borderRadius: 10, backgroundColor: '#fff', padding: 10, }} />
                        </View>

                        <View style={{ width: Layout.window.width - 100, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Text style={[styles.small, { color: '#055E7C' }]}>Poor</Text>
                            <Text style={[styles.small, { color: '#055E7C' }]}>Average</Text>
                            <Text style={[styles.small, { color: '#055E7C' }]}>Good</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text style={[styles.h2, {color: '#055E7C'}]}>Account Information</Text>
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
                            <Text style={[styles.text, {color: 'green'}]}>Active</Text>
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
