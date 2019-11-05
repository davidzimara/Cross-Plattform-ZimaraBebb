import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';


export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <Text>HOME</Text>
      <Button
        title="Gehe zu DetailScreen"
        onPress={() => props.navigation.navigate('detail')}
        mode="contained"
      >Gehe zu DetailScreen</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
