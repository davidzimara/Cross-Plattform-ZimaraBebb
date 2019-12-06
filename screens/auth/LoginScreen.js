import React from 'react';
import {StyleSheet, ScrollView, Text, Alert} from 'react-native';
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
            <ScrollView contentContainerStyle={{paddingTop: 50, alignItems: "center"}}>

                <Text>Anmeldung</Text>

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

                <Button mode='contained' style={styles.button} title="Anmeldung" onPress={this.onLoginPress}>Anmeldung</Button>
                <Button mode='contained' style={styles.button} title="Registrieren"
                        onPress={this.onCreateAccountPress}>Registrieren</Button>
                <Button mode='contained' style={styles.button} title="Passwort vergessen"
                        onPress={this.onForgotPasswordPress}>Passwort vergessen</Button>
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