import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, FlatList, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Charts from '../components/Charts'
//import VictoryCharts from '../components/VictoryCharts'
import ChartKit from '../components/ChartKit'
import _ from 'lodash'
import moment from 'moment'
import NumberFormat from 'react-number-format';

let Modal;

if (Platform.OS !== 'web') {
  Modal = require('react-native').Modal;
} else {
  Modal = require('../components/WebModal').default;
}

//import { Number, Currency } from "react-intl-number-format"
//import { FlatList } from 'react-native-gesture-handler';

const DashboardScreen = (props) => {


  const dataPointClicked = (val) => {
    console.log(`klik ni ${JSON.stringify(val)}`)
  }

  const changeChartDay = () => {
    if (chartDay === 7) { setChartDay(30) } else { setChartDay(7) }
  }

  const dispatch = useDispatch()
  //const [chartData, setChartData] = useState([])

  const { link, status, status1, business_name, isDeclaration_one, isDocument1, full_name, contactId } = useSelector(state => state.merchantInfoReducer, shallowEqual)
  const { balance, currency } = useSelector(state => state.myAccountReducer, shallowEqual)
  //const contactId =   useSelector(state => state.merchantInfoReducer.id, shallowEqual)
  const { reportList } = useSelector(state => state.reportReducer, shallowEqual)
  const all = useSelector(state => state.merchantInfoReducer, shallowEqual)
  all && console.log(`all ialah : ${JSON.stringify(all)}`)

  //const dashboardDisplay = (link == 'Dashboard') ? true : false
  const [dashboardDisplay, setDashboardDisplay] = useState(true)

  const [five, setFive] = useState(null)

  const [chartDay, setChartDay] = useState(7)

  //if(status===)

  const logout = async () => {
    await dispatch(actionCreator.logout())
    await props.navigation.navigate('Welcome')
  }

  const runCheckStatus = async () => {
    await dispatch(actionCreator.setScreen())

    await dispatch(actionCreator.retrieveMerchantInfo())
    await dispatch(actionCreator.retrieveAccountInfo())

    await console.log(`status 1 : ${status1}`)
    if (status1 == 'Approved') {

      setDashboardDisplay(true)
    } else {
      setDashboardDisplay(true)
      await console.log(`status biasa : ${status}`)
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
    }

    //await setDashboardDisplay(link != 'Dashboard' ? false : true)
  }

  const runCheckStatus2 = async () => {
    await dispatch(actionCreator.setScreen2())
  }

  // useEffect(() => {
  //   runCheckStatus2()
  // }, [])

  // useEffect(() => {
  //   console.log(`status1 ialah ${status1}`)
  //   if (status1 == 'New') {
  //     runCheckStatus();
  //   } else if (status1 == 'Approved') {
  //     dispatch(actionCreator.retrievePersonalInfo())
  //     dispatch(actionCreator.retrieveMerchantInfo())
  //     dispatch(actionCreator.retrieveAccountInfo())
  //     dispatch(actionCreator.getReportList())
  //   }

  // }, [status1])

  useEffect(() => {
   
      dispatch(actionCreator.retrievePersonalInfo())
      dispatch(actionCreator.retrieveMerchantInfo())
      dispatch(actionCreator.retrieveAccountInfo())
      dispatch(actionCreator.getReportList()) 
  }, [])


  const getData = () => {
    const listBaru = []
    reportList.map(rl => {
      const { type, credit_debit, amount, status, updated_at } = rl
      listBaru.push({ type, credit_debit, amount, status, updated_at })
    })
    listBaru.reverse()
    const listBaru2 = []
    const listBaru3 = []
    const listBaru4 = []

    //console.log(`listbaru original : ${JSON.stringify(listBaru)}`)

    listBaru.map((lb, i) => {
      const mult = lb.credit_debit == 'CREDIT' ? 1 : -1

      if (i == 0) {
        const balance = lb.amount * mult
        listBaru2.push({ ...lb, balance })
        listBaru3.push({ ...lb, balance })
      } else {
        const balance = listBaru2[i - 1].balance + lb.amount * mult
        listBaru2.push({ ...lb, balance })

        if (lb.type != "Fee Account Transfer") {
          listBaru3.push({ ...lb, balance })
        }
      }

    })

    console.log(`gabungan ke-3 yang mengasyikkan ${JSON.stringify(listBaru3)}`)

    listBaru3.map(lb3 => {
      const { updated_at, balance } = lb3
      listBaru4.push({ updated_at, balance })
    })
    console.log(`gabungan ke-4 yang mengasyikkan ${JSON.stringify(listBaru4)}`)

    const listBaru6 = _.values(_.groupBy(listBaru4, (dt) => moment(dt.updated_at).dayOfYear()))
    console.log(`gabungan ke-6 yang mengasyikkan ${JSON.stringify(listBaru6)}`)
    const listBaru7 = []
    const listBaru8 = []

    listBaru6.map(l => {
      listBaru7.push(l[l.length - 1].balance)
      //listBaru8.push({ ...l[0] })  ///// kalau nak include duit first masuk awal awal hari tu
      listBaru8.push({ ...l[l.length - 1] })
    })
    console.log(`gabungan ke-7 yang mengasyikkan ${JSON.stringify(listBaru7)}`)
    console.log(`gabungan ke-8 yang mengasyikkan ${JSON.stringify(listBaru8)}`)
    //listBaru7&&setChartData(listBaru7)

    /////////TESTING DATE
    var days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    var goBackDays = chartDay;

    var today = new Date(moment().add(1, 'days')); // temporary get date ahead one day, to remove later 

    var daysSorted = [];

    for (var i = 0; i < goBackDays; i++) {
      var newDate = new Date(today.setDate(today.getDate() - 1));
      daysSorted.push({ day: days[newDate.getDay()], date: newDate });
    }
    const listBaru9 = []

    /////////END TESTING DATE
    daysSorted.map(ds => {
      const adaEntry = listBaru8.find(lb8 => moment(lb8.updated_at).isSame(moment(new Date(ds.date)), 'day'))
      adaEntry ? listBaru9.push({ ...adaEntry, day: ds.day }) : listBaru9.push({ update: moment(new Date(ds.date)), ada: 'takde', day: ds.day })

    })


    const last = listBaru9[listBaru9.length - 1]
    console.log(`last ialah ${JSON.stringify(last)}`)

    if (last.ada == 'takde') {

      const start = listBaru8.find(n => moment(n.updated_at) < moment(last.update)) || listBaru6.find(n => moment(n.updated_at) < moment(last.update))

      console.log(`start ialah : ${JSON.stringify(start)}`)
      listBaru9[listBaru9.length - 1].balance = _.isArray(start) ? start[start.length - 1].balance : 0
    }
    console.log(` gabungan ke-9 yang mengasyikkan ${JSON.stringify(listBaru9)}`);
    const listBaru10 = []
    listBaru9.reverse()
    listBaru9.map((lb9, i) => {
      const { updated_at, balance, ada } = lb9
      if (!ada) {
        listBaru10.push(lb9)
      } else {
        const newBalance = i > 0 ? listBaru10[i - 1].balance : lb9.balance
        //console.log(`new balance ialah : ${newBalance}`)
        listBaru10.push({ ...lb9, balance: newBalance })

      }
    })

    console.log(` gabungan ke-10 yang mengasyikkan ${JSON.stringify(listBaru10)}`);
    const listBaru11 = []
    //const i = goBackDays
    //ni kalau bahagi 30
    if (chartDay === 30) {
      for (i = goBackDays; i > 0; i--) {
        !((i + 1) % 3 === 0) && listBaru10.splice(i, 1);
        console.log(JSON.stringify((i + 1) % 3 === 0))
      }
      console.log(` gabungan ke-11 yang mengasyikkan ${JSON.stringify(listBaru10)}`);
      return listBaru10
    }

    return listBaru10

  }

  const noti = [
    { announcement: 'Happy New Year! Have a pleasant day. We are standing by should you need any assistance', date: '1/1/20' },
    { announcement: 'Welcome to mobile version of  the Digital Account. All features are accessible by clicking the menu button at the top left corner of your screen', date: '5/10/19' },
    { announcement: 'Thank you for your registration. We look forward to serving you and fulfilling your expectation', date: '5/5/19' },
  ]



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

                </View> : <View style={{ alignSelf: 'stretch', margin: 5 }}>
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
                    {(contactId && contactId != 13) && <Ionicons name={'ios-checkmark'} size={20} color={'green'} style={{ paddingLeft: 10 }} />}
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
                <TouchableOpacity style={{ flex: 1, }} onPress={() => props.navigation.navigate(link, { prevScreen: 'Dashboard' })}>
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
      <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row' }]}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
          <TouchableOpacity onPress={props.navigation.openDrawer} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }} style={{ paddingRight: 50 }}>
            <Ionicons name="md-more" color={'#3EC2D9'} style={{ fontSize: 30 }} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {balance ? <NumberFormat value={balance.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <Text style={styles.title}>{currency} {value}</Text>} /> : <Text style={styles.title}>MYR 0</Text>}
          </View>
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
          <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
          </View>
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
      <View style={[{ flex: 9 }]}>
        <View style={[styles.screenMargin, { marginBottom: 15 }]}>
          <LinearGradient colors={['#055E7C', '#055E7C']} style={{ paddingTop: 5, paddingBottom: 5, alignItems: 'center', borderRadius: 10, height: Layout.window.height > 570 ? Layout.window.height / 3 : Layout.window.height / 2.8 }}>
            <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => changeChartDay()}>
                <Ionicons name="ios-arrow-back" color={'#fff'} style={{ fontSize: 23, paddingLeft: 30 }} />
              </TouchableOpacity>
              <Text style={[styles.text, { color: '#fff' }]}>{chartDay === 7 ? 'PAST 7 DAYS' : 'PAST 30 DAYS'}</Text>
              <TouchableOpacity onPress={() => changeChartDay()}>
                <Ionicons name="ios-arrow-forward" color={'#fff'} style={{ fontSize: 23, paddingRight: 30 }} />
              </TouchableOpacity>

            </View>
            <View style={{ flex: 1, height: Layout.window.height > 570 ? Layout.window.height / 3 : Layout.window.height / 2.8, alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-around', borderRadius: 10 }}>
              {/* <VictoryCharts /> */}
              {reportList && <ChartKit data={getData()} dataPointClicked={dataPointClicked} />}
              {/* <Charts /> */}
            </View>
          </LinearGradient>
        </View>
        <ScrollView style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Report')} style={[styles.screenMargin, { flexDirection: 'row', justifyContent: 'space-between', }]}>
            <Text style={[styles.h2, { color: '#04A2BD' }]}>Latest Transaction</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.small, { paddingRight: 5, color: '#04A2BD' }]}>More</Text>
              <Ionicons name="ios-arrow-forward" color={'#04A2BD'} style={{ fontSize: 15, paddingRight: 5 }} />
            </View>
          </TouchableOpacity>

          {reportList && <FlatList data={reportList.filter(rl => !rl.type.includes('Fee')).slice(0, 5)} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) =>
            <View style={[styles.screenMargin, { flexDirection: 'row', marginTop: 5, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'rgba(62,194,217,0.2)', paddingBottom: 5, }]}>
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
          } />}

        </ScrollView>
        {/* <View style={{ marginTop: 20 }}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Notification')} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.h2, { color: '#04A2BD' }]}>Latest Notifications</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.small, { paddingRight: 5, color: '#04A2BD' }]}>More</Text>
              <Ionicons name="ios-arrow-forward" color={'#04A2BD'} style={{ fontSize: 15, paddingRight: 5 }} />
            </View>
          </TouchableOpacity>
          {noti && <FlatList data={noti} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) =>
            <View style={{ flexDirection: 'row', marginTop: 5, flex: 1 }}>
              <View style={{ flexDirection: 'row', flex: 3 }}>
                <Ionicons name={"md-arrow-dropright"} color={'#04A2BD'} style={{ fontSize: 12, paddingRight: 20 }} />
                <Text numberOfLines={2} ellipsizeMode={'tail'} style={[styles.listItem]}>{item.announcement}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={[styles.listItem]}>{item.date}</Text>
              </View>
            </View>
          } />}
        </View> */}
      </View>

    </View>
  );
}

DashboardScreen.navigationOptions = {
  header: null
};

export default DashboardScreen;