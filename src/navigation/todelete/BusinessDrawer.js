import React from 'react';
import { Platform } from 'react-native'
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import BusinessDirectoryScreen from '../screens/BusinessDirectoryScreen';
import FilterBarBusiness from '../components/FilterBarBusiness';
import Layout from '../constants/Layout'

const BusinessContent = createDrawerNavigator(

    {
        BusinessDirectory: BusinessDirectoryScreen,
    },

    {
        drawerWidth: Platform.OS === 'ios' ? Layout.window.width : Layout.window.width / 5 * 4,
        // define customComponent here
        contentComponent: props => {
            const close = () => { props.navigation.closeDrawer() }
            const nav = (screen) => { props.navigation.navigate(screen) }
            return (<FilterBarBusiness nav={nav} close={close} />)
        }, drawerPosition: 'right'
    },
);



const BusinessDrawer = createAppContainer(BusinessContent)


export default BusinessDrawer;