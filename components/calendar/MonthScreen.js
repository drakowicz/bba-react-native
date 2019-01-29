import React from 'react';
import { Dimensions, View, ScrollView, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { withTheme } from 'react-native-paper';
// import { ScrollView } from 'react-native-gesture-handler';

class MonthScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };

  constructor(props) {
    super(props);
    this.state = {
      calWidth: Dimensions.get('screen').width,
    }
  }

  render() {
    const { colors } = this.props.theme;
    return (
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]} onLayout={this.layoutChange}>
        <CalendarList
          horizontal
          pagingEnabled
          calendarWidth={this.state.calWidth}
        />
      </ScrollView>
    )
  }

  layoutChange = () => {
    this.setState({ calWidth: Dimensions.get('screen').width });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default withTheme(MonthScreen);
