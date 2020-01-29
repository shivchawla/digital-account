import React from 'react';
import { View } from 'react-native';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts' // 2.1.0
import { Text } from "react-native-svg"; // Supported builtin module

const RechartsSample = () => {
    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400,
            "amt": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398,
            "amt": 2210
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800,
            "amt": 2290
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908,
            "amt": 2000
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800,
            "amt": 2181
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800,
            "amt": 2500
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300,
            "amt": 2100
        }
    ]

    const dataLineChart = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50]

    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <Text key={index} x={pieCentroid[0]} y={pieCentroid[1]} fill={'white'} textAnchor={'middle'} alignmentBaseline={'middle'} fontSize={20} stroke={'black'} strokeWidth={0.2}                >
                    {data.amount}              </Text>
            )
        })
    }
    return (
        <View style={{ flex: 1, padding: 10 }}>
            <BarChart width={730} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
        </View >

    );
}

export default RechartsSample