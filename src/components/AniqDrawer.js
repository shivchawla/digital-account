import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import Charts from './Charts'
import Layout from '../constants/Layout'

import styles from '../styles/styles'

const AniqDrawer = (props) => {
    return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0, flexDirection: 'row', borderWidth: 1, borderColor: 'blue', justifyContent: 'space-around'  }}>
                <TouchableOpacity onPress={props.aniq} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                    <Ionicons name="md-more" color={props.warna} style={{ fontSize: 30, paddingLeft: 20 }} />
                </TouchableOpacity>
                <Text style={[styles.h2, { color: 'blue', marginBottom: 30 }]}>Account: 19927483</Text>
                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15, marginBottom: 30 }} />
            </View>
    )
}

export default AniqDrawer;