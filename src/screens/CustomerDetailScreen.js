import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView } from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { ScrollView } from 'react-native-gesture-handler';
import LayoutA from '../Layout/LayoutA';
const CustomerDetailScreen = (props) => {

    useEffect(() => {
        const id = props.route.params?.id??'NA'
        dispatch(actionCreator.getCustomerData(id))
    }, [customerData])
    const dispatch = useDispatch()

    const { customerData } = useSelector(state => state.customerReducer, shallowEqual)

    return (

        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
            <LayoutA
            title={'CUSTOMER DETAIL'}
            screenType='form'
            navigation={props.navigation}
            nopadding
        >
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
            </LayoutA>
        </KeyboardAvoidingView>)
}



export default CustomerDetailScreen;