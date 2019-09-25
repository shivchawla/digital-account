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
            <Ionicons name="md-more" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.title}>MYR 18,839.00</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity>
              <Text style={[styles.text, { color: '#055E7C' }]}>Send Money</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={[styles.text, { paddingLeft: 5, paddingRight: 5, color: '#055E7C' }]}>|</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('Withdraw')}>
              <Text style={[styles.text, { color: '#055E7C' }]}>Withdrawal</Text>
            </TouchableOpacity>

          </View>

        </View>

        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
          <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
        </TouchableOpacity>

      </View>

      <View style={[styles.screenMargin, { flex: 9, }]}>

        <View style={{ marginTop: 10 }}>
          <LinearGradient colors={['#055E7C', '#055E7C']} style={{ paddingTop: 5, paddingBottom: 5, alignItems: 'center', borderRadius: 10, height: Layout.window.height / 3 }}>

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

            <Text style={[styles.h2, { color: '#04A2BD' }]}>Latest Transaction</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.small, { paddingRight: 5, color: '#04A2BD' }]}>More</Text>
              <Ionicons name="ios-arrow-forward" color={'#04A2BD'} style={{ fontSize: 15, paddingRight: 5 }} />
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