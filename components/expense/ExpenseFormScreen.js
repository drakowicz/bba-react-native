import React from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CalendarList } from 'react-native-calendars';
import { Text, TextInput, withTheme } from 'react-native-paper';
import moment from 'moment';

class ExpenseFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Expense Form',
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 1,
          desc: 'Water',
          category: 'Office Supplies',
          price: 123.98,
        },
        {
          id: 2,
          desc: 'Shampoo',
          category: 'Supplies',
          price: 234.98,
        },
        {
          id: 3,
          desc: 'Tax',
          category: 'Sales Tax Paid',
          price: 10.98,
        },
        {
          id: -1,
          desc: '',
          category: '',
          price: 0,
        },
      ],
      total: 0,
      tax: 0,
      taxRate: 0.051,
    }
  }

  _onChildChange(index, name, value) {
    console.log(index + ":" + name + ":'" + value + "'");
    let items = this.state.items;
    let item = items[index];
    if (name === 'price') {
      let decimal = parseFloat(value);
      decimal = value.split('.')[1].length === 1 ? decimal / 10 : decimal * 10;
      item[name] = decimal.toFixed(2);
    } else {
      item[name] = value;
    }
    let total = items.reduce((t, i) => (t + parseFloat(i.price)), 0);
    let tax = total * this.state.taxRate;
    total = total + tax;
    this.setState({
      items: items,
      total: total.toFixed(2),
      tax: tax.toFixed(2),
    })
  }

  render() {
    const { colors } = this.props.theme;
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled
          extraScrollHeight={60} >
          <ScrollView style={[styles.container, { backgroundColor: colors.background }]} onLayout={this.layoutChange}>
            {
              this.state.items.map((item, index) => this._renderItem(item, index))
            }
            <View style={styles.container}>
              <View style={styles.formInput}>
                <Text style={styles.inputTotal}>Tax ({this.state.taxRate * 100}%): </Text><Text style={styles.inputTPrice}>{this.state.tax}</Text>
              </View>
              <View style={styles.formInput}>
                <Text style={styles.inputTotal}>Total: </Text><Text style={styles.inputTPrice}>{this.state.total}</Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }

  _renderItem(item, index) {
    let price = item.price === 0 ? '0.00' : `${item.price}`;
    return (
      <View style={styles.formContainer} key={item.id} state={item}>
        <TextInput style={styles.inputDesc} placeholder={'Description'} value={item.desc} onChangeText={val => this._onChildChange(index, 'desc', val)} />
        <View style={styles.formInput}>
          <TextInput style={styles.inputCat} label='Category' placeholder={'Category'} value={item.category} onChangeText={val => this._onChildChange(index, 'category', val)} />
          <TextInput style={styles.inputPrice} keyboardType='numeric' label='Price' placeholder={'Price'} value={price} onChangeText={val => this._onChildChange(index, 'price', val)} />
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 4,
  },
  formInput: {
    flexDirection: 'row',
    padding: 0,
  },
  inputCat: {
    flexGrow: 1,
    // marginBottom: 4,
  },
  inputPrice: {
    // marginBottom: 4,
    marginLeft: 4,
    width: 100,
    textAlign: 'right',
  },
  inputTotal: {
    flexGrow: 1,
    marginTop: 10,
    fontSize: 20,
    textAlign: 'right',
    paddingRight: 10,
  },
  inputTPrice: {
    marginTop: 10,
    marginRight: 10,
    width: 100,
    textAlign: 'right',
    fontSize: 20,
  },
});

export default withTheme(ExpenseFormScreen);
