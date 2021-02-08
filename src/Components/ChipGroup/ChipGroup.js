/** @format */

import React from "react";
import { View, Text, ScrollView } from "react-native";
import R from "../../Utils/R";
import Chip from "../Chip/Chip";
import Styles from "./styles";

export default function ChipGroup(props) {
  const {
    scrollEnabled = false,
    data,
    onSelected,
    selectedChips = [],
    style,
    miniumHorizontalGap = 15,
  } = props;

  return (
    <View style={{ width: "100%" }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        style={[Styles.containerStyle, style]}
        horizontal={true}
        contentContainerStyle={{
          width: scrollEnabled ? null : "100%",
          justifyContent: "space-between",
          paddingLeft: 5,
        }}
      >
        {data.map((value, index) => {
          const { title } = value;
          const isSelected = selectedChips.includes(title);

          return (
            <View
              key={value.title}
              style={{ marginLeft: index === 0 ? 0 : miniumHorizontalGap }}
            >
              <Chip
                {...value}
                onSelected={onSelected}
                isSelected={isSelected}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
