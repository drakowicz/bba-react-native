import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DarkTheme, DefaultTheme, Provider as PaperProvider, Text as Text1, TextInput} from 'react-native-paper';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(JSON.stringify(this.context));
    const { colors } = this.props.theme;
    return (
      <View>
        <Text1>Open up App.js to start working on your app!</Text1>
        <Text style={{color: colors.primary}}>Open up App.js to start working on your app!</Text>
        <TextInput value={"test1"} placeholder="Name" />
        <TextInput value="test2" placeholder="Name2" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
