/** @format */

import React from "react";
import { View, Text } from "react-native";
import AppText from "../AppText/AppText";
import Styles from "./styles";

export default function Avatar(props) {
  const { name, style } = props;
  const initials = name?.substring(0, 2);

  return (
    <View style={[Styles.containerStyle, style]}>
      <AppText style={Styles.textStyle}>{initials}</AppText>
    </View>
  );
}
