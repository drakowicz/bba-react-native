import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { withTheme, Text, Divider } from 'react-native-paper';
import moment from 'moment';
import { Agenda } from 'react-native-calendars';

class AgendaScreen extends React.Component {
  static navigationOptions = {
    title: "Agenda",
  };

  constructor(props) {
    super(props);
    this.state = {
      daySelected: props.navigation.getParam('daySelected', 0),
      items: {}
    }
  }

  render() {
    const { colors } = this.props.theme;
    return (
      <View style={styles.container}>
        <Agenda
          hideKnob={true}
          style={{ backgroundColor: colors.background }}
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={this.state.daySelected}
          // renderDay={(day, item) => (
          //   <Text>day</Text>
          // )}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
        />
      </View>
    )
  }

  loadItems(day) {
    console.log("loading: " + JSON.stringify(day));
    setTimeout(() => {
      const date = this.timeToString(day.timestamp);
      let dayItems = {};
      dayItems[date] = [];
      dayItems[date].push({
        name: "You have 7 approintements",
        // height: 30,
      });

      for (let i = 6; i < 23; i++) { // 6 am to 11 pm
        //for (let j = 0; j < 4; j++) { // every 15 mins
        const min = "00"; // j * 15;
        dayItems[date].push({
          name: "Free " + i + ":" + min,
          height: 50,
        });
        //}
      }
      // for (let i = -15; i < 85; i++) {
      //   const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      //   const strTime = this.timeToString(time);
      //   if (!this.state.items[strTime]) {
      //     this.state.items[strTime] = [];
      //     const numItems = Math.floor(Math.random() * 5);
      //     for (let j = 0; j < numItems; j++) {
      //       this.state.items[strTime].push({
      //         name: 'Item for ' + strTime,
      //         height: Math.max(50, Math.floor(Math.random() * 150))
      //       });
      //     }
      //   }
      // }
      // console.log(this.state.items);
      // const newItems = {};
      // Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
      this.setState({
        items: dayItems // newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    // backgroundColor: 'white',
    flex: 1,
    borderRadius: 3,
    padding: 2,
    marginRight: 10,
    marginTop: 1,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
});

export default withTheme(AgendaScreen);
