import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import * as LocalAuthentication from 'expo-local-authentication';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

const AuthOptionTypeScreen = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionCreator.checkAuth())
    }, [])

    // const disableAuth = () => {
    //     dispatch(actionCreator.setAuth({ authType: 'passcode' }))
    //     props.navigation.navigate('SetPasscode')
    // }

    const { authEnabled, authType } = useSelector(state => state.authReducer, shallowEqual)
    const allAuth = useSelector(state => state.authReducer, shallowEqual)


    const [notificationEnable, setNotificationEnable] = useState(authEnabled)

    const notificationToggle = () => {

        console.log(JSON.stringify())

        if (authEnabled) {
            dispatch(actionCreator.setAuth({ authEnabled: false }))
        } else {
            dispatch(actionCreator.setAuth({ authEnabled: !notificationEnable }))
            props.navigation.navigate('AuthOptionType')
            //setNotificationEnable(value)
        }


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
                    <Text numberOfLines={1} style={styles.title} ellipsizeMode='tail'>AUTHENTICATION SETTING</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                    </View>
                </View>
            </View>
            <View style={[styles.screenMargin, { flex: 9 }]}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                    <View>
                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Text style={[styles.text], { padding: 5 }}>Enable Authentication</Text>
                            <Switch style={{ marginLeft: 35, marginRight: 15 }} onValueChange={value => notificationToggle(value)} value={authEnabled} />
                        </View>
                        {authEnabled && <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Text style={[styles.text], { padding: 5 }}>Authentication Type : {authType}</Text>
                        </View>}
                    </View>
                </View>
            </View >
        </View >
    );
}

AuthOptionTypeScreen.navigationOptions = {
    header: null,
};

export default AuthOptionTypeScreen