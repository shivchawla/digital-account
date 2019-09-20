import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,

} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'

const ReportScreen = (props) => {

    return (

        <View style={{ flex: 1, }}>

            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#055E7C' }}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>

                    <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#055E7C'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title, { color: '#055E7C' }]}>Report</Text>
                </View>

                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </TouchableOpacity>

            </View>

            <View style={{ flex: 9, padding: 10 }}>

                <View style={{ marginTop: 10 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <Text style={[styles.h2, { color: '#055E7C' }]}>Report</Text>

                        <TouchableOpacity onPress={props.navigation.openDrawer} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.small, { paddingRight: 5, color: '#055E7C' }]}>Search</Text>
                            <Ionicons name="ios-arrow-forward" color={'#055E7C'} style={{ fontSize: 15, paddingRight: 5 }} />
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '055E7C', paddingTop: 3, paddingBottom: 3 }}>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>Ref</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>Date</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>Type</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>Currency</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, { marginLeft: 25 }]}>Action</Text>
                        </View>

                    </View>

                    <TouchableOpacity onPress={() => props.navigation.navigate('ReportDetail')} style={{ flexDirection: 'row', marginTop: 5 }}>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>112009</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>12/3/2019</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>Item</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>RM</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, { marginLeft: 25 }]}>View</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate('ReportDetail')} style={{ flexDirection: 'row', marginTop: 5 }}>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>112009</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>12/3/2019</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>Item</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>RM</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, { marginLeft: 25 }]}>View</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate('ReportDetail')} style={{ flexDirection: 'row', marginTop: 5 }}>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>112009</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>12/3/2019</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>Item</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>RM</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, { marginLeft: 25 }]}>View</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate('ReportDetail')} style={{ flexDirection: 'row', marginTop: 5 }}>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>112009</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>12/3/2019</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>Item</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text]}>RM</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, { marginLeft: 25 }]}>View</Text>
                        </View>

                    </TouchableOpacity>

                </View>

            </View >

        </View >

    );
}

ReportScreen.navigationOptions = {
    header: null,
};

export default ReportScreen;