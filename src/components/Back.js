import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

import * as colors from '../constants/colors';

const back = require('../assets/back.png');
const home = require('../assets/navigation/homeOn.png');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'red'
  },
  imageSize: {
    width: 26,
    height: 26,
    tintColor: colors.white,
  },
});

const Back = props => {
  const { navigation } = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Home')}>
      <Image
        source={back}
        style={styles.imageSize}
      />
      <Image
        source={home}
        style={styles.imageSize}
      />
    </TouchableOpacity>
  );
};

export default Back;