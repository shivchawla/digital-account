import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'

const NotiSettingScreen = (props) => {
    const dispatch = useDispatch()
    const { expo_token } = useSelector(state => state.registrationReducer, shallowEqual)

    const { email, server_expo_token } = useSelector(state => state.personalInformationScreenReducer, shallowEqual)
    const updateExpoToken = () => {
        dispatch(actionCreator.updateExpoToken())
        dispatch(actionCreator.retrievePersonalInfo())
    }

    const [switchValue1, setSwitchValue1] = useState(false)
    const [switchValue2, setSwitchValue2] = useState(false)
    const [switchValue3, setSwitchValue3] = useState(server_expo_token === expo_token)

    const toggleSwitch1 = (value) => {
        //onValueChange of the switch this function will be called
        console.log(JSON.stringify(value))
        setSwitchValue1(value)
        //state changes according to switch
        //which will result in re-render the text
    }

    const toggleSwitch2 = (value) => {
        console.log(JSON.stringify(value))
        setSwitchValue2(value)
    }

    const toggleSwitch3 = (value) => {
        console.log(JSON.stringify(value))
        updateExpoToken()
        setSwitchValue3(value)
    }

    return (

        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("DataSetting")} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={styles.title} ellipsizeMode='tail'>NOTIFICATION SETTING</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                    </View>
                </View>
            </View>
            <View style={[styles.screenMargin, { flex: 9 }]}>
                <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between' }}>
                    {/*Text to show the text according to switch condition*/}
                    <Text style={[styles.text, { padding: 5 }]}>E-mail Notification</Text>

                    <Switch style={{ marginLeft: 35, marginRight: 15 }} onValueChange={value => toggleSwitch1(value)} value={switchValue1} />

                </View>
                <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between' }}>
                    <Text style={[styles.text, { padding: 5 }]}>Message Notification</Text>
                    <Switch style={{ marginLeft: 15, marginRight: 15 }} onValueChange={value => toggleSwitch2(value)} value={switchValue2} />

                </View>
                <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between' }}>
                    <View>
                        <Text style={[styles.text, { padding: 5 }]}>App Notification</Text>
                        <Text style={[styles.small, { padding: 5,fontFamily:'Montserrat_italic'}]}>{server_expo_token === expo_token ? `Receive Notification` : `No Notification`}</Text>
                    </View>

                    <Switch disabled={server_expo_token === expo_token} style={{ marginLeft: 50, marginRight: 15 }} onValueChange={value => toggleSwitch3(value)} value={switchValue3} />
                </View> 
                {/* {expo_token === server_expo_token ? <View>
                    <View>
                        <Text>Cun</Text>
                    </View>
                </View> :
                    <TouchableOpacity onPress={() => updateExpoToken()}>
                        <Text>Fix</Text>
                    </TouchableOpacity>} */}
            </View>
        </View >
    );
}

NotiSettingScreen.navigationOptions = {
    header: null,
};

export default NotiSettingScreen