import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import WithdrawScreen from '../screens/WithdrawScreen';
import FilterBarWithdrawal from '../components/FilterBarWithdrawal';

const WithdrawalContent = createDrawerNavigator(

    {
        Withdraw: WithdrawScreen,
    },

    {
        // define customComponent here
        contentComponent: props => {
            const close = () => { props.navigation.closeDrawer() }
            const nav = (screen) => { props.navigation.navigate(screen) }
            return (<FilterBarWithdrawal nav={nav} close={close} />)
        }, drawerPosition: 'right'
    },
);

WithdrawalContent.navigationOptions = {
    header: null,
};

const WithdrawalDrawer = createAppContainer(WithdrawalContent)
WithdrawalDrawer.navigationOptions = {
    header: null,
};

export default WithdrawalDrawer;