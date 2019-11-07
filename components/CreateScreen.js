import React, {Component} from 'react';
import {StyleSheet, Text, View, AsyncStorage} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import * as  SQLite from "expo-sqlite";


const database = SQLite.openDatabase('my_storage.db');

export default class CreateScreen extends Component {
    state = {name: null};

    async componentDidMount() {
        // //Daten aus Asyncstorage auslesen
        // const name = await AsyncStorage.getItem('NEW_CATEGORY');
        // console.log(name)


        database.transaction(transaction => transaction.executeSql('CREATE TABLE IF NOT EXISTS  people (id Integer PRIMARY KEY NOT NULL, name TEXT )'))

        database.transaction(transaction => transaction.executeSql('SELECT * from people', [],(_, result)=> {
            console.log(result.rows._array);
        }))
    }

    _save = () => {
        // // in Asyncstorage speichern
        // AsyncStorage.setItem('NEW_CATEGORY', this.state.name)
        const { name } = this.state;
        database.transaction(transaction => transaction.executeSql(
            'INSERT into people (name) VALUES (?)', [name],
            (_, result) => console.log(result)
            )
        );
    };


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.spacer}>Create</Text>
                <TextInput value={this.state.name} label="Kategorie Name" style={styles.spacer}
                           onChangeText={text => this.setState({name: text})}/>
                <Button onPress={this._save} title='Speichern' mode='contained'
                >Speichern</Button>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        width: '80%',
        alignSelf: 'center'
    },
    spacer: {
        marginBottom: 5,
    }
});
