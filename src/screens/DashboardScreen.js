import React from 'react';
import {
  View, TouchableOpacity, Text
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { createDrawerNavigator, createAppContainer, DrawerItems } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Layout from '../constants/Layout'

const HomeScreen = (props) => {

  return (
    <View style={{ flex: 1, }}>
      <View style={{ flex: 1, borderWidth: 1 }}>
        <Text>Header</Text>
      </View>
      <View style={{ flex: 9, padding: 10 }}>
        <View>
        <Text>Content</Text>
        </View>
        
      
        <View>
          <LinearGradient
            colors={['#84A4FD', '#4D6BFA']}
            style={{ paddingTop: 5, paddingBottom: 5, alignItems: 'center', borderRadius: 10, height: Layout.window.height / 4 }}>
            <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
              <Ionicons name="ios-arrow-back" color={'#fff'} />
              <Text style={{ color: '#fff' }}>THIS MONTH</Text>
              <Ionicons name="ios-arrow-forward" color={'#fff'} />
            </View>
            <View style={{ flex: 1, height: Layout.window.height / 5 }}><Text>Test</Text></View>
          </LinearGradient>
        </View>

        <View>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text>Latest Transaction</Text>
            <Text>More</Text>
          </View>
          <View style={{flexDirection:'row'}}>
          <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'red', marginRight: 20 }} />
          <Text>Withdrawal Transfer</Text>
          <Text>RM5</Text>
          </View>
        </View>

        <TouchableOpacity onPress={props.navigation.openDrawer}>
          <Text>Open Drawer</Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Home</Text>
      </View>
    </View>
  );
}


HomeScreen.navigationOptions = {
  header: null,
};

const SettingsScreen = (props) => {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={props.navigation.openDrawer}>
        <Text>Open Drawer</Text>
      </TouchableOpacity>
      <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Settings</Text>
    </View>
  );
}


SettingsScreen.navigationOptions = {
  header: null,
};

const DashboardScreen = createDrawerNavigator(
  {
    Home: HomeScreen,
    Settings: SettingsScreen,
  },
  {
    // define customComponent here
    contentComponent: props =>
      <View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Settings')}>
          <Text>Settings</Text>
        </TouchableOpacity>
        <Text>Your Own Footer Area After</Text>
      </View>
  },
);

DashboardScreen.navigationOptions = {
  header: null,
};

const DashboardScreenContained = createAppContainer(DashboardScreen)
DashboardScreenContained.navigationOptions = {
  header: null,
};

export default DashboardScreenContained;