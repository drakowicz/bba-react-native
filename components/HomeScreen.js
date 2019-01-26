import React from 'react';
import { View, Button, AsyncStorage, StyleSheet } from 'react-native';
import { withTheme } from 'react-native-paper';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    const { colors } = this.props.theme;
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Button title="Client List >" onPress={this._showClients} />
        <Button title="Sign out" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showClients = () => {
    this.props.navigation.navigate('Clients');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withTheme(HomeScreen);
