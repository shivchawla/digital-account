import React from 'react';
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView, TextInput, ActivityIndicator,ScrollView } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({

    name: Yup
        .string()
        .required()
        .min(3)
        .label('Item Name'),

    sku: Yup
        .string()
        .required()
        .min(3)
        .label('SKU'),

    description: Yup
        .string()
        .required()
        .min(3)
        .label('Description'),

    purchase_price: Yup
         .string()
        .required()
        .label('Purchase Price'),

    sale_price: Yup
         .string()
        .required()
        .label('Sale Price'),

    brand: Yup
        .string()
        .required()
        .min(3)
        .label('Brand'),

    quantity: Yup
         .string()
        .required()
        .label('Quantity'),

});

const ItemAddScreen = (props) => {
    const dispatch = useDispatch()
    const setItem = (val) => dispatch({ type: 'SET_ITEM_DATA', payload: { ...val } });

    return (

        <Formik onSubmit={async values => {
            
            dispatch(actionCreator.passItemData(values))
            props.navigation.navigate("ItemAddSuccess")
            console.log(JSON.stringify(values))

        }}

            validationSchema={validationSchema}>

            {FormikProps => {

                const { name, sku, description, sale_price, purchase_price, quantity, brand } = FormikProps.values

                const nameError = FormikProps.errors.name
                const nameTouched = FormikProps.touched.name

                const skuError = FormikProps.errors.sku
                const skuTouched = FormikProps.touched.sku

                const descriptionError = FormikProps.errors.description
                const descriptionTouched = FormikProps.touched.description

                const sale_priceError = FormikProps.errors.sale_price
                const sale_priceTouched = FormikProps.touched.sale_price

                const purchase_priceError = FormikProps.errors.purchase_price
                const purchase_priceTouched = FormikProps.touched.purchase_price

                const quantityError = FormikProps.errors.quantity
                const quantityTouched = FormikProps.touched.quantity

                const brandError = FormikProps.errors.brand
                const brandTouched = FormikProps.touched.brand

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center' }} keyboardVerticalOffset={20}>
                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.title, { color: '#055E7C' }]}>ITEM DETAILS</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <View style={{ backgroundColor:'rgba(62,194,217,0.5)',borderColor: "#3EC2D9", borderWidth: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="md-person" color={'#fff'} style={{ fontSize: 25 }} />
          </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flex: 9 }}>
                            <ScrollView style={[styles.screenMargin, { flex: 3 }]}>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5, marginTop: 25 }]}>Item Name</Text>
                                    <TextInput value={name} onChangeText={FormikProps.handleChange('name')} onBlur={FormikProps.handleBlur('name')} style={[styles.textInput,{ borderWidth: 1, borderColor: nameTouched && nameError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={nameTouched && nameError ? '' : 'Ubat Gigi Sunshine'} placeholderTextColor={nameTouched && nameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {nameTouched && nameError && <Text style={styles.error}>{nameError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5 }]}>Brand</Text>
                                    <TextInput value={brand} onChangeText={FormikProps.handleChange('brand')} onBlur={FormikProps.handleBlur('brand')} style={[styles.textInput,{ borderWidth: 1, borderColor: brandTouched && brandError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={brandTouched && brandError ? '' : 'Toothpaste 100ml'} placeholderTextColor={brandTouched && brandError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {brandTouched && brandError && <Text style={styles.error}>{brandError}</Text>}
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.titleBox, { marginBottom: 5 }]}>SKU</Text>
                                    <TextInput value={sku} onChangeText={FormikProps.handleChange('sku')} onBlur={FormikProps.handleBlur('sku')} style={[styles.textInput,{ borderWidth: 1, borderColor: skuTouched && skuError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={skuTouched && skuError ? '' : 'JJF-TS-GN'} placeholderTextColor={skuTouched && skuError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {skuTouched && skuError && <Text style={styles.error}>{skuError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5 }]}>Description</Text>
                                    <TextInput value={description} onChangeText={FormikProps.handleChange('description')} onBlur={FormikProps.handleBlur('description')} style={[styles.textInput,{ borderWidth: 1, borderColor: descriptionTouched && descriptionError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={descriptionTouched && descriptionError ? '' : 'Toothpaste 100ml'} placeholderTextColor={descriptionTouched && descriptionError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    {descriptionTouched && descriptionError && <Text style={styles.error}>{descriptionError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5 }]}>Purchase Price</Text>
                                    <TextInput value={sale_price} onChangeText={FormikProps.handleChange('sale_price')} onBlur={FormikProps.handleBlur('sale_price')} style={[styles.textInput,{ borderWidth: 1, borderColor: sale_priceTouched && sale_priceError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={sale_priceTouched && sale_priceError ? '' : 'RM10.00'} placeholderTextColor={sale_priceTouched && sale_priceError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                    {sale_priceTouched && sale_priceError && <Text style={styles.error}>{sale_priceError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5 }]}>Sale Price</Text>
                                    <TextInput value={purchase_price} onChangeText={FormikProps.handleChange('purchase_price')} onBlur={FormikProps.handleBlur('purchase_price')} style={[styles.textInput,{ borderWidth: 1, borderColor: purchase_priceTouched && purchase_priceError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={purchase_priceTouched && purchase_priceError ? '' : 'RM15.00'} placeholderTextColor={purchase_priceTouched && purchase_priceError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                    {purchase_priceTouched && purchase_priceError && <Text style={styles.error}>{purchase_priceError}</Text>}
                                </View>
                                <View style={[styles.formElement]}>
                                    <Text style={[styles.titleBox, { marginBottom: 5 }]}>Quantity</Text>
                                    <TextInput value={quantity} onChangeText={FormikProps.handleChange('quantity')} onBlur={FormikProps.handleBlur('quantity')} style={[styles.textInput,{ borderWidth: 1, borderColor: quantityTouched && quantityError ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0.3)', padding: 5 }]} placeholder={quantityTouched && quantityError ? '' : '15'} placeholderTextColor={quantityTouched && quantityError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                    {quantityTouched && quantityError && <Text style={styles.error}>{quantityError}</Text>}
                                </View>
                            </ScrollView>
                        </View>
                        <View style={{  flexDirection: 'row', alignSelf: 'stretch' }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                                        
                                            <Text style={[styles.butang, { color: '#000000' }]}>Back</Text>
                                        
                                    </TouchableOpacity>
                            <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff' }]}>Submit</Text>}
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}



export default ItemAddScreen