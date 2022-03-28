import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ImageLoad from 'react-native-image-placeholder';

import * as colors from '../constants/colors';
import placeHolderImage from '../assets/logo-gray.jpeg';

const styles = StyleSheet.create({
  horseContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    borderRadius: 10,
    shadowRadius: 10,
    shadowColor: 'gray',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  horseImage: {
    height: 120,
    width: 120,
    borderRadius: 10,
  },
  horseNameContainer: {
    paddingLeft: 30,
    alignItems: 'stretch',
    justifyContent: 'center',
    flex: 1,
  },
  horseName: {
    fontFamily: 'NotoSerif-Bold',
    fontSize: 20,
    color: colors.newLightGreen,
    textAlign: 'left',
  },
});

const loadingStyle = {size: 'large', color: colors.newMiddleGreen};

const PictureItem = ({horse, onImagePress, onTextPress}) => {
  return (
    <View style={styles.horseContainer}>
      <TouchableOpacity onPress={() => onImagePress()} activeOpacity={0.7}>
        <ImageLoad
          resizeMode="contain"
          style={styles.horseImage}
          loadingStyle={loadingStyle}
          source={{
            uri: horse.image_url,
          }}
          placeholderSource={placeHolderImage}
          customImagePlaceholderDefaultStyle={styles.horseImage}
        />
      </TouchableOpacity>
      <View style={styles.horseNameContainer}>
        <TouchableOpacity onPress={() => onTextPress()} activeOpacity={0.7}>
          <Text style={styles.horseName}>{horse.horse_name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PictureItem;
