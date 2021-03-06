import React from 'react';
import { View, TouchableOpacity, Text,Image } from 'react-native';


import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'



const LayoutA = (props) => {



    return (

        <View style={{ flex: 1, }}>

            {props.screenType === 'registration' ? 
            <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 10 }}>
                    <Text numberOfLines={1} style={[styles.title]} ellipsizeMode='head'>{props.title}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={require('../assets/images/logosmall.png')} style={{ width: 50, height: 50, borderRadius: 15 }} />
                </View>
            </View> : <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: !(props.screenType === 'dashboard') ? 1 : 0, borderColor: '#9ADAF4' }]}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                        <TouchableOpacity onPress={() => !(props.screenType === 'dashboard') ? props.navigation.goBack() : props.navigation.openDrawer()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                            <Ionicons name={!(props.screenType === 'dashboard') ? "ios-arrow-back" : "md-more"} color={'#3EC2D9'} style={{ fontSize: 30 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.title]} numberOfLines={1} ellipsizeMode={'tail'}>{props.title}</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Profile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                        </View>
                    </TouchableOpacity>
                </View>}


            <View style={{ justifyContent: 'space-between', flex: 9 }}>
                {!((props.screenType === 'form')||(props.screenType === 'registration')) ?
                 <View style={[styles.screenMargin, props.nopadding && styles.noPadding, (props.row||props.list) && { flex: 1}]}>{props.children}</View> 
                 : props.children}
            </View >
        </View >

    );
}


export default LayoutA;