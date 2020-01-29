//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    Image,

    Text,
    TouchableOpacity,
    View,
    Animated,
    Easing,


} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants'

import Layout from '../constants/Layout'

import styles from '../styles/styles'

class WelcomeScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.logo = new Animated.Value(0)
        this.intro = new Animated.Value(0)
        this.buttons = new Animated.Value(0)
    }

    animate() {
        Animated.stagger(1000, [
            Animated.timing(this.logo, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }),
            Animated.timing(this.intro, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }),
            Animated.timing(this.buttons, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }),
        ]).start();
    }

    componentDidMount() {
        this.animate()

    }

    render() {

        const logoOpac = this.logo.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1,]
        })

        const introOpac = this.intro.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1,]
        })

        const buttonsOpac = this.buttons.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1,]
        })


        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            <Animated.Image source={require('../assets/images/logo.png')} style={{ opacity: logoOpac, height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                            <Animated.Text style={[styles.text, { opacity: introOpac }]}>Welcome to Digital Account! Sign up now to join us or login to your account</Animated.Text>
                            <View style={{ marginTop: 10, alignSelf: 'stretch', flexDirection: 'row' }}>
                                <Animated.View style={{ opacity: buttonsOpac, flex: 1 }}>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Intro')} style={{ paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: 'lightgrey', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                                        <Text style={[styles.butang, { color: '#000' }]}>Sign Up</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={{ borderWidth: 1, borderColor: '#A30000', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                        <LinearGradient
                                            colors={['rgba(163, 0, 0, 0.5)', '#A30000']}
                                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={[styles.butang, { color: '#fff', marginTop: 5, marginBottom: 5 }]}>Log In</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>

                        </View>
                    </View>
                </View>
            </View >
        );
    }
}

export default WelcomeScreen