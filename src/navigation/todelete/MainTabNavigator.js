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
import VendorScreen from '../screens/VendorScreen';
import ItemScreen from '../screens/ItemScreen';
import LogOutScreen from '../screens/LogOutScreen';
import ChangeNumberScreen from '../screens/ChangeNumberScreen';
import LoanScreen from '../screens/LoanScreen';
import LoanSuccessScreen from '../screens/LoanSuccessScreen';
import WithdrawSuccessScreen from '../screens/WithdrawSuccessScreen';
import LoanDrawer from './LoanDrawer';
import WithdrawalDrawer from './WithdrawalDrawer';
import ReportDrawer from './ReportDrawer';
import InvoicesDrawer from './InvoicesDrawer';
import ItemDrawer from './ItemDrawer';
import DataSettingScreen from '../screens/DataSettingScreen';
import LoanDetailScreen from '../screens/LoanDetailScreen';
import InvoicesDetailScreen from '../screens/InvoicesDetailScreen';
import ReportDetailScreen from '../screens/ReportDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InvoiceSuccessScreen from '../screens/InvoiceSuccessScreen';
import ZakatScreen from '../screens/ZakatScreen';
import PayrollScreen from '../screens/PayrollScreen';
import RemittanceScreen from '../screens/RemittanceScreen';
import BusinessDrawer from './BusinessDrawer';
import LoanMiniDetailScreen from '../screens/LoanMiniDetailScreen';
import TransferSuccessScreen from '../screens/TransferSuccessScreen';
import SupportSuccessScreen from '../screens/SupportSuccessScreen';
import BankListScreen from '../screens/BankListScreen';
import AddBankScreen from '../screens/AddBankScreen';
import LoanCalculatorScreen from '../screens/LoanCalculatorScreen';
import TACScreen from '../screens/TACScreen';
import AgingReportScreen from '../screens/AgingReportScreen';
import ZakatSuccessScreen from '../screens/ZakatSuccessScreen';
import PayrollSuccessScreen from '../screens/PayrollSuccessScreen';
import RemittanceSuccessScreen from '../screens/RemittanceSuccessScreen';
import WIthdrawApplicationScreen from '../screens/WIthdrawApplicationScreen';
import WithdrawalDetailScreen from '../screens/WithdrawalDetailScreen';
import VendorAddSuccessScreen from '../screens/VendorAddSuccessScreen';
import VendorApplicationScreen from '../screens/VendorApplicationScreen';
import VendorDetailScreen from '../screens/VendorDetailScreen';
import CustomerAddScreen from '../screens/CustomerAddScreen';
import CustomerDetailScreen from '../screens/CustomerDetailScreen';
import CustomerAddSuccessScreen from '../screens/CustomerAddSuccessScreen';
import ItemAddSuccessScreen from '../screens/ItemAddSuccessScreen';
import ItemAddScreen from '../screens/ItemAddScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import ChangePhoneSuccessScreen from '../screens/ChangePhoneSuccessScreen';
import ChangePasswordSuccessScreen from '../screens/ChangePasswordSuccessScreen';
import ChangeEmailSuccessScreen from '../screens/ChangeEmailSuccessScreen';
import NewInvoiceItemsScreen from '../screens/NewInvoiceItemsScreen';
import CustomerDrawer from './CustomerDrawer';
import NewInvoiceReviewScreen from '../screens/NewInvoiceReviewScreen';
import RepaymentInfo from '../screens/RepaymentInfo';
import LoanPaymentSuccessScreen from '../screens/LoanPaymentSuccessScreen';
import TransferFingerprintScreen from '../screens/TransferFingerprintScreen';
import WithdrawalFingerprintScreen from '../screens/WithdrawalFingerprintScreen';
import AuthOptionScreen from '../screens/AuthOptionScreen';
import LoanBillListScreen from '../screens/LoanBillListScreen';
import LoanBillDetailScreen from '../screens/LoanBillDetailScreen';
import AuthOptionTypeScreen from '../screens/AuthOptionTypeScreen';
import SetPasscodeScreen from '../screens/SetPasscodeScreen';
import TransferConfirmScreen from '../screens/TransferConfirmScreen';

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
    NewInvoiceItems: {
      screen: NewInvoiceItemsScreen,
    },
    NewInvoiceReview: {
      screen: NewInvoiceReviewScreen,
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
    Item: {
      screen: ItemDrawer,
    },
    Withdraw: {
      screen: WithdrawalDrawer,
    },
    Customer: {
      screen: CustomerDrawer,
    },
    BusinessHub: {
      screen: BusinessHubScreen,
    },
    BankList: {
      screen: BankListScreen
    },
    AddBank: {
      screen: AddBankScreen
    },
    Loan: {
      screen: LoanDrawer,
    },
    LoanDetail: {
      screen: LoanDetailScreen,
    },
    LoanMiniDetail: {
      screen: LoanMiniDetailScreen,
    },
    LoanBillList: {
      screen: LoanBillListScreen,
    },
    LoanBillDetail: {
      screen: LoanBillDetailScreen,
    },
    LoanApplication: {
      screen: LoanApplicationScreen,
    },
    WithdrawalApplication: {
      screen: WIthdrawApplicationScreen,
    },
    WithdrawalDetail: {
      screen: WithdrawalDetailScreen,
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
    VendorApplication: {
      screen: VendorApplicationScreen,
    },
    VendorDetail: {
      screen: VendorDetailScreen,
    },
    CustomerAdd: {
      screen: CustomerAddScreen,
    },
    CustomerDetail: {
      screen: CustomerDetailScreen,
    },
    CustomerAddSuccess: {
      screen: CustomerAddSuccessScreen,
    },
    ItemDetail: {
      screen: ItemDetailScreen,
    },
    ItemAdd: {
      screen: ItemAddScreen,
    },
    ItemAddSuccess: {
      screen: ItemAddSuccessScreen,
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
    VendorAddSuccess: {
      screen: VendorAddSuccessScreen,
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
      screen: BusinessDrawer,
    },
    TransferSuccess: {
      screen: TransferSuccessScreen,
    },
    SupportSuccess: {
      screen: SupportSuccessScreen,
    },
    Calculator: {
      screen: LoanCalculatorScreen,
    },
    TAC: {
      screen: TACScreen,
    },
    Aging: {
      screen: AgingReportScreen,
    },
    ZakatSuccess: {
      screen: ZakatSuccessScreen,
    },
    PayrollSuccess: {
      screen: PayrollSuccessScreen,
    },
    RemittanceSuccess: {
      screen: RemittanceSuccessScreen,
    },
    NumberSuccess: {
      screen: ChangePhoneSuccessScreen,
    },
    PasswordSuccess: {
      screen: ChangePasswordSuccessScreen,
    },
    EmailSuccess: {
      screen: ChangeEmailSuccessScreen,
    },
    ChangePassword: {
      screen: ChangePasswordScreen,
    },
    TransferFingerprint: {
      screen: TransferFingerprintScreen,
    },
    WithdrawalFingerprint: {
      screen: WithdrawalFingerprintScreen,
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
    RepayInfo: {
      screen: RepaymentInfo,
    },
    LoanPaymentSuccess: {
      screen: LoanPaymentSuccessScreen,
    },
    AuthOption: {
      screen: AuthOptionScreen,
    },
    AuthOptionType: {
      screen: AuthOptionTypeScreen
    },
    SetPasscode: { screen: SetPasscodeScreen },
    TransferConfirm: { screen: TransferConfirmScreen }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
  config
);

DashboardStackWithModal.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  // let routeName = navigation.state.routes[navigation.state.index].routeName
  // if (routeName == 'Aging' || routeName == 'TAC' || routeName == 'Calculator' || routeName == 'BankList' || routeName == 'AddBank' || routeName == 'SupportSuccess' || routeName == 'TransferSuccess' || routeName == 'LoanApplication' || routeName == 'BusinessDirectory' || routeName == 'Transfer' || routeName == 'Remittance' || routeName == 'Zakat' || routeName == 'Payroll' || routeName == 'InvoiceSuccess' || routeName == 'LoanSuccess' || routeName == 'Customer' || routeName == 'Profile' || routeName == 'ReportDetail' || routeName == 'InvoicesDetail' || routeName == 'WithdrawSuccess' || routeName == 'LoanSuccessScreen' || routeName == 'Item' || routeName == 'Customer' || routeName == 'Vendor' || routeName == 'Withdraw' || routeName == 'LoanDetail' || routeName == 'LoanApplicationDeclaration' || routeName == 'ConnectedParties' || routeName == 'EditProfile' || routeName == 'NewInvoice' || routeName == 'Vendor' || routeName == 'Support') {
  //   tabBarVisible = false
  // }

  return {
    tabBarVisible: tabBarVisible,
    tabBarLabel: <View />,
    tabBarOptions: {
      showIcon: true,
    },

    tabBarIcon: ({ focused }) => (
      focused ?
        <Image source={require('../assets/images/bottomTabs/homeBlack.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} /> :
        <Image source={require('../assets/images/bottomTabs/home.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
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
      <Image source={require('../assets/images/bottomTabs/historyBlack.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} /> :
      <Image source={require('../assets/images/bottomTabs/history.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
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
      <Image source={require('../assets/images/bottomTabs/notificationBlack.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} /> :
      <Image source={require('../assets/images/bottomTabs/notification.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
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
    // ChangePassword: {
    //   screen: ChangePasswordScreen,
    // },
    // ChangeEmail: {
    //   screen: ChangeEmailScreen,
    // },
    // ChangeNumber: {
    //   screen: ChangeNumberScreen,
    // },
    // NotiScreen: {
    //   screen: NotiSettingScreen,
    // },
    // Support: {
    //   screen: SupportScreen,
    // },
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
        <Image source={require('../assets/images/bottomTabs/setingBlack.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} /> :
        <Image source={require('../assets/images/bottomTabs/setting.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
    ),
  }
}

SettingsStackWithModal.path = '';

const tabNavigator = createBottomTabNavigator({
  DashboardStackWithModal,
  // TransactionHistoryStack,
  // NotificationStack,
  // SettingsStackWithModal,
});

tabNavigator.path = '';

export default tabNavigator;