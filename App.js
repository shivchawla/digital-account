import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import Constants from 'expo-constants'
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './src/navigation/AppNavigator';
import { Container, Content, Text, StyleProvider } from 'native-base';
import NavigationService from './src/navigation/NavigationService'
import getTheme from './native-base-theme/components';
import da from './native-base-theme/variables/da';

export default App = (props) => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <StyleProvider style={getTheme(da)}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }} />
        </View>
      </StyleProvider>
    )
  }
}

loadResourcesAsync = async () => {
  await Promise.all([
    Asset.loadAsync([
      require('./src/assets/images/robot-dev.png'),
      require('./src/assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'Montserrat_medium': require('./src/assets/fonts/Montserrat/Montserrat-Medium.ttf'),
      'Montserrat_light': require('./src/assets/fonts/Montserrat/Montserrat-Light.ttf'),
      'Montserrat_bold': require('./src/assets/fonts/Montserrat/Montserrat-Bold.ttf'),
      'Roboto_medium': require('./src/assets/fonts/Roboto/Roboto-Regular.ttf'),
    }),
  ]);
}

handleLoadingError = (error) => {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

handleFinishLoading = (setLoadingComplete) => {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
  },
});
