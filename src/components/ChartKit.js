import React from 'react';
import { View, Text,Platform } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
//import { Text } from "react-native-svg"; // Supported builtin module
import Layout from '../constants/Layout'
const web = Platform.OS === 'web' ? true : false
const ChartKit = (props) => {
    const showPopup = props.showPopup
    const propsData = props.data
    //console.log(`props data ialah : ${JSON.stringify(propsData)}`)
    // const data = propsData
    const labels = []
    const value = []
    propsData.map(pd => {
        labels.push(pd.day)
        value.push(pd.balance)
    })

    const valueSample = [
        Math.random() * 1000,
        Math.random() * 1000,
        Math.random() * 1000,
        Math.random() * 1000,
        Math.random() * 1000,
        Math.random() * 1000,
        Math.random() * 1000
    ]
    //tukar nanti pakai value
    const data = {
        labels,

        datasets: [{ data: value, kucing: ['kucing parsi'] }],


    }

    return (
        <View style={{ flex: 1, padding: 0, }}>
            <LineChart data={data}
                width={(web&&Layout.window.width>500)?Layout.window.width/3 - 40:Layout.window.width/3 - 40} height={Layout.window.height > 570 ? 215 : 170} yAxisLabel={""} yAxisSuffix={""} fromZero={false} onDataPointClick={val => props.dataPointClicked(val)}// from react-native 
                chartConfig={{
                    fontSize: 5,
                    backgroundColor: "#055E7C", backgroundGradientFrom: "#055E7C", backgroundGradientTo: "#055E7C", decimalPlaces: 0, color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,// optional, defaults to 2dp
                    style: { borderRadius: 10, },
                    propsForDots: { r: "3", strokeWidth: "1", stroke: "#ffa726" }
                }}
                bezier style={{
                    marginVertical: 0, borderRadius: 10
                }}
            >
            </LineChart>
            <View style={{ position: 'absolute', width: Layout.window.width - 40, height: 215, justifyContent: 'flex-start', alignItems: 'center' }}>
                {showPopup && <View style={{ width: 20, height: 20, backgroundColor: '#000' }}><Text>Kucing</Text></View>}</View>
        </View>
    );
}

export default ChartKit