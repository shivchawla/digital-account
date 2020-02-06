import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

import AuthenticationNavigator from './AuthenticationNavigator'
import RegistrationNavigator from './RegistrationNavigator'
import MainTabNavigator from './MainTabNavigator';

const LoggedIn = createSwitchNavigator({
  Main: MainTabNavigator,
  Authentication: AuthenticationNavigator,
  Registration: RegistrationNavigator,
 
}, {
  initialRouteName: 'Main'
});
LoggedIn.path = '';

const Authentication = createSwitchNavigator({
  Authentication: AuthenticationNavigator,
  Registration: RegistrationNavigator,
  Main: MainTabNavigator,

}, {
  initialRouteName: 'Authentication'
});

Authentication.path = '';

export const LoggedInContainer = createBrowserApp(LoggedIn);

export const AuthenticationContainer = createBrowserApp(Authentication);



