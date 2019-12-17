import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';

import * as colors from '../constants/colors';

export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      // navigationOptions: { header: null },
      path: 'home',
    },
  },
  {
    navigationOptions: () => ({
      headerTintColor: colors.white,
    }),
  },
);
