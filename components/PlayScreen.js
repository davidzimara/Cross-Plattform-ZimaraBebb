import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import * as firebase from "firebase";
import Answers from "./Answers";


export default class CategoryDetailScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            currentQuestion: 0,
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


    _nextQuestion = () => {
        // gehe zur nächsten Frage
        const nextQuestion = this.state.currentQuestion + 1;
        // überprüfe, ob letzte Frage erreicht
        if (nextQuestion === this.state.questions.length) {
            this.setState({currentQuestion: -1});
        } else {
            this.setState({currentQuestion: nextQuestion});
        }
    };


    render() {
        const {questions, currentQuestion} = this.state;

        if (questions.length === 0)
            return (
                <View style={styles.container}>
                    <Text>Es gibt keine Fragen in dieser Kategorie.</Text>
                </View>
            );

        if (currentQuestion === -1)
            return (
                <View style={styles.container}>
                    <Text>Quiz beendet.</Text>
                </View>
            );

        let answers = [
            questions[currentQuestion].answer1,
            questions[currentQuestion].answer2,
            questions[currentQuestion].answer3,
            questions[currentQuestion].answer4
        ];
        const question = {...questions[currentQuestion], answers: answers};
        const AnswerElement = () => {
            return (<Answers nextQuestion={() => this._nextQuestion()}
                             question={question}/>)
        };
        return (
            <View style={styles.container}>
                <AnswerElement/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    feedback: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
    },
    text: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
