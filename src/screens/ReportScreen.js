import React, { useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    FlatList,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const ReportScreen = (props) => {

    useEffect(() => {
        dispatch(actionCreator.getReportList())
    }, [reportList])

    const dispatch = useDispatch()

    const { reportList } = useSelector(state => state.reportReducer, shallowEqual)

    return (

        <View style={{ flex: 1 }}>
            <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <Text style={[styles.h2, { color: '#055E7C' }]}>Report</Text>
                            <TouchableOpacity onPress={props.navigation.openDrawer} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { paddingRight: 5, color: '#055E7C' }]}>Search</Text>
                                <Ionicons name="ios-arrow-forward" color={'#055E7C'} style={{ fontSize: 15, paddingRight: 5 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 5, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '055E7C', paddingTop: 3, paddingBottom: 3 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.text]}>Transaction Number</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.text]}>type</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.text]}>Type</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.text]}>Currency</Text>
                            </View>
                        </View>
                        {/* <View>
                            <Text>{JSON.stringify(reportList)}</Text>
                        </View> */}
                        <View style={[styles.screenMargin, { flex: 9 }]}>
                            {reportList && <FlatList data={reportList} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) =>
                                <View style={styles.box}>
                                    <TouchableWithoutFeedback onPress={() => dispatch(actionCreator.setMarkerReportList(index))} style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                            <Text style={[styles.text]}>{item.transaction_no}</Text>
                                            <Text style={[styles.text]}>{item.type}</Text>
                                            <Ionicons name={item.marker ? "md-arrow-dropdown" : "md-arrow-dropright"} color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View style={{ flexDirection: 'row', marginTop: 5, borderBottomWidth: item.marker ? 1 : 0, borderBottomColor: 'lightgrey', }}>
                                    </View>
                                    {item.marker && <View style={{ flex: 1 }}>
                                        <Text style={[styles.text]}>{item.credit_debit}</Text>
                                        <Text style={[styles.text]}>{item.amount}</Text>
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

ReportScreen.navigationOptions =
    {
        header: null,
    };

export default ReportScreen;