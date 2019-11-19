import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import CustomerScreen from '../screens/CustomerScreen';
import FilterBarCustomer from '../components/FilterBarCustomer';

const CustomerContent = createDrawerNavigator(

    {
        Customer: CustomerScreen,
    },

    {
        // define customComponent here
        contentComponent: props => {
            const close = () => { props.navigation.closeDrawer() }
            const nav = (screen) => { props.navigation.navigate(screen) }
            return (<FilterBarCustomer nav={nav} close={close} />)
        }, drawerPosition: 'right'
    },
);

CustomerContent.navigationOptions = {
    header: null,
};

const CustomerDrawer = createAppContainer(CustomerContent)
CustomerDrawer.navigationOptions = {
    header: null,
};

export default CustomerDrawer;