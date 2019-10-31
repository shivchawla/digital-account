import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import ReportScreen from '../screens/ReportScreen';
import FilterBar from '../components/FilterBar';

const ReportContent = createDrawerNavigator(

    {
        Report: ReportScreen,
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

ReportContent.navigationOptions = {
    header: null,
};

const ReportDrawer = createAppContainer(ReportContent)
ReportDrawer.navigationOptions = {
    header: null,
};

export default ReportDrawer;