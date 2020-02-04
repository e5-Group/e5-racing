import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native';

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
  text: {
    color: 'white',
    fontSize: 16,
  },
});

const Back = props => {
  const {navigation} = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Home')}>
      <Image source={icons.back} style={styles.imageSize} />
      {/* <Image source={icons.home} style={styles.imageSize} /> */}
      <Text style={styles.text}>Home</Text>
    </TouchableOpacity>
  );
};

export default Back;
