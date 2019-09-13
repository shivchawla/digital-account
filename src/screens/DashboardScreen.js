import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,

} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import Charts from '../components/Charts'
import Layout from '../constants/Layout'

import styles from '../styles/styles'

import Dot from '../components/Dot'

const DashboardScreen = (props) => {
  return (
    <View style={{ flex: 1, }}>

      <View style={{ flex: 1, flexDirection: 'row' }}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
          <TouchableOpacity onPress={props.navigation.openDrawer} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
            <Ionicons name="md-more" color={'#4D6BFA'} style={{ fontSize: 30, paddingLeft: 20 }} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.title}>
            <Text style={[styles.title, { fontSize: 12 }]}>MYR</Text> 18,839.00</Text>
        </View>

        <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
          <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
        </TouchableOpacity>

      </View>
      <View style={{ flex: 9, padding: 10 }}>

        <View style={{ marginTop: 10, flexDirection: 'row' }}>

          <TouchableOpacity>
            <Text style={[styles.text, { color: '#525252' }]}>Send Money</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={[styles.text, { paddingLeft: 5, paddingRight: 5, color: '#525252' }]}>|</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.navigation.navigate('Withdraw')}>
            <Text style={[styles.text, { color: '#525252' }]}>Withdrawal</Text>
          </TouchableOpacity>

        </View>

        <View style={{ marginTop: 10 }}>
          <LinearGradient colors={['#84A4FD', '#4D6BFA']} style={{ paddingTop: 5, paddingBottom: 5, alignItems: 'center', borderRadius: 10, height: Layout.window.height / 3 }}>

            <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
              <Ionicons name="ios-arrow-back" color={'#fff'} style={{ fontSize: 23, paddingLeft: 5 }} />
              <Text style={[styles.text, { color: '#fff' }]}>THIS MONTH</Text>
              <Ionicons name="ios-arrow-forward" color={'#fff'} style={{ fontSize: 23, paddingRight: 5 }} />
            </View>

            <View style={{ flex: 1, height: Layout.window.height / 5, alignSelf: 'stretch' }}>

              <Charts />

            </View>

          </LinearGradient>

        </View>

        <View style={{ marginTop: 10 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <Text style={styles.h2}>Latest Transaction</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.small, { paddingRight: 5 }]}>More</Text>
              <Ionicons name="ios-arrow-forward" color={'#000'} style={{ fontSize: 15, paddingRight: 5 }} />
            </View>

          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
           
            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
              <Dot color='#A20F0F' />
              <Text style={styles.text}>Withdrawal Transfer</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.text, { color: '#A20F0F' }]}>- RM5</Text>
            </View>

          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
           
            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
              <Dot color='#A20F0F' />
              <Text style={styles.text}>Account Transfer</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.text, { color: '#A20F0F' }]}>- RM5</Text>
            </View>

          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
           
            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
              <Dot color='#7ED321' />
              <Text style={[styles.text]}>Disbursement Transfer</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.text, { color: '#7ED321' }]}>+ RM5</Text>
            </View>

          </View>

        </View>

      </View >

    </View >
    
  );
}

DashboardScreen.navigationOptions = {
  header: null,
};



export default DashboardScreen;