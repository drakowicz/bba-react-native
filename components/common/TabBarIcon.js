import { Icon } from 'expo';
import React from 'react';
import { Platform } from 'react-native';
import { withTheme } from "react-native-paper";

class TabBarIcon extends React.Component {
  render() {
    const { colors } = this.props.theme;
    return (
      <Icon.Ionicons
        name={(Platform.OS === 'ios' ? 'ios-' : 'md-') + this.props.iconName}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? colors.primary : colors.disabled}
      />
    )
  }
}

export default withTheme(TabBarIcon);
