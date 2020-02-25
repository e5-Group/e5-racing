import React, {Component} from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import AppStack from './navigation/AppStack';
import notifications from './services/notifications';

const AppNavigator = createSwitchNavigator(
  {
    App: AppStack,
  },
  {
    initialRouteName: 'App',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    new notifications();
  }

  render() {
    return <AppContainer />;
  }
}
