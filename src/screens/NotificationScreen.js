import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    FlatList,
    TextInput
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'
import Dot from '../components/Dot'

const notificationScreenArray = [{ status: 'out', description: 'RM 50.00 was deducted from your account via withdrawal on 28 July 2019 at 17.28.' },
{ status: 'out', description: 'RM 80.00 was transfered from your account to Afi Hisam Maybank account on 25 July 2019 at 17.24.' },
{ status: 'in', description: '1 July 2019 12.30. Disbursement Transfer for July is RM 4952.00' },
{ status: 'out', description: 'RM 100.00 was transfered from your account to Aisya Ramli RHB Bank account on 25 June 2019 at 11.00.' },
{ status: 'in', description: '1 June 2019 on 12.30. Disbursement Transfer for June is RM 1067.00.' }]

const NotificationScreen = (props) => {

    return (

        <View style={{ flex: 1, }}>

            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={props.navigation.openDrawer} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="md-more" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]}>Notification</Text>
                </View>

                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </TouchableOpacity>

            </View>

            <View style={[styles.screenMargin, { flex: 9 }]}>

                <FlatList
                    data={notificationScreenArray}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
                            <Dot color={item.status === 'in' ? 'green' : 'red'} />
                            <Text style={[styles.text, { textAlignVertical: 'top', paddingRight: 50 }]}>{item.description}</Text>
                        </View>

                    } />
            </View>

        </View >

    );
}

NotificationScreen.navigationOptions = {
    header: null,
};

export default NotificationScreen