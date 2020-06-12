import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import * as actionCreator from '../store/actions/action'
import { useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import { CustomFormAction, CustomTextInput } from '../components/Custom'
import LayoutA from '../Layout/LayoutA';
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
    const [offSet, setOffSet] = useState(true)
    useEffect(() => {
        const open = () => setOffSet(false)
        const off = () => setOffSet(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates



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

                    <>
                        <LayoutA
                            title={'ITEM DETAILS'}
                            screenType='form'
                            navigation={props.navigation}
                            nopadding
                        >
                            <ScrollView style={[styles.screenMargin, { flex: 3 }]}>
                                <CustomTextInput
                                    label={`Item Name`}
                                    value={name}
                                    handleChange={FormikProps.handleChange(`name`)}
                                    handleBlur={FormikProps.handleBlur('name')}
                                    touched={nameTouched}
                                    error={nameError}
                                    placeholder={'Ubat Gigi Sunshine'}

                                />
                                <CustomTextInput
                                    label={`Brand`}
                                    value={brand}
                                    handleChange={FormikProps.handleChange(`brand`)}
                                    handleBlur={FormikProps.handleBlur('brand')}
                                    touched={brandTouched}
                                    error={brandError}
                                    placeholder={'Toothpaste 100ml'}

                                />
                                <CustomTextInput
                                    label={`SKU`}
                                    value={sku}
                                    handleChange={FormikProps.handleChange(`sku`)}
                                    handleBlur={FormikProps.handleBlur('sku')}
                                    touched={skuTouched}
                                    error={skuError}
                                    placeholder={'JJF-TS-GN'}

                                />
                                <CustomTextInput
                                    label={`Description`}
                                    value={description}
                                    handleChange={FormikProps.handleChange(`description`)}
                                    handleBlur={FormikProps.handleBlur('description')}
                                    touched={descriptionTouched}
                                    error={descriptionError}
                                    placeholder={'Toothpaste 100ml'}

                                />
                                <CustomTextInput
                                    label={`Purchase Price`}
                                    value={sale_price}
                                    handleChange={FormikProps.handleChange(`sale_price`)}
                                    handleBlur={FormikProps.handleBlur('sale_price')}
                                    touched={purchase_priceTouched}
                                    error={purchase_priceError}
                                    placeholder={'RM10.00'}
                                    keyboardType={'decimal-pad'}

                                />
                                <CustomTextInput
                                    label={`Sale Price`}
                                    value={purchase_price}
                                    handleChange={FormikProps.handleChange(`purchase_price`)}
                                    handleBlur={FormikProps.handleBlur('purchase_price')}
                                    touched={sale_priceTouched}
                                    error={sale_priceError}
                                    placeholder={'RM15.00'}
                                    keyboardType={'decimal-pad'}

                                />
                                <CustomTextInput
                                    label={`Quantity`}
                                    value={quantity}
                                    handleChange={FormikProps.handleChange(`quantity`)}
                                    handleBlur={FormikProps.handleBlur('quantity')}
                                    touched={quantityTouched}
                                    error={quantityError}
                                    placeholder={'15'}
                                    keyboardType={'decimal-pad'}

                                />
                            </ScrollView>
                            <CustomFormAction
                                navigation={props.navigation}
                                isValid={FormikProps.isValid}
                                handleSubmit={FormikProps.handleSubmit}
                                isSubmitting={FormikProps.isSubmitting}

                            />
                        </LayoutA>
                    </>)
            }}
        </Formik >
    );
}



export default ItemAddScreen