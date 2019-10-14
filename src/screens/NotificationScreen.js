import React, { useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Text,
    Image,
    FlatList
} from 'react-native';
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
                    <TouchableOpacity onPress={props.navigation.openDrawer} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="md-more" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]} numberOfLines={1} ellipsizeMode={'tail'}>NOTIFICATION</Text>
                </View>

                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </TouchableOpacity>

            </View>

            <View style={[styles.screenMargin, { flex: 9 }]}>
                {notificationList && <FlatList data={notificationList} keyExtractor={(item, index) => index.toString()} renderItem={({ item,index }) =>
                    <View style={styles.box}>
                        <TouchableWithoutFeedback onPress={() => dispatch(actionCreator.setMarkers(index))} style={{ flexDirection: 'row', marginTop: 5 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                <Text style={styles.small}>Invoice No</Text>
                                <Ionicons name={item.markers ? "md-arrow-dropdown" : "md-arrow-dropright"} color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{ flexDirection: 'row', marginTop: 5, borderBottomWidth: item.marker ? 1 : 0, borderBottomColor: 'lightgrey', }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.text}>1234567890</Text>
                            </View>
                        </View>
                        {item.marker && <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.small}>Type</Text>
                                    <Text style={styles.text}>Vendor</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.small}>Date</Text>
                                    <Text style={styles.text}>[date]</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.small}>Currency</Text>
                                    <Text style={styles.text}>RM</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.small}>Amount</Text>
                                    <Text style={styles.text}>9</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.small}>Customer Name</Text>
                                    <Text style={styles.text}>Puteri Nursyahirah</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.small}>Customer Email</Text>
                                    <Text style={styles.text}>puterimuhd@gmail.com</Text>
                                </View>
                            </View>
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