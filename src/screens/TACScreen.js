import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

const validationSchema = Yup.object().shape({

    TACNumber: Yup
        .string(),

});

const ChangeNumberScreen = (props) => {

    return (

        <Formik onSubmit={async values => {

            console.log(JSON.stringify(values))

        }}

            validationSchema={validationSchema}>

            {FormikProps => {

                const { TACNumber } = FormikProps.values

                return (

                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>
                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                    <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text numberOfLines={1} style={styles.title} ellipsizeMode='tail'>Change Phone</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                            </View>
                        </View>
                        <View style={{ flex: 9 }}>
                            <View style={[styles.screenMargin, { flex: 3, marginTop: 25 }]}>
                                <Text style={[styles.titleBox, { marginBottom: 25, justifyContent: 'center', flexDirection: 'row' }]}>We have sent TAC to your new number.</Text>
                                <View style={{ justifyContent: 'space-between', flex: 9 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5, height: 25 }}>
                                            <TextInput keyboardType={'number-pad'} autoFocus={true} maxLength={1} placeholder={''} style={[styles.text, { textAlign: 'center', height: 10 }]} />
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5, height: 25  }}>
                                            <TextInput keyboardType={'number-pad'} autoFocus={true} maxLength={1} placeholder={''} style={[styles.text, { textAlign: 'center', height: 10 }]} />
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5, height: 25  }}>
                                            <TextInput keyboardType={'number-pad'} autoFocus={true} maxLength={1} placeholder={''} style={[styles.text, { textAlign: 'center', height: 10 }]} />
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 , height: 25 }}>
                                            <TextInput keyboardType={'number-pad'} autoFocus={true} maxLength={1} placeholder={''} style={[styles.text, { textAlign: 'center', height: 10 }]} />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 25 }}>
                                        <Text style={[styles.text]}>Didn't get TAC number?</Text>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('ChangeNumber')}>
                                            <Text style={[styles.text, { color: '#04A2BD' }]}>Re-send TAC.</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                        </View>
                    </KeyboardAvoidingView>)
            }}
        </Formik >
    );
}

ChangeNumberScreen.navigationOptions = {
    header: null,
};

export default ChangeNumberScreen