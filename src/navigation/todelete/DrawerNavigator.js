import React from 'react';
import { Platform } from 'react-native'
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import DashboardScreen from '../screens/DashboardScreen';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AccountScreen from '../screens/AccountScreen';
import SideBar from '../components/SideBar'
import SupportScreen from '../screens/SupportScreen';
import BusinessHubScreen from '../screens/BusinessHubScreen';
import TransferScreen from '../screens/TransferScreen';
import DataSettingScreen from '../screens/DataSettingScreen';
import Layout from '../constants/Layout';

const DrawerContent = createDrawerNavigator(
    {
        Dashboard: DashboardScreen,
        Account: AccountScreen,
        // Loan: LoanScreen,
        TransactionHistory: TransactionHistoryScreen,
        Notification: NotificationScreen,
        DataSetting: DataSettingScreen,
        Transfer: TransferScreen,
        Support: SupportScreen,
        BusinessHub: BusinessHubScreen,
        Settings: SettingsScreen,
    },
    {
        // define customComponent here
        //drawerWidth: Platform.OS === 'ios' ? Layout.window.width : Layout.window.width / 3 * 2,
        contentComponent: props => {
            const close = () => { props.navigation.closeDrawer() }
            const nav = (screen) => { props.navigation.navigate(screen) }
            return (<SideBar nav={nav} close={close} />)
        }
    },
);



const DrawerNavigator = createAppContainer(DrawerContent)


export default DrawerNavigator;