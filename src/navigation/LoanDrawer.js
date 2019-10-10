import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import Layout from '../constants/Layout'
import LoanScreen from '../screens/LoanScreen';
import FilterBar from '../components/FilterBar';

const LoanContent = createDrawerNavigator(
    
    {
        Loan: LoanScreen,
    },

    {
        // define customComponent here
        contentComponent: props => {
            const close = () => { props.navigation.closeDrawer() }
            const nav = (screen) => { props.navigation.navigate(screen) }
            return (<FilterBar nav={nav} close={close} />)
        }, drawerPosition: 'right'
    },
);

LoanContent.navigationOptions = {
    header: null,
};

const LoanDrawer = createAppContainer(LoanContent)
LoanDrawer.navigationOptions = {
    header: null,
};

export default LoanDrawer;