/**
 * @format
 */

import {AppRegistry, Text} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

// This makes requests visible in Google Chrome
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
Text.defaultProps = Text.defaultProps || {};
// Text.defaultProps.allowFontScaling = false;
Text.defaultProps.maxFontSizeMultiplier = 1.3;

AppRegistry.registerComponent(appName, () => App);
