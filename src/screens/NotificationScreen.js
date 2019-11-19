import React, { useEffect } from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const NotificationScreen = (props) => {
    useEffect(() => {
        dispatch(actionCreator.getNotificationList())
    }, [notificationList])
    const dispatch = useDispatch()
    const { notificationList } = useSelector(state => state.notificationScreenReducer, shallowEqual)

    return (

        <View style={{ flex: 1, }}>
            <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]} numberOfLines={1} ellipsizeMode={'tail'}>NOTIFICATION</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </TouchableOpacity>
            </View>
            <View style={[styles.screenMargin, { flex: 9, marginTop: 25 }]}>
                {notificationList && <FlatList data={notificationList} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) =>
                    <View style={styles.box}>
                        <TouchableWithoutFeedback onPress={() => dispatch(actionCreator.setMarkers(index))} style={{ flexDirection: 'row', marginTop: 5 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                <Image source={item.status === 'Withdrawal' ? require('../assets/images/withdrawal.png') : item.status === 'Transfer' ? require('../assets/images/transfer.png') : require('../assets/images/disbursement.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                                <View style={flexDirection = 'column'}>
                                    <Text style={[styles.text, { color: item.status === 'Withdrawal' ? '#FA6400' : item.status === 'Transfer' ? '#3EC2D9' : '#019842' }]}>{item.status}</Text>
                                    <Text style={[styles.text]}>{item.title}</Text>
                                </View>
                                <Ionicons name={item.marker ? "md-arrow-dropdown" : "md-arrow-dropright"} color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{ flexDirection: 'row', marginTop: 5, borderBottomWidth: item.marker ? 1 : 0, borderBottomColor: 'lightgrey', }}>
                        </View>
                        {item.marker && <View style={{ flex: 1, marginTop: 15 }}>
                            <Text style={[styles.text]}>{item.description}</Text>
                        </View>
                        }
                    </View>
                } />}
            </View>
        </View >
    );
}

NotificationScreen.navigationOptions = {
    header: null,
};

export default NotificationScreen