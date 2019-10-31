import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import InvoiceScreen from '../screens/InvoiceScreen';
import FilterBarInvoice from '../components/FilterBarInvoice';

const InvoicesContent = createDrawerNavigator(

    {
        Invoice: InvoiceScreen,
    },

    {
        // define customComponent here
        contentComponent: props => {
            const close = () => { props.navigation.closeDrawer() }
            const nav = (screen) => { props.navigation.navigate(screen) }
            return (<FilterBarInvoice nav={nav} close={close} />)
        }, drawerPosition: 'right'
    },
);

InvoicesContent.navigationOptions = {
    header: null,
};

const InvoicesDrawer = createAppContainer(InvoicesContent)
InvoicesDrawer.navigationOptions = {
    header: null,
};

export default InvoicesDrawer;