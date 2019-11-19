import React, {Component} from 'react';
import {StyleSheet, Text, View, AsyncStorage} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import * as  SQLite from "expo-sqlite";
import * as firebase from 'firebase';


const database = SQLite.openDatabase('my_storage.db');

export default class CreateScreen extends Component {

    constructor(props) {
        super(props);
        this.name = '';
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        const ref = firebase.database().ref('Categorys');

        ref.once('value').then(function (snapshot) {
            const categories = [];

            snapshot.forEach(item => {
                const temp = item.val();
                categories.push(temp);
                return false;
            });

            this.setState({    //PASSING VARIABLE TO STATE
                categories: categories
            });

        }.bind(this));
    }

    _save = () => {
        const {name} = this.state;
        let id = firebase.database().ref('Categorys/').push().key.toString();

        firebase.database().ref('Categorys/').child(id).set({
            id: id,
            name: name
        });
    };


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.spacer}>Kategorie Erstellen</Text>
                <TextInput value={this.state.name} label="Kategorie Name" style={styles.spacer}
                           onChangeText={text => this.setState({name: text})}/>
                <Button onPress={this._save} title='Speichern' mode='contained' style={styles.button}
                >Speichern</Button>

                <Text style={styles.spacer}>Frage zu einer Kategorie Erstellen:</Text>

                {
                    this.state.categories.map((category, key) => (
                        <Button style={styles.spacer} mode="outlined"
                                onPress={() => this.props.navigation.navigate('createQuestion', {category: category})}
                                key={key}> {category.name} </Button>
                    ))
                }
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
    },
    button: {
        marginBottom: 20,
    }
});
