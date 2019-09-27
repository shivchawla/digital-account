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

            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>Business Directory</Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </View>

            </View>

            <View style={{ flex: 9, padding: 10 }}>

                <ScrollView>

                    <View style={styles.box}>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Name</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>Shawl Publika Sdn. Bhd.</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Phone Number</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>03-3362 408</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.small]}>Industry</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>Fashion & Apparel</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Address</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>No. 2A, Jalan Setia Dagang U13/AK, Seksyen U13, Setia Alam, 40170, Shah Alam, Selangor</Text>
                            </View>

                        </View>

                    </View>

                    <View style={styles.box}>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Name</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>MY Gogoprint Sdn. Bhd.</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Phone Number</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>03-3457 8907</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Industry</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>Printing Service</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Address</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>Wisma E&C, Suite 302, Level 2, No 2, Lorong Dungun Kiri, Bukit Damansara, 50490, Kuala Lumpur</Text>
                            </View>

                        </View>

                    </View>

                    <View style={styles.box}>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Name</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>MY Gogoprint Sdn. Bhd.</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Phone Number</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>03-3457 8907</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Industry</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>Printing Service</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Address</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>Wisma E&C, Suite 302, Level 2, No 2, Lorong Dungun Kiri, Bukit Damansara, 50490, Kuala Lumpur</Text>
                            </View>

                        </View>

                    </View>

                    <View style={styles.box}>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Name</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>MY Gogoprint Sdn. Bhd.</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Phone Number</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>03-3457 8907</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Industry</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>Printing Service</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Address</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>Wisma E&C, Suite 302, Level 2, No 2, Lorong Dungun Kiri, Bukit Damansara, 50490, Kuala Lumpur</Text>
                            </View>

                        </View>

                    </View>

                    <View style={styles.box}>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Name</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>MY Gogoprint Sdn. Bhd.</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Phone Number</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>03-3457 8907</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Industry</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>Printing Service</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Address</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>Wisma E&C, Suite 302, Level 2, No 2, Lorong Dungun Kiri, Bukit Damansara, 50490, Kuala Lumpur</Text>
                            </View>

                        </View>

                    </View>

                    <View style={styles.box}>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Name</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>MY Gogoprint Sdn. Bhd.</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Phone Number</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>03-3457 8907</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Industry</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>Printing Service</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.small}>Address</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.small}>Wisma E&C, Suite 302, Level 2, No 2, Lorong Dungun Kiri, Bukit Damansara, 50490, Kuala Lumpur</Text>
                            </View>

                        </View>

                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, justifyContent: 'space-around', marginBottom: 10 }}>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.small}>Previous</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.small}>1</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.small}>Next</Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>

            </View>

        </View>

    );
}

BusinessDirectoryScreen.navigationOptions = {
    header: null,
};

export default BusinessDirectoryScreen;