/** @format */

import React, { Component } from "react";
import { FlatList, Image, SafeAreaView, Text, View } from "react-native";
import ScreenContainer from "../../Components/ScreenContainer/ScreenContainer";
import firebase from "firebase";
import AppText from "../../Components/AppText/AppText";
import { Value } from "react-native-reanimated";
import DonorDetailsCard from "../../Components/DonorDetailsCard/DonorDetailsCard";
import Styles from "./styles";
import { DATABASE_NODES } from "../../Utils/Enums";
import R from "../../Utils/R";
import DonorFilter from "../../Components/DonorFilter/DonorFilter";
import { inject, observer } from "mobx-react";
import moment from "moment";
import { UserType } from "../../Utils/Images";

@inject('userStore')
@observer
export default class AllDonorsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      donorsList: [],
      filteredList: [],
      multiSelectEnabled: false,
      selectedDonors: [],
    };
  }

  componentDidMount() {
    
    this.fetchDonorsList();
  }

  onItemLongPress = (donor) => {
    const { selectedDonors } = this.state;

    this.setState({ multiSelectEnabled: true });

    const isAlreadyPresent = selectedDonors.some((value) => {
      return value.uid === donor.uid;
    });

    let newDonorList = [];

    if (isAlreadyPresent) {
      newDonorList = selectedDonors.filter((value) => {
        return value.uid !== donor.uid;
      });
    } else {
      newDonorList = [...selectedDonors, donor];
    }

    const hasMultiSelectEnabled = newDonorList.length > 0;

    this.setState({
      multiSelectEnabled: hasMultiSelectEnabled,
      selectedDonors: newDonorList,
    });
  };

  onDonorClick = (donor) => {
    const { multiSelectEnabled } = this.state;

    if (multiSelectEnabled) {
      this.onItemLongPress(donor);
    } else {
    }
  };

  fetchDonorsList() {

    firebase
      .database()
      .ref(DATABASE_NODES.DONORS)
      .on("value", (snapshot) => {

        const response = snapshot.val();

        const donorsList = [];

        for (const userId in response) {
          const user = response[userId];
          donorsList.push(user);
        }

        this.setState({ donorsList, filteredList: donorsList });
      });
  }

  renderItem = ({ item, index }) => {
    const { multiSelectEnabled, selectedDonors } = this.state;
    const {userId, userType} = this.props.userStore;

    const isSelected = selectedDonors.some((value) => {
      console.log(value, item);
      return value.uid === item.uid;
    })

    return (
      <DonorDetailsCard
        donor={item}
        multiSelectEnabled={multiSelectEnabled}
        selectedDonors={selectedDonors}
        isSelected = {isSelected}
        onLongPress={this.onItemLongPress}
        loginUserId={userId}
        isHospital = {userType === UserType.Donor}
      />
    );
  };

  renderItemSeparator = () => {
    return <View style={{ height: 10 }} />;
  };

  onUpdateFilters = (values) => {
    const {
      age: filterAge,
      gender: filterGender,
      bloodGroup: filterBloodGroups,
    } = values;
    const { donorsList } = this.state;

    console.log("filters", values, donorsList);

    let newDonorList = [];

    // Applying age filter
    newDonorList = [...donorsList].filter((value) => {
      const { dob } = value;
      const age = moment().diff(moment(dob), "years");

      console.log("age", age, filterAge);

      return filterAge <= age;
    });

    // Applying Gender filter
    if (filterGender?.length !== 0) {
      newDonorList = [...newDonorList].filter((value) => {
        const { gender } = value;

        console.log("Gender", gender, filterGender);

        return gender === filterGender[0];
      });
    }

    // Applying blood group filters
    if (filterBloodGroups?.length !== 0) {
      newDonorList = [...newDonorList].filter((value) => {
        const { bloodGroup } = value;

        return filterBloodGroups.includes(bloodGroup);
      });
    }

    this.setState({ filteredList: newDonorList });
  };

  render() {
    const { filteredList } = this.state;

    return (
      <ScreenContainer>
        <View style={Styles.containerStyle}>
          <AppText>AllDonorsList</AppText>

          <DonorFilter onUpdateFilters={this.onUpdateFilters} />

          <FlatList
            style={{ marginTop: 20 }}
            data={filteredList}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderItemSeparator}
            keyExtractor={value => {
              return value.uid
            }}
          />
        </View>
      </ScreenContainer>
    );
  }
}
