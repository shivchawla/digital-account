import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    TextInput,
    CheckBox
} from 'react-native';

import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({

});


const LoanApplicationDeclarationScreen = (props) => {

    return (
        <Formik

            onSubmit={values => {
                console.log(JSON.stringify(values))
                NavigationService.navigate('ConnectedParties')
            }}
            validationSchema={validationSchema}
        >
            {FormikProps => {

                return (<View style={{ flex: 1, }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10 }}>
                            <TouchableOpacity onPress={props.navigation.openDrawer} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                <Ionicons name="md-more" color={'#4D6BFA'} style={{ fontSize: 30, paddingRight: 20 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.title}>Loan Application</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                            <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                        </View>
                    </View>
                    <View style={{ flex: 9, padding: 10 }}>

                        <View style={{ marginTop: 10 }}>
                            <View>
                                <CheckBox checked={true} />
                                <Text>Daily Stand Up</Text>
                            </View>
                            <View>
                                <CheckBox checked={false} />
                                <Text>Discussion with Client</Text>
                            </View>
                            <View>
                                <CheckBox checked={false} />
                                <Text>Finish list Screen</Text>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Text>Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={FormikProps.handleSubmit} >
                                    <Text>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>)
            }}
        </Formik >
    );
}



LoanApplicationDeclarationScreen.navigationOptions = {
    header: null,
};

export default LoanApplicationDeclarationScreen;
