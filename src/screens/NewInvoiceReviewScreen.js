import React from 'react';
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, FlatList } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import moment from 'moment'

const NewInvoiceReviewScreen = (props) => {

    const submitInvoice = () => {
        dispatch(actionCreator.submitNewInvoice())
        props.navigation.navigate('InvoiceSuccess')
    }

    const dispatch = useDispatch()
    const invoiceNumber = `INV${moment().format('YYMMDDhhmmssSS')}`
    const { newInvoice, items } = useSelector(state => state.invoiceReducer, shallowEqual)
    const invoiceTypeDesc = newInvoice.invoiceType == 1 ? 'To Customer' : 'From Vendor'
    const categoryDesc = newInvoice.category == 2 ? 'Deposit' : newInvoice.category == 3 ? 'Sales' : 'Others'

    return (

        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }} keyboardVerticalOffset={20}>
            <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }]}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.title]}>NEW INVOICE</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <View style={{ backgroundColor:'rgba(62,194,217,0.5)',borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
          </View>
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'space-between', flex: 9 }}>
                <View style={{ flex: 9 }}>
                    <ScrollView style={[styles.screenMargin]}>
                        <View style={{ margin: 5 }} />
                        <View style={[styles.formElement]}>
                            <Text style={[styles.titleBox, { marginBottom: 10 }]}> Type</Text>
                            <Text style={[styles.text, { marginBottom: 10 }]}> {invoiceTypeDesc}</Text>
                        </View>
                        <View style={[styles.formElement]}>
                            <Text style={[styles.titleBox, { marginBottom: 10 }]}> Category</Text>
                            <Text style={[styles.text, { marginBottom: 10 }]}> {categoryDesc}</Text>
                        </View>
                        <View style={[styles.formElement]}>
                            <Text style={[styles.titleBox, { marginBottom: 10 }]}> Invoice Number</Text>
                            <Text style={[styles.text, { marginBottom: 10 }]}> {newInvoice.invoiceNumber}</Text>
                        </View>
                        <View style={[styles.formElement]}>
                            <Text style={[styles.titleBox, { marginBottom: 10 }]}> Invoice Date</Text>
                            <Text style={[styles.text, { marginBottom: 10 }]}> {newInvoice.invoiceDate}</Text>
                        </View>
                        <View style={[styles.formElement]}>
                            <Text style={[styles.titleBox, { marginBottom: 10 }]}> Due Date</Text>
                            <Text style={[styles.text, { marginBottom: 10 }]}> {newInvoice.dueDate}</Text>
                        </View>
                        <View style={[styles.formElement]}>
                            <Text style={[styles.titleBox, { marginBottom: 10 }]}> Name</Text>
                            <Text style={[styles.text, { marginBottom: 10 }]}> {newInvoice.entityName}</Text>
                        </View>
                        <View style={[styles.formElement]}>
                            <Text style={[styles.titleBox, { marginBottom: 10 }]}>Email</Text>
                            <Text style={[styles.text, { marginBottom: 10 }]}> {newInvoice.entityEmail}</Text>
                        </View>
                        <View style={[styles.formElement]}>
                            <Text style={[styles.titleBox, { marginBottom: 10 }]}> Phone</Text>
                            <Text style={[styles.text, { marginBottom: 10 }]}> {newInvoice.entityPhone}</Text>
                        </View>
                        <View style={[styles.formElement]}>
                            <Text style={[styles.titleBox, { marginBottom: 10 }]}>Address</Text>
                            <Text style={[styles.text, { marginBottom: 10 }]}> {newInvoice.entityAddress}</Text>
                        </View>
                        <View style={[styles.formElement]}>
                            <View style={{ margin: 5 }} />
                            {/* <View style={{ flex: 1, flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1, marginBottom: 5, marginTop: 5, padding: 5, borderColor: 'lightgrey' }}>
                                <View style={{ flex: 3 }}><Text>Item</Text></View>
                                <View style={{ flex: 1 }}><Text>Qty</Text></View>
                                <View style={{ flex: 1 }}><Text>Price</Text></View>
                            </View>
                            {items && items.map((i, n) => <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5, padding: 5 }} key={n}>
                                <View style={{ flex: 3 }}><Text>{i.invoice_item}</Text></View>
                                <View style={{ flex: 1 }}><Text>{i.quantity}</Text></View>
                                <View style={{ flex: 1 }}><Text>MYR {i.priceItem}</Text></View>
                            </View>)} */}
                            {items && <FlatList data={items} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) =>
                                <View style={[styles.box]}>
                                    <TouchableWithoutFeedback onPress={() => dispatch(actionCreator.setMarkerInvoiceReview(index))} style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                            <Text style={styles.small}>Item Name</Text>
                                            <Text style={styles.text}>{item.invoice_item}</Text>
                                            <Ionicons name={item.marker ? "md-arrow-dropdown" : "md-arrow-dropright"} color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View style={{ flexDirection: 'row', marginTop: 5, borderBottomWidth: items.marker ? 1 : 0, borderBottomColor: 'lightgrey', }}>
                                    </View>
                                    {item.marker && <View style={{ flex: 1 }}>
                                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.small}>Quantity</Text>
                                                <Text style={styles.text}>{item.quantity}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.small}>Price</Text>
                                                <Text style={styles.text}>MYR {item.priceItem}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.small}>Reference Number</Text>
                                                <Text style={styles.text}> {item.item}</Text>
                                            </View>
                                        </View>
                                    </View>}
                                </View>
                            } />}
                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5, padding: 5 }}>
                                <View style={{ flex: 3 }}>
                                </View>
                                <View style={{ flex: 1 }}><Text style={styles.titleBox}>Total : </Text></View>
                                <View style={{ flex: 1 }}>{newInvoice && <Text style={styles.text}>MYR {newInvoice.amount}</Text>}</View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1,paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => submitInvoice()} style={{ flex: 1 }}>
                        <LinearGradient colors={['#0A6496', '#055E7C']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center',flexDirection: 'row' }}>
                            <Text style={[styles.butang, { color: '#fff' }]}>Submit</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>)
}

NewInvoiceReviewScreen.navigationOptions = {
    header: null,
};

export default NewInvoiceReviewScreen;