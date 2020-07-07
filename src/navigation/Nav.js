import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen'

import RegistrationStack from './RegistrationNav';
import MainDrawer from './MainDrawerNav';
const Stack = createStackNavigator();



const Nav = (props) => {
    const dispatch = useDispatch()

    const { token } = useSelector(state => state.apiReducer, shallowEqual)

    const [tokenExists, setTokenExists] = useState(false)

    const checkLogin = async () => {
        try {
            //const personalToken = await AsyncStorage.getItem('personalToken');
            const personalToken = await SecureStore.getItemAsync('personalToken')
            if (personalToken !== null && !personalToken.includes('error')) {
                console.log(`personal token kat nav : ${personalToken}`)
                setTokenExists(true)
                const { token_type, access_token } = JSON.parse(personalToken)
                dispatch({ type: 'SET_API_AUTH', payload: { token_type, access_token, token: true } })
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
                {token ?
                    <>
                        <Stack.Screen name="Dashboard" component={MainDrawer} options={{ headerShown: false }} />
                        <Stack.Screen name="Registration" component={RegistrationStack} options={{ headerShown: false }} />
                        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                    </> :
                    <>
                        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Registration" component={RegistrationStack} options={{ headerShown: false }} />
                    </>
                }
                {/* <Stack.Screen name="Registration" component={RegistrationStack} options={{ headerShown: false }} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}




export default Nav;
