import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,

} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'

const LoanScreen = (props) => {

    return (

        <View style={{ flex: 1, }}>

            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>

                    <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title, { color: '#055E7C' }]}>Loan Application</Text>
                </View>

                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </TouchableOpacity>

            </View>

            <View style={[styles.screenMargin, { flex: 9 }]}>

                <View style={{ marginTop: 10, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'flex-end' }}>

                    <TouchableOpacity onPress={() => props.navigation.navigate('LoanApplication')} style={{ padding: 5, paddingLeft: 8, paddingRight: 8, backgroundColor: '#055E7C', borderRadius: 5 }}>
                        <Text style={[styles.text, { color: '#fff' }]}>New</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ marginTop: 10 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <Text style={[styles.h2, { color: '#04A2BD' }]}>Loan</Text>

                        <TouchableOpacity onPress={props.navigation.openDrawer} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.small, { paddingRight: 5, color: '#055E7C' }]}>Search</Text>
                            <Ionicons name="ios-arrow-forward" color={'#055E7C'} style={{ fontSize: 15, paddingRight: 5 }} />
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '055E7C', paddingTop: 3, paddingBottom: 3 }}>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, { color: '#055E7C' }]}>Ref</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, { color: '#055E7C' }]}>Date</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, { color: '#055E7C' }]}>Type</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.text, { color: '#055E7C' }]}>Status</Text>
                        </View>

                    </View>

                    <TouchableOpacity onPress={() => props.navigation.navigate('LoanDetail')} style={{ flexDirection: 'row', marginTop: 5 }}>

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
                            <Text style={[styles.text, { color: 'navy' }]}>Submitted</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate('LoanDetail')} style={{ flexDirection: 'row', marginTop: 5 }}>

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
                            <Text style={[styles.text, { color: 'hotpink' }]}>Declined</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate('LoanDetail')} style={{ flexDirection: 'row', marginTop: 5 }}>
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
                            <Text style={[styles.text, { color: 'orange' }]}>Pending Agreement</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate('LoanDetail')} style={{ flexDirection: 'row', marginTop: 5 }}>

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
                            <Text style={[styles.text, { color: 'olive' }]}>Approved</Text>
                        </View>

                    </TouchableOpacity>

                </View>

            </View >

        </View >

    );
}

LoanScreen.navigationOptions = {
    header: null,
};

export default LoanScreen;