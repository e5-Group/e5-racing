import {createStackNavigator} from 'react-navigation-stack';
import EventsScreen from '../screens/EventsScreen';

export default createStackNavigator(
  {
    Events: {
      screen: EventsScreen,
      // navigationOptions: { header: null },
      path: 'events',
    },
  },
  {
    navigationOptions: () => ({
      headerTintColor: 'white',
    }),
  },
);
