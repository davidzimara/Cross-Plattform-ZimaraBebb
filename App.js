import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';

export default function App() {
  return <SettingsScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
