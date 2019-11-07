import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import * as firebase from 'firebase';


export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <Button style={styles.spacer} title="Gehe zu DetailScreen" onPress={() => props.navigation.navigate('detail')} mode="contained">Spielen</Button>
      <Button style={styles.spacer} title="Logout" onPress={() =>     firebase.auth().signOut()} mode="contained">Logout</Button>
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

