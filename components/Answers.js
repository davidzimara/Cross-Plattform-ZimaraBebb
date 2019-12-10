import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from "react-native-paper";

export default class Answers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answerClicked: false,
            rightAnswer: false
        }
    }

    componentDidMount() {
        let answersArray = this.props.question.answers;

        let answerObjects = answersArray.map((answer, i) => {
            return {answer: answer, right: i === 0}
        });

        this.props.question.answers = this._shuffle(answerObjects);
    }

    _shuffle(a) {
        if (this.state.shuffled) return a;
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }

        this.setState({
            shuffled: true
        });

        return a;
    }

    _checkAnswer(rightAnswer) {
        this.setState({
            answerClicked: true,
            rightAnswer: rightAnswer
        });
    };

    render() {
        return (
            <View>
                <Text style={styles.text}>{this.props.question.question}</Text>
                <View style={styles.answerWrapper}>
                    {this.props.question.answers.map((question, i) => {
                        return (
                            <View key={i}
                                  style={[styles.answer, {backgroundColor: this.state.answerClicked ? (question.right ? 'green' : 'red') : 'yellow'}]}
                                  onTouchEnd={() => this._checkAnswer(question.right)}><Text
                                style={{fontSize: styles.text.fontSize}}>{question.answer}</Text></View>
                        )
                    })}
                </View>
                <View style={[styles.feedback, {display: this.state.answerClicked ? 'flex' : 'none'}]}>
                    <Text style={{color: 'tomato', fontSize: 20, textAlign: 'center'}}>
                        {this.state.rightAnswer ? 'Richtig!' : 'Falsch!'}
                    </Text>
                </View>
                <Button mode='contained' style={{display: this.state.answerClicked ? 'flex' : 'none'}}
                        onPress={this.props.nextQuestion}>Nächste Frage</Button>
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
