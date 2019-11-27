import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import CheckBox from 'react-native-check-box'
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { ScrollView } from 'react-native-gesture-handler';

const LoanDetailScreen = (props) => {

    const { loanData } = useSelector(state => state.loanApplicationReducer, shallowEqual)

    const { isDeclaration1, isDeclaration2, isDeclaration3, isDeclaration4, isDeclaration5, isDeclaration6 } = loanData

    return (

        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>LOAN DETAILS</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </View>
            </View>
            <View style={{ justifyContent: 'space-between', flex: 9 }}>
                <View style={{ flex: 9 }}>
                    {loanData && <ScrollView style={[styles.screenMargin]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Text style={[styles.h2, { marginTop: 15 }]}>Financing</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5 }]}>Total Financing (MYR)</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>{loanData.total_request}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5 }]}>Purpose</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>{loanData.reason_request}</Text>
                        </View>
                        {isDeclaration1 == 1 ? <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5 }]}>Is company connected with SME Bank?</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>Yes</Text>
                        </View> : <View style={{ marginBottom: 10 }}>
                                <Text style={[styles.titleBox, { marginBottom: 5 }]}>Is company connected with SME Bank?</Text>
                                <Text style={[styles.text, { marginBottom: 5 }]}>No</Text>
                            </View>}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Text style={styles.h3}>Declaration</Text>
                        </View>
                        {isDeclaration2 == 1 ? <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <CheckBox onClick={() => console.log('test')} isChecked={true} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                            <Text style={[styles.text, { marginBottom: 5 }]}>Your company controls, or is controlled by Connected Parties (including their close relatives in the case of individuals)</Text>
                        </View> : <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <CheckBox onClick={() => console.log('test')} isChecked={false} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                <Text style={[styles.text, { marginBottom: 5 }]}>Your company controls, or is controlled by Connected Parties (including their close relatives in the case of individuals)</Text>
                            </View>}
                        {isDeclaration3 == 1 ? <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <CheckBox onClick={() => console.log('test')} isChecked={true} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                            <Text style={[styles.text, { marginBottom: 5 }]}>Your company influences, or is influenced by Connected Parties (including their close relatives in the case of individuals)</Text>
                        </View> : <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <CheckBox onClick={() => console.log('test')} isChecked={false} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                <Text style={[styles.text, { marginBottom: 5 }]}>Your company influences, or is influenced by Connected Parties (including their close relatives in the case of individuals)</Text>
                            </View>}
                        {isDeclaration4 == 1 ? <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <CheckBox onClick={() => console.log('test')} isChecked={true} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                            <Text style={[styles.text, { marginBottom: 5 }]}>Connected Parties (including their close relatives) is a director, partner, executive officer, agent or guarantor of your company, your subsidiaries and/or entities controlled by your company.</Text>
                        </View> : <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <CheckBox onClick={() => console.log('test')} isChecked={false} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                <Text style={[styles.text, { marginBottom: 5 }]}>Connected Parties (including their close relatives) is a director, partner, executive officer, agent or guarantor of your company, your subsidiaries and/or entities controlled by your company.</Text>
                            </View>}
                        {isDeclaration5 == 1 ? <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <CheckBox onClick={() => console.log('test')} isChecked={true} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                            <Text style={[styles.text, { marginBottom: 5 }]}>Your company is a subsidiary of, or an entity that is controlled by, SME Bank and its Connected Parties (including their close relatives).</Text>
                        </View> : <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <CheckBox onClick={() => console.log('test')} isChecked={false} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                <Text style={[styles.text, { marginBottom: 5 }]}>Your company is a subsidiary of, or an entity that is controlled by, SME Bank and its Connected Parties (including their close relatives).</Text>
                            </View>}
                        {isDeclaration6 == 1 ? <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <CheckBox onClick={() => console.log('test')} isChecked={true} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                            <Text style={[styles.text, { marginBottom: 5 }]}>Your company is guaranteed by SME Bank's Connected Parties (including their close relatives)</Text>
                        </View> : <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <CheckBox onClick={() => console.log('test')} isChecked={false} checkBoxColor={'rgba(0,0,0,0.3)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                <Text style={[styles.text, { marginBottom: 5 }]}>Your company is guaranteed by SME Bank's Connected Parties (including their close relatives)</Text>
                            </View>}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Text style={styles.h3}>Connected Parties</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5 }]}>Capacity</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>{loanData.capacity}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5 }]}>Name</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>{loanData.party_name}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5 }]}>MyKad</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>{loanData.personnel_ic}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5 }]}>Relationship</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>{loanData.relation}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5 }]}>Bank Name</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>{loanData.personnel_name}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.titleBox, { marginBottom: 5 }]}>Email</Text>
                            <Text style={[styles.text, { marginBottom: 5 }]}>{loanData.personnel_email}</Text>
                        </View>
                    </ScrollView>}
                </View>
            </View>
        </KeyboardAvoidingView>)
}


LoanDetailScreen.navigationOptions = {
    header: null,
};

export default LoanDetailScreen;