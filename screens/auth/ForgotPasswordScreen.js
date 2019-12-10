import React from 'react';
import {StyleSheet, ScrollView, Text, Alert} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import * as firebase from 'firebase';
import {Button, TextInput} from 'react-native-paper';

export default class ForgotPasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        };
    }

    onResetPasswordPress = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                Alert.alert("Die E-Mail zum zurücksetzen ihres Passworts wurde verschickt.");
            }, (error) => {
                Alert.alert(error.message);
            });
    }

    onBackToLoginPress = () => {
        var navActions = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: "Login"})]
        });
        this.props.navigation.dispatch(navActions);
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{paddingTop: 50, alignItems: "center"}}>
                <Text>Passwort vergessen</Text>
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
                <Button style={styles.button} mode='contained' title="Passwort zurücksetzen"
                        onPress={this.onResetPasswordPress}>Passwort zurücksetzen</Button>
                <Button style={styles.button} mode='contained' title="Zurück zu Anmeldung"
                        onPress={this.onBackToLoginPress}>Zurück zu Anmeldung</Button>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        width: 250, height: 60, marginBottom: 10
    },
    button: {
        marginBottom: 10,
        width: 250
    }
});