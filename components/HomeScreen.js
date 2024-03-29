import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import * as firebase from 'firebase';


export default function HomeScreen(props) {
    return (
        <View style={styles.container}>
            <Button style={styles.spacer} title="Gehe zu DetailScreen"
                    onPress={() => props.navigation.navigate('chooseCategory')} mode="contained">Spielen</Button>
            <Button style={styles.spacer} title="Ausloggen" onPress={() => firebase.auth().signOut()}
                    mode="contained">Ausloggen</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    spacer: {
        marginBottom: 5,
    }
});

