import React from 'react';
import {
    View

} from 'react-native';
import NavigationService from '../navigation/NavigationService'
import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, Card, CardItem, Thumbnail, Grid, Col, Row } from 'native-base';
import SideBar from '../components/SideBar'

const AccountScreen = () => {

    return (
        <Container>
            <Header transparent>
                <Left>
                    <Button transparent onPress={() => NavigationService.goBack()}>
                        <Icon name="ios-arrow-back" style={{ color: '#84A4FD' }} />
                    </Button>
                </Left>
                <Body>
                    <Title>ACCOUNT</Title>
                </Body>
                <Right>
                    <Thumbnail small source={{ uri: `https://picsum.photos/200/300` }} />
                </Right>
            </Header>
            <Content>
                <Card transparent >
                    <CardItem >
                        <Grid>
                            <Row>
                                <Col style={{}}><Text>Account Number</Text></Col>
                                <Col style={{}}><Text>123456789</Text></Col>
                            </Row>
                            <Row>
                                <Col style={{}}><Text>Account Type</Text></Col>
                                <Col style={{}}><Text>Business</Text></Col>
                            </Row>
                            <Row>
                                <Col style={{}}><Text>Balance</Text></Col>
                                <Col style={{}}><Text>18,839.00</Text></Col>
                            </Row>
                            <Row>
                                <Col style={{}}><Text>Status</Text></Col>
                                <Col style={{}}><Text>Active</Text></Col>
                            </Row>
                        </Grid>
                    </CardItem>
                </Card>


            </Content>
        </Container>
    );
}

AccountScreen.navigationOptions = {
    header: null,
};


export default AccountScreen;
