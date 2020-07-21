import { AppLoading } from 'expo';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Updates from 'expo-updates';
import React, { useState, useEffect } from 'react';
import { Platform, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NetInfo from '@react-native-community/netinfo';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './src/store/reducers/Reducer';

import styles from './src/styles/styles'

///// All Below for Navigation
import { enableScreens } from 'react-native-screens';

const web = Platform.OS === 'web'

enableScreens();

///////End For Navigation

import * as actionCreator from './src/store/actions/action'
import Nav from './src/navigation/Nav';

const store = createStore(rootReducer, applyMiddleware(thunk))
const App = (props) => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [tokenExists, setTokenExists] = useState(false)
  const [notification, setNotification] = useState({})
  const [isInternetReachable, setNetInfo] = useState(null)
  const [updateAvailable, setUpdateAvailable] = useState(false)
  store.getState() && console.log(JSON.stringify(store.getState()))


  const checkUpdate = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        setUpdateAvailable(true)

      }
    } catch (e) {
      // handle or log error
    }
  }

  const reloadApp = () => {
    Updates.reloadAsync();
  }



  const registerForPushNotificationsAsync = async () => {
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
    //console.log(`expo token ialah ${token}`)
    store.dispatch({ type: 'SET_REGISTER', payload: { expo_token: token } })
    console.log(JSON.stringify({
      token: { value: token, }, user: { username: 'Username', },
    }))
  }


  const _handleNotification = (notification) => {
    console.log(`notification received ${JSON.stringify(notification)}`)
    const { request } = notification
    const { content } = request
    const { data } = content

    request &&console.log(`request ialah ${JSON.stringify(request)}`)
    content &&console.log(`content ialah ${JSON.stringify(content)}`)
    data &&console.log(`data ialah ${JSON.stringify(data)}`)



    store.dispatch({ type: 'SET_NOTIFICATION_LIST', payload: { ...data } })
    //const { withdrawalsApproved, withdrawalsDisbursed, loanApproved, loanDisbursed, email } = data
    
    if (data.withdrawalsApproved || data.withdrawalsDisbursed) {
      store.dispatch(actionCreator.getWithdrawList())
      dispatch(actionCreator.getRepaymentList())
    }

    if (data.loanApproved || data.loanDisbursed) {
      store.dispatch(actionCreator.getLoanList())
    }

    //store.dispatch({ type: 'SET_NOTIFICATION', payload: { notification } })
  };

  const _handleNetInfo = (netInfo) => {
    console.log(`netInfo received ${JSON.stringify(netInfo)}`)
    store.dispatch({ type: 'SET_NET_INFO_STATUS', payload: { ...netInfo } })
    setNetInfo(netInfo.isInternetReachable)
  }

  useEffect(() => {
    checkUpdate()
    registerForPushNotificationsAsync();
    const _notificationSubscription = Notifications.addNotificationReceivedListener(_handleNotification);
    const netInfoUnsubscribe = !web ? NetInfo.addEventListener(_handleNetInfo) : null;
    //checkLogin()

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
        <Nav />
        {updateAvailable && <TouchableOpacity onPress={() => reloadApp()} style={{ justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: 'orange' }}>
          <Text style={styles.small}>Click to Use the Latest Version</Text>
        </TouchableOpacity>}
        {!isInternetReachable && <View style={{ justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: 'orange' }}>
          <Text style={styles.small}>No internet connection</Text>
        </View>
        }
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
      require('./src/assets/images/accountNumber.png'),
      require('./src/assets/images/accountStatus.png'),
      require('./src/assets/images/accountType.png'),
      require('./src/assets/images/balanceReport.png'),
      require('./src/assets/images/cardborder.png'),
      require('./src/assets/images/contactsuccess.png'),
      require('./src/assets/images/merchantsuccess.png'),
      require('./src/assets/images/signupsuccess.png'),
      require('./src/assets/images/loanapplication.png'),
      require('./src/assets/images/transfersuccess.png'),
      require('./src/assets/images/supportsuccess.png'),
      require('./src/assets/images/invoicesuccess.png'),
      require('./src/assets/images/documentsubmit.png'),
      require('./src/assets/images/nameicon.png'),
      require('./src/assets/images/phonenoicon.png'),
      require('./src/assets/images/industryicon.png'),
      require('./src/assets/images/addressicon.png'),
      require('./src/assets/images/historywhiteicon.png'),
      require('./src/assets/images/notificationicon.png'),
      require('./src/assets/images/notificationicon.png'),
      require('./src/assets/images/itemicon.png'),
      require('./src/assets/images/customericon.png'),
      require('./src/assets/images/vendoricon.png'),
      require('./src/assets/images/changeaccount.png'),
      require('./src/assets/images/businessdirectory.png'),
      require('./src/assets/images/zakaticon.png'),
      require('./src/assets/images/payrollicon.png'),
      require('./src/assets/images/remittanceicon.png'),
      require('./src/assets/images/withdrawalsuccess.png'),
      require('./src/assets/images/itemsuccess.png'),
      require('./src/assets/images/vendorsuccess.png'),
      require('./src/assets/images/customersuccess.png'),
      require('./src/assets/images/passwordsuccess.png'),
      require('./src/assets/images/emailsuccess.png'),
      require('./src/assets/images/phonesuccess.png'),
      require('./src/assets/images/withdrawal.png'),
      require('./src/assets/images/transfer.png'),
      require('./src/assets/images/disbursement.png'),
      require('./src/assets/images/fingerprint.png'),
      require('./src/assets/images/contactfailed.png'),
      require('./src/assets/images/invoicefailed.png'),
      require('./src/assets/images/contactfailed.png'),
      require('./src/assets/images/itemfailed.png'),
      require('./src/assets/images/supportfailed.png'),
      require('./src/assets/images/transferfailed.png'),
      require('./src/assets/images/withdrawalfailed.png'),

      require('./src/assets/images/bottomTabs/home.png'),
      require('./src/assets/images/bottomTabs/history.png'),
      require('./src/assets/images/bottomTabs/notification.png'),
      require('./src/assets/images/bottomTabs/setting.png'),
      require('./src/assets/images/bottomTabs/homeBlack.png'),
      require('./src/assets/images/bottomTabs/historyBlack.png'),
      require('./src/assets/images/bottomTabs/notificationBlack.png'),

      require('./src/assets/images/screenshots/1.jpeg'),
      require('./src/assets/images/screenshots/2.jpeg'),
      require('./src/assets/images/screenshots/3.jpeg'),
      require('./src/assets/images/screenshots/4.jpeg'),
      require('./src/assets/images/screenshots/5.jpeg'),
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
      'Montserrat_italic': require('./src/assets/fonts/Montserrat/Montserrat-Italic.ttf'),
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

export default App;
