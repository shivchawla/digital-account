import React from 'react';
import {
  View

} from 'react-native';
import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, Card, CardItem, Thumbnail } from 'native-base';
import SideBar from '../components/SideBar'
import NavigationService from '../navigation/NavigationService'
const DashboardScreen = () => {

  const openDrawer = () => { this.drawer._root.open() };

  const closeDrawer = () => { this.drawer._root.close() };

  return (
    <Drawer
      ref={(ref) => { this.drawer = ref; }}
      content={
        <SideBar navigator={this.navigator} closeDrawer={closeDrawer} navigation={NavigationService} />
      }
      onClose={closeDrawer} >
      <Container>
        <Header style={{ borderBottomWidth: 1, borderColor: '#84A4FD' }}>
          <Left>
            <Button transparent onPress={openDrawer}>
              <Icon name="md-more" style={{ color: '#84A4FD' }} />
            </Button>
          </Left>
          <Body>
            <Title>MYR 18,839.00</Title>
          </Body>
          <Right>
            <Thumbnail small source={{ uri: `https://picsum.photos/200/300` }} />
          </Right>
        </Header>
        <Content>
          <Card transparent >
            <CardItem >
              <View style={{ flexDirection: 'row' }}>
                <Button transparent onPress={() => console.log('button pressed')}>
                  <Text style={{ color: '#000' }}>Send Money</Text>
                </Button>
                <Button transparent>
                  <Text style={{ color: '#000' }}>|</Text>
                </Button>
                <Button transparent onPress={() => NavigationService.navigate('Withdraw')}>
                  <Text style={{ color: '#000' }}>Withdrawal</Text>
                </Button>
              </View>
            </CardItem>
          </Card>
          <Card transparent>
            <CardItem >
              <LinearGradient
                colors={['#84A4FD', '#4D6BFA']}
                style={{ paddingTop: 5, paddingBottom: 5, alignItems: 'center', borderRadius: 10, flex: 1 }}>
                <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                  <Icon name="ios-arrow-back" style={{ color: '#fff', paddingLeft: 20 }} />
                  <Text style={{ color: '#fff' }}>THIS MONTH</Text>
                  <Icon name="ios-arrow-forward" style={{ color: '#fff' }} />
                </View>

                <View style={{ flex: 1, height: Layout.window.height / 5 }}></View>
              </LinearGradient>
            </CardItem>
          </Card>
          <Card transparent >
            <CardItem >
              <Body>
                <Text>Latest Transaction</Text></Body><Right><Text note>More</Text></Right>
            </CardItem>
            <CardItem>
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'red', marginRight: 20 }} />
              <Text>Withdrawal Transfer</Text>
              <Right>
                <Text>RM 100.00</Text>
              </Right>
            </CardItem>
            <CardItem>
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'red', marginRight: 20 }} />
              <Text>Withdrawal Transfer</Text>
              <Right>
                <Text>RM 100.00</Text>
              </Right>
            </CardItem>
            <CardItem>
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'red', marginRight: 20 }} />
              <Text>Withdrawal Transfer</Text>
              <Right>
                <Text>RM 100.00</Text>
              </Right>
            </CardItem>
          </Card>
          <Card transparent>
            <CardItem >
              <Button transparent onPress={openDrawer}>
                <LinearGradient colors={['#84A4FD', '#4D6BFA']} style={{ width: 35, height: 35, borderRadius: 20, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
                  <Icon name="md-more" style={{ color: '#fff' }} />
                </LinearGradient>
              </Button>
            </CardItem>
          </Card>

        </Content>
      </Container>
    </Drawer>
  );
}

DashboardScreen.navigationOptions = {
  header: null,
};

export default DashboardScreen;

