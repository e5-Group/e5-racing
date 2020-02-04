import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import * as colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 80,
    backgroundColor: colors.newGray,
    marginVertical: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: colors.purpleShadow,
    shadowOpacity: 0.5,
  },
  iconContainer: {
    width: '35%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageSize: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
    tintColor: colors.newPurple,
  },
  label: {
    color: colors.newPurple,
    fontSize: 20,
    textTransform: 'uppercase',
    fontFamily: 'NotoSerif-Bold',
    letterSpacing: 3,
  },
});

const MenuOption = ({icon, name, pressed}) => (
  <TouchableOpacity style={styles.container} onPress={pressed}>
    <View style={styles.iconContainer}>
      <Image source={icon} style={styles.imageSize} />
    </View>
    <Text style={styles.label}>{name}</Text>
  </TouchableOpacity>
);

export default MenuOption;
