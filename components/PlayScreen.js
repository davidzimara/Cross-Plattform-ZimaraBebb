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


            console.log(questions);
            //PASSING VARIABLE TO STATE
            this.setState({
                questions: questions
            });

        }.bind(this));
    }



    render() {


        return (
            <View style={styles.container}>

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
});
