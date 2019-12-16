import {createStackNavigator} from 'react-navigation-stack';
import ResultsScreen from '../screens/ResultsScreen';

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
      headerTintColor: 'white',
    }),
  },
);
