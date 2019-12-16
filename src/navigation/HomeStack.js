import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';

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
      headerTintColor: 'white',
    }),
  },
);
