/** @format */

import React from "react";
import DropDownPicker from "react-native-dropdown-picker";
import Styles from "./styles";

export default function DropDownPickerWrapper(props) {
  const { options = [], onChangeItem } = props;

  return (
    <DropDownPicker
      items={options}
      placeholder="Select an option?"
      defaultIndex={0}
      onChangeItem={onChangeItem}
      dropDownStyle={Styles.dropDownStyle}
      //   containerStyle={Styles.containerStyle}
      activeItemStyle={Styles.activeItemStyle}
      activeLabelStyle={Styles.activeLabelStyle}
      labelStyle={Styles.labelStyle}
      style={Styles.style}
    />
  );
}
