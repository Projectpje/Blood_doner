/** @format */

import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import { DATABASE_NODES, GENDER } from "../../Utils/Enums";
import R from "../../Utils/R";
import AppText from "../AppText/AppText";
import Avatar from "../Avatar/Avatar";
import Styles from "./styles";
import moment from "moment";
import Checkbox from "../Checkbox/Checkbox";
import AppButton from "../AppButton/AppButton";
import AppTextInput from "../AppTextInput/AppTextInput";


export default function DonorDetailsCard(props) {
  const {
    donor,
    donor: { name, bloodGroup, phoneNumber, emailId, gender, dob } = {},
    multiSelectEnabled,
    isSelected,
    onLongPress,
    isHospital,
    loginUserId,
  } = props;

  // hook
  const animation = useRef(new Animated.Value(0));
  const notificationContainerAnimated = useRef(new Animated.Value(0));
  const [showNotificationContainer, setNotificationContainerVisiblity] = useState(false);
  const [message, setMessage] = useState('');

  // Effect
  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: multiSelectEnabled ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    if(multiSelectEnabled) {
      setNotificationContainerVisiblity(false);
    }

  }, [multiSelectEnabled]);

  useEffect(() => {
    Animated.timing(notificationContainerAnimated.current, {
      toValue: showNotificationContainer ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showNotificationContainer]);



  const yearDiff = moment().diff(moment(dob), "years");
  let genderLogo = R.Images.Gender.Male;

  switch (gender) {
    case GENDER.FEMALE:
      genderLogo = R.Images.Gender.Female;
      break;

    case GENDER.OTHER:
      genderLogo = R.Images.Gender.Other;
      break;
  }

  const checkboxWidthInterpolation = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  const notificationHeightInterpolation = notificationContainerAnimated.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 125]
  })

  // Callbacks...
  const onItemLongPress = () => {
    onLongPress?.(donor);
  };

  const onItemPress = () => {
    if (multiSelectEnabled) {
      onItemLongPress();
    } else {
      setNotificationContainerVisiblity(!showNotificationContainer)
    }
  };


  const sendNotification = () => {
  //  firebase.database().ref(
  //    DATABASE_NODES.HOSPITAL_NOTIFICATION
  //  )
  }

  return (
    <TouchableOpacity
      style={{ flexDirection: "row" }}
      onLongPress={onItemLongPress}
      onPress={onItemPress}
      activeOpacity={1}
    >
      <Animated.View
        style={{
          width: checkboxWidthInterpolation,
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Checkbox selected={isSelected} />
      </Animated.View>

      <View
        style={{
          flex: 1,
          backgroundColor: R.Colors.PrimaryColor,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <View style={Styles.containerStyle}>
          <Avatar name={name} style={{ alignSelf: "center" }} />

          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <AppText type="small" leftIcon={genderLogo}>
              {name}
            </AppText>

            <AppText type="small" leftIcon={R.Images.AGE}>
              Age: {yearDiff} years
            </AppText>

            <AppText
              type="small"
              leftIcon={R.Images.Contact.Phone}
              containerStyle={{ marginTop: 2 }}
            >
              {phoneNumber}
            </AppText>

            <AppText
              type="small"
              containerStyle={{ marginTop: 2 }}
              leftIcon={R.Images.Contact.Mail}
            >
              {emailId}
            </AppText>
          </View>

          <View style={Styles.bloodGroupContainer}>
            <AppText style={Styles.bloodGroupTextStyle}>{bloodGroup}</AppText>
          </View>
        </View>

        <Animated.View style={{ backgroundColor: "#cfcfcf", paddingHorizontal: 10, height: notificationHeightInterpolation, overflow: 'hidden', }}>
          <AppText style={{paddingTop: 10, color: 'black'}} type="small">Send Notifcation</AppText>
          <AppTextInput style={{ marginTop: 5 }} 
            placeholder="Enter message (optional)"
            value={message}
            onChangeText={setMessage}
          />
          <AppButton
            title="Send"
            style={{ width: 100, marginTop: -10,  alignSelf: "flex-end" }}
          />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}
