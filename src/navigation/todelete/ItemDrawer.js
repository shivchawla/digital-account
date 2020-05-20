import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import ItemScreen from '../screens/ItemScreen';
import FilterBarItem from '../components/FilterBarItem';

const ItemContent = createDrawerNavigator(
    
    {
        Item: ItemScreen,
    },

    {
        // define customComponent here
        contentComponent: props => {
            const close = () => { props.navigation.closeDrawer() }
            const nav = (screen) => { props.navigation.navigate(screen) }
            return (<FilterBarItem nav={nav} close={close} />)
        }, drawerPosition: 'right'
    },
);



const ItemDrawer = createAppContainer(ItemContent)


export default ItemDrawer;