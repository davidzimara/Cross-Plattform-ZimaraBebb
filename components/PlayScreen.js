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
            currentQuestion: 0,
            answerClicked: false,
            rightAnswer: false,
            shuffled: false,
            shuffledArray: []
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


    _checkAnswer(rightAnswer) {
        this.setState({
            answerClicked: true
        });

        if (rightAnswer) {
            this.setState({
                rightAnswer: true
            })
        }
    };

    _nextQuestion = () => {
        // gehe zur nächsten Frage
        const nextQuestion = this.state.currentQuestion + 1;
        this.setState({
            answerClicked: false,
            shuffled: false,
            rightAnswer: false,
            shuffledArray: []
        });
        // überprüfe, ob letzte Frage erreicht
        if (nextQuestion === this.state.questions.length) {
            this.setState({currentQuestion: -1});
        } else {
            this.setState({currentQuestion: nextQuestion});
        }
    };

    _shuffle(a) {
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }

        this.setState({
            shuffledArray: a,
            shuffled: true
        });

        //return a;
    }

    render() {
        const {questions, currentQuestion} = this.state;
        // TODO: Fall behandeln, dass Daten aus Firebase geladen werden
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

        console.log(this.state.answerClicked);

        let questionArray = [
            (<View key={1} style={[styles.answer, {backgroundColor: this.state.answerClicked ? 'green' : 'yellow'}]}
                   onTouchEnd={() => this._checkAnswer(true)}><Text
                style={{fontSize: styles.text.fontSize}}>{questions[currentQuestion].answer1}</Text></View>),
            (<View key={2} style={[styles.answer, {backgroundColor: this.state.answerClicked ? 'red' : 'yellow'}]}
                   onTouchEnd={() => this._checkAnswer(false)}><Text
                style={{fontSize: styles.text.fontSize}}>{questions[currentQuestion].answer2}</Text></View>),
            (<View key={3} style={[styles.answer, {backgroundColor: this.state.answerClicked ? 'red' : 'yellow'}]}
                   onTouchEnd={() => this._checkAnswer(false)}><Text
                style={{fontSize: styles.text.fontSize}}>{questions[currentQuestion].answer3}</Text></View>),
            (<View key={4} style={[styles.answer, {backgroundColor: this.state.answerClicked ? 'red' : 'yellow'}]}
                   onTouchEnd={() => this._checkAnswer(false)}><Text
                style={{fontSize: styles.text.fontSize}}>{questions[currentQuestion].answer4}</Text></View>)
        ];

        let shuffledQuestion = this.state.shuffled ? this.state.shuffledArray : this._shuffle(questionArray);

        return (
            <View style={styles.container}>
                <Text style={styles.text}>{questions[currentQuestion].question}</Text>
                <View style={styles.answerWrapper}>
                    {shuffledQuestion}
                </View>

                <View style={[{display: this.state.answerClicked ? 'flex' : 'none'}, styles.feedback]}>
                    <Text style={{color: 'tomato', fontSize: 20, textAlign: 'center'}}>
                        {this.state.rightAnswer ? 'Richtig!' : 'Falsch!'}
                    </Text>
                </View>
                <Button mode='contained' style={{display: this.state.answerClicked ? 'flex' : 'none'}}
                        onPress={this._nextQuestion}>Nächste Frage</Button>
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
    },
    answerWrapper: {
        flexDirection: "row",
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    answer: {
        width: '48%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginBottom: 10,
    }
});
