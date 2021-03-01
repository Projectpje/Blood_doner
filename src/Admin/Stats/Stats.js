/** @format */

import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import firebase from "firebase";
import ScreenContainer from "../../Components/ScreenContainer/ScreenContainer";
import { DATABASE_NODES, REQUEST_STATUS } from "../../Utils/Enums";
import { PieChart } from "react-native-chart-kit";
import R from "../../Utils/R";
import moment from "moment";
import { GetStatusColor, runAnimation } from "../../Utils/HelperFunctions";
import AppText from "../../Components/AppText/AppText";

export default class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pending: 0,
      accepted: 0,
      completed: 0,
      cancelled: 0,
      expired: 0,
      rejected: 0,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchAllNotification();
  }

  fetchAllNotification = () => {
    firebase
      .database()
      .ref(`${DATABASE_NODES.DONOR_NOTIFICATION}`)
      .on("value", (value) => {
        const data = value.val();

        let accepted = 0,
          cancelled = 0,
          completed = 0,
          pending = 0,
          rejected = 0,
          expired = 0;

        for (let userNotification in data) {
          for (let notificationKey in data[userNotification]) {
            const notification = data[userNotification][notificationKey];
            const { status } = notification;

            const hasExpired = R.HelperFunctions.hasNotificationExpired(
              notification
            );

            if (hasExpired) {
              expired += 1;
            } else {
              switch (status) {
                case REQUEST_STATUS.ACCEPTED:
                  accepted += 1;
                case REQUEST_STATUS.CANCELLED:
                  cancelled += 1;
                case REQUEST_STATUS.COMPLETED:
                  completed += 1;
                case REQUEST_STATUS.PENDING:
                  pending += 1;
                case REQUEST_STATUS.REJECTED:
                  rejected += 1;
              }
            }
          }
        }

        this.setState({
          accepted,
          cancelled,
          completed,
          pending,
          expired,
          rejected,
          loading: false,
        });
      });
  };

  render() {
    const {
      accepted,
      pending,
      completed,
      expired,
      rejected,
      cancelled,
      loading,
    } = this.state;

    const data = [
      {
        count: accepted,
        color: GetStatusColor(REQUEST_STATUS.ACCEPTED),
      },
      {
        count: pending,
        color: GetStatusColor(REQUEST_STATUS.PENDING),
      },
      {
        count: completed,
        color: GetStatusColor(REQUEST_STATUS.COMPLETED),
      },
      {
        count: rejected,
        color: GetStatusColor(REQUEST_STATUS.REJECTED),
      },
      {
        count: expired,
        color: GetStatusColor(REQUEST_STATUS.EXPIRED),
      },

      {
        count: cancelled,
        color: GetStatusColor(REQUEST_STATUS.CANCELLED),
      },
    ];

    return (
      <ScreenContainer loading={loading}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <PieChart
            hasLegend={false}
            data={data}
            width={400}
            height={400}
            chartConfig={{
              color: (opacity = 1) => `transparent`,
              labelColor: (opacity = 1) => `transparent`,
              propsForDots: {
                r: "0",
                strokeWidth: "2",
                stroke: "transparent",
              },
            }}
            accessor={"count"}
            backgroundColor={"transparent"}
            center={[100, 0]}
          />
        </View>

        {!loading && (
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Legend
              color={GetStatusColor(REQUEST_STATUS.ACCEPTED)}
              label={`Accepted (${accepted})`}
            />
            <Legend
              color={GetStatusColor(REQUEST_STATUS.PENDING)}
              label={`Pending (${pending})`}
            />
            <Legend
              color={GetStatusColor(REQUEST_STATUS.COMPLETED)}
              label={`Completed (${completed})`}
            />
            <Legend
              color={GetStatusColor(REQUEST_STATUS.REJECTED)}
              label={`Rejected (${rejected})`}
            />
            <Legend
              color={GetStatusColor(REQUEST_STATUS.EXPIRED)}
              label={`Expired (${expired})`}
            />
            <Legend
              color={GetStatusColor(REQUEST_STATUS.CANCELLED)}
              label={`Cancelled (${cancelled})`}
            />
          </View>
        )}
      </ScreenContainer>
    );
  }
}

const Legend = ({ color, label }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <View style={{ width: 10, height: 10, backgroundColor: color }} />
      <AppText style={{ marginLeft: 5 }}>{label}</AppText>
    </View>
  );
};
