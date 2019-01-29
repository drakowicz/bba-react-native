import React from 'react';
import { AsyncStorage, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, TextInput, withTheme } from 'react-native-paper';

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
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <KeyboardAvoidingView style={{ flex: 1, padding: 50 }} behavior='padding' enabled  >
          <ScrollView style={{ flex: 1 }}>
            <TextInput style={styles.input} autoCorrect={false} label='Email' placeholder={'email'} value={this.state.username} onChangeText={(value) => { this.setState({ username: value }) }} />
            <TextInput secureTextEntry={true} autoCorrect={false} style={styles.input} label='Password' value={this.state.password} placeholder={'password'} onChangeText={(value) => { this.setState({ password: value }) }} />
            <View style={styles.btnView}>
              <Button style={styles.button} mode='contained' onPress={this.loginAsync}>Login</Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
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
    padding: 20,
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
