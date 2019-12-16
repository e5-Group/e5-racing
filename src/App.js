import React, {Component} from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import AppStack from './navigation/AppStack';
import SplashScreen from './screens/SplashScreen';
import notifications from './services/notifications';

const AppNavigator = createSwitchNavigator(
  {
    App: AppStack,
  },
  {
    initialRouteName: 'App',
  },
);

// import { Provider } from 'react-redux'
// import createStore from './redux/configureStore'
// const { store } = createStore()

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingSplash: true,
    };
  }

  componentDidMount() {
    new notifications();
    setTimeout(() => {
      this.setState({
        showingSplash: false,
      });
    }, 1500);
  }

  render() {
    if (this.state.showingSplash) {
      return <SplashScreen />;
    }
    return (
      // <Provider store={store} >
      <AppContainer />
      // </Provider >
    );
  }
}
