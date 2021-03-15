/** @format */

import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import firebase from "firebase";
import moment from "moment";
import ScreenContainer from "../../Components/ScreenContainer/ScreenContainer";
import { DATABASE_NODES, SortBy, SortType } from "../../Utils/Enums";
import { inject, observer } from "mobx-react";
import NotificationCard from "../../Components/NotificationCard/NotificationCard";
import AppText from "../../Components/AppText/AppText";
import R from "../../Utils/R";
import EmptyListComponent from "../../Components/EmptyListComponent/EmptyListComponent";
import App from "../../../App";
import HospitalFilter from "../../Components/HospitalFilter/HospitalFilter";

@inject("userStore")
@observer
export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allNotification: [],
      loading: true,
      filteredList: [],
      filters: {
        requestType: null,
        bloodGroup: null,
        sortBy: SortBy.SEND_ON,
        sortType: SortType.ASCENDING,
        searchText: "",
      },
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
        this.setState({
          allNotification: notifications,
          loading: false,
        });

        console.log("all notifications are", notifications);

        this.onFilterUpdate(this.state.filters);
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

  onFilterUpdate = (newState) => {
    const { allNotification } = this.state;
    const { requestType, bloodGroup, sortBy, sortType, searchText } = newState;

    let filteredList = allNotification;

    if (requestType && requestType !== "All") {
      filteredList = filteredList.filter(
        (notification) => notification.status === requestType
      );
    }

    if (bloodGroup) {
      filteredList = filteredList.filter(
        (notification) => notification.donorInfo?.bloodGroup === bloodGroup
      );
    }

    if (searchText) {
      filteredList = filteredList.filter(
        (notification) =>
          notification.donorInfo?.name
            ?.toLowerCase()
            ?.includes(searchText.toLowerCase()) ||
          notification.hospitalInfo?.name
            ?.toLowerCase()
            ?.includes(searchText.toLowerCase())
      );
    }

    if (sortBy) {
      filteredList.sort((notif1, notif2) => {
        switch (sortBy) {
          case SortBy.DONOR_NAME:
            return notif1.donorInfo?.name > notif2.donorInfo?.name;

          case SortBy.HOSPITAL_NAME:
            return notif1.hospitalInfo?.name > notif2.hospitalInfo?.name;

          case SortBy.SEND_ON:
            return moment(notif1.sendOn) > moment(notif2.sendOn);

          case SortBy.EXPIRE_ON:
            return moment(notif1.expireOn) > moment(notif2.expireOn);
        }
      });
    }

    if (sortType === SortType.DESCENDING) {
      filteredList.reverse();
    }

    this.setState({
      filters: newState,
      filteredList,
    });
  };

  render() {
    const { filteredList, loading, filters } = this.state;

    return (
      <ScreenContainer loading={loading}>
        <View style={{ flex: 1, padding: 10 }}>
          <AppText
            type="heading"
            style={{ textAlign: "center", width: "100%", marginBottom: 10 }}
          >
            All Requests
          </AppText>

          <HospitalFilter
            filters={filters}
            onFilterUpdate={this.onFilterUpdate}
          />

          <FlatList
            style={{ height: "100%", marginTop: 20 }}
            contentContainerStyle={{
              flex: filteredList?.length > 0 ? 0 : 1,
            }}
            data={filteredList}
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
