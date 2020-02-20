import React, { useState, useEffect } from 'react';

import * as SecureStore from 'expo-secure-store'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen'

import RegistrationStack from './RegistrationNav';
import MainDrawer from './MainDrawerNav';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const Nav = (props) => {

    const [tokenExists, setTokenExists] = useState(false)

    const checkLogin = async () => {
        try {
            //const personalToken = await AsyncStorage.getItem('personalToken');
            const personalToken = await SecureStore.getItemAsync('personalToken')
            if (personalToken !== null && !personalToken.includes('error')) {
                //console.log(`personal token ialah : ${personalToken}`)
                setTokenExists(true)
            }
        } catch (error) {
            console.log(`personalToken yang aneh error ${JSON.stringify(error)}`)
            return 'takde'
        }
    }

    useEffect(() => {
        checkLogin()

    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {tokenExists ?
                    <Stack.Screen name="Dashboard" component={MainDrawer} options={{ headerShown: false }} /> :
                    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />}
                <Stack.Screen name="Registration" component={RegistrationStack} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}




export default Nav;
