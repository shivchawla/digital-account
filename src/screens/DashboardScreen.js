import React, { useEffect } from 'react';

import {

  View,
  TouchableOpacity,
  Text,
  Image,
  Modal

} from 'react-native';

import Charts from '../components/Charts'

import { LinearGradient } from 'expo-linear-gradient'

import { Ionicons } from '@expo/vector-icons';

import Layout from '../constants/Layout'

import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'

import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import Charts from '../components/Charts'

const DashboardScreen = (props) => {

  const dispatch = useDispatch()

  const retrieveMerchantInfo = async () => {

    await dispatch(actionCreator.retrieveMerchantInfo());

  }

  const checkDeclare = async () => {

    await dispatch(actionCreator.checkDeclare());

  }

  const checkDocument = async () => {

    await dispatch(actionCreator.checkDocument());

  }

  const checkContact = async () => {

    await dispatch(actionCreator.checkContact());

  }

  const setScreen = async () => {

    await dispatch(actionCreator.setScreen());

  }

  const link = useSelector(state => state.merchantInfoReducer.link, shallowEqual)

  const status = useSelector(state => state.merchantInfoReducer.status, shallowEqual)

  const business_name = useSelector(state => state.merchantInfoReducer.business_name, shallowEqual)

  const isDeclaration_one = useSelector(state => state.merchantInfoReducer.isDeclaration_one, shallowEqual)

  const isDocument1 = useSelector(state => state.merchantInfoReducer.isDocument1, shallowEqual)

  const full_name = useSelector(state => state.merchantInfoReducer.full_name, shallowEqual)

  const dashboardDisplay = (link == 'Dashboard') ? true : false

  const logout = () => {
    dispatch(actionCreator.logout())
    props.navigation.navigate('Welcome')

  }

  const runCheckStatus = async () => {
    await retrieveMerchantInfo();
    await checkContact()
    await checkDocument()
    await checkDeclare()
    await setScreen()

  }

  useEffect(() => {
    runCheckStatus();
    setScreen()
  }, [])

  return (

    <View style={{ flex: 1, }}>
      {/* visible={!dashboardDisplay} */}
      <Modal animationType="fade" transparent={true} visible={false} onRequestClose={() => {

        Alert.alert('Modal has been closed.');

      }}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>

          <View style={{ flexDirection: 'row', alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20 }}>

            <View style={{ height: Layout.window.height / 2, backgroundColor: '#fff', flex: 1, borderRadius: 10, padding: 10, justifyContent: 'center', alignItems: 'center' }}>

              <View style={{ alignSelf: 'stretch', margin: 5 }}>

                <Text style={[styles.h3, { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 5 }]}>REGISTRATION INCOMPLETE</Text>
                <Text style={[styles.text, { margin: 5, }]}>Please complete items below to access dashboard</Text>

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

                  {full_name && <Ionicons name={'ios-checkmark'} size={20} color={'green'} style={{ paddingLeft: 10 }} />}

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>

                  <Text style={[styles.small, { textAlignVertical: 'bottom', paddingLeft: 5 }]}>Document Submission</Text>

                  {(isDocument1 != 'http://test') && <Ionicons name={'ios-checkmark'} size={20} color={'green'} style={{ paddingLeft: 10 }} />}

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>

                  <Text style={[styles.small, { textAlignVertical: 'bottom', paddingLeft: 5 }]}>Declaration</Text>

                </View>

              </View>

              <View style={{ flexDirection: 'row', alignSelf: 'stretch', marginTop: 15 }}>

                <TouchableOpacity style={{ flex: 1, }} onPress={() => props.navigation.navigate(link)}>

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

          <TouchableOpacity onPress={props.navigation.openDrawer} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
            <Ionicons name="md-more" color={'#3EC2D9'} style={{ fontSize: 30 }} />
          </TouchableOpacity>

        </View>

        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.title}>MYR 18,839.00</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity>
              <Text style={[styles.text, { color: '#055E7C' }]}>Send Money</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={[styles.text, { paddingLeft: 5, paddingRight: 5, color: '#055E7C' }]}>|</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('Withdraw')}>
              <Text style={[styles.text, { color: '#055E7C' }]}>Withdrawal</Text>
            </TouchableOpacity>

          </View>

        </View>

        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
          <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
        </TouchableOpacity>

      </View>

      <View style={[styles.screenMargin, { flex: 9, }]}>

        <View style={{ marginTop: 10 }}>

          <LinearGradient colors={['#055E7C', '#055E7C']} style={{ paddingTop: 5, paddingBottom: 5, alignItems: 'center', borderRadius: 10, height: Layout.window.height / 3 }}>

            <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>

              <Ionicons name="ios-arrow-back" color={'#fff'} style={{ fontSize: 23, paddingLeft: 30 }} />
              <Text style={[styles.text, { color: '#fff' }]}>THIS MONTH</Text>
              <Ionicons name="ios-arrow-forward" color={'#fff'} style={{ fontSize: 23, paddingRight: 30 }} />

            </View>
            <View style={{ flex: 1, height: Layout.window.height / 5, alignSelf: 'stretch',flexDirection:'row',justifyContent:'space-around' }}>
              <Charts />

              {/* <View style={{ width: Layout.window.height / 8, height: Layout.window.height / 8, justifyContent: 'center', alignItems: 'center',borderWidth:1 }}>
                <LinearGradient colors={['green', '#fff']} start={[0.5, 0.2]} style={{ width: Layout.window.height / 10, height: Layout.window.height / 10, borderRadius: Layout.window.height / 20, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ width: Layout.window.height / 10.5, height: Layout.window.height / 10.5, borderRadius: Layout.window.height / 21, backgroundColor: '#055E7C' }} />
                </LinearGradient>

                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#055E7C' }}><Text style={{ padding: 10 }}>TEST</Text></View>

              </View>

              <View style={{ width: Layout.window.height / 6.5, height: Layout.window.height / 6.5 , justifyContent: 'center', alignItems: 'center',borderWidth:1 }}>
                <LinearGradient colors={['#72FAFF', '#3EBAFF']} start={[0.5, 0.2]} style={{ width: Layout.window.height / 7, height: Layout.window.height / 7, borderRadius: Layout.window.height / 14, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ width: Layout.window.height / 7.5, height: Layout.window.height / 7.5, borderRadius: Layout.window.height / 15, backgroundColor: '#055E7C' }} />
                </LinearGradient>
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#055E7C' }}><View style={{paddingTop:20}} /></View>
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0,top:0, backgroundColor: 'transparent',justifyContent:'center',alignItems:'center' }}><Text style={{ color:'#fff' }}>TEST</Text></View>
          
              </View>

              <View style={{ width: Layout.window.height / 8, height: Layout.window.height / 8, justifyContent: 'center', alignItems: 'center',borderWidth:1 }}>
                <LinearGradient colors={['green', '#fff']} start={[0.5, 0.2]} style={{ width: Layout.window.height / 10, height: Layout.window.height / 10, borderRadius: Layout.window.height / 20, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ width: Layout.window.height / 10.5, height: Layout.window.height / 10.5, borderRadius: Layout.window.height / 21, backgroundColor: '#055E7C' }} />
                </LinearGradient>

                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#055E7C' }}><Text style={{ padding: 10 }}>TEST</Text></View>
                  </View> */}

            </View>


          </LinearGradient>

        </View>

        <View style={{ marginTop: 10 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <Text style={[styles.h2, { color: '#04A2BD' }]}>Latest Transaction</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.small, { paddingRight: 5, color: '#04A2BD' }]}>More</Text>
              <Ionicons name="ios-arrow-forward" color={'#04A2BD'} style={{ fontSize: 15, paddingRight: 5 }} />
            </View>

          </View>

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

      </View>

    </View>

  );

}

DashboardScreen.navigationOptions = {

  header: null,

};

export default DashboardScreen;