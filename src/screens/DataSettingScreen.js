import React from 'react';
import { View, TouchableOpacity, Text, Image, } from 'react-native';
import { useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const DataSettingScreen = (props) => {
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(actionCreator.logout())
        props.navigation.navigate('Welcome')
    }

    return (

        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                            <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.title]}>SETTING</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.screenMargin, { flex: 9 }]}>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={[styles.h2, { color: '#04A2BD', marginTop: 20 }]}>MERCHANT SETTING</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                        <Image source={require('../assets/images/changemobilenumber.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        <TouchableOpacity onPress={() => props.navigation.navigate('Item')}>
                            <Text style={[styles.text, { color: 'black', marginLeft: 50 }]}>Item</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                        <Image source={require('../assets/images/emailicon.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        <TouchableOpacity onPress={() => props.navigation.navigate('Customer')}>
                            <Text style={[styles.text, { color: 'black', marginLeft: 50 }]}>Customer</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                        <Image source={require('../assets/images/changepassword.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        <TouchableOpacity onPress={() => props.navigation.navigate('Vendor')}>
                            <Text style={[styles.text, { color: 'black', marginLeft: 50 }]}>Vendor</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 5, marginTop: 20 }}>
                        <Text style={[styles.h2, { color: '#04A2BD' }]}>ACCOUNT</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                        <Image source={require('../assets/images/changepassword.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')}>
                            <Text style={[styles.text, { marginLeft: 25 }]}>Edit Profike</Text>
                        </TouchableOpacity>
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
            </ScrollView>
        </View>
    );
}

DataSettingScreen.navigationOptions = {
    header: null,
};

export default DataSettingScreen