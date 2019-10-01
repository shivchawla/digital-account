import React from 'react';
import { Platform, Image, View } from 'react-native';
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
import CustomerScreen from '../screens/CustomerScreen';
import VendorScreen from '../screens/VendorScreen';
import ItemScreen from '../screens/ItemScreen';
import LogOutScreen from '../screens/LogOutScreen';
import ChangeNumberScreen from '../screens/ChangeNumberScreen';
import LoanScreen from '../screens/LoanScreen';
import LoanSuccessScreen from '../screens/LoanSuccessScreen';
import WithdrawSuccessScreen from '../screens/WithdrawSuccessScreen';
import LoanDrawer from './LoanDrawer';
import ReportDrawer from './ReportDrawer';
import InvoicesDrawer from './InvoicesDrawer';
import DataSettingScreen from '../screens/DataSettingScreen';
import LoanDetailScreen from '../screens/LoanDetailScreen';
import InvoicesDetailScreen from '../screens/InvoicesDetailScreen';
import ReportDetailScreen from '../screens/ReportDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InvoiceSuccessScreen from '../screens/InvoiceSuccessScreen';
import ZakatScreen from '../screens/ZakatScreen';
import PayrollScreen from '../screens/PayrollScreen';
import RemittanceScreen from '../screens/RemittanceScreen';
import BusinessDirectoryScreen from '../screens/BusinessDirectoryScreen';

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
    Profile: {
      screen: ProfileScreen,
    },
    EditProfile: {
      screen: EditProfileScreen,
    },
    Invoice: {
      screen: InvoicesDrawer,
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
      screen: ReportDrawer,
    },
    BusinessHub: {
      screen: BusinessHubScreen,
    },
    Withdraw: {
      screen: WithdrawScreen,
    },
    Loan: {
      screen: LoanDrawer,
    },
    LoanDetail: {
      screen: LoanDetailScreen,
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
    DataSetting: {
      screen: DataSettingScreen,
    },
    Vendor: {
      screen: VendorScreen,
    },
    Customer: {
      screen: CustomerScreen,
    },
    Item: {
      screen: ItemScreen,
    },
    Support: {
      screen: SupportScreen,
    },
    LoanSuccess: {
      screen: LoanSuccessScreen,
    },
    WithdrawSuccess: {
      screen: WithdrawSuccessScreen,
    },
    InvoicesDetail: {
      screen: InvoicesDetailScreen,
    },
    ReportDetail: {
      screen: ReportDetailScreen,
    },
    InvoiceSuccess: {
      screen: InvoiceSuccessScreen,
    },
    Zakat: {
      screen: ZakatScreen,
    },
    Payroll: {
      screen: PayrollScreen,
    },
    Remittance: {
      screen: RemittanceScreen,
    },
    BusinessDirectory: {
      screen: BusinessDirectoryScreen,
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
  if (routeName == 'LoanApplication' || routeName == 'BusinessDirectory' || routeName == 'Transfer' || routeName == 'Remittance' || routeName == 'Zakat' || routeName == 'Payroll' || routeName == 'InvoiceSuccess' || routeName == 'LoanSuccess' || routeName == 'Customer' || routeName == 'Profile' || routeName == 'ReportDetail' || routeName == 'InvoicesDetail' || routeName == 'WithdrawSuccess' || routeName == 'LoanSuccessScreen' || routeName == 'Item' || routeName == 'Customer' || routeName == 'Vendor' || routeName == 'Withdraw' || routeName == 'LoanDetail' || routeName == 'LoanApplicationDeclaration' || routeName == 'ConnectedParties' || routeName == 'EditProfile' || routeName == 'NewInvoice' || routeName == 'Vendor' || routeName == 'Support') {
    tabBarVisible = false
  }

  return {
    tabBarVisible: tabBarVisible,
    tabBarLabel: <View />,
    tabBarOptions: {
      showIcon: true,
    },

    tabBarIcon: ({ focused }) => (
      focused ?
        <Image source={require('../assets/images/bottomTabs/homeBlack.png')} style={{ width: 35, height: 35 }} resizeMode={'contain'} /> :
        <Image source={require('../assets/images/bottomTabs/home.png')} style={{ width: 35, height: 35 }} resizeMode={'contain'} />
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
  tabBarLabel: <View />,
  tabBarIcon: ({ focused }) => (
    focused ?
      <Image source={require('../assets/images/bottomTabs/historyBlack.png')} style={{ width: 35, height: 35 }} resizeMode={'contain'} /> :
      <Image source={require('../assets/images/bottomTabs/history.png')} style={{ width: 35, height: 35 }} resizeMode={'contain'} />
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
  tabBarLabel: <View />,
  tabBarIcon: ({ focused }) => (
    focused ?
      <Image source={require('../assets/images/bottomTabs/notificationBlack.png')} style={{ width: 35, height: 35 }} resizeMode={'contain'} /> :
      <Image source={require('../assets/images/bottomTabs/notification.png')} style={{ width: 35, height: 35 }} resizeMode={'contain'} />
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
    tabBarLabel: <View />,
    tabBarIcon: ({ focused }) => (
      focused ?
        <Image source={require('../assets/images/bottomTabs/setingBlack.png')} style={{ width: 35, height: 35 }} resizeMode={'contain'} /> :
        <Image source={require('../assets/images/bottomTabs/setting.png')} style={{ width: 35, height: 35 }} resizeMode={'contain'} />
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