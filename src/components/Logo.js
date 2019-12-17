import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import * as icons from '../constants/icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  imageSize: {
    width: 50,
    height: 50,
  },
});

const Logo = () => (
  <View style={styles.container}>
    <Image source={icons.logo} style={styles.imageSize} />
  </View>
);

export default Logo;
