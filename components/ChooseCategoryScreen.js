import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView, View} from 'react-native';
import {Button} from 'react-native-paper';
import * as firebase from "firebase";

export default class CategoryDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }

    componentDidMount() {
        const {navigation} = this.props;

        this.focusListener = navigation.addListener('didFocus', () => {
            this._updateCategoriesShown();
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
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

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.header}>Wählen Sie eine Kategorie aus </Text>
                    {
                        this.state.categories.map((category, key) => (
                                <View key={key} style={styles.category}>
                                    <Button
                                        onPress={() => this.props.navigation.navigate('play', {category: category})}
                                        style={styles.text}> {category.name} </Button>
                                </View>
                            )
                        )
                    }
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
    category: {
        flexDirection: 'row',
        borderTopColor: 'tomato',
        borderTopWidth: 1,
        justifyContent: 'space-between',
        width: '80%'
    },
    text: {
        fontSize: 18,
        width: '100%'
    },
    header: {
        marginBottom: 25,
        fontSize: 25
    }
});
