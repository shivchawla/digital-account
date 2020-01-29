import React from 'react';
import { View } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { Text } from "react-native-svg"; // Supported builtin module
import Layout from '../constants/Layout'

const VictoryCharts = () => {
    const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
    ];
    const dataLineChart = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50]

    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <Text key={index} x={pieCentroid[0]} y={pieCentroid[1]} fill={'white'} textAnchor={'middle'} alignmentBaseline={'middle'} fontSize={20} stroke={'black'} strokeWidth={0.2}>
                    {data.amount}</Text>
            )
        })
    }
    return (
        <View style={{ flex: 1, padding: 10 }}>
            <VictoryChart width={350} theme={VictoryTheme.material}>
                <VictoryBar data={data} x="quarter" y="earnings" />
            </VictoryChart>
        </View >

    );
}

export default VictoryCharts