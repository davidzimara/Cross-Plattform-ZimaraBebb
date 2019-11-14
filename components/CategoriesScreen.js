import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as firebase from "firebase";


export default class CategoriesScreen extends Component {


    constructor(props) {
        super(props);
        this.names = '';
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

    render() {

        console.log(this.state.categories);
        return (
            <View style={styles.container}>
                <Text>Kategories</Text>
                {
                    this.state.categories.map((category, key) => (
                        <Text key={key}> {category.name} </Text>
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
        alignItems: 'center',
        justifyContent: 'center'
    }
});
