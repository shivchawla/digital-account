import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'

const SettingsScreen = (props) => {
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(actionCreator.logout())
        props.navigation.navigate('Welcome')
    }
    return (
        <View style={{ flex: 1, }}>

            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={props.navigation.openDrawer} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="md-more" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]}>OPTION</Text>
                </View>

                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </TouchableOpacity>

            </View>

            <View style={[styles.screenMargin, { flex: 8 }]}>

                <View style={{ marginBottom: 20 }}>
                    <Text style={[styles.h2, { color: '#04A2BD' }]}>ACCOUNT</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                    <Image source={require('../assets/images/changepassword.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                    <TouchableOpacity onPress={() => props.navigation.navigate('ChangePassword')}>
                        <Text style={[styles.text, { marginLeft: 25 }]}>Change Password</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                    <Image source={require('../assets/images/emailicon.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                    <TouchableOpacity onPress={() => props.navigation.navigate('ChangeEmail')}>
                        <Text style={[styles.text, { marginLeft: 25 }]}>Change E-Mail Address</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                    <Image source={require('../assets/images/changemobilenumber.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                    <TouchableOpacity onPress={() => props.navigation.navigate('ChangeNumber')}>
                        <Text style={[styles.text, { marginLeft: 25 }]}>Change Phone Number</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                    <Image source={require('../assets/images/logout.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                    <TouchableOpacity onPress={() => logout()}>
                        <Text style={[styles.text, { marginLeft: 25 }]}>Log Out</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 20, marginBottom: 20 }}>

                    <View>
                        <Text style={[styles.h2]}>APP SETTING</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                        <Image source={require('../assets/images/notification.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        <TouchableOpacity onPress={() => props.navigation.navigate('NotiScreen')}>
                            <Text style={[styles.text, { marginLeft: 25 }]}>Notification</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                        <Image source={require('../assets/images/support1.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        <TouchableOpacity onPress={() => props.navigation.navigate('Support')}>
                            <Text style={[styles.text, { marginLeft: 25 }]}>Support</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Text style={[styles.small, { color: '#055E7C' }]}>Digital Account v0.2</Text>
            </View>

        </View>

    );
}

SettingsScreen.navigationOptions = {
    header: null,
};

export default SettingsScreen