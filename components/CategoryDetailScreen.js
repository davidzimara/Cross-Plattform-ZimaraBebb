import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView, View} from 'react-native';
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
            id: '',
            fieldName: '',
            fieldValue: '',
            translatedFieldName: ''
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

    _edit(id, fieldName) {
        let categoryId = this.props.navigation.getParam('category').id;
        const ref = firebase.database().ref('Categorys/' + categoryId + '/questions/' + id);

        if (this.state.fieldValue === '') {
            alert("Bitte geben sie einen Text ein");
            return false;
        }

        if (fieldName === 'question') {
            ref.update({
                question: this.state.fieldValue
            });
        } else if (fieldName === 'answer1') {
            ref.update({
                answer1: this.state.fieldValue
            });
        } else if (fieldName === 'answer2') {
            ref.update({
                answer2: this.state.fieldValue
            });
        } else if (fieldName === 'answer3') {
            ref.update({
                answer3: this.state.fieldValue
            });
        } else if (fieldName === 'answer4') {
            ref.update({
                answer4: this.state.fieldValue
            });
        }

        this._updateQuestionsShown();
        this._hideDialog();
        this.setState({fieldValue: ''});
    };

    _delete(id) {
        let categoryId = this.props.navigation.getParam('category').id;
        const ref = firebase.database().ref('Categorys/' + categoryId + '/questions/' + id);
        ref.remove();
        this._updateQuestionsShown();
    };

    _editAlert(id, fieldName) {
        const translatedFieldName = this._translateFieldName(fieldName);
        this.setState({id, fieldName, translatedFieldName});
        this._showDialog();
    }

    _translateFieldName(fieldName) {
        switch (fieldName) {
            case "answer1":
                return 'Antwort 1';
            case "answer2":
                return 'Antwort 2';
            case "answer3":
                return 'Antwort 3';
            case "answer4":
                return 'Antwort 4';
            default:
                return 'Frage'
        }
    }

    _showDialog = () => this.setState({visible: true});

    _hideDialog = () => this.setState({visible: false});

    render() {
        let IconComponent = Ionicons;

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.header}>Fragen zu der
                        Kategorie {this.props.navigation.getParam('category').name}</Text>
                    {
                        this.state.questions.map((question, key) => (
                                <View style={styles.wrapper} key={key}>
                                    <View style={styles.categoryFirst}>
                                        <Text style={styles.text}> {question.question} </Text>
                                        <View style={styles.categoryFirstIcon}>
                                            <IconComponent style={styles.icons}
                                                           onPress={() => this._editAlert(question.id, 'question')}
                                                           name={'md-create'} size={25}
                                                           color={'tomato'}/>
                                            <IconComponent style={styles.icons} onPress={() => this._delete(question.id)}
                                                           name={'md-remove-circle-outline'}
                                                           size={25} color={'tomato'}/>
                                        </View>
                                    </View>
                                    <View style={styles.category}>
                                        <Text style={[styles.text, styles.answer]}> {question.answer1} </Text>
                                        <IconComponent style={styles.icons}
                                                       onPress={() => this._editAlert(question.id, 'answer1')}
                                                       name={'md-create'} size={25}
                                                       color={'tomato'}/>
                                    </View>
                                    <View style={styles.category}>
                                        <Text style={styles.text}> {question.answer2} </Text>
                                        <IconComponent style={styles.icons}
                                                       onPress={() => this._editAlert(question.id, 'answer2')}
                                                       name={'md-create'} size={25}
                                                       color={'tomato'}/>
                                    </View>
                                    <View style={styles.category}>
                                        <Text style={styles.text}> {question.answer3} </Text>
                                        <IconComponent style={styles.icons}
                                                       onPress={() => this._editAlert(question.id, 'answer3')}
                                                       name={'md-create'} size={25}
                                                       color={'tomato'}/>
                                    </View>
                                    <View style={styles.category}>
                                        <Text style={styles.text}> {question.answer4} </Text>
                                        <IconComponent style={styles.icons}
                                                       onPress={() => this._editAlert(question.id, 'answer4')}
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
                            <Dialog.Title>{this.state.translatedFieldName} bearbeiten</Dialog.Title>
                            <Dialog.Content>
                                <TextInput
                                    style={styles.input}
                                    value={this.state.fieldValue}
                                    onChangeText={(text) => {
                                        this.setState({fieldValue: text})
                                    }}
                                    label={this.state.translatedFieldName}
                                />
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={() => this._hideDialog()}>Abbrechen</Button>
                                <Button
                                    onPress={() => this._edit(this.state.id, this.state.fieldName)}>Speichern</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </View>
            </ScrollView>
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
        height: 60, marginBottom: 10
    },
    categoryFirst: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    categoryFirstIcon: {
        flexDirection: 'row',
    },
    category: {
        flexDirection: 'row',
        borderTopColor: 'tomato',
        borderTopWidth: 1,
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 18,
        flex: 1
    },
    header: {
        width: '80%',
        marginBottom: 25,
        fontSize: 25
    },
    icons: {
        marginLeft: 10
    },
    wrapper: {
        width: '80%',
        marginBottom: 25,
        borderTopColor: 'grey',
        borderTopWidth: 2,
        borderBottomColor: 'grey',
        borderBottomWidth: 2
    }
});
