import React from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Text,
    Image,
    TextInput
} from 'react-native';

import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import styles from '../styles/styles'
const FilterBar = (props) => {

    const nav = (screen) => {
        props.close()
        props.nav(screen)
    }

    return (

        <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>

            <View style={{ padding: 10, flex: 1, justifyContent: 'space-evenly' }}>

                <View style={{ flex: 9, margin: 10 }}>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.h3, { marginBottom: 5 }]}>Type</Text>
                        <TextInput style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} keyboardType={'decimal-pad'} />
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.h3, { marginBottom: 5 }]}>Status</Text>
                        <TextInput style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.h3, { marginBottom: 5 }]}>Date</Text>
                        <TextInput style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                    </View>

                </View>

            </View>

        </View >

    );
}

export default FilterBar