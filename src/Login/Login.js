import React, { Component } from "react";
import { View, Text, Image, ScrollView, TextInput, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import firebase from 'firebase';
import AppButton from "../Components/AppButton/AppButton";
import AppText from "../Components/AppText/AppText";
import AppTextInput from "../Components/AppTextInput/AppTextInput";
import ScreenContainer from "../Components/ScreenContainer/ScreenContainer";
import { USER_TYPE } from "../Utils/Enums";
import R from "../Utils/R";
import Styles from "./styles";


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: "",
      password: "",
      loading: false,
    };

  }

  navigationToRegistration = () => {
    const { navigation } = this.props;
    navigation.navigate("Registration");
  };


  onUserTypeSelected = (userType) => {
    this.setState({ loginType: userType })
  }

  onEmailIdChange = (text) => {
    this.setState({ emailId: text?.trim().toLowerCase() })
  }

  onPasswordChange = (text) => {
    this.setState({ password: text?.trim().toLowerCase() });
  }


  onPress = () => {
    if (this.validate()) {
      this.signInUsingEmail();
    } else {
      Alert.alert("Error", "Please enter required fields");
    }


  }

  validate = () => {
    const { emailId, password } = this.state;
    return emailId?.trim()?.length > 0 && password?.trim()?.length > 0;
  }

  signInUsingEmail = () => {
    const { emailId, password } = this.state;

    this.setState({ loading: true });

    firebase.auth().signInWithEmailAndPassword(emailId, password)
      .then(data => {
        const { user: { uid } } = data;

        this.fetchUserType(uid)

      }).catch(error => {
        Alert.alert("Login Error", error.message);
        this.setState({ loading: false })
      });
  }

  fetchUserType = (uid) => {
    firebase.database().ref(`users/${uid}`)
      .on('value', (data) => {
        const response = data.val();

        if (response) {
          const { uid, userType } = response;

          this.fetchCurrentUserRecord(uid, userType);

        } else {
          this.showUserRecordDeletedMessage();
        }
      });
  }

  fetchCurrentUserRecord = (uid, userType) => {

    const node = userType === USER_TYPE.DONOR ? "donors" : "hospitals";

    firebase.database()
      .ref(`${node}/${uid}`).once("value", (data) => {

        const response = data.val();

        this.setState({ loading: false })

        if (response) {
          const { navigation } = this.props;

          navigation.navigate("DonorHome")

        } else {
          this.showUserRecordDeletedMessage();
        }

      })
  }

  showUserRecordDeletedMessage = () => {
    Alert.alert("Login Error", "No user data found. Seems like your record is deleted. Please register again");
    // firebase.auth().signOut();
  }


  render() {

    const { emailId, password, loading } = this.state;

    return (
      <View style={{ flex: 1 }}
        pointerEvents={loading ? "none" : "auto"}
      >
        <ScreenContainer>
          <KeyboardAwareScrollView
            contentContainerStyle={Styles.containerStyle}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={false}
          >

            <View style={{ flex: 1 }}>

              <Image
                source={R.Images.Logo}
                style={Styles.logoStyle}
                resizeMode="cover"
              />



              <AppTextInput
                placeholder="Enter email Id"
                value={emailId}
                onChangeText={this.onEmailIdChange}
                keyboardType="email-address"
                isNonEmpty

              />

              <AppTextInput
                style={{ marginTop: 5 }}
                placeholder="Enter password"
                value={password}
                onChangeText={this.onPasswordChange}
                secureTextEntry
                isNonEmpty
              />

              <AppButton
                title="Login"
                onPress={this.onPress}
                style={{ marginTop: 30 }}
                isLoading={loading}
              />

            </View>

            <AppText style={{ textAlign: 'center' }} type="small">Don't have an account?
            <AppText onPress={this.navigationToRegistration}
                style={{ color: "blue" }}
              > Register</AppText>
            </AppText>


          </KeyboardAwareScrollView>

        </ScreenContainer>
      </View>
    );
  }
}
