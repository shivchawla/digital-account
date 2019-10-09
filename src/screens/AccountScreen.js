import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const AccountScreen = (props) => {

    return (

        <View style={{ flex: 1 }}>
            <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]}>ACCOUNT: 19927483</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 9 }}>
                <ScrollView>
                    <View style={[styles.screenMargin]}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.h2, { marginBottom: 10, marginTop: 10 }]}>Account Information</Text>
                        </View>
                        <View style={{ flexDirection: 'row', margin: 5, justifyContent: 'center', alignItems: 'stretch' }}>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                <Image source={require('../assets/images/accountNumber.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                            </View>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={[styles.text, { marginLeft: 10 }]}>Account Number</Text>
                            </View>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={[styles.boldText, { color: 'black' }]}>123456789</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', margin: 5, justifyContent: 'center' }}>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                <Image source={require('../assets/images/accountType.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                            </View>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={[styles.text, { marginLeft: 10 }]}>Account Type</Text>
                            </View>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={[styles.boldText, { color: 'black' }]}>Business</Text>
                            </View>

                        </View>

                        {/* 
                        <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Image source={require('../assets/images/accountType.png')} style={{ width: 30, height: 30, alignSelf: 'center' }} resizeMode={'contain'} />
                                <Text style={[styles.text, { marginLeft: 10, alignSelf: 'center' }]}>Account Type</Text>
                                <Text style={[styles.boldText, { flexDirection: 'row', alignSelf: 'center', marginLeft: 30 }]}>Business</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../assets/images/balanceReport.png')} style={{ width: 30, height: 30, alignSelf: 'center' }} resizeMode={'contain'} />
                                <Text style={[styles.text, { marginLeft: 10, alignSelf: 'center' }]}>Balance Report</Text>
                                <Text style={[styles.boldText, { flexDirection: 'row', alignSelf: 'center', marginLeft: 30 }]}>RM 18,839.00</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../assets/images/accountStatus.png')} style={{ width: 30, height: 30, alignSelf: 'center' }} resizeMode={'contain'} />
                                <Text style={[styles.text, { marginLeft: 10, alignSelf: 'center' }]}>Account Status</Text>
                                <Text style={[styles.boldText, { color: 'green', alignSelf: 'center', marginLeft: 30 }]}>Active</Text>
                            </View>
                        </View> */}
                    </View>
                </ScrollView>
            </View >
        </View >
    );
}

AccountScreen.navigationOptions = {
    header: null,
};

export default AccountScreen;