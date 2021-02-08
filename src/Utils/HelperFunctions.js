/** @format */

import { LayoutAnimation, Platform } from "react-native";

export const IsNonEmptyString = (string) => {
  return string?.trim()?.length > 0;
};

export const runAnimation = () => {
  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  if (Platform.OS === "ios") {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  } else {
    //   Removing animation from delete as it is buggy. No this no real solution
    // for it but to remove deleting. Problem can also be found on below link.
    // https://github.com/facebook/react-native/issues/13207#issuecomment-290853976
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: { type: LayoutAnimation.Types.easeInEaseOut },
    });
  }
};
