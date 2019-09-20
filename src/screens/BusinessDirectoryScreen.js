import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ScrollView
} from 'react-native';


import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const BusinessDirectoryScreen = (props) => {
    const score = 80

    const scoreColor = score > 66 ? '#7ED321' : score > 33 ? 'yellow' : 'red'

    return (

        <View style={{ flex: 1, }}>

            <ScrollView>

                <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#055E7C' }}>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                            <Ionicons name="ios-arrow-back" color={'#055E7C'} style={{ fontSize: 30, paddingLeft: 20 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.title, { color: '#055E7C' }]}>Business Directory</Text>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                        <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                    </View>

                </View>

                <View style={{ flex: 9, padding: 10 }}>

                    <View style={{ borderRadius: 5, margin: 15, padding: 15, borderColor: '#808080', borderWidth: 1 }}>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Name</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Shawl Publika Sdn. Bhd.</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Phone Number</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>03-3362 408</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Industry</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Fashion & Apparel</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Address</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>No. 2A, Jalan Setia Dagang U13/AK, Seksyen U13, Setia Alam, 40170, Shah Alam, Selangor</Text>
                            </View>

                        </View>

                    </View>

                    <View style={{ borderRadius: 5, margin: 15, marginTop: 15, padding: 15, borderColor: '#808080', borderWidth: 1 }}>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Name</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>MY Gogoprint Sdn. Bhd.</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Phone Number</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>03-3457 8907</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Industry</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Printing Service</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Address</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Wisma E&C, Suite 302, Level 2, No 2, Lorong Dungun Kiri, Bukit Damansara, 50490, Kuala Lumpur</Text>
                            </View>

                        </View>

                    </View>

                    <View style={{ borderRadius: 5, margin: 15, marginTop: 15, padding: 15, borderColor: '#808080', borderWidth: 1 }}>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Name</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>MY Gogoprint Sdn. Bhd.</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Phone Number</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>03-3457 8907</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Industry</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Printing Service</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Address</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Wisma E&C, Suite 302, Level 2, No 2, Lorong Dungun Kiri, Bukit Damansara, 50490, Kuala Lumpur</Text>
                            </View>

                        </View>

                    </View>

                    <View style={{ borderRadius: 5, margin: 15, marginTop: 15, padding: 15, borderColor: '#808080', borderWidth: 1 }}>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Name</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>MY Gogoprint Sdn. Bhd.</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Phone Number</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>03-3457 8907</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Industry</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Printing Service</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Address</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Wisma E&C, Suite 302, Level 2, No 2, Lorong Dungun Kiri, Bukit Damansara, 50490, Kuala Lumpur</Text>
                            </View>

                        </View>

                    </View>

                    <View style={{ borderRadius: 5, margin: 15, marginTop: 15, padding: 15, borderColor: '#808080', borderWidth: 1 }}>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Name</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>MY Gogoprint Sdn. Bhd.</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Phone Number</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>03-3457 8907</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Industry</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Printing Service</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Address</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Wisma E&C, Suite 302, Level 2, No 2, Lorong Dungun Kiri, Bukit Damansara, 50490, Kuala Lumpur</Text>
                            </View>

                        </View>

                    </View>

                    <View style={{ borderRadius: 5, margin: 15, marginTop: 15, padding: 15, borderColor: '#808080', borderWidth: 1 }}>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Name</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>MY Gogoprint Sdn. Bhd.</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Phone Number</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>03-3457 8907</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Industry</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Printing Service</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Address</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.small, { color: '#055E7C' }]}>Wisma E&C, Suite 302, Level 2, No 2, Lorong Dungun Kiri, Bukit Damansara, 50490, Kuala Lumpur</Text>
                            </View>

                        </View>

                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, justifyContent: 'space-evenly', marginBottom: 10 }}>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.small, { color: '#055E7C' }]}>Previous</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.small, { color: '#055E7C' }]}>1</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.small, { color: '#055E7C' }]}>Next</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </ScrollView>

        </View>

    );
}

BusinessDirectoryScreen.navigationOptions = {
    header: null,
};

export default BusinessDirectoryScreen;