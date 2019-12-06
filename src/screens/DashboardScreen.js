import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, Modal, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Charts from '../components/Charts'
import VictoryCharts from '../components/VictoryCharts'
import ChartKit from '../components/ChartKit'

const DashboardScreen = (props) => {

  const dispatch = useDispatch()


  const { link, status, business_name, isDeclaration_one, isDocument1, full_name,contactId } = useSelector(state => state.merchantInfoReducer, shallowEqual)
  const { balance, currency } = useSelector(state => state.myAccountReducer, shallowEqual)
  //const contactId =   useSelector(state => state.merchantInfoReducer.id, shallowEqual)

  const all =   useSelector(state => state.merchantInfoReducer, shallowEqual)
  all&&console.log(`all ialah : ${JSON.stringify(all)}`)

  //const dashboardDisplay = (link == 'Dashboard') ? true : false

  const [dashboardDisplay, setDashboardDisplay] = useState(true)

  //if(status===)

  const logout = async () => {
    await dispatch(actionCreator.logout())
    await props.navigation.navigate('Welcome')
  }

  const runCheckStatus = async () => {
    await dispatch(actionCreator.retrieveMerchantInfo())
    await dispatch(actionCreator.retrieveAccountInfo())
    if (status != 'activated') {

      await dispatch(actionCreator.checkContact());
      await dispatch(actionCreator.checkDocument());
      await dispatch(actionCreator.checkDeclare());
      await dispatch(actionCreator.setScreen());
      console.log(`off dashboard`)
      setDashboardDisplay(false)
    } else {
      console.log(`on dashboard`)
      setDashboardDisplay(true)
    }
    //await setDashboardDisplay(link != 'Dashboard' ? false : true)
  }
  //setDashboardDisplay(link != 'Dashboard' ? false : true)
  useEffect(() => {

    runCheckStatus();

  }, [status])

  return (

    <View style={{ flex: 1, }}>
      {/* visible={!dashboardDisplay} */}
      <Modal animationType="fade" transparent={true} visible={!dashboardDisplay} onRequestClose={() => {
        console.log('do nothing');
      }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <View style={{ flexDirection: 'row', alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20 }}>
            <View style={{ height: Layout.window.height / 2, backgroundColor: '#fff', flex: 1, borderRadius: 10, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
              {(business_name && contactId && (isDocument1 != 'http://test') && isDeclaration_one) ?
                <View style={{ alignSelf: 'stretch', margin: 5 }}>
                  <Text style={[styles.h3, { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 5 }]}>REGISTRATION INCOMPLETE</Text>
                  <Text style={[styles.text, { margin: 5, }]}>Account Under Review</Text>
                  {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
              <Text style={[styles.small, { textAlignVertical: 'bottom', paddingLeft: 5 }]}>Basic Info</Text>
              <Ionicons name={'ios-checkmark'} size={20} color={'green'} style={{ paddingLeft: 10 }} />
            </View> */}

                </View> :
                <View style={{ alignSelf: 'stretch', margin: 5 }}>
                  <Text style={[styles.h3, { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 5 }]}>REGISTRATION INCOMPLETE</Text>
                  <Text style={[styles.text, { margin: 5, }]}>Please complete items below for approval</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Text style={[styles.small, { textAlignVertical: 'bottom', paddingLeft: 5 }]}>Basic Info</Text>
                    <Ionicons name={'ios-checkmark'} size={20} color={'green'} style={{ paddingLeft: 10 }} />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Text style={[styles.small, { textAlignVertical: 'bottom', paddingLeft: 5 }]}>Merchant Info</Text>
                    {business_name && <Ionicons name={'ios-checkmark'} size={20} color={'green'} style={{ paddingLeft: 10 }} />}

                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Text style={[styles.small, { textAlignVertical: 'bottom', paddingLeft: 5 }]}>Contact Info</Text>
                    {(contactId &&contactId!=13) && <Ionicons name={'ios-checkmark'} size={20} color={'green'} style={{ paddingLeft: 10 }} />}
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Text style={[styles.small, { textAlignVertical: 'bottom', paddingLeft: 5 }]}>Document Submission</Text>
                    {(isDocument1 != null) && <Ionicons name={'ios-checkmark'} size={20} color={'green'} style={{ paddingLeft: 10 }} />}
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Text style={[styles.small, { textAlignVertical: 'bottom', paddingLeft: 5 }]}>Declaration</Text>
                    {(isDeclaration_one != null) && <Ionicons name={'ios-checkmark'} size={20} color={'green'} style={{ paddingLeft: 10 }} />}
                  </View>
                </View>}
              <View style={{ flexDirection: 'row', alignSelf: 'stretch', marginTop: 15 }}>
                <TouchableOpacity style={{ flex: 1, }} onPress={() => props.navigation.navigate(link,{prevScreen:'Dashboard'})}>
                  <LinearGradient colors={['#0A6496', '#055E7C']} style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.textDefault, { color: '#fff' }]}>CONTINUE</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                <TouchableOpacity style={{ flex: 1, }} onPress={() => logout()}>
                  <LinearGradient colors={['#808080', '#808080']} style={{ flex: 1, marginTop: 10, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.textDefault, { color: '#fff' }]}>LOG OUT</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row' }]}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
          <TouchableOpacity onPress={props.navigation.openDrawer} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }} style={{ paddingRight: 50 }}>
            <Ionicons name="md-more" color={'#3EC2D9'} style={{ fontSize: 30 }} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {balance ? <Text style={styles.title}>{currency && currency} {balance && balance.toFixed(2)}</Text> : <Text style={styles.title}>0</Text>}
          </View>
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
          <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 25 }}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Transfer')}>
          <Text style={[styles.text]}>Send Money</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.text, { paddingLeft: 5, paddingRight: 5, color: '#3EC2D9' }]}>|</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Withdraw')}>
          <Text style={[styles.text]}>Withdrawal</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.screenMargin, { flex: 9 }]}>

        <View style={{ marginBottom: 15 }}>
          <LinearGradient colors={['#055E7C', '#055E7C']} style={{ paddingTop: 5, paddingBottom: 5, alignItems: 'center', borderRadius: 10, height: Layout.window.height / 3 }}>
            <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
              <Ionicons name="ios-arrow-back" color={'#fff'} style={{ fontSize: 23, paddingLeft: 30 }} />
              <Text style={[styles.text, { color: '#fff' }]}>THIS MONTH</Text>
              <Ionicons name="ios-arrow-forward" color={'#fff'} style={{ fontSize: 23, paddingRight: 30 }} />
            </View>
            <View style={{ flex: 1, height: Layout.window.height / 5, alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-around' }}>
              {/* <VictoryCharts /> */}
              {/* <ChartKit /> */}
              <Charts />
            </View>
          </LinearGradient>
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={() => props.navigation.navigate('TransactionHistory')} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.h2, { color: '#04A2BD' }]}>Latest Transaction</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.small, { paddingRight: 5, color: '#04A2BD' }]}>More</Text>
              <Ionicons name="ios-arrow-forward" color={'#04A2BD'} style={{ fontSize: 15, paddingRight: 5 }} />
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="md-remove-circle-outline" color={'#A20F0F'} style={{ fontSize: 15, paddingRight: 20 }} />
              <Text style={styles.text}>Withdrawal Transfer</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.text, { color: '#A20F0F' }]}>- RM5</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="md-remove-circle-outline" color={'#A20F0F'} style={{ fontSize: 15, paddingRight: 20 }} />
              <Text style={styles.text}>Account Transfer</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.text, { color: '#A20F0F' }]}>- RM5</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="md-add-circle-outline" color={'#7ED321'} style={{ fontSize: 15, paddingRight: 20 }} />
              <Text style={[styles.text]}>Disbursement Transfer</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.text, { color: '#7ED321' }]}>+ RM5</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Notification')} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.h2, { color: '#04A2BD' }]}>Latest Notifications</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.small, { paddingRight: 5, color: '#04A2BD' }]}>More</Text>
              <Ionicons name="ios-arrow-forward" color={'#04A2BD'} style={{ fontSize: 15, paddingRight: 5 }} />
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="md-remove-circle-outline" color={'#A20F0F'} style={{ fontSize: 15, paddingRight: 20 }} />
              <Text style={styles.text}>Withdrawal</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.text, { color: '#A20F0F' }]}>- RM50.00</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="md-add-circle-outline" color={'#7ED321'} style={{ fontSize: 15, paddingRight: 20 }} />
              <Text style={styles.text}>Transfer</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.text, { color: '#7ED321' }]}>+ RM80.00</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="md-add-circle-outline" color={'#7ED321'} style={{ fontSize: 15, paddingRight: 20 }} />
              <Text style={[styles.text]}>Disbursement</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.text, { color: '#7ED321' }]}>+ RM50.00</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

DashboardScreen.navigationOptions = {
  header: null
};

export default DashboardScreen;