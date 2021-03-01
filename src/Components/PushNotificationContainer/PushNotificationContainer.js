/** @format */

import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import firebase from "firebase";
import { DATABASE_NODES, USER_TYPE } from "../../Utils/Enums";

@inject("userStore")
@observer
export default class PushNotificationContainer extends Component {
  constructor(props) {
    super(props);

    this.registerForPushNotificationsAsync();
    this.registerNOtificationListener();
  }

  registerForPushNotificationsAsync = async () => {
    const { userStore } = this.props;

    console.log("registerForPushNotificationsAsync");

    console.log("user store is", userStore);

    const { userId, isUserLoggedIn, userType } = userStore;

    if (!isUserLoggedIn) {
      return;
    }

    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      console.log("token not granted");
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;

    console.log("token is", token);

    if (!token) {
      console.log("token is empty");
      return;
    }

    console.log(token);
    this.setState({ expoPushToken: token });

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    const node =
      userType === USER_TYPE.HOSPITAL
        ? DATABASE_NODES.HOSPITAL
        : DATABASE_NODES.DONORS;

    firebase.database().ref(`${node}/${userId}/token`).set(token);
  };

  registerNOtificationListener = () => {
    Notifications.addNotificationReceivedListener((notification) => {
      console.log("notification received", notification);
    });
  };

  render() {
    return null;
  }
}
