import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Dialog, Portal, TextInput} from 'react-native-paper';
import * as firebase from "firebase";
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class CategoryDetailScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            visible: false,
            name: '',
            id: ''
        };
    }

    componentDidMount() {

        const {navigation} = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this._updateQuestionsShown();
        });
    }


    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }


    _updateQuestionsShown() {
        let categoryId = this.props.navigation.getParam('category').id;

        const ref = firebase.database().ref('Categorys/' + categoryId + '/questions');

        //get data from firebase and push it to state categories
        ref.once('value').then(function (snapshot) {
            const questions = [];

            snapshot.forEach(item => {
                const temp = item.val();
                questions.push(temp);
                return false;
            });
            //PASSING VARIABLE TO STATE
            this.setState({
                questions: questions
            });

        }.bind(this));
    }

    _edit(id , field) {
        const ref = firebase.database().ref('Categorys/' + id + '/questions');
        if (this.state.name === '') {
            alert("Bitte geben sie einen Text ein");
            return false;
        }

        ref.update({
            name: this.state.name
        });

        this._updateQuestionsShown();
        this._hideDialog();
        this.setState({name: ''});
    };

    _delete(id) {
        let categoryId = this.props.navigation.getParam('category').id;
        const ref = firebase.database().ref('Categorys/' + categoryId + '/questions/' + id);
        ref.remove();
        this._updateQuestionsShown();
    };

    _editAlert(id) {
        this.setState({id: id});
        this._showDialog()

    }


    _showDialog = () => this.setState({visible: true});

    _hideDialog = () => this.setState({visible: false});


    render() {
        let IconComponent = Ionicons;


        return (
            <View style={styles.container}>
                <Text style={styles.header}>Fragen zu der Kategorie ....</Text>
                {
                    this.state.questions.map((question, key) => (
                            <View key={key}>
                                <View style={styles.category}>

                                    <Text style={styles.text}> {question.question} </Text>
                                    <IconComponent style={styles.icons} onPress={() => this._editAlert(question.id,'question')}
                                                   name={'md-create'} size={25}
                                                   color={'tomato'}/>
                                    <IconComponent style={styles.icons} onPress={() => this._delete(question.id)}
                                                   name={'md-remove-circle-outline'}
                                                   size={25} color={'tomato'}/>
                                </View>
                                <View style={styles.category}>
                                    <Text style={styles.text}> {question.answer1} </Text>
                                    <IconComponent style={styles.icons} onPress={() => this._editAlert(question.id,'answer1')}
                                                   name={'md-create'} size={25}
                                                   color={'tomato'}/>
                                </View>
                                <View style={styles.category}>
                                    <Text style={styles.text}> {question.answer2} </Text>
                                    <IconComponent style={styles.icons} onPress={() => this._editAlert(question.id,'answer2')}
                                                   name={'md-create'} size={25}
                                                   color={'tomato'}/>
                                </View>
                                <View style={styles.category}>
                                    <Text style={styles.text}> {question.answer3} </Text>
                                    <IconComponent style={styles.icons} onPress={() => this._editAlert(question.id,'answer3')}
                                                   name={'md-create'} size={25}
                                                   color={'tomato'}/>
                                </View>
                                <View style={styles.category}>
                                    <Text style={styles.text}> {question.answer4} </Text>
                                    <IconComponent style={styles.icons} onPress={() => this._editAlert(question.id,'answer4')}
                                                   name={'md-create'} size={25}
                                                   color={'tomato'}/>
                                </View>


                            </View>
                        )
                    )
                }
                <Portal>
                    <Dialog
                        visible={this.state.visible}
                        onDismiss={this._hideDialog}>
                        <Dialog.Title>Frage bearbeiten</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                style={styles.input}
                                value={this.state.name}
                                onChangeText={(text) => {
                                    this.setState({name: text})
                                }}
                                label="Name"
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => this._hideDialog()}>Abbrechen</Button>
                            <Button onPress={() => this._edit(this.state.id)}>Speichern</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
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
    spacer: {
        marginBottom: 5,
    },
    input: {
        height: 60, marginBottom: 10
    },
    category: {
        flexDirection: 'row',
        borderTopColor: 'tomato',
        borderTopWidth: 1,
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 18
    },
    header: {
        marginBottom: 25,
        fontSize: 25
    },
    icons: {
        marginLeft: 10
    }
});
