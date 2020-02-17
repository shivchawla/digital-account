import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, FlatList, ScrollView, TextInput } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const BusinessDirectoryScreen = (props) => {
    useEffect(() => {
        dispatch(actionCreator.getBusinessDirectoryList())
    }, [businessDirectoryList])
    const dispatch = useDispatch()
    const { businessDirectoryList, filterBusinessList, filterEnabled } = useSelector(state => state.businessDirectoryReducer, shallowEqual)
    const [onScreenFilter, setOnScreenFilter] = useState(false)
    const [onScreenFilteredList, setOnScreenFilteredList] = useState([])

    const searchList = (val) => {
        console.log(`keyword  ialah : ${val}`)
        if (val) {
            setOnScreenFilter(true)
            const newList = []
            businessDirectoryList.map(b => {
                b.company_name.includes(val) ? newList.push(b) : b.phone_number.includes(val) ? newList.push(b) : b.industry.includes(val) ? newList.push(b) : b.address.includes(val) ? newList.push(b) : false

            })
            console.log(`new list length ialah : ${newList.length}`)
            setOnScreenFilteredList(newList)

        } else { 
            setOnScreenFilteredList([])
            setOnScreenFilter(false) }

    }

    return (

        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("BusinessHub")} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]} numberOfLines={1} ellipsizeMode={'tail'}>Business Directory</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <View style={{ backgroundColor:'rgba(62,194,217,0.5)',borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
          </View>
                </View>
            </View>
            <View style={{ flex: 9, marginTop: 20 }}>
                <ScrollView Style={styles.screenMargin}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, flex: 1, borderWidth: 1, borderColor: 'lightgrey', padding: 10, borderRadius: 10 }}>
                            <View>
                                <Ionicons name="ios-search" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                            </View>
                             <TextInput placeholder='Please Enter Keyword' style={[styles.searchBar, { flex: 4 }]}  onChangeText={(val) => searchList(val)} />
                            <TouchableOpacity onPress={props.navigation.openDrawer} >
                                <Ionicons name="ios-options" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {businessDirectoryList && <FlatList data={filterEnabled ? filterBusinessList :onScreenFilter?onScreenFilteredList: businessDirectoryList} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) =>
                        <View style={[styles.box,  { marginBottom: 15, borderRadius: 15 }]}>
                            <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'stretch' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex:1 }}>
                                    <Image source={require('../assets/images/nameicon.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                                    <Text style={[styles.small, { color: '#04A2BD', marginLeft: 5 }]}>Name</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text style={[styles.small]}>{item.company_name}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'stretch' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex:1 }}>
                                    <Image source={require('../assets/images/phonenoicon.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                                    <Text style={[styles.small, { color: '#04A2BD', marginLeft: 5 }]}>Phone</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text style={[styles.small]}>{item.phone_number}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'stretch' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex:1 }}>
                                    <Image source={require('../assets/images/industryicon.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                                    <Text style={[styles.small, { color: '#04A2BD', marginLeft: 5 }]}>Industry</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text style={[styles.small]}>{item.industry}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'stretch' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex:1 }}>
                                    <Image source={require('../assets/images/addressicon.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                                    <Text style={[styles.small, { color: '#04A2BD', marginLeft: 5 }]}>Address</Text>
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