import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';

import styles from '../styles/styles'

const SettingsScreen = (props) => {
    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#4D6BFA' }}>

                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>
                        OPTION</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 9, padding: 10 }}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={[styles.h2, { color: 'blue' }]}>ACCOUNT</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 30 }}>
                    <Image source={require('../assets/images/changepassword.png')} style={{ width: 30, height: 30 }} />
                    <TouchableOpacity onPress={() => props.navigation.navigate('ChangePassword')}>
                        <Text style={[styles.text, { color: 'black', marginLeft: 50 }]}>Change Password</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 30 }}>
                    <Image source={require('../assets/images/emailicon.png')} style={{ width: 30, height: 30 }} />
                    <TouchableOpacity onPress={() => props.navigation.navigate('ChangeEmail')}>
                        <Text style={[styles.text, { color: 'black', marginLeft: 50 }]}>Change E-Mail Address</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 30 }}>
                    <Image source={require('../assets/images/changemobilenumber.png')} style={{ width: 30, height: 30 }} />
                    <TouchableOpacity onPress={() => props.navigation.navigate('ChangeNumber')}>
                        <Text style={[styles.text, { color: 'black', marginLeft: 50 }]}>Change Phone Number</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 30 }}>
                    <Image source={require('../assets/images/changepassword.png')} style={{ width: 30, height: 30 }} />
                    <TouchableOpacity onPress={() => props.navigation.navigate('LogOut')}>
                        <Text style={[styles.text, { color: 'black', marginLeft: 50 }]}>Log Out</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, marginBottom: 20 }}>
                    <View style={{}}>
                        <Text style={[styles.h2, { color: 'blue' }]}>APP SETTING</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 30 }}>
                        <Image
                            source={require('../assets/images/notification.png')}
                            style={{ width: 30, height: 40, }} />
                        <Text style={[styles.text, { color: 'black', marginLeft: 50 }]}>Notification</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 30 }}>
                        <Image
                            source={require('../assets/images/support.png')}
                            style={{ width: 30, height: 40, }} />
                        <Text style={[styles.text, { color: 'black', marginLeft: 50 }]}>Support</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

SettingsScreen.navigationOptions = {
    header: null,
};

export default SettingsScreen