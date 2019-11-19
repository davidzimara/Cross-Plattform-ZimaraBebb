import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Dialog, Portal, TextInput} from 'react-native-paper';
import * as firebase from "firebase";


export default class CategoriesScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            visible: false,
            name: '',
            id: ''
        }
    }

    componentDidMount() {
        const ref = firebase.database().ref('Categorys');

        const {navigation} = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
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
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    _edit(id) {
        const ref = firebase.database().ref('Categorys/' + id);

        ref.update({
            name: this.state.name
        });

        firebase.database().ref('Categorys').once('value').then(function (snapshot) {
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

        this._hideDialog();

    };

    _delete(id) {
        const ref = firebase.database().ref('Categorys/' + id);
        ref.remove();
    };

    _editAlert(id) {
        this.setState({id: id});
        this._showDialog()

    }


    _showDialog = () => this.setState({visible: true});

    _hideDialog = () => this.setState({visible: false});

    render() {

        return (
            <View style={styles.container}>
                <Text>Kategories</Text>
                {
                    this.state.categories.map((category, key) => (
                            <View key={key}>
                                <Text> {category.name} </Text>
                                <Button onPress={() => this._editAlert(category.id)}>Bearbeiten</Button>
                                <Button onPress={() => this._delete(category.id)}>Löschen</Button>
                            </View>
                        )
                    )
                }
                <Portal>
                    <Dialog
                        visible={this.state.visible}
                        onDismiss={this._hideDialog}>
                        <Dialog.Title>Kategorie bearbeiten</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                style={styles.input}
                                value={this.state.name}
                                onChangeText={(text) => { this.setState({name: text}) }}
                                label="Name"
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => this._hideDialog}>Abbrechen</Button>
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
    input: {
        height: 60,  marginBottom: 10
    }
});
