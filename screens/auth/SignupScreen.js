import React from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
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
            Alert.alert("Passwords do not match");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
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
            <View style={{paddingTop: 50, alignItems: "center"}}>

                <Text>Signup</Text>

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

                <View style={{paddingTop: 10}}/>

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

                <Button style={styles.button} mode='contained' title="Signup" onPress={this.onSignupPress}>Signup</Button>

                <Button style={styles.button} mode='contained' title="Back to Login" onPress={this.onBackToLoginPress}>Back to Login</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        width: 200, height: 60,  marginBottom: 10
    },
    button: {
        marginBottom: 10,
        width: 200
    }
});