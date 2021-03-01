/** @format */

import React, { Component } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import StepIndicator from "react-native-step-indicator";
import AppTextInput from "../Components/AppTextInput/AppTextInput";
import AppButton from "../Components/AppButton/AppButton";
import Styles from "./styles";
import RegistrationType from "./Steps/RegistrationType/RegistrationType";
import RegistrationForm from "./Steps/RegistrationForm/RegistrationForm";
import DonorInfo from "./Steps/DonorInfo/DonorInfo";
import HospitalInfo from "./Steps/HospitalInfo/HospitalInfo";
import R from "../Utils/R";
import { DATABASE_NODES, USER_TYPE } from "../Utils/Enums";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import ScreenContainer from "../Components/ScreenContainer/ScreenContainer";
import Questionnaire from "./Steps/Questionnaire/Questionnaire";
import firebase from "firebase";
import { inject, observer } from "mobx-react";

@inject("userStore")
@observer
export default class Registration extends Component {
  scrollRef: ScrollView = null;

  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      registrationType: "",
      emailId: "",
      userId: "",
      questionnaire: false,
      currentStep: 0,
    };
  }

  // When one of donor or hospital notification type selected
  onRegistrationTypeSelected = (registrationType) => {
    this.setState({ registrationType, currentStep: 1 });

    this.scrollRef?.scrollTo({ x: R.Dimension.width, y: 0, animated: true });
  };

  // In the second step, create a user with email id and passowrd, 
  onAccountCreated = (emailId, userId) => {
    this.setState({ emailId, userId, currentStep: 2 });
    this.scrollRef?.scrollTo({
      x: 2 * R.Dimension.width,
      y: 0,
      animated: true,
    });
  };

  // When donor profile is completed, show Questionnaire screen.
  onProfileCompleted = () => {
    this.setState({ questionnaire: true, currentStep: 3 });
    this.scrollRef?.scrollTo({
      x: 3 * R.Dimension.width,
      y: 0,
      animated: true,
    });
  };

  // Once questionnarire is completed, navigate to donor screen
  onQuestionnaireCompleted = () => {
    const { navigation } = this.props;
    const { userId } = this.state;

    // Fetch donor infor from firebase and save into userStore
    firebase
      .database()
      .ref(`${DATABASE_NODES.DONORS}/${userId}`)
      .once("value", (data) => {
        const response = data.val();

        if (response) {
          const { navigation, userStore } = this.props;
          userStore.setUser(response);
          navigation.navigate("Donor");
        }
      });
  };

  // Once hospital profile is completed, navigate to hospital dashboard
  onHospitalProfileCompleted = () => {
    const { navigation } = this.props;
    const { userId } = this.state;

    // Fetch Hospital info from the firebase and save into userStore
    firebase
      .database()
      .ref(`${DATABASE_NODES.HOSPITAL}/${userId}`)
      .once("value", (data) => {
        const response = data.val();

        if (response) {
          const { navigation, userStore } = this.props;
          userStore.setUser(response);
          navigation.navigate("Hospital");
        }
      });
  };

  render() {
    const { registrationType, questionnaire, currentStep, userId } = this.state;
    const isDonor = registrationType === USER_TYPE.DONOR;

    return (
      <ScreenContainer>
        <SafeAreaView />

        <View style={{ height: 100, width: "100%", justifyContent: "center" }}>
          <StepIndicator
            stepCount={!isDonor ? 3 : 4}
            currentPosition={currentStep}
          />
        </View>

        <ScrollView
          horizontal
          scrollEnabled={false}
          ref={(ref) => (this.scrollRef = ref)}
        >
          <RegistrationType
            onRegistrationTypeSelected={this.onRegistrationTypeSelected}
          />

          <RegistrationForm
            isDonor={isDonor}
            onAccountCreated={this.onAccountCreated}
          />

          {isDonor && (
            <DonorInfo
              userId={userId}
              onProfileCompleted={this.onProfileCompleted}
            />
          )}

          {!isDonor && (
            <HospitalInfo
              userId={userId}
              onProfileCompleted={this.onHospitalProfileCompleted}
            />
          )}

          {(isDonor || true) && (
            <Questionnaire
              userId={userId}
              onQuestionnaireCompleted={this.onQuestionnaireCompleted}
            />
          )}
        </ScrollView>
      </ScreenContainer>
    );
  }
}
