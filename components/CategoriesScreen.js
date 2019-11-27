import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Dialog, Portal, TextInput} from 'react-native-paper';
import * as firebase from "firebase";
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class CategoriesScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            visible: false,
            name: '',
            id: ''
        };
    }

    componentDidMount() {

        const {navigation} = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this._updateCategoriesShown();
        });
    }

    _updateCategoriesShown() {
        const ref = firebase.database().ref('Categorys');

        //get data from firebase and push it to state categories
        ref.once('value').then(function (snapshot) {
            const categories = [];

            snapshot.forEach(item => {
                const temp = item.val();
                categories.push(temp);
                return false;
            });
            //PASSING VARIABLE TO STATE
            this.setState({
                categories: categories
            });

        }.bind(this));
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    _edit(id) {
        const ref = firebase.database().ref('Categorys/' + id);
        if (this.state.name === '') {
            alert("Bitte geben sie einen Namen ein");
            return false;
        }

        ref.update({
            name: this.state.name
        });

        this._updateCategoriesShown();
        this._hideDialog();
        this.setState({name: ''});
    };

    _delete(id) {
        const ref = firebase.database().ref('Categorys/' + id);
        ref.remove();
        this._updateCategoriesShown();
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
                <Text style={styles.header}>Kategorien</Text>
                {
                    this.state.categories.map((category, key) => (
                            <View key={key} style={styles.category}>
                                <Button
                                    onPress={() => this.props.navigation.navigate('categoryDetail', {category: category})}
                                    style={styles.text}> {category.name} </Button>
                                <View style={styles.iconWrapper}>
                                    <IconComponent style={styles.icons} onPress={() => this._editAlert(category.id)}
                                                   name={'md-create'} size={25}
                                                   color={'tomato'}/>
                                    <IconComponent style={styles.icons} onPress={() => this._delete(category.id)}
                                                   name={'md-remove-circle-outline'}
                                                   size={25} color={'tomato'}/>
                                </View>
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
        justifyContent: 'space-between',
        width: '80%'
    },
    iconWrapper: {
        flexDirection: 'row'
    },
    text: {
        fontSize: 18,
        flexWrap: 'wrap',
        flex: 1,
        flexDirection: 'row'
    },
    header: {
        marginBottom: 25,
        fontSize: 25
    },
    icons: {
        marginRight: 10
    }
});
