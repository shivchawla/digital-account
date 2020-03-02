import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import CheckBox from 'react-native-check-box'
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { ScrollView } from 'react-native-gesture-handler';
import LayoutA from '../Layout/LayoutA';

const LoanDetailScreen = (props) => {

    const { loanData } = useSelector(state => state.loanApplicationReducer, shallowEqual)
    const { isDeclaration1, isDeclaration2, isDeclaration3, isDeclaration4, isDeclaration5, isDeclaration6 } = loanData

    return (

        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
            <LayoutA
                title={'LOAN DETAILS'}
                screenType='form'
                navigation={props.navigation}
                nopadding
            >
                    <View style={{ flex: 9 }}>
                        {loanData && <ScrollView style={[styles.screenMargin]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                <Text style={[styles.h2, { marginTop: 15 }]}>Financing</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={[styles.titleBox, { marginBottom: 5, fontSize: 17, fontFamily: 'Montserrat_medium', }]}>Total Financing (MYR)</Text>
                                <Text style={[styles.text, { marginBottom: 5 }]}>{loanData.total_request}</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={[styles.titleBox, { marginBottom: 5, fontSize: 17, fontFamily: 'Montserrat_medium', }]}>Purpose</Text>
                                <Text style={[styles.text, { marginBottom: 5 }]}>{loanData.reason_request}</Text>
                            </View>
                            {isDeclaration1 == 1 ? <View style={{ marginBottom: 10 }}>
                                <Text style={[styles.titleBox, { marginBottom: 5, fontSize: 17, fontFamily: 'Montserrat_medium', }]}>Is company connected with SME Bank?</Text>
                                <Text style={[styles.text, { marginBottom: 5 }]}>Yes</Text>
                            </View> : <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, fontSize: 17, fontFamily: 'Montserrat_medium', }]}>Is company connected with SME Bank?</Text>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>No</Text>
                                </View>}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                <Text style={[styles.h2]}>Declaration</Text>
                            </View>
                            {isDeclaration2 == 1 ? <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={[styles.text, { marginBottom: 5 }]}>1) Your company controls, or is controlled by Connected Parties (including their close relatives in the case of individuals)</Text>
                            </View> : <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Your company controls, or is controlled by Connected Parties (including their close relatives in the case of individuals)</Text>
                                </View>}
                            {isDeclaration3 == 1 ? <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={[styles.text, { marginBottom: 5 }]}>2) Your company influences, or is influenced by Connected Parties (including their close relatives in the case of individuals)</Text>
                            </View> : <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Your company influences, or is influenced by Connected Parties (including their close relatives in the case of individuals)</Text>
                                </View>}
                            {isDeclaration4 == 1 ? <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={[styles.text, { marginBottom: 5 }]}>3) Connected Parties (including their close relatives) is a director, partner, executive officer, agent or guarantor of your company, your subsidiaries and/or entities controlled by your company.</Text>
                            </View> : <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Connected Parties (including their close relatives) is a director, partner, executive officer, agent or guarantor of your company, your subsidiaries and/or entities controlled by your company.</Text>
                                </View>}
                            {isDeclaration5 == 1 ? <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={[styles.text, { marginBottom: 5 }]}>4) Your company is a subsidiary of, or an entity that is controlled by, SME Bank and its Connected Parties (including their close relatives).</Text>
                            </View> : <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Your company is a subsidiary of, or an entity that is controlled by, SME Bank and its Connected Parties (including their close relatives).</Text>
                                </View>}
                            {isDeclaration6 == 1 ? <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={[styles.text, { marginBottom: 5 }]}>5) Your company is guaranteed by SME Bank's Connected Parties (including their close relatives)</Text>
                            </View> : <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Your company is guaranteed by SME Bank's Connected Parties (including their close relatives)</Text>
                                </View>}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                <Text style={[styles.h2]}>Connected Parties</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={[styles.titleBox, { marginBottom: 5, fontSize: 17, fontFamily: 'Montserrat_medium', }]}>Capacity</Text>
                                <Text style={[styles.text, { marginBottom: 5 }]}>{loanData.capacity}</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={[styles.titleBox, { marginBottom: 5, fontSize: 17, fontFamily: 'Montserrat_medium', }]}>Name</Text>
                                <Text style={[styles.text, { marginBottom: 5 }]}>{loanData.party_name}</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={[styles.titleBox, { marginBottom: 5, fontSize: 17, fontFamily: 'Montserrat_medium', }]}>MyKad</Text>
                                <Text style={[styles.text, { marginBottom: 5 }]}>{loanData.personnel_ic}</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={[styles.titleBox, { marginBottom: 5, fontSize: 17, fontFamily: 'Montserrat_medium', }]}>Relationship</Text>
                                <Text style={[styles.text, { marginBottom: 5 }]}>{loanData.relation}</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={[styles.titleBox, { marginBottom: 5, fontSize: 17, fontFamily: 'Montserrat_medium', }]}>Bank Name</Text>
                                <Text style={[styles.text, { marginBottom: 5 }]}>{loanData.personnel_name}</Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={[styles.titleBox, { marginBottom: 5, fontSize: 17, fontFamily: 'Montserrat_medium', }]}>Email</Text>
                                <Text style={[styles.text, { marginBottom: 5 }]}>{loanData.personnel_email}</Text>
                            </View>
                        </ScrollView>}
                    </View>
              </LayoutA>
        </KeyboardAvoidingView>)
    }
    
    
    
    
export default LoanDetailScreen;