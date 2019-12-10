import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import * as colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});

export default class Loading extends Component {
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size={'large'} color={colors.green} />
      </View>
    )
  }
}
