import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as firebase from "firebase";


export default class CategoriesScreen extends Component {


  constructor(props) {
    super(props);
    this.names = ''
  }


  async componentDidMount() {
        // //Daten aus Asyncstorage auslesen
        // const name = await AsyncStorage.getItem('NEW_CATEGORY');
        // console.log(name)

        firebase.database().ref('Categorys/').on("value", function (snapshot) {
          // console log for data
            console.log(snapshot.val());
        });

        // database.transaction(transaction => transaction.executeSql('CREATE TABLE IF NOT EXISTS  people (id Integer PRIMARY KEY NOT NULL, name TEXT )'))
        //
        // database.transaction(transaction => transaction.executeSql('SELECT * from people', [],(_, result)=> {
        //     console.log(result.rows._array);
        // }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Kategories</Text>


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
