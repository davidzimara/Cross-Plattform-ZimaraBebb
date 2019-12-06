import React from 'react';
import {StyleSheet, ScrollView, Text, Alert} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import * as firebase from 'firebase';
import {Button, TextInput} from 'react-native-paper';


export default class SignupScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordConfirm: "",
        };
    }

    onSignupPress = () => {
        if (this.state.password !== this.state.passwordConfirm) {
            Alert.alert("Passwort ist falsch");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
            }, (error) => {
                Alert.alert(error.message);
            });
    };

    onBackToLoginPress = () => {
        var navActions = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: "Login"})]
        });
        this.props.navigation.dispatch(navActions);
    };

    render() {
        return (
            <ScrollView contentContainerStyle={{paddingTop: 50, alignItems: "center"}}>

                <Text>Registrierung</Text>

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

                <ScrollView contentContainerStyle={{paddingTop: 10}}/>

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

                <ScrollView contentContainerStyle={{paddingTop: 10}}/>

                <TextInput style={styles.input}
                           value={this.state.passwordConfirm}
                           onChangeText={(text) => {
                               this.setState({passwordConfirm: text})
                           }}
                           label="Password (confirm)"
                           secureTextEntry={true}
                           autoCapitalize="none"
                           autoCorrect={false}
                />

                <Button style={styles.button} mode='contained' title="Registrieren" onPress={this.onSignupPress}>Registrieren</Button>

                <Button style={styles.button} mode='contained' title="zum Login" onPress={this.onBackToLoginPress}>zum Login</Button>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        width: 250, height: 60,  marginBottom: 10
    },
    button: {
        marginBottom: 10,
        width: 250
    }
});