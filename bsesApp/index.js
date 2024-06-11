/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import TrackApplicationScreen from './src/screens/TrackApplicationScreen';
import InstallersScreen from './src/screens/InstallersScreen';
import CalculateSavingsScreen from './src/screens/CalculateSavingsScreen';
import HomeScreen from './src/screens/HomeScreen';
import TrackApplicationResultScreen from './src/screens/TrackApplicationResultScreen';
import CalculateSavingsResultScreen from './src/screens/CalculateSavingsResultScreen';
import ContactUsScreen from './src/screens/ContactUsScreen';
import KnowAboutSolar from './src/screens/KnowAboutSolar';
import ImportantDocumentScreen from './src/screens/ImportantDocumentScreen';

Icon.loadFont()

AppRegistry.registerComponent(appName, () => App)
