/** @format */

import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View, Slider } from "react-native";
import { BloodGroups, GenderData } from "../../Utils/Constants/ChipsData";
import R from "../../Utils/R";
import AppButton from "../AppButton/AppButton";
import lodash from "lodash";
import AppText from "../AppText/AppText";
import ChipGroup from "../ChipGroup/ChipGroup";
import Styles from "./styles";

const MinimumAge = 18;
const MaxiumAge = MinimumAge + 50;

export default class DonorFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandFilter: false,
      age: 21,
      gender: [],
      bloodGroup: [],
    };
  }

  toggleFilter = () => {
    const { expandFilter } = this.state;
    R.HelperFunctions.runAnimation();
    this.setState({ expandFilter: !expandFilter });
  };

  updateFilters = () => {
    const { onUpdateFilters } = this.props;
    const debounceFunction = lodash.debounce(() => {
      onUpdateFilters?.(this.state);
    }, 500);
    debounceFunction();
  };

  onAgeChange = (value) => {
    this.setState({ age: Math.round(value) });
    this.updateFilters();
  };

  onGenderChange = (gender) => {
    const { gender: selectedGender } = this.state;

    if (gender === selectedGender[0]) {
      this.setState({ gender: [] });
      this.updateFilters();
      return;
    }

    this.setState({ gender: [gender] });
    this.updateFilters();
  };

  onBloodGroupChange = (bloodGroup) => {
    const { bloodGroup: selectedBloodGroup } = this.state;

    let newBloodGroup = [];

    if (selectedBloodGroup.includes(bloodGroup)) {
      newBloodGroup = selectedBloodGroup.filter((value) => {
        return value !== bloodGroup;
      });
    } else {
      newBloodGroup = [...selectedBloodGroup, bloodGroup];
    }

    this.setState({ bloodGroup: newBloodGroup });
    this.updateFilters();
  };

  render() {
    const { expandFilter, age, gender, bloodGroup } = this.state;

    return (
      <View style={Styles.containerStyle}>
        <TouchableOpacity
          style={Styles.filterHeaderStyle}
          onPress={this.toggleFilter}
        >
          <AppText>Apply Filters</AppText>
          <Image source={R.Images.FILTERS} style={{ width: 16, height: 16 }} />
        </TouchableOpacity>

        {expandFilter && (
          <View>
            <AppText>Age</AppText>
            <Slider
              value={age}
              maximumValue={MaxiumAge}
              minimumValue={MinimumAge}
              onValueChange={this.onAgeChange}
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <AppText>{MinimumAge}</AppText>
              <AppText>Age: {age}</AppText>
              <AppText>{MaxiumAge}</AppText>
            </View>

            <AppText>Gender</AppText>
            <ChipGroup
              data={GenderData}
              selectedChips={gender}
              onSelected={this.onGenderChange}
            />
            <AppText>Blood Group</AppText>
            <ChipGroup
              scrollEnabled
              data={BloodGroups}
              selectedChips={bloodGroup}
              onSelected={this.onBloodGroupChange}
            />
          </View>
        )}
      </View>
    );
  }
}
