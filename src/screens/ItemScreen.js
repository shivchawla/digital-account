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

import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'
import Dot from '../components/Dot'
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({

    customerName: Yup
        .string()
        .required()
        .label('Customer Name'),
    customerEmail: Yup
        .string()
        .email()
        .required()
        .label('Customer Email'),
    currency: Yup
        .string()
        .required()
        .label('Currency'),
});

const ItemScreen = (props) => {
    return (
        <Formik onSubmit={async values => {
            console.log(JSON.stringify(values))
        }}

            validationSchema={validationSchema}>
            {FormikProps => {
                const { itemName, sku, description, salePrice, purchasePrice } = FormikProps.values

                const itemNameError = FormikProps.errors.itemName
                const itemNameTouched = FormikProps.touched.itemName

                const skuError = FormikProps.errors.sku
                const skuTouched = FormikProps.touched.sku

                const descriptionError = FormikProps.errors.description
                const descriptionTouched = FormikProps.touched.description

                const salePriceError = FormikProps.errors.salePrice
                const salePriceTouched = FormikProps.touched.salePrice

                const purchasePriceError = FormikProps.errors.purchasePrice
                const purchasePriceTouched = FormikProps.touched.purchasePrice

                return (
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center' }}>

                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#4D6BFA' }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#4D6BFA'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.title}>Setting</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>

                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                            <Text style={styles.title}>Item</Text>
                        </View>

                        <View style={{ justifyContent: 'space-between', flex: 9 }}>

                            <View style={{ flex: 3, padding: 10, marginRight: 20 }}>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Item's Name</Text>
                                    <TextInput value={itemName} onChangeText={FormikProps.handleChange('itemName')} onBlur={FormikProps.handleBlur('itemName')} style={{ borderWidth: 1, borderColor: itemNameTouched && itemNameError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={itemNameTouched && itemNameError ? '' : 'Ubat Gigi Sunshine'} placeholderTextColor={itemNameTouched && itemNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                </View>

                                {itemNameTouched && itemNameError && <Text style={styles.error}>{itemNameError}</Text>}

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>SKU</Text>
                                    <TextInput value={sku} onChangeText={FormikProps.handleChange('sku')} onBlur={FormikProps.handleBlur('sku')} style={{ borderWidth: 1, borderColor: skuTouched && skuError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={skuTouched && skuError ? '' : 'JJF-TS-GN'} placeholderTextColor={skuTouched && skuError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                </View>

                                {skuTouched && skuError && <Text style={styles.error}>{skuError}</Text>}

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Description</Text>
                                    <TextInput value={description} onChangeText={FormikProps.handleChange('description')} onBlur={FormikProps.handleBlur('description')} style={{ borderWidth: 1, borderColor: descriptionTouched && descriptionError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={descriptionTouched && descriptionError ? '' : 'Toothpaste 100ml'} placeholderTextColor={descriptionTouched && descriptionError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                </View>

                                {descriptionTouched && descriptionError && <Text style={styles.error}>{descriptionError}</Text>}

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Sale Price</Text>
                                    <TextInput value={salePrice} onChangeText={FormikProps.handleChange('salePrice')} onBlur={FormikProps.handleBlur('salePrice')} style={{ borderWidth: 1, borderColor: salePriceTouched && salePriceError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={salePriceTouched && salePriceError ? '' : 'RM10.00'} placeholderTextColor={salePriceTouched && salePriceError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                </View>

                                {salePriceTouched && salePriceError && <Text style={styles.error}>{salePriceError}</Text>}

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={[styles.text, { marginBottom: 5 }]}>Description</Text>
                                    <TextInput value={purchasePrice} onChangeText={FormikProps.handleChange('purchasePrice')} onBlur={FormikProps.handleBlur('purchasePrice')} style={{ borderWidth: 1, borderColor: purchasePriceTouched && purchasePriceError ? '#d94498' : 'rgba(0,0,0,0.3)', padding: 5 }} placeholder={purchasePriceTouched && purchasePriceError ? '' : 'RM15.00'} placeholderTextColor={purchasePriceTouched && purchasePriceError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                </View>

                                {purchasePriceTouched && purchasePriceError && <Text style={styles.error}>{purchasePriceError}</Text>}

                            </View>

                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>

                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1 }}>
                                <LinearGradient colors={['#A4A4A4', '#A4A4A4']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.text, { color: '#fff' }]}>Back</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1 }}>
                                <LinearGradient colors={FormikProps.isValid ? ['#628BFB', '#0E47E8'] : ['rgba(98, 139, 251, 0.5)', 'rgba(14, 71, 232, 0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> :
                                        <Text style={[styles.text, { color: '#fff' }]}>Submit</Text>}
                                </LinearGradient>
                            </TouchableOpacity>

                        </View>

                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}

ItemScreen.navigationOptions = {
    header: null,
};

export default ItemScreen