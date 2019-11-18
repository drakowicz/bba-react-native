import React from 'react';
import { Appbar } from 'react-native-paper';
import { createAppContainer, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation-stack';
import ClientDetailScreen from '../components/client/ClientDetailScreen';
import ClientListScreen from '../components/client/ClientListScreen';
import TabBarIcon from '../components/common/TabBarIcon';
import HomeScreen from '../components/HomeScreen';
import AuthLoadingScreen from '../components/login/AuthLoadingScreen';
import AuthScreen from '../components/login/AuthScreen';
import MonthScreen from '../components/calendar/MonthScreen';
import WeekScreen from '../components/calendar/WeekScreen';
import AgendaScreen from '../components/calendar/AgendaScreen';
import ExpenseFormScreen from '../components/expense/ExpenseFormScreen';


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

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: _navOptions,
    }
  },
  {
    navigationOptions: ({
      tabBarLabel: 'Home',
      tabBarIcon: ({ focused, horizontal }) => (
        <TabBarIcon iconName='home' focused={focused} />
      ),
    }),
  }
);

const ExpenseStack = createStackNavigator(
  {
    Expense: {
      screen: ExpenseFormScreen,
      navigationOptions: _navOptions,
    }
  },
  {
    navigationOptions: ({
      tabBarLabel: 'Expense',
      tabBarIcon: ({ focused, horizontal }) => (
        <TabBarIcon iconName='briefcase' focused={focused} />
      ),
    }),
  }
);

const CalendarStack = createStackNavigator(
  {
    Calendar: {
      screen: MonthScreen,
      navigationOptions: _navOptions,
    },
    Week: {
      screen: WeekScreen,
      navigationOptions: _navOptionsBack,
    },
    Agenda: {
      screen: AgendaScreen,
      navigationOptions: _navOptionsBack,
    },
  },
  {
    navigationOptions: ({
      tabBarLabel: 'Calendar',
      tabBarIcon: ({ focused, horizontal }) => (
        <TabBarIcon iconName='calendar' focused={focused} />
      ),
    }),
  }
);

const ClientStack = createStackNavigator(
  {
    Clients: {
      screen: ClientListScreen,
      navigationOptions: _navOptions,
    },
    ClientDetail: {
      screen: ClientDetailScreen,
      navigationOptions: _navOptionsBack,
    },
  },
  {
    navigationOptions: ({
      tabBarLabel: 'Clients',
      tabBarIcon: ({ focused, horizontal }) => (
        <TabBarIcon iconName='person' focused={focused} />
      ),
    }),
  }
);

const AuthStack = createStackNavigator({
  Login: {
    screen: AuthScreen,
    navigationOptions: _navOptions,
  }
});

const AppStack = createBottomTabNavigator({
  HomeStack,
  CalendarStack,
  ExpenseStack,
  ClientStack,
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
