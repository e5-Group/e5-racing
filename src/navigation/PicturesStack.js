import {createStackNavigator} from 'react-navigation-stack';
import PicturesScreen from '../screens/PicturesScreen';
import PedigreeScreen from '../screens/PedigreeScreen';

import * as colors from '../constants/colors';

export default createStackNavigator(
  {
    Photos: {
      screen: PicturesScreen,
      path: 'photos',
    },
    Pedigree: {
      screen: PedigreeScreen,
      path: 'pedigree',
    },
  },
  {
    navigationOptions: () => ({
      headerTintColor: colors.white,
    }),
    initialRouteName: 'Photos',
  },
);
