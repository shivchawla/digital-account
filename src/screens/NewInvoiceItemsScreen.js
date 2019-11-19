import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, KeyboardAvoidingView, TextInput, ScrollView, DatePickerAndroid, Picker, DatePickerIOS, Modal, Platform } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'
import Constants from 'expo-constants';

const validationSchema = Yup.object().shape({

    type: Yup
        .string()
        .required()
        .label('Type'),

    customer: Yup
        .string()
        .required()
        .label('Customer'),

    issueDate: Yup
        .string()
        .required()
        .label('Issue Date'),

    dueDate: Yup
        .string()
        .required()
        .label('Due Date'),

    invoice_item: Yup
        .string()
        .required()
        .label('Invoice Number'),

    item: Yup
        .string()
        .required()
        .label('item'),

    quantity: Yup
        .string()
        .required()
        .label('quantity'),

    currencyItem: Yup
        .string()
        .required()
        .label('Customer Name'),

    priceItem: Yup
        .string()
        .email()
        .required()
        .label('Customer Email'),

    customerPhone: Yup
        .string()
        .required()
        .label('Customer Phone'),

    customerAddress: Yup
        .string()
        .required()
        .label('Customer Address'),

});

const Newinvoice_itemsScreen = (props) => {
    const [addItemVisible, setItemVisible] = useState(false)



    const dispatch = useDispatch()
    const setInvoiceData = (val) => dispatch({ type: 'SET_INVOICE_APPLICATION', payload: { items: val } });
    const items = useSelector(state => state.invoiceReducer.items, shallowEqual)
    const newInvoice = useSelector(state => state.invoiceReducer.newInvoice, shallowEqual)

    const test = { 'animal[0]': 'kucing', food: 'catfood' }

    //const 'test[0]'='test'

    //useEffect(() => { dispatch(actionCreator.getCustomerList()) }, [])

    // const submitNewInvoice=()=>{
    //     console.log(`inilah new Invoice : ${JSON.stringify(newInvoice)}`)
    //     console.log(`inilah items : ${JSON.stringify(items)}`)

    //     const strNewInvoice=(JSON.stringify(newInvoice)).replace('}','')

    //     var strItems=""
    //     items.map((c,i)=>{
    //         strItems+=`, "invoice_item[${i}]":"${c.invoice_item}",`
    //         strItems+=`"item[${i}]":"${c.item}",`
    //         strItems+=`"quantity[${i}]":"${c.quantity}",`
    //         strItems+=`"currencyItem[${i}]":"${c.currencyItem}",`
    //         strItems+=`"priceItem[${i}]":"${c.priceItem}"`
    //     })

    //     const strNewInvoiceAndItems=strNewInvoice+strItems+"}"

    //     console.log(`ready utk dihantar : ${strNewInvoiceAndItems}`)


    // }

    return (

        <Formik onSubmit={values => {
            // console.log(` ini formik ${JSON.stringify(values)}`)
            // console.log(` ini reducer ${JSON.stringify(values)}`)
            //dispatch(actionCreator.submitNewInvoice())
            const existingItems = []
            items && existingItems.push(...items)
            existingItems.push({ ...values })
            setInvoiceData(existingItems)
            setItemVisible(!addItemVisible)
            //props.navigation.navigate("InvoiceSuccess")

        }}
            initialValues={{ currencyItem: 'MYR' }}
        //validationSchema={validationSchema}
        >
            {FormikProps => {



                const { invoice_item, item, quantity, currencyItem, priceItem } = FormikProps.values



                const invoice_itemError = FormikProps.errors.invoice_item
                const invoice_itemTouched = FormikProps.touched.invoice_item

                const itemError = FormikProps.errors.item
                const itemTouched = FormikProps.touched.item

                const quantityError = FormikProps.errors.quantity
                const quantityTouched = FormikProps.touched.quantity

                const currencyItemError = FormikProps.errors.currencyItem
                const currencyItemTouched = FormikProps.touched.currencyItem

                const priceItemError = FormikProps.errors.priceItem
                const priceItemTouched = FormikProps.touched.priceItem




                /////////////////////

                items && console.log(`inilah dia ${JSON.stringify(items)}`)


                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>
                        <Modal animationType={'slide'}
                            visible={addItemVisible} onRequestClose={() => setItemVisible(!addItemVisible)}
                            transparent={true}
                        ><View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'transparent' }}>
                                <View style={[styles.screenMargin, { backgroundColor: '#fff' }]}>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Invoice Item</Text>
                                        <TextInput value={invoice_item} onChangeText={FormikProps.handleChange('invoice_item')} onBlur={FormikProps.handleBlur('invoice_item')} style={{ borderWidth: 1, borderColor: invoice_itemTouched && invoice_itemError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={invoice_itemTouched && invoice_itemError ? '' : ''} placeholderTextColor={invoice_itemTouched && invoice_itemError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {invoice_itemTouched && invoice_itemError && <Text style={styles.error}>{invoice_itemError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Ref No</Text>
                                        <TextInput value={item} onChangeText={FormikProps.handleChange('item')} onBlur={FormikProps.handleBlur('item')} style={{ borderWidth: 1, borderColor: itemTouched && itemError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={itemTouched && itemError ? '' : ''} placeholderTextColor={itemTouched && itemError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {itemTouched && itemError && <Text style={styles.error}>{itemError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Quantity</Text>
                                        <TextInput value={quantity} onChangeText={FormikProps.handleChange('quantity')} onBlur={FormikProps.handleBlur('quantity')} style={{ borderWidth: 1, borderColor: quantityTouched && quantityError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={quantityTouched && quantityError ? '' : ''} placeholderTextColor={quantityTouched && quantityError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                        {quantityTouched && quantityError && <Text style={styles.error}>{quantityError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Currency</Text>
                                        <TextInput editable={false} value={currencyItem} onChangeText={FormikProps.handleChange('currencyItem')} onBlur={FormikProps.handleBlur('currencyItem')} style={{ borderWidth: 1, borderColor: currencyItemTouched && currencyItemError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={currencyItemTouched && currencyItemError ? '' : ''} placeholderTextColor={currencyItemTouched && currencyItemError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {currencyItemTouched && currencyItemError && <Text style={styles.error}>{currencyItemError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <Text style={[styles.titleBox, { marginBottom: 10 }]}>Price</Text>
                                        <TextInput value={priceItem} onChangeText={FormikProps.handleChange('priceItem')} onBlur={FormikProps.handleBlur('priceItem')} style={{ borderWidth: 1, borderColor: priceItemTouched && priceItemError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={priceItemTouched && priceItemError ? '' : ''} placeholderTextColor={priceItemTouched && priceItemError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                        {priceItemTouched && priceItemError && <Text style={styles.error}>{priceItemError}</Text>}
                                    </View>
                                    <View style={[styles.formElement]}>
                                        <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} ><Text>Add</Text></TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
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
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 9 }}>
                                <ScrollView style={[styles.screenMargin]}>
                                    {/* <View>
                                      <Text>{JSON.stringify(invoiceData)}</Text>
                                  </View> */}
                                    <View style={{ marginTop: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <TouchableOpacity onPress={() => setItemVisible(!addItemVisible)} style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20, backgroundColor: '#34C2DB', borderRadius: 20 }}>
                                            <Text style={[styles.text, { color: '#fff' }]}>Add Item</Text>
                                        </TouchableOpacity>

                                    </View>

                                    <View style={[styles.formElement]}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}><Text>item</Text></View>
                                            <View style={{ flex: 2 }}><Text>invoice_item</Text></View>
                                            <View style={{ flex: 1 }}><Text>qty</Text></View>
                                            <View style={{ flex: 1 }}><Text>price</Text></View>
                                        </View>
                                        {items && items.map((i, n) => <View style={{ flex: 1, flexDirection: 'row' }} key={n}>
                                            <View style={{ flex: 1 }}><Text>{n + 1}</Text></View>
                                            <View style={{ flex: 2 }}><Text>{i.invoice_item}</Text></View>
                                            <View style={{ flex: 1 }}><Text>{i.quantity}</Text></View>
                                            <View style={{ flex: 1 }}><Text>{i.priceItem}</Text></View>
                                        </View>)}
                                    </View>

                                </ScrollView>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 }}>
                                    <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={() => dispatch(actionCreator.submitNewInvoice())} style={{ flex: 1 }}>
                                    <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff' }]}>Submit</Text>}
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >

    );

}

Newinvoice_itemsScreen.navigationOptions = {
    header: null,
};

export default Newinvoice_itemsScreen;