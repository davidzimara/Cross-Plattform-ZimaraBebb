
import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
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
                Alert.alert("Password reset email has been sent.");
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
            <View style={{paddingTop:50, alignItems:"center"}}>

                <Text>Forgot Password</Text>

                <TextInput style={styles.input}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({email: text}) }}
                    label="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Button style={styles.button} mode='contained' title="Reset Password" onPress={this.onResetPasswordPress} >Reset Password</Button>
                <Button style={styles.button} mode='contained' title="Back to Login..." onPress={this.onBackToLoginPress} >Back to Login...</Button>
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