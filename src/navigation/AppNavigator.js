import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import AuthenticationNavigator from './AuthenticationNavigator'
import RegistrationNavigator from './RegistrationNavigator'
import MainTabNavigator from './MainTabNavigator';


const LoggedIn = createSwitchNavigator({
  Authentication: AuthenticationNavigator,
  Registration: RegistrationNavigator,
  Main: MainTabNavigator,

}, {
    initialRouteName: 'Main'

  });




const Authentication = createSwitchNavigator({
  Authentication: AuthenticationNavigator,
  Registration: RegistrationNavigator,
  Main: MainTabNavigator,

}, {
    initialRouteName: 'Authentication'
  });

export const LoggedInContainer = createAppContainer(LoggedIn);

export const AuthenticationContainer = createAppContainer(Authentication);