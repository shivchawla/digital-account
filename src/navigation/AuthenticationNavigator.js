import { createStackNavigator } from 'react-navigation';
import { Platform, Image, View } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import IntroScreen from '../screens/IntroScreen';

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
  });
  

const AuthenticationStack = createStackNavigator({
    Welcome: WelcomeScreen,
    // UnderConstruction:UnderConstructionScreen,
    Intro: IntroScreen,
    Login: LoginScreen,
},config);

AuthenticationStack.path = '';

export default AuthenticationStack 