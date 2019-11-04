import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Charts from '../components/Charts'
import LottieView from 'lottie-react-native'

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
    //this.animation.play()
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
      <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', marginBottom: 15 }]}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
          <TouchableOpacity onPress={props.navigation.openDrawer} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
            <Ionicons name="md-more" color={'#3EC2D9'} style={{ fontSize: 30 }} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.title}>MYR 18,839.00</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
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
      <View style={[styles.screenMargin, { flex: 9 }]}>
        <View style={{ marginTop: 10, marginBottom: 15 }}>
        <LottieView
           
              style={{width:400,height:400,backgroundColor:'#fff'}}
              source={require('../assets/lottie/scanner.json')}
              autoPlay
              loop
              />
        </View>
        
      </View>
    </View>
  );
}

DashboardScreen.navigationOptions = {
  header: null
};

export default DashboardScreen;