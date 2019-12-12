import React from 'react';
import { ImageBackground } from 'react-native';

const splash = require('../assets/splash.png');

const SplashScreen = () => (
  <ImageBackground source={splash} style={{ width: '100%', height: '100%' }} />
);

export default SplashScreen;