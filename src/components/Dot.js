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

const Dot = (props) => {
  return (
    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: props.color, marginRight: 20 }} />
  )
}

export default Dot;