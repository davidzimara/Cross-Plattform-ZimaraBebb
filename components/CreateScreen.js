import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';


export default function CreateScreen() {
    const value = null;

    return (
        <View style={styles.container}>
            <Text style={styles.spacer}>Create</Text>
            <TextInput value={value} label="Kategorie Name" style={styles.spacer}/>
            <Button onPress={() => alert('Simple Button pressed')} title='Speichern' mode='contained'
            >Speichern</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    spacer: {
        marginBottom: '5%',
    }
});
