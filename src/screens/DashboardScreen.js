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
import Layout from '../constants/Layout'

const DashboardScreen = (props) => {
  return (
    <View style={{ flex: 1, }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10 }}>
          <TouchableOpacity onPress={props.navigation.openDrawer} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
            <Ionicons name="md-more" color={'#4D6BFA'} style={{ fontSize: 30,paddingRight:20 }} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.title}>Header</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
          <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
        </View>
      </View>
      <View style={{ flex: 9, padding: 10 }}>
        <View style={{ marginTop: 10 }}>
          <LinearGradient
            colors={['#84A4FD', '#4D6BFA']}
            style={{ paddingTop: 5, paddingBottom: 5, alignItems: 'center', borderRadius: 10, height: Layout.window.height / 3 }}>
            <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
              <Ionicons name="ios-arrow-back" color={'#fff'} style={{ fontSize: 23, paddingLeft: 5 }} />
              <Text style={[styles.text, { color: '#fff' }]}>THIS MONTH</Text>
              <Ionicons name="ios-arrow-forward" color={'#fff'} style={{ fontSize: 23, paddingRight: 5 }} />
            </View>
            <View style={{ flex: 1, height: Layout.window.height / 5 }}>
              <Text style={[styles.text, { color: '#fff' }]}>Test</Text>
            </View>
          </LinearGradient>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.h2}>Latest Transaction</Text>
            <Text style={styles.small}>More</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
              <Dot color='red' />
              <Text style={styles.text}>Withdrawal Transfer</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>RM5</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
              <Dot color='red' />
              <Text style={styles.text}>Withdrawal Transfer</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>RM5</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
              <Dot color='red' />
              <Text style={styles.text}>Withdrawal Transfer</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>RM5</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}


DashboardScreen.navigationOptions = {
  header: null,
};


const Dot = (props) => {
  return (
    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: props.color, marginRight: 20 }} />
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontFamily: 'Montserrat_medium',
    color: '#000'
  },
  title: {
    fontSize: 17,
    fontFamily: 'Montserrat_medium',
    color: '#4D6BFA',
    fontSize: 17 * 1.4
  },
  h3: {
    fontSize: 17,
    fontFamily: 'Montserrat_medium',
    color: '#000',
    fontSize: 17 * 1.2
  },
  h2: {
    fontSize: 17,
    fontFamily: 'Montserrat_medium',
    color: '#000',
    fontSize: 17 * 1.3
  },
  h1: {
    fontSize: 17,
    fontFamily: 'Montserrat_medium',
    color: '#000',
    fontSize: 17 * 1.4
  }, small: {
    fontSize: 17,
    fontFamily: 'Montserrat_medium',
    color: '#000',
    fontSize: 17 * 0.8
  }
})

export default DashboardScreen;