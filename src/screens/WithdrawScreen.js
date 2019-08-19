import React from 'react';
import {
    View

} from 'react-native';
import NavigationService from '../navigation/NavigationService'
import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, Card, CardItem, Thumbnail, Grid, Col, Row, Form, Item, Label, Input } from 'native-base';
import SideBar from '../components/SideBar'

const WithdrawScreen = () => {

    return (
        <Container>
            <Header transparent>
                <Left>
                    <Button transparent onPress={() => NavigationService.goBack()}>
                        <Icon name="ios-arrow-back" style={{ color: '#84A4FD' }} />
                    </Button>
                </Left>
                <Body>
                    <Title>Withdrawal</Title>
                </Body>
                <Right>
                    <Thumbnail small source={{ uri: `https://picsum.photos/200/300` }} />
                </Right>
            </Header>
            <Content>
            <Form>
            <Item floatingLabel>
              <Label>Bank</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Amount</Label>
              <Input />
            </Item>
          </Form>


            </Content>
        </Container>
    );
}

WithdrawScreen.navigationOptions = {
    header: null,
};

export default WithdrawScreen