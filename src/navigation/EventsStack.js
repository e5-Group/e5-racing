import {createStackNavigator} from 'react-navigation-stack';
import EventsScreen from '../screens/EventsScreen';

import * as colors from '../constants/colors';

export default createStackNavigator(
  {
    Events: {
      screen: EventsScreen,
      path: 'events',
    },
  },
  {
    navigationOptions: () => ({
      headerTintColor: colors.white,
    }),
  },
);
