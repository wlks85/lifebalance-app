/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/Receipt';
import {name as appName} from './app.json';
import './src/utils/i18next';

AppRegistry.registerComponent(appName, () => App);
