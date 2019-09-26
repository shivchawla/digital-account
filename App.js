import { AppLoading, Notifications } from 'expo';
import * as Permissions from 'expo-permissions'
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'
import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LoggedInContainer, AuthenticationContainer } from './src/navigation/AppNavigator';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './src/store/reducers/Reducer';
const store = createStore(rootReducer, applyMiddleware(thunk))
const App = (props) => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [tokenExists, setTokenExists] = useState(false)
  const [notification, setNotification] = useState({})

  const checkUpdate = async () => {
    try {
      const update = await Expo.Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Expo.Updates.fetchUpdateAsync();
        Expo.Updates.reloadFromCache();
      }
    } catch (e) {
      // handle or log error
    }
  }

  const checkLogin = async () => {
    try {
      //const personalToken = await AsyncStorage.getItem('personalToken');
      const personalToken = await SecureStore.getItemAsync('personalToken')
      if (personalToken !== null && !personalToken.includes('error')) {
        console.log(`personal token ialah : ${personalToken}`)
        setTokenExists(true)
      }
    } catch (error) {
      console.log(`personalToken error ${error}`)
      return 'takde'
    }
  }

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(`expo token ialah ${token}`)
    store.dispatch({ type: 'SET_REGISTER', payload: { expo_token: token } })
    console.log(JSON.stringify({
      token: { value: token, }, user: { username: 'Brent', },
    }))
  }

  _handleNotification = (notification) => {
    console.log(`notification received ${JSON.stringify(notification)}`)
    const { data } = notification
    store.dispatch({ type: 'SET_NOTIFICATION', payload: { ...data } })
  };


  useEffect(() => {
    //checkUpdate()
    registerForPushNotificationsAsync();
    _notificationSubscription = Notifications.addListener(_handleNotification);
    checkLogin()
  }, [])

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (<Provider store={store}>
      <View style={styles.container}>
        <StatusBar barStyle="default" />

        {tokenExists ? <LoggedInContainer /> : <AuthenticationContainer />}

      </View>
    </Provider>
    )
  }
}

const loadResourcesAsync = async () => {
  await Promise.all([
    Asset.loadAsync([
      require('./src/assets/images/robot-dev.png'),
      require('./src/assets/images/robot-prod.png'),

      require('./src/assets/images/account.png'),
      require('./src/assets/images/address.png'),
      require('./src/assets/images/application.png'),
      require('./src/assets/images/businesshub.png'),
      require('./src/assets/images/changeaccount.png'),
      require('./src/assets/images/changemobilenumber.png'),
      require('./src/assets/images/changepassword.png'),
      require('./src/assets/images/city.png'),
      require('./src/assets/images/company.png'),
      require('./src/assets/images/compRegNum.png'),
      require('./src/assets/images/dashboard.png'),
      require('./src/assets/images/editprofile.png'),
      require('./src/assets/images/email.png'),
      require('./src/assets/images/emailicon.png'),
      require('./src/assets/images/expenses.png'),
      require('./src/assets/images/icon.png'),
      require('./src/assets/images/info.png'),
      require('./src/assets/images/invoice.png'),
      require('./src/assets/images/logo.png'),
      require('./src/assets/images/mykad.png'),
      require('./src/assets/images/notification.png'),
      require('./src/assets/images/password.png'),
      require('./src/assets/images/phoneNum.png'),
      require('./src/assets/images/regDate.png'),
      require('./src/assets/images/report.png'),
      require('./src/assets/images/setting.png'),
      require('./src/assets/images/settingicon.png'),
      require('./src/assets/images/state.png'),
      require('./src/assets/images/support.png'),
      require('./src/assets/images/support1.png'),
      require('./src/assets/images/position.png'),
      require('./src/assets/images/user.png'),
      require('./src/assets/images/logosmall.png'),
      require('./src/assets/images/logout.png'),

      require('./src/assets/images/cardborder.png'),

      require('./src/assets/images/bottomTabs/home.png'),
      require('./src/assets/images/bottomTabs/history.png'),
      require('./src/assets/images/bottomTabs/notification.png'),
      require('./src/assets/images/bottomTabs/setting.png'),
      require('./src/assets/images/bottomTabs/homeBlack.png'),
      require('./src/assets/images/bottomTabs/historyBlack.png'),
      require('./src/assets/images/bottomTabs/notificationBlack.png'),
      require('./src/assets/images/bottomTabs/setingBlack.png'),

      require('./src/assets/images/screenshots/1.png'),
      require('./src/assets/images/screenshots/2.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'Montserrat_medium': require('./src/assets/fonts/Montserrat/Montserrat-Medium.ttf'),
      'Montserrat_regular': require('./src/assets/fonts/Montserrat/Montserrat-Regular.ttf'),
      'Montserrat_light': require('./src/assets/fonts/Montserrat/Montserrat-Light.ttf'),
      'Montserrat_thin': require('./src/assets/fonts/Montserrat/Montserrat-Thin.ttf'),
      'Montserrat_bold': require('./src/assets/fonts/Montserrat/Montserrat-Bold.ttf'),
      'Roboto_medium': require('./src/assets/fonts/Roboto/Roboto-Regular.ttf'),
    }),
  ]);
}

const handleLoadingError = (error) => {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

const handleFinishLoading = (setLoadingComplete) => {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;