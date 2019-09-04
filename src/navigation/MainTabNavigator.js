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

import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import LoanApplicationScreen from '../screens/LoanApplicationScreen';
import LoanApplicationDeclarationScreen from '../screens/LoanApplicationDeclarationScreen';
import ConnectedPartiesScreen from '../screens/ConnectedPartiesScreen';
import LoanApplicationStack from './LoanApplicationStack';
import EditProfileScreen from '../screens/EditProfileScreen';
import InvoiceScreen from '../screens/InvoiceScreen';
import NewInvoiceScreen from '../screens/NewInvoiceScreen';
import TransferScreen from '../screens/TransferScreen';
import SupportScreen from '../screens/SupportScreen';
import ReportScreen from '../screens/ReportScreen';
import BusinessHubScreen from '../screens/BusinessHubScreen';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
import NotificationScreen from '../screens/NotificationScreen';
import NotiSettingScreen from '../screens/NotiSettingScreen';
import ChangeEmailScreen from '../screens/ChangeEmailScreen';
import LogOutScreen from '../screens/LogOutScreen';
import ChangeNumberScreen from '../screens/ChangeNumberScreen';

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
    EditProfile: {
      screen: EditProfileScreen,
    },
    Invoice: {
      screen: InvoiceScreen,
    },
    NewInvoice: {
      screen: NewInvoiceScreen,
    },
    Transfer: {
      screen: TransferScreen,
    },
    Support: {
      screen: SupportScreen,
    },
    Report: {
      screen: ReportScreen,
    },
    BusinessHub: {
      screen: BusinessHubScreen,
    },
    Withdraw: {
      screen: WithdrawScreen,
    },
    LoanApplication: {
      screen: LoanApplicationScreen,
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
  if (routeName == 'Withdraw' || routeName == 'Account' || routeName == 'LoanApplication' || routeName == 'LoanApplicationDeclaration' || routeName == 'ConnectedParties' || routeName == 'EditProfile' || routeName == 'NewInvoice') {
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

DashboardStackWithModal.path = '';

const TransactionHistoryStack = createStackNavigator(
  {
    TransactionHistory: TransactionHistoryScreen,
  },
  config
);

TransactionHistoryStack.navigationOptions = {
  tabBarLabel: 'History',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

TransactionHistoryStack.path = '';

const NotificationStack = createStackNavigator(
  {
    Notification: NotificationScreen,
  },
  config
);

NotificationStack.navigationOptions = {
  tabBarLabel: 'Notification',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

NotificationStack.path = '';

const SettingsStacks = createStackNavigator({
  Settings: SettingsScreen,
},
  config
);


const SettingsStackWithModal = createStackNavigator(
  {
    Settings: {
      screen: SettingsStacks,
    },
    ChangePassword: {
      screen: ChangePasswordScreen,
    },
    ChangeEmail: {
      screen: ChangeEmailScreen,
    },
    ChangeNumber: {
      screen: ChangeNumberScreen,
    },
    NotiScreen: {
      screen: NotiSettingScreen,
    },
    Support: {
      screen: SupportScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
  config
);

SettingsStackWithModal.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let routeName = navigation.state.routes[navigation.state.index].routeName
  if (routeName == 'ChangePassword' || routeName == 'ChangeEmail' || routeName == 'ChangeNumber' || routeName == 'NotiScreen' || routeName == 'Support') {
    tabBarVisible = false
  }

  return {
    tabBarVisible: tabBarVisible,
    tabBarLabel: 'Settings',
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



SettingsStackWithModal.path = '';

const tabNavigator = createBottomTabNavigator({
  DashboardStackWithModal,
  TransactionHistoryStack,
  NotificationStack,
  SettingsStackWithModal,
});

tabNavigator.path = '';

export default tabNavigator;