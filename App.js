import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AppRegistry } from 'react-native';
import { DarkTheme, DefaultTheme, Provider as PaperProvider, Text as Text1, TextInput } from 'react-native-paper';
import Main from './Main';
import AppNavigator from './navigation/AppNavigator';

const theme = {
  // ...DarkTheme,
  ...DefaultTheme,
  // colors: {
  //   ...DefaultTheme.colors,
  //   //primary: 'tomato',
  //   //accent: 'yellow',
  // },
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1 }}>
        <AppNavigator />
        {/* <Main /> */}
      </View>
    </PaperProvider>
  );
}

// AppRegistry.registerComponent('app', () => App);
