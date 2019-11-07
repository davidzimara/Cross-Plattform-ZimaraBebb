import React from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import * as firebase from 'firebase';
import {Button, TextInput} from 'react-native-paper';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
            }, (error) => {
                Alert.alert(error.message);
            });
    }

    onCreateAccountPress = () => {
        let navActions = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: "Signup"})]
        });
        this.props.navigation.dispatch(navActions);
    }

    onForgotPasswordPress = () => {
        let navActions = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: "ForgotPassword"})]
        });
        this.props.navigation.dispatch(navActions);
    }

    render() {
        return (
            <View style={{paddingTop: 50, alignItems: "center"}}>

                <Text>Login</Text>

                <TextInput style={styles.input}
                           value={this.state.email}
                           onChangeText={(text) => {
                               this.setState({email: text})
                           }}
                           label="Email"
                           keyboardType="email-address"
                           autoCapitalize="none"
                           autoCorrect={false}
                />

                <View style={{paddingTop: 10}}/>

                <TextInput style={styles.input}
                           value={this.state.password}
                           onChangeText={(text) => {
                               this.setState({password: text})
                           }}
                           label="Password"
                           secureTextEntry={true}
                           autoCapitalize="none"
                           autoCorrect={false}
                />

                <Button mode='contained' style={styles.button} title="Login" onPress={this.onLoginPress}>Login</Button>
                <Button mode='contained' style={styles.button} title="Create account..."
                        onPress={this.onCreateAccountPress}>Create account...</Button>
                <Button mode='contained' style={styles.button} title="Forgot Password..."
                        onPress={this.onForgotPasswordPress}>Forgot Password...</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        width: 200, height: 40,  marginBottom: 10
    },
    button: {
        marginBottom: 10,
        width: 200
    }
});