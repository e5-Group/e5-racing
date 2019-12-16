import {createStackNavigator} from 'react-navigation-stack';
import WorkoutsScreen from '../screens/WorkoutsScreen';

export default createStackNavigator(
  {
    WorkoutsScreen: {
      screen: WorkoutsScreen,
      // navigationOptions: { header: null },
      path: 'workouts',
    },
  },
  {
    navigationOptions: () => ({
      headerTintColor: 'white',
    }),
  },
);
