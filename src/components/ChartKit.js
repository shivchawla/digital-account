import React from 'react';
import { View } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import { Text } from "react-native-svg"; // Supported builtin module
import Layout from '../constants/Layout'

const ChartKit = () => {

    return (
        <View style={{ flex: 1, padding: 0 }}>

            <LineChart data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
                datasets: [{ data: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100] }]
            }}
                width={Layout.window.width - 40} height={215} yAxisLabel={"$"} yAxisSuffix={"k"} // from react-native 
                chartConfig={{
                    backgroundColor: "#055E7C", backgroundGradientFrom: "#055E7C", backgroundGradientTo: "#055E7C", decimalPlaces: 2, color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,// optional, defaults to 2dp
                    style: { borderRadius: 10 },
                    propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" }
                }}
                bezier style={{
                    marginVertical: 0, borderRadius: 10
                }}
            />
        </View>

    );
}

export default ChartKit