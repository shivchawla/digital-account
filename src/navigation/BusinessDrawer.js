import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import BusinessDirectoryScreen from '../screens/BusinessDirectoryScreen';
import FilterBarBusiness from '../components/FilterBarBusiness';

const BusinessContent = createDrawerNavigator(
    
    {
        BusinessDirectory: BusinessDirectoryScreen,
    },

    {
        // define customComponent here
        contentComponent: props => {
            const close = () => { props.navigation.closeDrawer() }
            const nav = (screen) => { props.navigation.navigate(screen) }
            return (<FilterBarBusiness nav={nav} close={close} />)
        }, drawerPosition: 'right'
    },
);

BusinessContent.navigationOptions = {
    header: null,
};

const BusinessDrawer = createAppContainer(BusinessContent)
BusinessDrawer.navigationOptions = {
    header: null,
};

export default BusinessDrawer;