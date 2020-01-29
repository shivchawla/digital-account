import React from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, Image, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'


const BusinessHubScreen = (props) => {

    return (

        <View style={{ flex: 1 }} >
            <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: 'rgba(163, 0, 0, 0.5)' }]}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#DE4848'} style={{ fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]}>BUSINESS HUB</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <View style={{ backgroundColor:'rgba(163, 0, 0, 0.5)',borderColor: "#DE4848", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
          </View>
                </TouchableOpacity>
            </View>
            <View style={[styles.screenMargin, { flex: 9, flexDirection: 'row' }]}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <TouchableHighlight underlayColor={'rgba(51,153,255,0.3)'} onPress={() => props.navigation.navigate('BusinessDirectory')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 20 }}>
                            <View style={{ backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 10, borderWidth: 1, borderColor: 'lightgrey', alignItems: 'center', justifyContent: 'space-around' }}>
                                <Image source={require('../assets/images/businessdirectory.png')} style={{ width: 30, height: 30, marginBottom: 10 }} resizeMode={'contain'} />
                                <Text style={[styles.small, { textAlign: 'center' }]}>Business Directory</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={'rgba(51,153,255,0.3)'} onPress={() => props.navigation.navigate('Zakat')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 20 }}>
                            <View style={{ backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 10, borderWidth: 1, borderColor: 'lightgrey', alignItems: 'center', justifyContent: 'space-around' }}>
                                <Image source={require('../assets/images/zakaticon.png')} style={{ width: 30, height: 30, marginBottom: 10 }} resizeMode={'contain'} />
                                <Text style={[styles.small, { textAlign: 'center' }]}>Zakat</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <TouchableHighlight underlayColor={'rgba(51,153,255,0.3)'} onPress={() => props.navigation.navigate('Remittance')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 20 }}>
                            <View style={{ backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 10, borderWidth: 1, borderColor: 'lightgrey', alignItems: 'center', justifyContent: 'space-around' }}>
                                <Image source={require('../assets/images/remittanceicon.png')} style={{ width: 30, height: 30, marginBottom: 10 }} resizeMode={'contain'} />
                                <Text style={[styles.small, { textAlign: 'center' }]}>Remittance</Text></View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={'rgba(51,153,255,0.3)'} onPress={() => props.navigation.navigate('Payroll')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 20 }}>
                            <View style={{ backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 10, borderWidth: 1, borderColor: 'lightgrey', alignItems: 'center', justifyContent: 'space-around' }}>
                                <Image source={require('../assets/images/payrollicon.png')} style={{ width: 30, height: 30, marginBottom: 10 }} resizeMode={'contain'} />
                                <Text style={[styles.small, { textAlign: 'center' }]}>Payroll</Text>
                            </View>
                        </TouchableHighlight>

                    </View>
                    <View style={{ flex: 3.2 }} />
                </View>
            </View>
        </View >

    );
}

BusinessHubScreen.navigationOptions = {
    header: null,
};

export default BusinessHubScreen;