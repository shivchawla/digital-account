import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    Switch
} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const NotiSettingScreen = (props) => {
    const [switchValue1, setSwitchValue1] = useState(false)
    const [switchValue2, setSwitchValue2] = useState(false)
    const [switchValue3, setSwitchValue3] = useState(false)

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
        setSwitchValue3(value)
    }

    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#4D6BFA' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#4D6BFA'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>Notification Setting</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </View>
            </View>

            <View style={{ flex: 9, padding: 10, marginLeft: 20 }}>

                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                    {/*Text to show the text according to switch condition*/}
                    <Text style={[styles.text, { color: 'blue' }]}>E-mail Notification</Text>
                    {/*Switch with value set in constructor*/}
                    {/*onValueChange will be triggered after switch condition changes*/}
                    {/* <Text style={[styles.text, { color: 'black', marginLeft: 50 }]}>Email Notification</Text> */}
                    <Switch style={{ marginLeft: 35, marginRight: 15 }} onValueChange={value => toggleSwitch1(value)} value={switchValue1} />
                    <Text style={[styles.text, { color: 'blue', marginLeft: 15 }]}>{switchValue1 ? 'ON' : 'OFF'}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                    <Text style={[styles.text, { color: 'blue' }]}>Message Notification</Text>
                    <Switch style={{ marginLeft: 15, marginRight: 15 }} onValueChange={value => toggleSwitch2(value)} value={switchValue2} />
                    <Text style={[styles.text, { color: 'blue', marginLeft: 15 }]}>{switchValue2 ? 'ON' : 'OFF'}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                    <Text style={[styles.text, { color: 'blue' }]}>App Notification</Text>
                    <Switch style={{ marginLeft: 53, marginRight: 15 }} onValueChange={value => toggleSwitch3(value)} value={switchValue3} />
                    <Text style={[styles.text, { color: 'blue', marginLeft: 15 }]}>{switchValue3 ? 'ON' : 'OFF'}</Text>
                </View>
            </View>
        </View >
    );
}

NotiSettingScreen.navigationOptions = {
    header: null,
};

export default NotiSettingScreen