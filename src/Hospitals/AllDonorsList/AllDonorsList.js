/** @format */

import React, { Component } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import ScreenContainer from "../../Components/ScreenContainer/ScreenContainer";
import firebase from "firebase";
import AppText from "../../Components/AppText/AppText";
import { Value } from "react-native-reanimated";

export default class AllDonorsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      donorsList: [],
    };
  }

  componentDidMount() {
    this.fetchDonorsList();
  }

  fetchDonorsList() {
    firebase
      .database()
      .ref("donors")
      .on("value", (snapshot) => {
        const response = snapshot.val();

        const donorsList = [];

        for (const userId in response) {
          const user = response[userId];
          donorsList.push(user);
        }

        this.setState({ donorsList });
      });
  }

  renderItem = ({ item, index }) => {};

  render() {
    const { donorsList } = this.state;

    return (
      <ScreenContainer>
        <SafeAreaView>
          <AppText> AllDonorsList</AppText>

          <FlatList
            data={donorsList}
            renderItem={({ item }) => {
              return <AppText>{item.name}</AppText>;
            }}
          />
        </SafeAreaView>
      </ScreenContainer>
    );
  }
}
