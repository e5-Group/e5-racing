/**
 * @format
 */

import {AppRegistry, Text} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {CacheManager} from '@georstat/react-native-image-cache';
import {Dirs} from 'react-native-file-access';

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  sourceAnimationDuration: 1000,
  thumbnailAnimationDuration: 1000,
};

// This makes requests visible in Google Chrome
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
Text.defaultProps = Text.defaultProps || {};
// Text.defaultProps.allowFontScaling = false;
Text.defaultProps.maxFontSizeMultiplier = 1.3;

AppRegistry.registerComponent(appName, () => App);
