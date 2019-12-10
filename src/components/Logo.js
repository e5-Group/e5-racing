import React from 'react';
import { Image, StyleSheet } from 'react-native';

const logo = require('../assets/logo.png');

const styles = StyleSheet.create({
  imageSize: {
    width: 50,
    height: 50,
  },
});

const Logo = () => (<Image
  source={logo}
  style={styles.imageSize}
/>);

export default Logo;