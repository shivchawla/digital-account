import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, FlatList, ScrollView, TouchableWithoutFeedback, TextInput } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const ReportScreen = (props) => {

    useEffect(() => {
        dispatch(actionCreator.getReportList())
    }, [reportList])

    const dispatch = useDispatch()
    const { reportList, filterReportList, filterEnabled } = useSelector(state => state.reportReducer, shallowEqual)

    return (

        <View style={{ flex: 1 }}>
            <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]}>REPORT</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 9 }}>
                <ScrollView>
                    <View style={[styles.screenMargin]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, flex: 1, borderWidth: 1, borderColor: 'lightgrey', padding: 10, borderRadius: 10 }}>
                                <View>
                                    <Ionicons name="ios-search" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                                </View>
                                <TextInput placeholder='Please Enter Keyword' style={{ flex: 4 }} />
                                <TouchableOpacity onPress={props.navigation.openDrawer} >
                                    <Ionicons name="ios-options" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.screenMargin, { flex: 9 }]}>
                            {reportList && <FlatList data={filterEnabled ? filterReportList : reportList} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) =>
                                <View style={styles.box}>
                                    <TouchableWithoutFeedback onPress={() => dispatch(actionCreator.setMarkerReportList(index))} style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                            <Text style={[styles.boldText], { flex: 1 }}>{item.transaction_no}</Text>
                                            <Text style={[styles.boldText], { flex: 1 }}>{item.type}</Text>
                                            <Ionicons name={item.marker ? "md-arrow-dropdown" : "md-arrow-dropright"} color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View style={{ flexDirection: 'row', marginTop: 5, borderBottomWidth: item.marker ? 1 : 0, borderBottomColor: 'lightgrey', }}>
                                    </View>
                                    {item.marker && <View style={{ flex: 1 }}>
                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={[styles.boldText]}>Type</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={[styles.text, { color: '#055E7C' }]}>{item.credit_debit}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={[styles.boldText]}>Amount</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={[styles.text, { color: '#055E7C' }]}>{item.amount}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    }
                                </View>
                            } />}
                        </View>
                    </View>
                </ScrollView>
            </View >
        </View >
    );
}

ReportScreen.navigationOptions = {
    header: null,
};

export default ReportScreen;