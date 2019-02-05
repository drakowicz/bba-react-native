import React from 'react';
import { Dimensions, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { withTheme } from 'react-native-paper';
// import { ScrollView } from 'react-native-gesture-handler';
// import { parse } from 'xdate';
import moment from 'moment';

class MonthScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };

  constructor(props) {
    super(props);
    this.state = {
      calWidth: Dimensions.get('screen').width,
      markedDates: {
        '2019-02-01': { marked: true },
        '2019-02-15': { marked: true },
      }
    }
  }

  render() {
    const { colors } = this.props.theme;
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]} onLayout={this.layoutChange}>
          <CalendarList
            horizontal
            pagingEnabled
            calendarWidth={this.state.calWidth}
            markedDates={this.state.markedDates}
            onDayPress={this.calendarDayPressed}
            onDayLongPress={this.calendarDayLongPressed}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }

  layoutChange = () => {
    this.setState({ calWidth: Dimensions.get('screen').width });
  }

  calendarDayLongPressed = (day) => {
    console.log("long pressed: " + JSON.stringify(day));
    this.props.navigation.navigate('Agenda', { daySelected: day });
  }
  calendarDayPressed = (day) => {
    console.log("pressed: " + JSON.stringify(day));
    this.props.navigation.navigate('Week', { daySelected: day });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default withTheme(MonthScreen);
