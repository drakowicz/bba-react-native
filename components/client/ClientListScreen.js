import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, StyleSheet, View } from 'react-native';
import { Divider, List, TouchableRipple, withTheme } from 'react-native-paper';
import ActionButton, { ActionButtonItem } from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

class ClientListScreen extends React.Component {
  static navigationOptions = {
    title: "Clients",
  };
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: true,
      initLoad: true,
      data: []
    };
  }

  componentDidMount() {
    this._onRefresh();
  }

  _onRefresh = () => {
    isRefreshing: true,
      this.setState({ isRefreshing: true });
    setTimeout(function () {
      if (this.state.isRefreshing) {
        this.setState({
          isRefreshing: false,
          initLoad: false,
          data: _testClients,
        });
      }
    }.bind(this), 750);
  }

  render() {
    const { colors } = this.props.theme;
    if (this.state.initLoad) {
      return (
        <View style={[styles.empty, { backgroundColor: colors.background }]}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh} />
            }
            data={this.state.data}
            renderItem={this._renderItem}
            ItemSeparatorComponent={() => <Divider />}
          />
          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("Tapped")}>
              <Icon name="New" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </View>
      </SafeAreaView>
    );
  }

  _renderItem = ({ item }) => (
    <TouchableRipple onPress={() => this._itemPressed(item.id)} >
      <List.Item
        title={item.name}
        description={item.phone}
        left={(props) => <List.Icon {...props} icon="person" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
    </TouchableRipple>
  );

  _itemPressed(clientId) {
    console.log('pressed');
    this.props.navigation.navigate('ClientDetail', { id: clientId });
  }
}

const _testClients = [
  { key: '11', name: 'Customer 1', phone: '(111) 123-4444' },
  { key: '12', name: 'Customer 2', phone: '(111) 123-4444' },
  { key: '13', name: 'Customer 3', phone: '(111) 123-4444' },
  { key: '14', name: 'Customer 4', phone: '(111) 123-4444' },
  { key: '15', name: 'Customer 5', phone: '(111) 123-4444' },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default withTheme(ClientListScreen);
