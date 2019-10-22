import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import DetailScreen from './components/DetailScreen';
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';

// definiere Stack-Navigator
const stackNavigator = createStackNavigator({
  home: HomeScreen,
  detail: DetailScreen
});

// definiere navigationsziele für Bottom-Tab als JS-Objekt
const destinations = {
  zuhause: stackNavigator,
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
