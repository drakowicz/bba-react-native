import React from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, withTheme } from 'react-native-paper';

class AuthScreen extends React.Component {
  static title = 'Login';
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: 'test@test.com',
      password: 'test',
    }
  }

  render() {
    const { colors } = this.props.theme;
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <TextInput style={styles.input} label='Email' placeholder={'email'} value={this.state.username} onChangeText={(value) => { this.setState({ username: value }) }} />
        <TextInput secureTextEntry={true} style={styles.input} label='Password' value={this.state.password} placeholder={'password'} onChangeText={(value) => { this.setState({ password: value }) }} />
        <View style={styles.btnView}>
          <Button style={styles.button} mode='contained' onPress={this.loginAsync}>Login</Button>
        </View>
      </View>
    );
  }

  loginAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    console.log("login state: " + JSON.stringify(this.state));
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: 50,
    padding: 14,
  },
  input: {
    marginBottom: 14,
  },
  btnView: {
    alignItems: 'center',
  },
  button: {
    marginTop: 30,
    width: '50%',
  },
});

export default withTheme(AuthScreen);
