import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, Modal, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import getData from '../components/Stat'
//import Charts from '../components/Charts'
//import VictoryCharts from '../components/VictoryCharts'
import ChartKit from '../components/ChartKit'
import _ from 'lodash'
import moment from 'moment'
import NumberFormat from 'react-number-format';
import LayoutA from '../Layout/LayoutA';

//import { Number, Currency } from "react-intl-number-format"
//import { FlatList } from 'react-native-gesture-handler';

const DashboardScreen = (props) => {
  const dispatch = useDispatch()
  const dataPointClicked = (val) => {
    console.log(`klik ni ${JSON.stringify(val)}`)
  }

  const changeChartDay = () => {
    if (chartDay === 7) { setChartDay(30) } else { setChartDay(7) }
  }

  const { balance, currency } = useSelector(state => state.myAccountReducer, shallowEqual)

  const { reportList } = useSelector(state => state.reportReducer, shallowEqual)
  const all = useSelector(state => state.merchantInfoReducer, shallowEqual)
  const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)

  const [dashboardDisplay, setDashboardDisplay] = useState(true)

  const [chartDay, setChartDay] = useState(7)
  const { status, status1, link } = useSelector(state => state.merchantInfoReducer, shallowEqual)
  const [screenStatus, setScreenStatus] = useState(null)

  useEffect(() => {
    dispatch(actionCreator.setScreen2())
    if (status1 === 'Approved') {
      setDashboardDisplay(true)
      dispatch(actionCreator.retrievePersonalInfo())
      dispatch(actionCreator.retrieveMerchantInfo())
      dispatch(actionCreator.retrieveAccountInfo())
      dispatch(actionCreator.getReportList())
      dispatch(actionCreator.checkAuth()) //awal awal lagi tengok
    }
    else { setDashboardDisplay(false) }
  }, [status1])


  status1 && console.log(`screen status ialah : ${status1}`)
  reportList && console.log(`report list ialah ${JSON.stringify(reportList)}`)

  return (

    <View style={{ flex: 1, }}>
      {/* visible={!dashboardDisplay} */}
      <Popup
        navigation={props.navigation}
        dashboardDisplay={dashboardDisplay}
        setDashboardDisplay={setDashboardDisplay}
        link={link}
      />
      <LayoutA
        screenType='dashboard'
        navigation={props.navigation}
        title={balance ? <NumberFormat value={balance.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => ` MYR ${value}`} /> : `MYR 0`}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
          <TouchableOpacity onPress={() => props.navigation.navigate('TransferStack', { screen: 'Transfer' })}>
            <Text style={[styles.text]}>Send Money</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.text, { paddingLeft: 5, paddingRight: 5, color: '#3EC2D9' }]}>|</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('Withdraw')}>
            <Text style={[styles.text]}>Withdrawal</Text>
          </TouchableOpacity>
        </View>
        {/* <View><Text>{isInternetReachable && JSON.stringify(isInternetReachable)}</Text></View> */}
        <View style={{ marginBottom: 15 }} >
          <LinearGradient colors={['#055E7C', '#055E7C']} style={{ paddingTop: 5, paddingBottom: 5, alignItems: 'center', borderRadius: 10, height: Layout.window.height > 570 ? Layout.window.height / 3.3 : Layout.window.height / 2.8 }}>
            {(reportList && reportList.length > 0) ? <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => changeChartDay()}>
                <Ionicons name="ios-arrow-back" color={'#fff'} style={{ fontSize: 23, paddingLeft: 30 }} />
              </TouchableOpacity>
              <Text style={[styles.text, { color: '#fff' }]}>{chartDay === 7 ? 'PAST 7 DAYS' : 'PAST 30 DAYS'}</Text>
              <TouchableOpacity onPress={() => changeChartDay()}>
                <Ionicons name="ios-arrow-forward" color={'#fff'} style={{ fontSize: 23, paddingRight: 30 }} />
              </TouchableOpacity>
            </View> : <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center' }}>

                <Text style={[styles.text, { color: '#fff' }]}>STATISTICS</Text>

              </View>}
            <View style={{ flex: 1, height: Layout.window.height > 570 ? Layout.window.height / 3.3 : Layout.window.height / 2.8, alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-around', borderRadius: 10 }}>
              {(reportList && reportList.length > 0) ? <ChartKit data={getData(reportList, chartDay)} dataPointClicked={dataPointClicked} /> :
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons name="md-pie" color={'#fff'} style={{ fontSize: 120, padding: 10 }} />
                  <Text style={[styles.small, { color: '#fff', padding: 10, textAlign: 'center' }]}>Actual chart will be displayed here once there are activites</Text>
                </View>}
            </View>
          </LinearGradient>
        </View>
        <View style={{ marginBottom: 15 }} >
          <TouchableOpacity onPress={() => props.navigation.navigate('Report')} style={[{ flexDirection: 'row', justifyContent: 'space-between', }]}>
            <Text style={[styles.h2, { color: '#04A2BD' }]}>Latest Transaction</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.small, { paddingRight: 5, color: '#04A2BD' }]}>More</Text>
              <Ionicons name="ios-arrow-forward" color={'#04A2BD'} style={{ fontSize: 15, paddingRight: 5 }} />
            </View>
          </TouchableOpacity>
          <View >
            {(reportList && reportList.length > 0) ? <FlatList data={reportList.filter(rl => !rl.type.includes('Fee')).slice(0, 5)} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) =>
              <View style={[, { flexDirection: 'row', marginTop: 5, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'rgba(62,194,217,0.2)', paddingBottom: 5, }]}>
                <View style={{ flexDirection: 'row', }}>
                  <Ionicons name={item.credit_debit == 'DEBIT' ? "md-remove-circle-outline" : "md-add-circle-outline"} color={item.credit_debit == 'DEBIT' ? '#A20F0F' : '#7ED321'} style={{ fontSize: 12, paddingRight: 20, paddingTop: 5 }} />
                  <View>
                    <Text style={[styles.listItem]}>{item.type}  </Text>
                    <Text style={[styles.listItem]}> ({item.transaction_no}) </Text>
                    <Text style={[styles.listItem]}>{moment(item.updated_at).format('DD/MM/YY h:mm:ss')}</Text>
                  </View>
                </View>
                <View style={{}}>
                  <Text style={[styles.listItem, { color: item.credit_debit == 'DEBIT' ? '#A20F0F' : '#7ED321' }]}>{item.credit_debit == 'DEBIT' ? '-' : '+'} {item.currency ? item.currency : 'MYR'} <NumberFormat value={item.amount.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <Text>{item.amount.toFixed(2)}</Text>} /></Text>
                </View>
              </View>
            } /> :
              <View style={[, { flexDirection: 'row', marginTop: 5, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'rgba(62,194,217,0.2)', paddingBottom: 5, }]}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  <Ionicons name={"md-information-circle-outline"} color={'#055E7C'} style={{ flex: 1, fontSize: 25, paddingRight: 20, paddingTop: 5 }} />
                  <View style={{ flex: 10 }}>
                    <Text style={[styles.listItem]}>Welcome to Niyo </Text>
                    <Text style={[styles.listItem]}> No record has been found. You may  start applying for loans etc </Text>

                  </View>
                </View>

              </View>}
          </View>
        </View>

      </LayoutA>
    </View>

  );
}

