import {createStackNavigator} from 'react-navigation-stack';
import NewsletterScreen from '../screens/NewsletterScreen';

import * as colors from '../constants/colors';

export default createStackNavigator(
  {
    Newsletter: {
      screen: NewsletterScreen,
      path: 'newsletters',
    },
  },
  {
    navigationOptions: () => ({
      headerTintColor: colors.white,
    }),
  },
);
