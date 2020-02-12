import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import ReportScreen from '../screens/ReportScreen';
import FilterBarReport from '../components/FilterBarReport';
import { Platform } from 'react-native'
import Layout from '../constants/Layout'
const ReportContent = createDrawerNavigator(

    {
        Report: ReportScreen,
    },

    {  drawerWidth:Platform.OS === 'ios' ? Layout.window.width  : Layout.window.width/5*4,
        // define customComponent here
        contentComponent: props => {
            const close = () => { props.navigation.closeDrawer() }
            const nav = (screen) => { props.navigation.navigate(screen) }
            return (<FilterBarReport nav={nav} close={close} />)
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