import {createStackNavigator} from 'react-navigation-stack';
import EntriesScreen from '../screens/EntriesScreen';

import * as colors from '../constants/colors';

export default createStackNavigator(
  {
    Entries: {
      screen: EntriesScreen,
      path: 'entries',
    },
  },
  {
    navigationOptions: () => ({
      headerTintColor: colors.white,
    }),
  },
);
