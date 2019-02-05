import React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { withTheme, Text, Divider, List } from 'react-native-paper';
import moment from 'moment';

class WeekScreen extends React.Component {
  static navigationOptions = ({ navigationOptions }) => ({
    title: 'Week', //navigationOptions.state.daySelected,
  });

  constructor(props) {
    super(props);
    this.state = {
      daySelected: props.navigation.getParam('daySelected', 0).dateString,
      dayItems: {},
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this._dayItems(this.state.daySelected);
    }, 100);
  }

  render() {
    const { colors } = this.props.theme;
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <CalendarStrip
            style={{ height: 80 }}
            calendarColor={colors.primary}
            highlightDateNumberStyle={{ color: colors.background }}
            highlightDateNameStyle={{ color: colors.background }}
            styleWeekend={true}
            selectedDate={this.state.daySelected}
            onDateSelected={this._dateSelected.bind(this)}
          />
          <FlatList
            data={this.state.dayItems[this.state.daySelected]}
            renderItem={this._renderItem}
            ItemSeparatorComponent={() => <Divider />}
            keyExtractor={(item, index) => item.id.toString()}
          />
        </View>
      </SafeAreaView>
    )
  }

  _renderItem = ({ item }) => {
    const { colors } = this.props.theme;
    return (
      <View>
        <Text style={{ color: '#999', padding: 4, position: 'absolute', }}>{item.hour}</Text>
        <List.Item
          style={[styles.item, { height: item.height }]}
          // title={item.name}
          // description={item.phone}
          // left={(props) => <List.Icon {...props} icon="calendar" />}
          right={(props) => <List.Icon {...props} icon="add" />}
        />
        {!item.empty &&
          <Text style={{
            color: colors.primary,
            padding: 4,
            position: 'absolute',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: colors.primary,
            left: 60,
            top: item.offset,
            height: item.apptLength,
            width: 180,
          }}>{item.time}: {item.name}</Text>
        }
      </View>
    )
  }

  _dateSelected(date) {
    const newDate = date.toISOString(true).split("T")[0];
    this.setState({ daySelected: newDate });
    this._dayItems(newDate);
  }

  _dayItems(day) {
    console.log("call " + day);
    const cellHeight = 60;
    const dayItems = {};
    dayItems[day] = [];
    for (let i = 6; i < 23; i++) { // 6 am to 11 pm
      const min = "00";
      let appts = _apptList.filter(it => it.hour === i);
      if (appts.length > 0) {
        appts.map((it) => {
          dayItems[day].push({
            id: i,
            hour: (i < 13 ? i + " AM" : i - 12 + " PM"),
            time: it.hour + ":" + it.min,
            name: it.name,
            height: cellHeight,
            apptLength: it.len,
            offset: it.min,
            empty: false,
          });
        });
      } else {
        dayItems[day].push({
          id: i,
          hour: (i < 13 ? i + " AM" : i - 12 + " PM"),
          height: cellHeight,
          empty: true,
        });
      }
    }
    this.setState({ dayItems: dayItems });
  }
}

const _apptList = [
  {
    id: 1,
    name: 'John White',
    phone: '303-111-1234',
    hour: 8,
    min: 15,
    len: 120,
  },
  {
    id: 2,
    name: 'Betty Blue',
    phone: '303-222-1234',
    hour: 10,
    min: 30,
    len: 45,
  },
  {
    id: 3,
    name: 'Lisa Green',
    phone: '303-3333-1234',
    hour: 12,
    min: 0,
    len: 90,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
  },
  item: {
    // borderWidth: 1,
    // padding: 10,
  }
});

export default withTheme(WeekScreen);
