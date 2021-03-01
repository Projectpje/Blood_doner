/** @format */

import React, { useState } from "react";
import { View, Text, Linking } from "react-native";
import R from "../../Utils/R";
import AppButton from "../AppButton/AppButton";
import firebase from "firebase";
import AppText from "../AppText/AppText";
import moment from "moment";
import DonorDetailsCard from "../DonorDetailsCard/DonorDetailsCard";
import HospitalDetailsCard from "../HospitalDetailsCard/HospitalDetailsCard";
import Styles from "./styles";
import { DATABASE_NODES, REQUEST_STATUS } from "../../Utils/Enums";
import { useNavigation } from "@react-navigation/native";

/**
 * Notication card to the blood donation request
 * This component holds all the options like accepting, cancelling, rejecting request
 *
 * @param {*} param0
 */

export default function NotificationCard({ item, isDonor }) {
  const {
    donorInfo,
    notificationId,
    status,
    expireOn,
    message,
    hospitalInfo,
  } = item;

  const borderColor = R.HelperFunctions.GetStatusColor(status);
  const { hospitalId, address } = hospitalInfo;
  const { uid } = donorInfo;

  const hasResponse = status !== REQUEST_STATUS.PENDING;
  const hasCompleted =
    status === REQUEST_STATUS.CANCELLED || status === REQUEST_STATUS.COMPLETED;

  // update the status of the notification in donorNotification as well as hospital nofication
  const updateStatus = (status) => {
    firebase
      .database()
      .ref(
        `${DATABASE_NODES.DONOR_NOTIFICATION}/${uid}/${notificationId}/status`
      )
      .set(status);

    firebase
      .database()
      .ref(
        `${DATABASE_NODES.HOSPITAL_NOTIFICATION}/${hospitalId}/${notificationId}/status`
      )
      .set(status);
  };

  // Update the status of the request to accpeted
  const onAccept = () => {
    updateStatus(REQUEST_STATUS.ACCEPTED);
  };

  // Update the status to the rejected
  const onReject = () => {
    updateStatus(REQUEST_STATUS.REJECTED);
  };

  // Update the status to the cancelled
  const onCancelled = () => {
    updateStatus(REQUEST_STATUS.CANCELLED);
  };

  // Update ths status to the completed
  const onCompleted = () => {
    updateStatus(REQUEST_STATUS.COMPLETED);

    // In addition to udpateing the status, also update the lastBloodDonation in the donor info of the donor profile
    firebase
      .database()
      .ref(
        `${DATABASE_NODES.DONORS}/${donorInfo.uid}/${DATABASE_NODES.DONORINFO}`
      )
      .update({ lastBloodDonation: R.HelperFunctions.FormatDate(moment()) });
  };

  const isExpired = R.HelperFunctions.hasNotificationExpired(item);

  return (
    <View style={[Styles.containerStyle, { borderColor: borderColor }]}>
      <View
        style={[
          Styles.statusTextContainerStyle,
          { backgroundColor: borderColor },
        ]}
      >
        <AppText type="small" style={Styles.statusTextStyle}>
          {isExpired ? "Expired" : status}
        </AppText>
      </View>

      {/* Is logged in user is donor, show hospital card */}
      {isDonor && <HospitalDetailsCard hospitalInfo={hospitalInfo} />}

      {/* If logged is user is not donor, show donor information card  */}
      {!isDonor && (
        <DonorDetailsCard donor={donorInfo} hideNotificationComposer />
      )}

      {/* If notification status is accpeted, then show link to open google map with hospital name */}
      {status === REQUEST_STATUS.ACCEPTED && isDonor && (
        <AppText
          style={{ padding: 10, marginTop: -20, color: "blue" }}
          onPress={() => {
            Linking.openURL(
              `https://www.google.co.in/maps/search/${encodeURIComponent(
                address
              )}`
            );
          }}
        >
          Open Direction
        </AppText>
      )}

      <AppText style={{ padding: 10, marginTop: -10 }}>
        Expire: {R.HelperFunctions.Humanize(expireOn)}
      </AppText>

      {message.length > 0 && !isExpired && (
        <View style={Styles.messageContainerStyle}>
          <AppText type="small" style={{ color: "#888" }}>
            Message
          </AppText>
          <AppText type="small" style={{ color: "#888" }}>
            {message}
          </AppText>
        </View>
      )}

      {!hasResponse && isDonor && !isExpired && (
        <View style={{ flexDirection: "row", paddingVertical: 10 }}>
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <AppButton isSecondary title="Reject" onPress={onReject} />
          </View>

          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <AppButton title="Accept" onPress={onAccept} />
          </View>
        </View>
      )}

      {hasResponse && !hasCompleted && !isDonor && !isExpired && (
        <View
          style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10 }}
        >
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <AppButton isSecondary title="Cancel" onPress={onCancelled} />
          </View>

          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <AppButton title="Mark Completed" onPress={onCompleted} />
          </View>
        </View>
      )}
    </View>
  );
}
