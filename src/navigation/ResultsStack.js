import {createStackNavigator} from 'react-navigation-stack';
import ResultsScreen from '../screens/ResultsScreen';

import * as colors from '../constants/colors';

export default createStackNavigator(
  {
    Results: {
      screen: ResultsScreen,
      // navigationOptions: { header: null },
      path: 'results',
    },
  },
  {
    navigationOptions: () => ({
      headerTintColor: colors.white,
    }),
  },
);
