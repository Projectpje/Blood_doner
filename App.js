import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import AppNavigation from './src/Navigation/index';
import * as GoogleSignIn from 'expo-google-sign-in';
import {Provider} from 'mobx-react';
import * as store from './src/store';

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
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

    console.log("component did mount");
    // this.signInWithGoogle();
  }

  signInWithGoogle = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      const data = await GoogleSignIn.GoogleAuthentication.prototype.toJSON();
      if (type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        const googleProfileData = await firebase.auth().signInWithCredential(credential);
        this.onLoginSuccess.bind(this);
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  }

  initAsync = async () => {
    await GoogleSignIn.initAsync({
    });
    this.signInAsync();
  };

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
      <Provider  {...store.rootStore}>
      <AppNavigation />
      </Provider>
    );
  }
}
