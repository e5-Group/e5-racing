import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AppStack from './navigation/AppStack'
import notifications from './services/notifications';

const AppNavigator = createSwitchNavigator({
  App: AppStack,
}, {
  initialRouteName: "App"
});

// import { Provider } from 'react-redux'
// import createStore from './redux/configureStore'
// const { store } = createStore()

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    new notifications();
  }
  
  render() {
    return (
      // <Provider store={store} >
      <AppContainer />
      // </Provider >
    )
  }
}