import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';


import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'



const LayoutA = (props) => {



    return (

        <View style={{ flex: 1, }}>
            <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: !(props.screenType==='dashboard')?1:0, borderColor: '#9ADAF4' }]}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={() => !(props.screenType==='dashboard')?props.navigation.navigate('Dashboard'):props.navigation.openDrawer} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name={!(props.screenType==='dashboard')?"ios-arrow-back":"md-more"} color={'#3EC2D9'} style={{ fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]}>{props.title}</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'space-between', flex: 9 }}>
            {!(props.screenType==='form')?<View style={[styles.screenMargin]}>{props.children}</View>:props.children}
            </View >
        </View >

    );
}


export default LayoutA;