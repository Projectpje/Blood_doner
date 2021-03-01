/** @format */

import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import firebase from "firebase";
import moment from "moment";
import ScreenContainer from "../../Components/ScreenContainer/ScreenContainer";
import { DATABASE_NODES } from "../../Utils/Enums";
import { inject, observer } from "mobx-react";
import NotificationCard from "../../Components/NotificationCard/NotificationCard";
import AppText from "../../Components/AppText/AppText";
import R from "../../Utils/R";
import EmptyListComponent from "../../Components/EmptyListComponent/EmptyListComponent";

@inject("userStore")
@observer
export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allNotification: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchAllNotification();
  }

  fetchAllNotification = () => {
    const { userId } = this.props.userStore;

    firebase
      .database()
      .ref(`${DATABASE_NODES.HOSPITAL_NOTIFICATION}/${userId}`)
      .on("value", (data) => {
        const allNotification = data.val();

        const notifications = [];

        for (var id in allNotification) {
          const notification = allNotification[id];
          notifications.push(notification);
        }

        notifications.sort((a, b) => {
          return moment(a.sendOn) > moment(b.sendOn);
        });

        this.setState({
          allNotification: notifications.reverse(),
          loading: false,
        });
      });
  };

  categoriesNotification = (notification) => {
    const { status } = notification;
  };

  renderItems = ({ item }) => {
    return <NotificationCard item={item} />;
  };

  renderSeparator = () => {
    return <View style={{ height: 10 }} />;
  };

  render() {
    const { allNotification, loading } = this.state;

    return (
      <ScreenContainer loading={loading}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ flex: 1, padding: 10 }}
            data={allNotification}
            ListEmptyComponent={() => {
              return (
                <EmptyListComponent
                  label="No request sent."
                  loading={loading}
                />
              );
            }}
            renderItem={this.renderItems}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      </ScreenContainer>
    );
  }
}
