/** @format */

import React from "react";
import { View, Text, Image } from "react-native";
import R from "../../Utils/R";
import Styles from "./styles";

export default function Checkbox({ selected, onValueChange }) {
  return (
    <View
      style={[
        Styles.containerStyle,
        {
          borderWidth: selected ? 0 : 1,
          backgroundColor: selected ? R.Colors.PrimaryDark : null,
        },
      ]}
    >
      {selected && (
        <Image
          style={{ width: 10, height: 10, tintColor: "white" }}
          source={R.Images.TICK}
        />
      )}
    </View>
  );
}
