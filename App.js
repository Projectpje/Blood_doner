import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import * as GoogleSignIn from 'expo-google-sign-in';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

    console.log("component did mount");
  //  this.signInAsync();
  }

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}
