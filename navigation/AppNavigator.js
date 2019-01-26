import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import ClientListScreen from '../components/client/ClientListScreen';
import HomeScreen from '../components/HomeScreen';
import AuthLoadingScreen from '../components/login/AuthLoadingScreen';
import AuthScreen from '../components/login/AuthScreen';
import { Appbar } from 'react-native-paper';
import ClientDetailScreen from '../components/client/ClientDetailScreen';

const _navOptionsBack = ({ navigation, navigationOptions }) => ({
  title: 'bla',
  header: (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title={navigationOptions.title} />
    </Appbar.Header>
  ),
});
const _navOptions = ({ navigationOptions }) => ({
  title: 'bla',
  header: (
    <Appbar.Header>
      <Appbar.Content title={navigationOptions.title} />
    </Appbar.Header>
  ),
});

const AppStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: _navOptions,
  },
  Clients: {
    screen: ClientListScreen,
    navigationOptions: _navOptionsBack,
  },
  ClientDetail: {
    screen: ClientDetailScreen,
    navigationOptions: _navOptionsBack,
  },
});

const AuthStack = createStackNavigator({
  Login: {
    screen: AuthScreen,
    navigationOptions: _navOptions,
  }
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
