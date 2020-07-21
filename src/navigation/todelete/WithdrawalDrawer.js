import React from 'react';
import { Platform } from 'react-native'
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import WithdrawScreen from '../screens/WithdrawScreen';
import FilterBarWithdrawal from '../components/FilterBarWithdrawal';
import Layout from '../constants/Layout'

//const d = Platform.OS === 'ios' ? { drawerWidth: Layout.window.width } : null

const WithdrawalContent = createDrawerNavigator(

    {
        Withdraw: WithdrawScreen,
    },

    {
        drawerWidth:Platform.OS === 'ios' ? Layout.window.width  : Layout.window.width/5*4,
        // define customComponent here
        contentComponent: props => {
            const close = () => { props.navigation.closeDrawer() }
            const nav = (screen) => { props.navigation.navigate(screen) }
            return (<FilterBarWithdrawal nav={nav} close={close} />)
        }, drawerPosition: 'right'
    },
);



const WithdrawalDrawer = createAppContainer(WithdrawalContent)

export default WithdrawalDrawer;