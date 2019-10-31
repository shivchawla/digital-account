import React from 'react';
import { View, TouchableOpacity, Text, Image, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const BusinessHubScreen = (props) => {

    return (

        <View style={{ flex: 1 }} >
            <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={props.navigation.openDrawer} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="md-more" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]}>BUSINESS HUB</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </TouchableOpacity>
            </View>
            <View style={[styles.screenMargin, { flex: 9 }]}>
                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                    <Ionicons name="ios-contacts" color={'#055E7C'} style={{ fontSize: 65, paddingRight: 5, opacity: 0.5 }} />
                    <TouchableOpacity onPress={() => props.navigation.navigate('BusinessDirectory')}>
                        <Text style={[styles.text, { marginLeft: 30 }]}>Business Directory</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                    <Ionicons name="ios-pie" color={'#055E7C'} style={{ fontSize: 65, paddingRight: 5, opacity: 0.5 }} />
                    <TouchableOpacity onPress={() => props.navigation.navigate('Zakat')}>
                        <Text style={[styles.text, { marginLeft: 30 }]}>Zakat</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                    <Ionicons name="ios-thumbs-up" color={'#055E7C'} style={{ fontSize: 65, paddingRight: 5, opacity: 0.5 }} />
                    <TouchableOpacity onPress={() => props.navigation.navigate('Payroll')}>
                        <Text style={[styles.text, { marginLeft: 40 }]}>Payroll</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                    <Ionicons name="ios-cash" color={'#055E7C'} style={{ fontSize: 65, paddingRight: 5, opacity: 0.5 }} />
                    <TouchableOpacity onPress={() => props.navigation.navigate('Remittance')}>
                        <Text style={[styles.text, { marginLeft: 30 }]}>Remittance</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >

    );
}

BusinessHubScreen.navigationOptions = {
    header: null,
};

export default BusinessHubScreen;