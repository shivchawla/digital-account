import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, Image, KeyboardAvoidingView, TextInput, ScrollView, Modal, Picker, FlatList, Platform } from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'
import Constants from 'expo-constants';

const validationSchema = Yup.object().shape({
    invoice_item: Yup
        .string()
        .min(3, 'Too short!')
        .required()
        .label('Item Name'),
    item: Yup
        .string()
        .min(3, 'Too short!')
        .required()
        .label('Reference No'),
    quantity: Yup
        .string()
        .required()
        .label('quantity'),
    priceItem: Yup
        .string()
        .required()
        .label('Price'),
});

const NewInvoiceItemsScreen = (props) => {
    const ios = Platform.OS === "ios" ? true : false
    const [addItemVisible, setItemVisible] = useState(false)
    const dispatch = useDispatch()
    const setInvoiceData = (val) => {
        const amount = val.reduce((total, i) => total + (i.quantity * i.priceItem), 0)

        //simplify kejap lagi
        dispatch({ type: 'SET_INVOICE_APPLICATION', payload: { items: val } })
        dispatch({ type: 'SET_INVOICE_APPLICATION', payload: { newInvoice: { ...newInvoice, amount } } })
    };
    const { newInvoice, items } = useSelector(state => state.invoiceReducer, shallowEqual)

    useEffect(() => {
        dispatch(actionCreator.getItemList())
    }, [itemList])
    //const dispatch = useDispatch()
    const { itemList, } = useSelector(state => state.itemReducer, shallowEqual)
    const [iosItemPicker, setIosItemPicker] = useState(false)

    return (

        <Formik onSubmit={(values, actions) => {
            const existingItems = []
            items && existingItems.push(...items)
            existingItems.push({ ...values })
            setInvoiceData(existingItems)
            setItemVisible(!addItemVisible)
            actions.resetForm({ currencyItem: 'MYR', quantity: '1' })
        }}
            initialValues={{ currencyItem: 'MYR', quantity: '1', itemId: null }}
            validationSchema={validationSchema}
        >
            {FormikProps => {

                const { invoice_item, item, quantity, currencyItem, priceItem, itemId } = FormikProps.values

                const invoice_itemError = FormikProps.errors.invoice_item
                const invoice_itemTouched = FormikProps.touched.invoice_item

                const itemError = FormikProps.errors.item
                const itemTouched = FormikProps.touched.item

                const itemIdError = FormikProps.errors.itemId
                const itemIdTouched = FormikProps.touched.itemId

                const quantityError = FormikProps.errors.quantity
                const quantityTouched = FormikProps.touched.quantity

                const priceItemError = FormikProps.errors.priceItem
                const priceItemTouched = FormikProps.touched.priceItem

                const changeItemDetail = (itemValue, itemIndex) => {
                    if (itemValue != null) {
                        const { name, sale_price } = itemList.find(c => c.id === itemValue)
                        FormikProps.setFieldValue('itemId', itemValue)
                        FormikProps.setFieldValue('invoice_item', name)
                        FormikProps.setFieldValue('priceItem', (sale_price * quantity).toFixed(2).toString())

                    }
                }

                const changePrice = () => {
                    const { sale_price } = itemList.find(c => c.id === itemId)
                    quantity < 1 ? FormikProps.setFieldValue('quantity', '1') : null
                    FormikProps.setFieldValue('priceItem', (sale_price * quantity).toFixed(2).toString())
                }

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }} keyboardVerticalOffset={20}>
                        <Modal animationType={'slide'} visible={addItemVisible} onRequestClose={() => setItemVisible(!addItemVisible)} transparent={true}>

                            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(1,1,1,0.5)' }}>
                                <View style={{ flex: 10, justifyContent: 'flex-end' }}>
                                    <View style={[styles.screenMargin, { backgroundColor: '#fff', borderTopWidth: 1, borderColor: 'lightgrey' }]}>
                                        <View style={{ margin: 5 }} />
                                        {ios ? <View style={[styles.formElement]}>
                                            <Text style={[styles.titleBox, { marginBottom: 10 }]}>Invoice Item</Text>
                                            <View style={{ marginTop: 10, alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', justifyContent: 'center' }}>
                                                <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => setIosItemPicker(!iosItemPicker)}><Text>{iosItemPicker ? `Confirm!` : `Select Item`}</Text></TouchableOpacity>
                                            </View>
                                        </View> :
                                            <View style={[styles.formElement]}>
                                                <Text style={[styles.titleBox, { marginBottom: 10 }]}>Invoice Item</Text>
                                                {itemList && <Picker selectedValue={itemId} onValueChange={(itemValue, itemIndex) => changeItemDetail(itemValue, itemIndex)}>
                                                    <Picker.Item label={'Please select'} value={null} />
                                                    {itemList && itemList.map(c => <Picker.Item label={c.name} value={c.id} key={c.id} />)}
                                                </Picker>}
                                            </View>}
                                        {iosItemPicker ? <View>
                                            <View style={[styles.formElement]}>
                                                {itemList && <Picker selectedValue={itemId} onValueChange={(itemValue, itemIndex) => changeItemDetail(itemValue, itemIndex)}>
                                                    <Picker.Item label={'Please select'} value={null} />
                                                    {itemList && itemList.map(c => <Picker.Item label={c.name} value={c.id} key={c.id} />)}
                                                </Picker>}
                                            </View>

                                        </View> : <View>
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
                                                    <TextInput value={quantity} onChangeText={FormikProps.handleChange('quantity')} onBlur={() => changePrice()} style={{ borderWidth: 1, borderColor: quantityTouched && quantityError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={quantityTouched && quantityError ? '' : ''} placeholderTextColor={quantityTouched && quantityError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                                    {quantityTouched && quantityError && <Text style={styles.error}>{quantityError}</Text>}
                                                </View>
                                                <View style={[styles.formElement]}>
                                                    <Text style={[styles.titleBox, { marginBottom: 10 }]}>Price</Text>
                                                    <View style={{ flexDirection: 'row', alignSelf: 'stretch', }}>
                                                        <Text style={{ flex: 1 }}>{currencyItem}</Text>
                                                        <TextInput value={priceItem} onChangeText={FormikProps.handleChange('priceItem')} onBlur={FormikProps.handleBlur('priceItem')} style={{ alignSelf: 'stretch', flex: 8, borderWidth: 1, borderColor: priceItemTouched && priceItemError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={priceItemTouched && priceItemError ? '' : ''} placeholderTextColor={priceItemTouched && priceItemError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                                    </View>
                                                    {priceItemTouched && priceItemError && <Text style={styles.error}>{priceItemError}</Text>}
                                                </View>
                                            </View>}

                                    </View>
                                </View>
                                {!iosItemPicker && <View style={{ flexDirection: 'row', alignSelf: 'stretch', backgroundColor: '#fff' }}>
                                    <TouchableOpacity onPress={() => setItemVisible(!addItemVisible)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, borderColor: '#D3D3D3', borderWidth: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff' }}>
                                        <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                        <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                            <Text style={[styles.butang, { color: '#fff' }]}>Save</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>}
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
                                <View style={{ backgroundColor: 'rgba(62,194,217,0.5)', borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <View style={{ flex: 9 }}>
                                <View style={{ flex: 9 }}>
                                    <ScrollView style={[styles.screenMargin]}>
                                        <View style={[styles.formElement]}>
                                            <View style={{ margin: 5 }} />
                                            {items && <FlatList data={items} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) =>
                                                <View style={[styles.box]}>
                                                    <TouchableWithoutFeedback onPress={() => dispatch(actionCreator.setMarkerInvoiceItem(index))} style={{ flexDirection: 'row', marginTop: 5 }}>
                                                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                                            <Text style={styles.small}>Item Name</Text>
                                                            <Text style={styles.text}>{item.invoice_item}</Text>
                                                            <Ionicons name={item.marker ? "md-arrow-dropdown" : "md-arrow-dropright"} color={'#34C2DB'} style={{ fontSize: 25, paddingRight: 5 }} />
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                    <View style={{ flexDirection: 'row', marginTop: 5, borderBottomWidth: item.marker ? 1 : 0, borderBottomColor: 'lightgrey', }}>
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
                                                <View style={{ flex: 2 }}>
                                                    <TouchableOpacity onPress={() => setItemVisible(!addItemVisible)} style={{ width: 20, height: 20, backgroundColor: '#34C2DB', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={[styles.text, { color: '#fff' }]}>+</Text>
                                                    </TouchableOpacity></View>
                                                <View style={{ flex: 1 }}><Text style={styles.h3}>Total : </Text></View>
                                                <View style={{ flex: 2 }}>{newInvoice && <Text style={styles.h3}>MYR {newInvoice.amount && newInvoice.amount.toFixed(2)}</Text>}</View>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 }}>
                                    <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.butang, { color: '#000000', padding: 10 }]}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={!items} onPress={() => props.navigation.navigate('NewInvoiceReview')} style={{ flex: 1 }}>
                                    <LinearGradient colors={items ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.butang, { color: '#fff', padding: 10 }]}>Review</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >

    );

}

NewInvoiceItemsScreen.navigationOptions = {
    header: null,
};

export default NewInvoiceItemsScreen;