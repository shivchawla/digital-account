import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import LoanScreen from '../screens/LoanScreen';
import FilterBar from '../components/FilterBar';
import { Platform } from 'react-native'
import Layout from '../constants/Layout'

const LoanContent = createDrawerNavigator(
    
    {
        Loan: LoanScreen,
    },

    {
        drawerWidth:Platform.OS === 'ios' ? Layout.window.width  : Layout.window.width/5*4,
        // define customComponent here
        contentComponent: props => {
            const close = () => { props.navigation.closeDrawer() }
            const nav = (screen) => { props.navigation.navigate(screen) }
            return (<FilterBar nav={nav} close={close} />)
        }, drawerPosition: 'right'
    },
);



const LoanDrawer = createAppContainer(LoanContent)


export default LoanDrawer;