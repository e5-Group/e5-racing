import {createStackNavigator} from 'react-navigation-stack';
import WorkoutsScreen from '../screens/WorkoutsScreen';

import * as colors from '../constants/colors';

export default createStackNavigator(
  {
    WorkoutsScreen: {
      screen: WorkoutsScreen,
      path: 'workouts',
    },
  },
  {
    navigationOptions: () => ({
      headerTintColor: colors.white,
    }),
  },
);
