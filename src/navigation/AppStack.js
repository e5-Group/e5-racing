import React from 'react';
import { View, Image, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import * as colors from '../constants/colors';

import HomeStack from './HomeStack';
import ResultsStack from './ResultsStack';
import EntriesStack from './EntriesStack';
import WorkoutsStack from './WorkoutsStack';
import EventsStack from './EventsStack';

const tabBarOptions = {
  showLabel: false,
  style: {
    borderTopColor: 'gray',
    borderTopWidth: 1,
    height: 66,
    paddingHorizontal: 10,
    // paddingTop: isNotchDevice() ? 20 : 0
  },
};

const homeIconOn = require('../assets/navigation/homeOn.png');
const homeIconOff = require('../assets/navigation/homeOff.png');
const resultsIconOn = require('../assets/navigation/resultsOn.png');
const resultsIconOff = require('../assets/navigation/resultsOff.png');
const entriesIconOn = require('../assets/navigation/entriesOn.png');
const entriesIconOff = require('../assets/navigation/entriesOff.png');
const workoutsIconOn = require('../assets/navigation/workoutsOn.png');
const workoutsIconOff = require('../assets/navigation/workoutsOff.png');
const eventsIconOn = require('../assets/navigation/eventsOn.png');
const eventsIconOff = require('../assets/navigation/eventsOff.png');

const getIconSource = (routeName, focused) => {
  switch (routeName) {
    case 'Results':
      return focused ? resultsIconOn : resultsIconOff;
    case 'Entries':
      return focused ? entriesIconOn : entriesIconOff;
    case 'Workouts':
      return focused ? workoutsIconOn : workoutsIconOff;
    case 'Events':
      return focused ? eventsIconOn : eventsIconOff;
    case 'Home':
      return focused ? homeIconOn : homeIconOff;
    default:
      return null;
  }
};

export default createBottomTabNavigator({
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
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor, ...rest }) => {
      const { routeName } = navigation.state;
      return (
        <View style={{ alignItems: 'center' }}>
          <View style={{ width: 40, height: 40, }}>
            <Image source={getIconSource(routeName, focused)} style={{
              width: 40, resizeMode: 'contain',
              shadowOffset: { width: 1, height: 1, },
              shadowColor: 'black',
              shadowOpacity: 0.2,
              width: '100%',
              height: '100%',
              tintColor: focused ? colors.purple : colors.gray
            }} />
          </View>
          <Text style={{ fontSize: 10, color: focused ? colors.purple : colors.gray }}>{routeName}</Text>
        </View>
      )
    },
  }),
  tabBarOptions
})