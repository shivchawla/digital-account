import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView } from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { ScrollView } from 'react-native-gesture-handler';

const CustomerDetailScreen = (props) => {

    useEffect(() => {
        const id = props.route.params?.id??'NA'
        dispatch(actionCreator.getCustomerData(id))
    }, [customerData])
    const dispatch = useDispatch()

    const { customerData } = useSelector(state => state.customerReducer, shallowEqual)

    return (

        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>CUSTOMER DETAIL</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <View style={{ backgroundColor:'rgba(62,194,217,0.5)',borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
          </View>
                </View>
            </View>
            <View style={{ justifyContent: 'space-between', flex: 9 }}>
                <View style={{ flex: 9 }}>
                    <ScrollView style={[styles.screenMargin, { paddingLeft: 0, paddingRight: 0 }]}>
                        {customerData && <View style={[styles.box, { marginTop: 20 }]}>
                            <View style={{ marginTop: 5, borderBottomWidth: 1, borderBottomColor: 'lightgrey', paddingBottom: 20 }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                    <Text style={styles.small}>Customer ID</Text>
                                    <Ionicons name="md-arrow-dropdown" color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                                </View>
                                <Text style={styles.text}>{customerData.id}</Text>
                            </View>
                            <View style={{ justifyContent: 'space-between', marginTop: 20 }}>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 10 }]}>Name</Text>
                                    <Text style={styles.text}>{customerData.name}</Text>
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 10 }]}>Email</Text>
                                    <Text style={styles.text}>{customerData.email}</Text>
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 10 }]}>Currency</Text>
                                    <Text style={styles.text}>{customerData.currency}</Text>
                                </View>
                            </View>
                        </View>}
                    </ScrollView>
                </View>
            </View>
        </KeyboardAvoidingView>)
}

CustomerDetailScreen.navigationOptions = {
    header: null,
};

export default CustomerDetailScreen;