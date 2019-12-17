import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';

import * as icons from '../constants/icons';

const styles = StyleSheet.create({
  fullDisplay: {
    width: '100%',
    height: '100%',
  },
});

const SplashScreen = () => (
  <ImageBackground source={icons.splash} style={styles.fullDisplay} />
);

export default SplashScreen;
