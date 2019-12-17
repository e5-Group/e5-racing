import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import * as colors from '../constants/colors';
import * as icons from '../constants/icons';

import HomeStack from './HomeStack';
import ResultsStack from './ResultsStack';
import EntriesStack from './EntriesStack';
import WorkoutsStack from './WorkoutsStack';
import EventsStack from './EventsStack';

const tabBarOptions = {
  showLabel: false,
  style: {
    borderTopColor: colors.gray,
    borderTopWidth: 1,
    height: 66,
    paddingHorizontal: 10,
    // paddingTop: isNotchDevice() ? 20 : 0
  },
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    flex: 1,
  },
  iconSize: {
    width: 36,
    height: 36,
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
      tintColor: focused ? colors.purple : colors.gray,
    },
    iconLabel: {
      fontSize: 12,
      width: '100%',
      color: focused ? colors.purple : colors.gray,
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
    default:
      return null;
  }
};

export default createBottomTabNavigator(
  {
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
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor, ...rest}) => {
        const {routeName} = navigation.state;
        return (
          <View style={styles.iconContainer}>
            <View style={styles.iconSize}>
              <Image
                source={getIconSource(routeName, focused)}
                style={dynamicStyles(focused).iconStyle}
              />
            </View>
            <Text style={dynamicStyles(focused).iconLabel}>{routeName}</Text>
          </View>
        );
      },
    }),
    tabBarOptions,
  },
);
