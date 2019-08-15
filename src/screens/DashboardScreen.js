import React from 'react';
import {

} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer } from 'native-base';
import SideBar from '../components/SideBar'

export default DashboardScreen = () => {

  const openDrawer = () => { this.drawer._root.open() };

  const closeDrawer = () => { this.drawer._root.close() };

  return (
    <Drawer ref={(ref) => { this.drawer = ref; }} content={<SideBar navigator={this.navigator} />} onClose={closeDrawer} >
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>
            This is Content Section
          </Text>
          <Button transparent onPress={openDrawer}>
            <Text>
              Open Drawer
          </Text>
          </Button>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </Drawer>
  );
}

DashboardScreen.navigationOptions = {
  header: null,
};

