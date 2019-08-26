import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import DashboardScreen from '../screens/DashboardScreen';
import AccountScreen from '../screens/AccountScreen';
import WithdrawScreen from '../screens/WithdrawScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

import DrawerNavigator from './DrawerNavigator';

import LoanApplicationScreen from '../screens/LoanApplicationScreen';
import LoanApplicationDeclarationScreen from '../screens/LoanApplicationDeclarationScreen';
import ConnectedPartiesScreen from '../screens/ConnectedPartiesScreen';
import LoanApplicationStack from './LoanApplicationStack';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});



const DashboardStack = createStackNavigator(
  {
    Dashboard: DrawerNavigator,
  },  
);

const DashboardStackWithModal = createStackNavigator(
  {
    Dashboard: {
      screen: DashboardStack,     
    },
    Account: {
      screen: AccountScreen,
    },
    Withdraw: {
      screen: WithdrawScreen,
    },
    LoanApplication: {
      screen: LoanApplicationStack,
    },
    LoanApplicationDeclaration: {
      screen: LoanApplicationDeclarationScreen,
    },
    ConnectedParties: {
      screen: ConnectedPartiesScreen,
    },

  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
  config
);

DashboardStackWithModal.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let routeName = navigation.state.routes[navigation.state.index].routeName
  if (routeName == 'Withdraw' || routeName == 'Account'|| routeName == 'LoanApplication'|| routeName == 'LoanApplicationDeclaration'|| routeName == 'ConnectedParties') {
    tabBarVisible = false
  }

  return {
    tabBarVisible: tabBarVisible,
    tabBarLabel: 'Dashboard',
    tabBarOptions: {
      showIcon: true,

    },

    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-home${focused ? '' : ''}`
            : 'md-home'
        }
      />
    ),
  }
}

DashboardStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  DashboardStackWithModal,
  LinksStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
