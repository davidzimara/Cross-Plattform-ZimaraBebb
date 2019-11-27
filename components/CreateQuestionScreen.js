import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import * as firebase from "firebase";


export default class CreateQuestionScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: ''
        }
    }

    _save() {
        let categoryId = this.props.navigation.getParam('category').id;
        let id = firebase.database().ref('Categorys/' + categoryId).push().key.toString();


        if (this.state.question === '' ||
            this.state.answer1 === '' ||
            this.state.answer2 === '' ||
            this.state.answer3 === '' ||
            this.state.answer4 === '') {
            alert("Bitte Füllen sie alle Felder aus");
            return;
        }

        firebase.database().ref('Categorys/' + categoryId + '/questions').child(id).set({
            id: id,
            categoryId: categoryId,
            question: this.state.question,
            answer1: this.state.answer1,
            answer2: this.state.answer2,
            answer3: this.state.answer3,
            answer4: this.state.answer4
        });

        this.props.navigation.navigate('Kategorien');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.spacer}>Frage zu der
                    Kategorie {this.props.navigation.getParam('category').name} erstellen</Text>
                <TextInput
                    value={this.state.question} label='Frage' style={styles.input}
                    onChangeText={text => this.setState({question: text})}/>
                <TextInput
                    value={this.state.answer1} label='Richtige Antwort' style={styles.input}
                    onChangeText={text => this.setState({answer1: text})}/>
                <TextInput
                    value={this.state.answer2} label='Antwort2' style={styles.input}
                    onChangeText={text => this.setState({answer2: text})}/>
                <TextInput
                    value={this.state.answer3} label='Antwort3' style={styles.input}
                    onChangeText={text => this.setState({answer3: text})}/>
                <TextInput
                    value={this.state.answer4} label='Antwort4' style={styles.input}
                    onChangeText={text => this.setState({answer4: text})}/>
                <Button style={styles.button} mode='contained' onPress={() => this._save()}>Speichern</Button>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: 250, height: 60, marginBottom: 10
    },
    button: {
        marginBottom: 10,
        width: 250
    },
    spacer: {
        marginBottom: 15
    }
});
