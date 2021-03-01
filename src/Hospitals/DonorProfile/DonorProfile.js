/** @format */

import React, { Component } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import firebase from "firebase";
import moment from "moment";
import AppText from "../../Components/AppText/AppText";
import Avatar from "../../Components/Avatar/Avatar";
import DonorDetailsCard from "../../Components/DonorDetailsCard/DonorDetailsCard";
import ScreenContainer from "../../Components/ScreenContainer/ScreenContainer";
import { DATABASE_NODES, REQUEST_STATUS } from "../../Utils/Enums";
import R from "../../Utils/R";
import NotificationCard from "../../Components/NotificationCard/NotificationCard";
import EmptyListComponent from "../../Components/EmptyListComponent/EmptyListComponent";

export default class DonorProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completedNotification: [],
    };
  }

  componentDidMount() {
    const { route } = this.props;
    const donor = route?.params?.donor ?? {};
    const userId = donor?.uid;
    console.log(userId);

    firebase
      .database()
      .ref(`${DATABASE_NODES.DONOR_NOTIFICATION}/${userId}`)
      .on("value", (snapshot) => {
        const data = snapshot.val() ?? {};

        const notifications = [];

        for (let key in data) {
          const notification = data[key];
          notifications.push(notification);
        }

        const filterNotification = notifications
          .sort(R.HelperFunctions.CompoareNotificationBySendOn)
          .filter((notif) => {
            return notif.status === REQUEST_STATUS.COMPLETED;
          })
          .reverse();

        this.setState({ completedNotification: filterNotification });
      });
  }

  renderCard = (item) => {
    const { hospitalInfo } = item;

    console.log("hospital info", hospitalInfo);

    return (
      <View
        style={{
          marginTop: 10,
          backgroundColor: R.Colors.PrimaryColor,
          padding: 10,
          borderRadius: 10,
          elevation: 4,
        }}
      >
        <AppText>
          <AppText type="small">Name:</AppText> {hospitalInfo?.name}
        </AppText>

        <AppText>
          <AppText type="small">Email Id: </AppText>
          {hospitalInfo?.emailId}
        </AppText>

        <AppText style={{ marginTop: 5 }}>
          <AppText type="small">Phone number </AppText>
          {hospitalInfo?.phoneNumber}
        </AppText>

        {/* <AppText>
          <AppText type="small">Phone Number: </AppText>
          {hospitalInfo?.phoneNumber}
        </AppText> */}

        <AppText>
          <AppText type="small">Donation date: </AppText>
          {moment(item?.expireOn).format("DD-MM-YYYY")}
        </AppText>
      </View>
    );
  };

  render() {
    const { route } = this.props;
    const { completedNotification } = this.state;

    const donor = route?.params?.donor ?? {};

    return (
      <ScreenContainer>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <Avatar
            name={donor?.name}
            style={{ width: 150, height: 150, borderRadius: 75 }}
          />

          <AppText style={{ marginTop: 20 }}>Name: {donor?.name}</AppText>
          <AppText>Blood group: {donor?.bloodGroup}</AppText>
          <AppText>Email Id: {donor?.emailId}</AppText>
          <AppText>Phone Number: {donor?.phoneNumber}</AppText>

          <AppText style={{ marginTop: 30 }}>
            Smoking: {donor?.donorInfo?.smoke}
          </AppText>
          <AppText>Drinking: {donor?.donorInfo?.drink}</AppText>
          <AppText>
            Last Donation: {donor?.donorInfo?.lastBloodDonation}
          </AppText>

          <AppText type="heading" style={{ marginTop: 30 }}>
            Donation History
          </AppText>

          <View style={{ padding: 10, paddingBottom: 20, flex: 1 }}>
            {completedNotification?.map(this.renderCard)}

            {completedNotification?.length === 0 && <EmptyListComponent />}
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }
}
