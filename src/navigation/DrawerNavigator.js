import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Layout from '../constants/Layout'

import DashboardScreen from '../screens/DashboardScreen';
import AccountScreen from '../screens/AccountScreen';
import WithdrawScreen from '../screens/WithdrawScreen';

import SideBar from '../components/SideBar'
import LoanApplicationScreen from '../screens/LoanApplicationScreen';


const DrawerContent = createDrawerNavigator(
    {
        Dashboard: DashboardScreen,
        //Account: AccountScreen,        
        LoanApplication:LoanApplicationScreen
       
    },
    {
        // define customComponent here
        contentComponent: props => {
            const nav = (screen) => { props.navigation.navigate(screen) }
            return (<SideBar nav={nav} />)
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