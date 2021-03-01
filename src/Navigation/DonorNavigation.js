/** @format */

import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../Donors/Dashboard/Dashboard";
import Profile from "../Donors/Profile/Profile";
import AllBloodRequest from "../Donors/AllBloodRequest/AllBloodRequest";
import R from "../Utils/R";
import { createStackNavigator } from "@react-navigation/stack";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const DonorNavigation = () => {
  return (
    <Tabs.Navigator headerMode={"none"}>
      <Tabs.Screen
        name="DonorDashboard"
        component={Dashboard}
        options={{
          title: "Dashboard",
          tabBarIcon: () => {
            return (
              <Image
                source={R.Images.UserType.Donor}
                style={{ width: 16, height: 16, resizeMode: "contain" }}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name="AllBloodRequest"
        component={AllBloodRequest}
        options={{
          title: "Donation History",
          tabBarIcon: () => {
            return (
              <Image
                source={R.Images.UserType.Donor}
                style={{ width: 16, height: 16, resizeMode: "contain" }}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => {
            return (
              <Image
                source={R.Images.UserType.Donor}
                style={{ width: 16, height: 16, resizeMode: "contain" }}
              />
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

export default DonorNavigation;
