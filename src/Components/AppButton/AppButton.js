/** @format */

import React, { Component } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import Styles from "./styles";
import PropTypes from "prop-types";
import AppText from "../AppText/AppText";
import R from "../../Utils/R";

export default class AppButton extends Component {
    render() {
        const {
            isSecondary = false,
            title,
            onPress,
            style,
            textStyle,
            isLoading = false
        } = this.props;

        const primaryStyle = isSecondary
            ? Styles.secondaryStyle
            : Styles.primaryStyle;

        return (
            <TouchableOpacity
                onPress={onPress}
                style={[Styles.containerStyle, primaryStyle, style]}
            >
                <ActivityIndicator
                    hidesWhenStopped
                    style={Styles.loaderStyle}
                    color={"white"}
                    animating={isLoading}
                />

                <AppText style={textStyle}>{title}</AppText>
            </TouchableOpacity>
        );
    }
}
