import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const AuthOptionScreen = (props) => {

    useEffect(() => {
        checkDeviceForHardware();
    });

    const [compatible, setCompatible] = useState(false)

    const [switchValue1, setSwitchValue1] = useState(false)
    const [switchValue2, setSwitchValue2] = useState(false)

    // componentDidMount() {
    //     checkDeviceForHardware();
    // }

    const checkDeviceForHardware = async () => {
        let compatible = await Expo.Fingerprint.hasHardwareAsync();
        setCompatible();
        if (!compatible) {
            showIncompatibleAlert();
        }
    };

    const showIncompatibleAlert = () => {
        <Text numberOfLines={1} style={styles.title} ellipsizeMode='tail'>Tak Ada Benda</Text>
    };

    // const toggleSwitch1 = (value) => {
    //     console.log(JSON.stringify(value))
    //     setSwitchValue1(value)
    // }

    // const toggleSwitch2 = (value) => {
    //     console.log(JSON.stringify(value))
    //     setSwitchValue2(value)
    // }

    // return (

    //     <View style={{ flex: 1, }}>
    //         <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
    //             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
    //                 <TouchableOpacity onPress={() => props.navigation.navigate("DataSetting")} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
    //                     <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
    //                 </TouchableOpacity>
    //             </View>
    //             <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
    //                 <Text numberOfLines={1} style={styles.title} ellipsizeMode='tail'>AUTHENTICATION SETTING</Text>
    //             </View>
    //             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
    //                 <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
    //             </View>
    //         </View>
    //         <View style={[styles.screenMargin, { flex: 9 }]}>
    //             <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    //                 {compatible ? <View style={{ flexDirection: 'row', marginTop: 30 }}>
    //                     {/*Text to show the text according to switch condition*/}
    //                     <Text style={[styles.text], { padding: 5 }}>Fingerprint Authentication</Text>
    //                     {/*Switch with value set in constructor*/}
    //                     {/*onValueChange will be triggered after switch condition changes*/}
    //                     {/* <Text style={[styles.text, { color: 'black', marginLeft: 50 }]}>Email Notification</Text> */}
    //                     <Switch style={{ marginLeft: 35, marginRight: 15 }} onValueChange={value => toggleSwitch1(value)} value={switchValue1} />
    //                     <Text style={[styles.text, { color: '#055E7C', marginLeft: 15 }]}>{switchValue1 ? 'ON' : 'OFF'}</Text>
    //                 </View> : <View style={{ flexDirection: 'row', marginTop: 30 }}>
    //                         <Text style={[styles.text], { padding: 5 }}>Passcode</Text>
    //                         <Switch style={{ marginLeft: 15, marginRight: 15 }} onValueChange={value => toggleSwitch2(value)} value={switchValue2} />
    //                         <Text style={[styles.text, { color: '#055E7C', marginLeft: 15 }]}>{switchValue2 ? 'ON' : 'OFF'}</Text>
    //                     </View>}
    //             </View>
    //         </View >
    //     </View >
    // );
}

AuthOptionScreen.navigationOptions = {
    header: null,
};

export default AuthOptionScreen