import React from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, Image, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'


const BusinessHubScreen = (props) => {

    return (

        <View style={{ flex: 1 }} >
            <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]}>BUSINESS HUB</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
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