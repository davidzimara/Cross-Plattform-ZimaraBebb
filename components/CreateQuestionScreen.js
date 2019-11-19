import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CreateQuestionScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Frage zu der Kategorie {props.navigation.getParam('category').name} erstellen</Text>
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
