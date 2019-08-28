import React from 'react';
import {
    View,
} from 'react-native';


const Dot = (props) => {
    return (
        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: props.color, marginRight: 20 }} />
    )
}

export default Dot;