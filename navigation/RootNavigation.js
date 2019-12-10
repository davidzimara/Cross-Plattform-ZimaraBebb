import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './../components/HomeScreen';

import LoginScreen from './../screens/auth/LoginScreen';
import SignupScreen from './../screens/auth/SignupScreen';
import ForgotPasswordScreen from './../screens/auth/ForgotPasswordScreen';
import {createAppContainer} from "react-navigation";

const RootStackNavigator =
    createStackNavigator({
        Login: { screen: LoginScreen },
        Signup: { screen: SignupScreen },
        ForgotPassword: { screen: ForgotPasswordScreen },

        Main: { screen: HomeScreen, },
    },
    {
        navigationOptions: () => ({
            headerTitleStyle: {
                fontWeight: 'normal',
            },
        }),
    }
);

const Navigator = createAppContainer(RootStackNavigator);

export default class RootNavigator extends React.Component {
    render() {
        return <Navigator />;
    }
}
