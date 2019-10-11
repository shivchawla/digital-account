import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import DashboardScreen from '../screens/DashboardScreen';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingsScreen from '../screens/SettingsScreen';

import SideBar from '../components/SideBar'

const DrawerContent = createDrawerNavigator(
    {
        Dashboard: DashboardScreen,
        TransactionHistory: TransactionHistoryScreen,
        Notification: NotificationScreen,
        Settings: SettingsScreen,
    },
    {
        // define customComponent here
        contentComponent: props => {
            const close = () => { props.navigation.closeDrawer() }
            const nav = (screen) => { props.navigation.navigate(screen) }
            return (<SideBar nav={nav} close={close} />)
        }
    },
);

DrawerContent.navigationOptions = {
    header: null,
};

const DrawerNavigator = createAppContainer(DrawerContent)
DrawerNavigator.navigationOptions = {
    header: null,
};

export default DrawerNavigator;