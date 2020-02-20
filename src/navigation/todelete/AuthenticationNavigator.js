import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import IntroScreen from '../screens/IntroScreen';

const AuthenticationStack = createStackNavigator({
    Welcome: WelcomeScreen,
    // UnderConstruction:UnderConstructionScreen,
    Intro: IntroScreen,
    Login: LoginScreen,
});

export default AuthenticationStack 