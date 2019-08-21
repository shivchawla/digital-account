import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
  } from 'react-native';

import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
//import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, Card, CardItem, Thumbnail, Grid, Col, Row } from 'native-base';
import { Ionicons } from '@expo/vector-icons';


const AccountScreen = (props) => {

    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10 }}>
                    <TouchableOpacity onPress={props.navigation.openDrawer} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="md-more" color={'#4D6BFA'} style={{ fontSize: 30,paddingRight:20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>Account</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Image source={{ uri: `https://picsum.photos/200/300` }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                </View>
            </View>
            <View style={{ flex: 9, padding: 10 }}>

                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.h2}>Latest Transaction</Text>
                        <Text style={styles.small}>More</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>

                            <Text style={styles.text}>Account Number</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>123456789</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>

                            <Text style={styles.text}>Account Type</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>Business</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>

                            <Text style={styles.text}>Balance</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>RM18,839.00</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>

                            <Text style={styles.text}>Balance</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>RM18,839.00</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>

                            <Text style={styles.text}>Status</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>Active</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>

    );
}


const styles = StyleSheet.create({
    text: {
      fontSize: 17,
      fontFamily: 'Montserrat_medium',
      color: '#000'
    },
    title: {
      fontSize: 17,
      fontFamily: 'Montserrat_medium',
      color: '#4D6BFA',
      fontSize: 17 * 1.4
    },
    h3: {
      fontSize: 17,
      fontFamily: 'Montserrat_medium',
      color: '#000',
      fontSize: 17 * 1.2
    },
    h2: {
      fontSize: 17,
      fontFamily: 'Montserrat_medium',
      color: '#000',
      fontSize: 17 * 1.3
    },
    h1: {
      fontSize: 17,
      fontFamily: 'Montserrat_medium',
      color: '#000',
      fontSize: 17 * 1.4
    }, small: {
      fontSize: 17,
      fontFamily: 'Montserrat_medium',
      color: '#000',
      fontSize: 17 * 0.8
    }
  })
  

AccountScreen.navigationOptions = {
    header: null,
};

export default AccountScreen;
