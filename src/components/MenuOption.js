import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import * as colors from '../constants/colors';
import * as sizes from '../constants/sizes';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 60,
    backgroundColor: colors.newGray,
    marginVertical: 6,
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
    width: 46,
    height: 46,
    resizeMode: 'contain',
    tintColor: colors.newPurple,
  },
  label: {
    color: colors.newPurple,
    fontSize: 20,
    textTransform: 'capitalize',
    fontFamily: 'NotoSerif-Bold',
    letterSpacing: 3,
    textAlign: width < sizes.tablet_threshold ? 'left' : 'center',
    flex: 1,
  },
});

const MenuOption = ({icon, name, pressed}) => (
  <TouchableOpacity style={styles.container} onPress={pressed}>
    {width < sizes.tablet_threshold && (
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.imageSize} />
      </View>
    )}
    <Text style={styles.label}>{name}</Text>
  </TouchableOpacity>
);

export default MenuOption;
