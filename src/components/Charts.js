import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    TextInput,

    ImageBackground
} from 'react-native';
import { PieChart, Labels } from 'react-native-svg-charts' // 2.1.0
import { Text } from "react-native-svg"; // Supported builtin module

import { Constants, LinearGradient } from 'expo'
import styles from '../styles/styles'


const Charts = () => {
    const data = [
        {
            key: 1,
            amount: 50,
            svg: { fill: '#600080' },
        },
        {
            key: 2,
            amount: 50,
            svg: { fill: '#9900cc' }
        },
        {
            key: 3,
            amount: 40,
            svg: { fill: '#c61aff' }
        },
        {
            key: 4,
            amount: 95,
            svg: { fill: '#d966ff' }
        },
        {
            key: 5,
            amount: 35,
            svg: { fill: '#ecb3ff' }
        }
    ]

    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <Text
                    key={index}
                    x={pieCentroid[0]}
                    y={pieCentroid[1]}
                    fill={'white'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={20}
                    stroke={'black'}
                    strokeWidth={0.2}
                >
                    {data.amount}
                </Text>
            )
        })
    }
    return (
        <View style={{ flex: 1 }}>
            <PieChart
                style={{ flex: 1, width: undefined, height: undefined }}
                valueAccessor={({ item }) => item.amount}
                data={data}
                spacing={0}
                outerRadius={'95%'}
            >
                <Labels />
            </PieChart>
        </View>

    );
}

export default Charts

