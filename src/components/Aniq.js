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
import Charts from '../components/Charts'
import Layout from '../constants/Layout'

import styles from '../styles/styles'

const AniqHeader = (props) => {
  return (
  <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
          <TouchableOpacity onPress={props.aniq.openDrawer} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
            <Ionicons name="md-more" color={props.warna} style={{ fontSize: 30, paddingLeft: 20 }} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={[styles.title, { color: props.kepala }]}>{props.tajuk}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
          <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
        </View>
      </View>
  )
}

export default AniqHeader;