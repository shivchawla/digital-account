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


import styles from '../styles/styles'
import Dot from '../components/Dot'

const notificationScreenArray = [{ status: 'out', description: 'RM 50.00 was deducted from your account via withdrawal on 28 July 2019 at 17.28.' },
{ status: 'out', description: 'RM 80.00 was transfered from your account to Afi Hisam Maybank account on 25 July 2019 at 17.24.' },
{ status: 'in', description: '1 July 2019 12.30. Disbursement Transfer for July is RM 4952.00' },
{ status: 'out', description: 'RM 100.00 was transfered from your account to Aisya Ramli RHB Bank account on 25 June 2019 at 11.00.' },
{ status: 'in', description: '1 June 2019 on 12.30. Disbursement Transfer for June is RM 1067.00.' }]

const LogOutScreen = (props) => {
    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#4D6BFA' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>Notification</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <View style={{ backgroundColor:'rgba(62,194,217,0.5)',borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
          </View>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 5, padding: 10, marginRight: 20 }}>
                <FlatList
                    data={notificationScreenArray}
                    renderItem={({ item }) =>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20, marginBottom: 10, marginTop: 10 }}>
                            <Dot color={item.status === 'in' ? 'green' : 'red'} />
                            <Text style={[styles.text, { textAlignVertical: 'top' }]}>{item.description}</Text>
                        </View>} />
            </View>
        </View >
    );
}



export default LogOutScreen