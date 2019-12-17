import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

import * as colors from '../constants/colors';
import * as icons from '../constants/icons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageSize: {
    width: 26,
    height: 26,
    tintColor: colors.white,
  },
});

const Back = props => {
  const {navigation} = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Home')}>
      <Image source={icons.back} style={styles.imageSize} />
      <Image source={icons.home} style={styles.imageSize} />
    </TouchableOpacity>
  );
};

export default Back;
