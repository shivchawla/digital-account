import React, { useEffect } from 'react';
import { Notifications } from 'expo';
import { Image, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import ImageSlider from 'react-native-image-slider';
import { useDispatch } from 'react-redux'
import styles from '../styles/styles'
import { Ionicons } from '@expo/vector-icons';

//import * as actionCreator from '../store/actions/action'

const IntroScreen = (props) => {
    const images =
        [
            { id: 1, title: 'Welcome to Digital Account! Sign up now to join us or login to your account', screenshotUri: require('../assets/images/screenshots/1.jpeg') },
            { id: 1, title: 'Welcome to Digital Account! Sign up now to join us or login to your account', screenshotUri: require('../assets/images/screenshots/2.jpeg') },
            { id: 1, title: 'Welcome to Digital Account! Sign up now to join us or login to your account', screenshotUri: require('../assets/images/screenshots/3.jpeg') },
            { id: 1, title: 'Welcome to Digital Account! Sign up now to join us or login to your account', screenshotUri: require('../assets/images/screenshots/4.jpeg') },
            { id: 1, title: 'Welcome to Digital Account! Sign up now to join us or login to your account', screenshotUri: require('../assets/images/screenshots/5.jpeg') },
        ]

    const dispatch = useDispatch()

    getExpoToken = async () => {

        let token = await Notifications.getExpoPushTokenAsync();
        console.log(`expo token ialah ${token}`)
        dispatch({ type: 'SET_REGISTER', payload: { expo_token: token } })
        console.log(JSON.stringify({
            token: { value: token, }, user: { username: 'Brent', },
        }))
    }

    useEffect(() => {
        //checkUpdate()
        getExpoToken();

    }, [])

    return (

        <View style={{ flex: 1 }}>
            <View style={{ justifyContent: 'space-between', flex: 9 }}>
                <View style={{ flex: 9, margin: 10 }}>
                    <ImageSlider style={{ flex: 10, alignSelf: 'stretch', backgroundColor: 'transparent' }} loop autoPlayWithInterval={3000} images={images} customSlide={({ index, item, style }) => (item &&
                        <View key={index} style={[style, { backgroundColor: 'transparent' }]}>
                            <Image source={item.screenshotUri} resizeMode={'contain'} style={{ height: undefined, width: undefined, flex: 1, }} />
                            <Text style={[styles.text, { alignSelf: 'center', textAlign: 'center', marginLeft: 15, marginRight: 15, marginBottom: 10, marginTop: 10, padding: 10 }]}>
                                {item.title}
                            </Text>
                        </View>
                    )}
                        customButtons={(position, move) => (
                            <View style={[styles.buttons, { paddingTop: 10, flexDirection: 'row', justifyContent: 'center' }]}>
                                {images.map((image, index) => (
                                    <TouchableHighlight key={index} underlayColor="#ccc" onPress={() => move(index)} style={[styles.button, position === index && styles.buttonSelected, { margin: 5 }]} >
                                     
                                        {position === index ? <Ionicons name={'ios-radio-button-on'} size={15} color={'#055e7c'} style={{}} /> :
                                            <Ionicons name={'ios-radio-button-off'} size={15} color={'lightgrey'} style={{}} /> }
                                    </TouchableHighlight>
                                ))}
                            </View>
                        )}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Welcome')} style={{ flex: 1 }}>
                        <LinearGradient colors={['#fff', '#fff']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', borderColor: '#D3D3D3', borderWidth: 1 }}>
                            <Text style={[styles.butang, { color: 'lightgrey' }]}>Later</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Agreement')} style={{ flex: 1 }}>
                        <LinearGradient colors={['#055e7c', '#055e7c']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.butang, { color: '#fff' }]}>Next</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

IntroScreen.navigationOptions = {
    header: null,
};

export default IntroScreen;