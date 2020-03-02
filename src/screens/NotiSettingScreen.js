import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import LayoutA from '../Layout/LayoutA';

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
            <LayoutA
                title={'NOTIFICATION SETTING'}
                screenType='form'
                navigation={props.navigation}
                nopadding
            >
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
            </LayoutA>
        </View >
    );
}



export default NotiSettingScreen