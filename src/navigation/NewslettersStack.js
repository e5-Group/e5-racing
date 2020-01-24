import {createStackNavigator} from 'react-navigation-stack';
import NewslettersScreen from '../screens/NewslettersScreen';

import * as colors from '../constants/colors';

export default createStackNavigator(
  {
    Newsletters: {
      screen: NewslettersScreen,
      // navigationOptions: { header: null },
      path: 'newsletters',
    },
  },
  {
    navigationOptions: () => ({
      headerTintColor: colors.white,
    }),
  },
);
