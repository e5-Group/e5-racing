import {createStackNavigator} from 'react-navigation-stack';
import EntriesScreen from '../screens/EntriesScreen';

export default createStackNavigator(
  {
    Entries: {
      screen: EntriesScreen,
      // navigationOptions: { header: null },
      path: 'entries',
    },
  },
  {
    navigationOptions: () => ({
      headerTintColor: 'white',
    }),
  },
);
