import React from 'react';
import { View } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import { Text } from "react-native-svg"; // Supported builtin module
import Layout from '../constants/Layout'

const ChartKit = (props) => {

    const propsData = props.data
    //console.log(`props data ialah : ${JSON.stringify(propsData)}`)
    // const data = propsData
    const labels = []
    const value = []
    propsData.map(pd => {
        labels.push(pd.day)
        value.push(pd.balance)
    })

    const data = {
        labels,

        datasets: [{ data: value, kucing: ['kucing parsi'] }],


    }

    return (
        <View style={{ flex: 1, padding: 0 }}>

            <LineChart data={data}
                width={Layout.window.width - 40} height={215} yAxisLabel={"MYR "} yAxisSuffix={""} fromZero={false} onDataPointClick={val => console.log(`tekan : ${JSON.stringify(val)}`)}// from react-native 
                chartConfig={{
                    backgroundColor: "#055E7C", backgroundGradientFrom: "#055E7C", backgroundGradientTo: "#055E7C", decimalPlaces: 0, color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,// optional, defaults to 2dp
                    style: { borderRadius: 10 },
                    propsForDots: { r: "3", strokeWidth: "1", stroke: "#ffa726" }
                }}
                bezier style={{
                    marginVertical: 0, borderRadius: 10
                }}
            />
        </View>

    );
}

export default ChartKit