import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import * as firebase from 'firebase';
import ApiKeys from './constants/ApiKeys';
import RootNavigation from './navigation/RootNavigation';
import CreateQuestionScreen from './components/CreateQuestionScreen';
import HomeScreen from './components/HomeScreen';
import CategoriesScreen from "./components/CategoriesScreen";
import CreateScreen from "./components/CreateScreen";

import Ionicons from 'react-native-vector-icons/Ionicons';


// definiere Stack-Navigator
const stackNavigator = createStackNavigator({
    home: HomeScreen,
    createQuestion: CreateQuestionScreen
});

// definiere navigationsziele für Bottom-Tab als JS-Objekt
const destinations = {
    Home: stackNavigator,
    Erstellen: CreateScreen,
    Kategorien: CategoriesScreen
};

const defaultNavigationOptions = {
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
            const {routeName} = navigation.state;
            let IconComponent = Ionicons;
            let iconName;
            if (routeName === 'Home') {
                iconName = `ios-home`;
            } else if (routeName === 'Erstellen') {
                iconName = `ios-add-circle`;
            } else if (routeName === 'Kategorien') {
                iconName = `ios-list`;
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
const Navigator = createAppContainer(bottomTabNav);

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        accent: 'yellow',
    },
};

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingComplete: false,
            isAuthenticationReady: false,
            isAuthenticated: false,
        };

        // Initialize firebase...
        if (!firebase.apps.length) {
            firebase.initializeApp(ApiKeys.FirebaseConfig);
        }
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    }

    onAuthStateChanged = (user) => {
        this.setState({isAuthenticationReady: true});
        this.setState({isAuthenticated: !!user});
    }

    render() {
        return (
            <PaperProvider theme={theme}>
                <StatusBar backgroundColor="blue" barStyle="light-content"/>
                {(this.state.isAuthenticated) ? <Navigator/> : <RootNavigation/>}
            </PaperProvider>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
