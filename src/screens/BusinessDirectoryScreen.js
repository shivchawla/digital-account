import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, FlatList, ScrollView } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const BusinessDirectoryScreen = (props) => {
    useEffect(() => {
        dispatch(actionCreator.getBusinessDirectoryList())
    }, [businessDirectoryList])
    const dispatch = useDispatch()

    const { businessDirectoryList } = useSelector(state => state.businessDirectoryReducer, shallowEqual)

    return (

        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title,{}]} numberOfLines={1} ellipsizeMode={'tail'}>Business Directory</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </View>
            </View>
            <View style={{ flex: 9, }}>
                <ScrollView Style={styles.screenMargin}>
                    {businessDirectoryList && <FlatList data={businessDirectoryList} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) =>
                        <View style={[styles.box,styles.shadow, { marginBottom: 15,borderRadius:15 }]}>

                            <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'stretch' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1.2 }}>
                                    <Image source={require('../assets/images/nameicon.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'} />
                                    <Text style={[styles.small, { color: '#04A2BD' }]}>Name</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text style={[styles.small]}>{item.name}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'stretch' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1.2 }}>
                                    <Image source={require('../assets/images/phonenoicon.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'} />
                                    <Text style={[styles.small, { color: '#04A2BD' }]}>Phone No</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text style={[styles.small]}>{item.pNumber}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'stretch' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1.2 }}>
                                    <Image source={require('../assets/images/industryicon.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'} />
                                    <Text style={[styles.small, { color: '#04A2BD' }]}>Industry</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text style={[styles.small]}>{item.industry}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'stretch' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1.2 }}>
                                    <Image source={require('../assets/images/addressicon.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'} />
                                    <Text style={[styles.small, { color: '#04A2BD' }]}>Address</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text style={[styles.small, { flexShrink: 1 }]}>{item.address}</Text>
                                </View>
                            </View>
                        </View>} />}
                </ScrollView>
            </View>
        </View>

    );
}

BusinessDirectoryScreen.navigationOptions = {
    header: null,
};

export default BusinessDirectoryScreen;