const Popup = (props) => {
  const dispatch = useDispatch()
  //const [chartData, setChartData] = useState([])
  //const { link, business_name, isDeclaration_one, isDocument1, contactId } = useSelector(state => state.merchantInfoReducer, shallowEqual)
  const { link } = props

  const goTo = () => {
    props.setDashboardDisplay(!props.dashboardDisplay)
    props.navigation.navigate('Registration', { screen: 'Intro', params: { screen: link } })
  }

  const tick = link === 'RegistrationDeclaration' ?
    { basic: true, merchant: true, contact: true, doc: true, declaration: false } :
    link === 'CompanyDocument' ? { basic: true, merchant: true, contact: true, doc: false, declaration: false } :
      link === 'ContactPerson' ? { basic: true, merchant: true, contact: false, doc: false, declaration: false } :
        link === 'CompanyInformation' ? { basic: true, merchant: false, contact: false, doc: false, declaration: false } : null

  console.log(`tick ialah ${JSON.stringify(tick)}`)

  //if (link){}
  const logout = async () => {
    await dispatch(actionCreator.logout())
    await props.navigation.navigate('Welcome')
  }
  return (
    <Modal animationType="fade" transparent={true} visible={!props.dashboardDisplay} onRequestClose={() => {
      console.log('do nothing');
    }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
        <View style={{ flexDirection: 'row', alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20 }}>
          <View style={{ height: Layout.window.height / 2, backgroundColor: '#fff', flex: 1, borderRadius: 10, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            {link === 'AdminApproval' ?
              <View style={{ alignSelf: 'stretch', margin: 5 }}>
                <Text style={[styles.h3, { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 5 }]}>REGISTRATION INCOMPLETE</Text>
                <Text style={[styles.text, { margin: 5, }]}>Account Under Review</Text>
              </View> : <View style={{ alignSelf: 'stretch', margin: 5 }}>
                <Text style={[styles.h3, { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 5 }]}>REGISTRATION INCOMPLETE</Text>
                <Text style={[styles.text, { margin: 5, }]}>Please complete items below for approval</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <Text style={[styles.small, { textAlignVertical: 'bottom', paddingLeft: 5 }]}>Basic Info</Text>
                  <Ionicons name={'ios-checkmark'} size={20} color={'green'} style={{ paddingLeft: 10 }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <Text style={[styles.small, { textAlignVertical: 'bottom', paddingLeft: 5 }]}>Merchant Info</Text>
                  {tick && tick.merchant && <Ionicons name={'ios-checkmark'} size={20} color={'green'} style={{ paddingLeft: 10 }} />}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <Text style={[styles.small, { textAlignVertical: 'bottom', paddingLeft: 5 }]}>Contact Info</Text>
                  {tick && tick.contact && <Ionicons name={'ios-checkmark'} size={20} color={'green'} style={{ paddingLeft: 10 }} />}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <Text style={[styles.small, { textAlignVertical: 'bottom', paddingLeft: 5 }]}>Document Submission</Text>
                  {tick && tick.doc && <Ionicons name={'ios-checkmark'} size={20} color={'green'} style={{ paddingLeft: 10 }} />}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <Text style={[styles.small, { textAlignVertical: 'bottom', paddingLeft: 5 }]}>Declaration</Text>
                  {tick && tick.declaration && <Ionicons name={'ios-checkmark'} size={20} color={'green'} style={{ paddingLeft: 10 }} />}
                </View>
              </View>}
            <View style={{ flexDirection: 'row', alignSelf: 'stretch', marginTop: 15 }}>
              <TouchableOpacity style={{ flex: 1, }} onPress={() => goTo()}>
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A6496' }}>
                  <Text style={[styles.butang, { color: '#fff', paddingTop: 5, paddingBottom: 5 }]}>CONTINUE</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
              <TouchableOpacity style={{ flex: 1, marginTop: 5 }} onPress={() => logout()}>
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#808080' }}>
                  <Text style={[styles.butang, { color: '#fff', paddingTop: 5, paddingBottom: 5 }]}>LOG OUT</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )

}

export default DashboardScreen;