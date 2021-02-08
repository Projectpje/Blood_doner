/** @format */

import React, { Component } from "react";
import { Keyboard, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import firebase from "firebase";
import AppButton from "../../../Components/AppButton/AppButton";
import AppText from "../../../Components/AppText/AppText";
import AppTextInput from "../../../Components/AppTextInput/AppTextInput";
import ChipGroup from "../../../Components/ChipGroup/ChipGroup";
import ScreenContainer from "../../../Components/ScreenContainer/ScreenContainer";
import { DATABASE_NODES, GENDER } from "../../../Utils/Enums";
import { IsNonEmptyString } from "../../../Utils/HelperFunctions";
import R from "../../../Utils/R";
import Styles from "./styles";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class DonorInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phoneNumber: "",
      city: "",
      bloodGroup: "",
      gender: "",
      loading: false,
      dobPicker: false,
      dob: ""
    };
  }

  onNameChange = (text) => {
    this.setState({ name: text });
  };

  onContactChange = (text) => {
    this.setState({ phoneNumber: text });
  };

  onCityChange = (text) => {
    this.setState({ city: text });
  };

  onBloodGroupChange = (group) => {
    this.setState({ bloodGroup: group });
  };

  onRhChange = (rh) => {
    this.setState({ rh });
  };

  onGenderChange = (gender) => {
    this.setState({ gender });
  };

  showDOBPicker = () => {
      this.setState({dobPicker: true});
      Keyboard.dismiss();
  }

  hideDOBPicker = () => {
      this.setState({dobPicker: false})
  }

  validate = () => {
    const { name, city, phoneNumber, bloodGroup, gender, dob } = this.state;

    if (!IsNonEmptyString(name)) {
      alert("Enter name");
      return;
    }

    if (!IsNonEmptyString(phoneNumber)) {
      alert("Enter Contact Number");
      return;
    }

    if (!IsNonEmptyString(city)) {
      alert("Enter City");
      return;
    }

    if (!IsNonEmptyString(dob)) {
        alert("Select age");
        return;
      }

    if (!IsNonEmptyString(bloodGroup)) {
      alert("Select Blood Group");
      return;
    }

    if (!IsNonEmptyString(gender)) {
      alert("Select Gender");
      return;
    }

    this.saveDataInDatabase();
  };

  onDobChange = (date) => {
    this.setState({
        dob: date.toISOString().substring(0, 10),
        dobPicker: false,
      });
  }

  saveDataInDatabase = () => {
    const { userId, onProfileCompleted } = this.props;
    const { name, city, phoneNumber, bloodGroup, gender, dob } = this.state;

    this.setState({ loading: true });

    firebase
      .database()
      .ref(`${DATABASE_NODES.DONORS}/${userId}`)
      .update({
        name,
        phoneNumber,
        city,
        bloodGroup,
        gender,
        onboardingStep: 2,
        dob
      })
      .finally(() => {
        this.setState({ loading: false });
        onProfileCompleted?.();
      });
  };

  render() {
    const { name, city, phoneNumber, bloodGroup, gender, loading, dobPicker, dob } = this.state;

    return (
      <View style={Styles.containerStyle}>
        <KeyboardAwareScrollView
          contentContainerStyle={Styles.contentContainerStyle}
        >
          <AppTextInput
            value={name}
            onChangeText={this.onNameChange}
            placeholder="Enter Name"
            isNonEmpty
            style={Styles.textInputStyle}
          />

          <AppTextInput
            value={phoneNumber}
            onChangeText={this.onContactChange}
            placeholder="Contact Number"
            keyboardType="phone-pad"
            isNonEmpty
            style={Styles.textInputStyle}
          />

      

          <AppTextInput
            value={city}
            onChangeText={this.onCityChange}
            placeholder="Current City"
            isNonEmpty
            style={Styles.textInputStyle}
          />


        <AppTextInput
          placeholder="Date of birth"
          style={Styles.textInputStyle}
          value={dob}
          onFocus={this.showDOBPicker}
          hideErrorLabel
        />

        <DateTimePicker
          isVisible={dobPicker}
          mode="date"
          onConfirm={this.onDobChange}
          onCancel={this.hideDOBPicker}
        />

          <AppText style={Styles.textInputStyle} type="label">
            Blood Group
          </AppText>

          <ChipGroup
            style={{ marginTop: 4, }}
            onSelected={this.onBloodGroupChange}
            selectedChips={[bloodGroup]}
            scrollEnabled
            horizontal
            data={R.ChipsData.BloodGroups}
            miniumHorizontalGap={15}
          />

          <AppText style={{ marginTop: 20 }} type="label">
            Select Gender
          </AppText>

          <ChipGroup
            style={{ marginTop: 4 }}
            horizontal
            scrollEnabled={false}
            miniumHorizontalGap={0}
            data={R.ChipsData.GenderData}
            onSelected={this.onGenderChange}
            selectedChips={[gender]}
          />

          <AppButton
            style={Styles.buttonStyle}
            title="Save"
            onPress={this.validate}
            isLoading={loading}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
