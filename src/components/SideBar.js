import React from 'react';
import {
    TouchableOpacity,
    View
} from 'react-native';
import NavigationService from '../navigation/NavigationService'
import { LinearGradient } from 'expo-linear-gradient'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, Card, CardItem } from 'native-base';
import Constants from 'expo-constants'
const SideBar = (props) => {
    const navigate = (screen) => {
        props.closeDrawer();
        props.navigation.navigate(screen)
    }
    return (
        <LinearGradient
            colors={['#80A0FD', '#4F6DFB']}
            style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
            <Container style={{ flex: 1, backgroundColor: 'transparent',paddingTop: Constants.statusBarHeight, }}>
                <Content >
                    <Card style={{ backgroundColor: 'transparent', borderWidth: 0, borderColor: 'transparent', elevation: 0 }} >
                        <CardItem style={{ flex: 1, backgroundColor: 'transparent' }} button onPress={props.closeDrawer}  >
                            <Icon name="logo-buffer" style={{ color: '#fff' }} /><Body>
                                <Text style={{ color: '#fff' }}>Dashboard</Text>
                            </Body>
                        </CardItem>
                        <CardItem style={{ flex: 1, backgroundColor: 'transparent' }} button onPress={() => navigate('Account')}  >
                            <Icon name="ios-briefcase" style={{ color: '#fff' }} /><Body>
                                <Text style={{ color: '#fff' }}>Account</Text>
                            </Body>
                        </CardItem>
                        <CardItem style={{ flex: 1, backgroundColor: 'transparent' }} button onPress={() => navigate('LoanApplication')}  >
                            <Icon name="ios-create" style={{ color: '#fff' }} /><Body>
                                <Text style={{ color: '#fff' }}>Application</Text>
                            </Body>
                        </CardItem>
                        <CardItem style={{ flex: 1, backgroundColor: 'transparent' }} button onPress={() => console.log('test')}  >
                            <Icon name="ios-pricetags" style={{ color: '#fff' }} /><Body>
                                <Text style={{ color: '#fff' }}>Invoice</Text>
                            </Body>
                        </CardItem>
                        <CardItem style={{ flex: 1, backgroundColor: 'transparent' }} button onPress={() => console.log('test')}  >
                            <Icon name="logo-usd" style={{ color: '#fff' }} /><Body>
                                <Text style={{ color: '#fff' }}>Expenses</Text>
                            </Body>
                        </CardItem>
                        <CardItem style={{ flex: 1, backgroundColor: 'transparent' }} button onPress={() => console.log('test')}  >
                            <Icon name="ios-podium" style={{ color: '#fff' }} /><Body>
                                <Text style={{ color: '#fff' }}>Report</Text>
                            </Body>
                        </CardItem>
                        <CardItem style={{ flex: 1, backgroundColor: 'transparent' }} button onPress={() => console.log('test')}  >
                            <Icon name="ios-link" style={{ color: '#fff' }} /><Body>
                                <Text style={{ color: '#fff' }}>Business Hub</Text>
                            </Body>
                        </CardItem>
                        <CardItem style={{ flex: 1, backgroundColor: 'transparent' }} button onPress={() => console.log('test')}  >
                            <Icon name="ios-help-buoy" style={{ color: '#fff' }} /><Body>
                                <Text style={{ color: '#fff' }}>Support</Text>
                            </Body>
                        </CardItem>
                        <CardItem style={{ flex: 1, backgroundColor: 'transparent' }} button onPress={() => console.log('test')}  >
                            <Icon name="ios-settings" style={{ color: '#fff' }} /><Body>
                                <Text style={{ color: '#fff' }}>Setting</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        </LinearGradient>
    );
}

export default SideBar