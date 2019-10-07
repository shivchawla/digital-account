import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';

import SideBar from '../components/SideBar'

const TransactionDrawer = createDrawerNavigator(
    {
        TransactionHistory: TransactionHistoryScreen,
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

TransactionDrawer.navigationOptions = {
    header: null,
};

const TransactionDrawer = createAppContainer(TransactionDrawer)
TransactionDrawer.navigationOptions = {
    header: null,
};

export default TransactionDrawer;