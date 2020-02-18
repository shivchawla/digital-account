import React from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, Image, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import LayoutA from '../Layout/LayoutA';

const BusinessHubScreen = (props) => {

    return (
        <LayoutA title={'BUSINESS HUB'} navigation={props.navigation} row>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <TouchableHighlight underlayColor={'rgba(51,153,255,0.3)'} onPress={() => props.navigation.navigate('BusinessDirectory')} style={styles.busHub}>
                        <>
                            <Image source={require('../assets/images/businessdirectory.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                            <Text style={[styles.label, { textAlign: 'center' }]}>Business Directory</Text>
                        </>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={'rgba(51,153,255,0.3)'} onPress={() => props.navigation.navigate('Zakat')} style={styles.busHub}>
                        <>
                            <Image source={require('../assets/images/zakaticon.png')} style={{ width: 40, height: 40, marginTop: 5 }} resizeMode={'contain'} />
                            <Text style={[styles.label, { textAlign: 'center', marginBottom: 5 }]}>Zakat</Text>
                        </>
                    </TouchableHighlight>
                </View>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <TouchableHighlight underlayColor={'rgba(51,153,255,0.3)'} onPress={() => props.navigation.navigate('Remittance')} style={styles.busHub}>
                        <>
                            <Image source={require('../assets/images/remittanceicon.png')} style={{ width: 40, height: 40, marginTop: 5 }} resizeMode={'contain'} />
                            <Text style={[styles.label, { textAlign: 'center', marginBottom: 5 }]}>Remittance</Text></>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={'rgba(51,153,255,0.3)'} onPress={() => props.navigation.navigate('Payroll')} style={styles.busHub}>
                        <>
                            <Image source={require('../assets/images/payrollicon.png')} style={{ width: 40, height: 40, marginTop: 5 }} resizeMode={'contain'} />
                            <Text style={[styles.label, { textAlign: 'center', marginBottom: 5 }]}>Payroll</Text>
                        </>
                    </TouchableHighlight>
                </View>
                <View style={{ flex: 3.2 }} />
            </View>
        </LayoutA>
    );
}

BusinessHubScreen.navigationOptions = {
    header: null,
};



export default BusinessHubScreen;