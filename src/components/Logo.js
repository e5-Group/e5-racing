import React from 'react';
import {Image, StyleSheet} from 'react-native';

import * as icons from '../constants/icons';

const styles = StyleSheet.create({
  imageSize: {
    width: 50,
    height: 50,
  },
});

const Logo = () => <Image source={icons.logo} style={styles.imageSize} />;

export default Logo;
