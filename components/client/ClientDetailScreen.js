
import React from 'react';
import { ScrollView, ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { Button, TextInput, TouchableRipple, Text, withTheme, RadioButton } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class ClientDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, id: props.navigation.getParam('cid', 0) };
  }

  static navigationOptions = {
    title: 'Client',
  };

  componentDidMount() {
    setTimeout(function () {
      if (this.state.isLoading) {
        this.setState(_testUser);
        this.setState({ isLoading: false });
      }
    }.bind(this), 1000);
  }

  render() {
    const { colors } = this.props.theme;
    const { isLoading } = this.state;

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled
        ExtraScrollHeight={60} >
        <ScrollView>
          <View onLayout={this.layoutChange} style={[styles.container, { backgroundColor: colors.background }]}>
            <ActivityIndicator animating={isLoading} size='large' />
            {/* {isLoading && (<ActivityIndicator size='large' />)} */}
            <TextInput style={styles.input} value={this.state.name} label='Name' placeholder="Name" onChangeText={(value) => this.setState({ name: value })} />
            <TextInput style={styles.input} value={this.state.lastName} label='Last Name' placeholder="Last Name" onChangeText={(value) => this.setState({ lastName: value })} />
            <TextInput style={styles.input} value={this.state.phone} label='Phone' placeholder="Phone" keyboardType='numeric' onChangeText={(value) => this.setState({ phone: value })} />
            <TextInput style={styles.input} value={this.state.wphone} label='Work Phone' placeholder="Work Phone" keyboardType='numeric' onChangeText={(value) => this.setState({ wphone: value })} />
            <TextInput style={styles.input} value={this.state.hphone} label='Home Phone' placeholder="Home Phone" keyboardType='numeric' onChangeText={(value) => this.setState({ hphone: value })} />
            <TextInput style={styles.input} value={this.state.email} label='Email' placeholder="Email" onChangeText={(value) => this.setState({ email: value })} />
            <RadioButton.Group value={this.state.gender} onValueChange={value => this.setState({ gender: value })}>
              <View style={styles.radio}>
                <View style={styles.radio}>
                  <Text>Female</Text>
                  <RadioButton value='F' />
                </View>
                <View style={styles.radio}>
                  <Text>Male</Text>
                  <RadioButton value='M' />
                </View>
              </View>
            </RadioButton.Group>
            <TextInput style={styles.input} value={this.state.occupation} label='Occupation' placeholder="Occupation" onChangeText={(value) => this.setState({ occupation: value })} />

            <View style={styles.btnView}>
              <TouchableRipple style={styles.submitButton} onPress={() => console.log("click")}>
                <Button style={styles.button} mode='contained' onPress={this.saveAsync}>Save</Button>
              </TouchableRipple>
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }

  saveAsync = async () => {
    this.props.navigation.navigate('ClientList');
    console.log('saveAsync');
  }

  layoutChange() {
    let dim = Dimensions.get('window');
    console.log('dims h-' + dim.height + ' x w-' + dim.width);
  }
}

const _testUser = {
  id: 11,
  name: 'Name',
  lastName: 'Last',
  phone: '123-123-3434',
  email: 'email@test.com',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    // width: '50%',
    // marginRight: 14,
  },
  radio: {
    // flex: .5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // alignSelf: 'center',
    // width: '30%',
    marginBottom: 7,
  },
});

export default withTheme(ClientDetailScreen);
