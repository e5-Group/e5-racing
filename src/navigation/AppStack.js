import React from 'react';
import {StyleSheet, View, Image, Text, Dimensions} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import * as colors from '../constants/colors';
import * as icons from '../constants/icons';
import * as sizes from '../constants/sizes';

import HomeStack from './HomeStack';
import ResultsStack from './ResultsStack';
import EntriesStack from './EntriesStack';
import WorkoutsStack from './WorkoutsStack';
import EventsStack from './EventsStack';
import NewslettersStack from './NewslettersStack';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    flex: 1,
  },
  iconSize: {
    width: width < sizes.tablet_threshold ? 36 : 48,
    height: width < sizes.tablet_threshold ? 36 : 48,
  },
});

const dynamicStyles = focused =>
  StyleSheet.create({
    iconStyle: {
      resizeMode: 'contain',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowColor: colors.black,
      shadowOpacity: 0.2,
      width: '100%',
      height: '100%',
      tintColor: focused ? colors.newLightGreen : colors.gray,
    },
    iconLabel: {
      fontSize: 10,
      width: '100%',
      color: focused ? colors.newLightGreen : colors.gray,
    },
  });

const getIconSource = (routeName, focused) => {
  switch (routeName) {
    case 'Results':
      return focused ? icons.resultsIconOn : icons.resultsIconOff;
    case 'Entries':
      return focused ? icons.entriesIconOn : icons.entriesIconOff;
    case 'Workouts':
      return focused ? icons.workoutsIconOn : icons.workoutsIconOff;
    case 'Events':
      return focused ? icons.eventsIconOn : icons.eventsIconOff;
    case 'Home':
      return focused ? icons.homeIconOn : icons.homeIconOff;
    case 'Newsletters':
      return focused ? icons.newslettersIconOn : icons.newslettersIconOff;
    default:
      return null;
  }
};

const routeConfiguration = {
  Home: {
    screen: HomeStack,
    path: 'home',
  },
  Results: {
    screen: ResultsStack,
    path: 'results',
  },
  Entries: {
    screen: EntriesStack,
    path: 'entries',
  },
  Workouts: {
    screen: WorkoutsStack,
    path: 'workouts',
  },
  Events: {
    screen: EventsStack,
    path: 'events',
  },
  Newsletters: {
    screen: NewslettersStack,
    path: 'newsletters',
  },
};

export default createBottomTabNavigator(routeConfiguration, {
  initialRouteName: 'Home',
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused}) => {
      const {routeName} = navigation.state;
      return (
        <View style={styles.iconContainer}>
          <View style={styles.iconSize}>
            <Image
              source={getIconSource(routeName, focused)}
              style={dynamicStyles(focused).iconStyle}
            />
          </View>
          {width < sizes.tablet_threshold && (
            <Text style={dynamicStyles(focused).iconLabel}>{routeName}</Text>
          )}
        </View>
      );
    },
    tabBarOptions: {
      showLabel: false,
      style: {
        borderTopColor:
          navigation.state.routeName === 'Home'
            ? colors.purpleShadow
            : colors.newDarkGrey,
        backgroundColor:
          navigation.state.routeName === 'Home'
            ? colors.newPurple
            : colors.white,
        borderTopWidth: 1,
        height: 66,
        paddingHorizontal: 10,
        paddingTop: 6,
        shadowOffset: {
          width: 0,
          height: -1,
        },
        shadowColor:
          navigation.state.routeName === 'Home'
            ? colors.purpleShadow
            : colors.black,
        shadowOpacity: 0.5,
        // paddingTop: isNotchDevice() ? 20 : 0
      },
    },
  }),
});
