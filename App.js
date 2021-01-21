import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

const firebaseConfig = {
  databaseURL: 'https://blooddoner-19be1-default-rtdb.firebaseio.com/',
  apiKey: "AIzaSyCiMq1dMYK6R1iWantDN2wd2Gky8ia1Tho",
  authDomain: "blooddoner-19be1.firebaseapp.com",
  projectId: "blooddoner-19be1",
  storageBucket: "blooddoner-19be1.appspot.com",
  messagingSenderId: "938470999100",
  appId: "1:938470999100:web:86610d21fc75fa952fef39",
  measurementId: "G-2298TL36JK"
};

if (!firebase.apps.length) {
  firebase.initializeApp({});
}else {
  firebase.app(); // if already initialized, use that one
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
   
  }

  render() {
    return (
      <View>
        <Text> App </Text>
      </View>
    );
  }
}
