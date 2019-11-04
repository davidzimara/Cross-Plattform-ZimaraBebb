import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import DetailScreen from './components/DetailScreen';
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';
import CategoriesScreen from "./components/CategoriesScreen";
import CreateScreen from "./components/CreateScreen";
import StatisticsScreen from "./components/StatisticsScreen";

import Ionicons from 'react-native-vector-icons/Ionicons';


// definiere Stack-Navigator
const stackNavigator = createStackNavigator({
    home: HomeScreen,
    detail: DetailScreen
});

// definiere navigationsziele für Bottom-Tab als JS-Objekt
const destinations = {
    home: stackNavigator,
    Kategorien: CategoriesScreen,
    Erstellen: CreateScreen,
    Statistiken: StatisticsScreen,
    Einstellungen: SettingsScreen
};

const defaultNavigationOptions = {
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
            const {routeName} = navigation.state;
            let IconComponent = Ionicons;
            let iconName;
            if (routeName === 'home') {
                iconName = `ios-home`;
            } else if (routeName === 'Einstellungen') {
                iconName = `ios-options`;
            } else if (routeName === 'Erstellen') {
                iconName = `ios-add-circle`;
            } else if (routeName === 'Kategorien') {
                iconName = `ios-list`;
            } else if (routeName === 'Statistiken') {
                iconName = `ios-stats`;
            }

            // You can return any component that you like here!
            return <IconComponent name={iconName} size={25} color={tintColor}/>;
        },
    }),
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
    },
};

// definiere bottom navigator als untere Leiste
const bottomTabNav = createBottomTabNavigator(destinations, defaultNavigationOptions);

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
