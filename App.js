import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';

// definiere navigationsziele als JS-Objekt
const destinations = {
  zuhause: {
    screen: HomeScreen,
    navigationOptions: { title: 'Mein Zuhause' }
  },
  settings: SettingsScreen
};

// definiere bottom navigator als untere Leiste
const bottomTabNav = createBottomTabNavigator(destinations);

// HauptNavigationr
const navigator = createAppContainer(bottomTabNav);

export default navigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
