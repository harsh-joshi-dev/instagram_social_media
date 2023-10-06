import AppNavigator from './src/AppNavigator';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

function App() {
  return <NavigationContainer>{<AppNavigator />}</NavigationContainer>;
}

export default App;
