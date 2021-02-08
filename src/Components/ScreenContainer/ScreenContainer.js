/** @format */

import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import R from "../../Utils/R";
import Styles from "./styles";

export default function ScreenContainer(props) {
  return (
    <LinearGradient
      colors={["#FDB777", "#FDA766"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={Styles.containerStyle}
    >
      <SafeAreaView style={{ flex: 1 }}>{props.children}</SafeAreaView>
    </LinearGradient>
  );
}
