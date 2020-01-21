import React from 'react';
import { View, Text, } from 'react-native';


const KucingScreen = (props) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Testing</Text>
            <Wow />
        </View>
    );
}


const Wow = (props) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Test</Text>
        </View>
    );
}


export default KucingScreen;