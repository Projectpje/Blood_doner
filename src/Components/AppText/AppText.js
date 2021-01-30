import React from 'react'
import { View, Text } from 'react-native'
import Styles from './styles';


/**
 * Different Text Type:
 * 
 * 1. normal
 * 2. small
 * 3. errorLabel
 * 4. heading
 * 5. label
 */

function getStyleFromType(type) {
    switch (type) {
        case 'normal':
            return Styles.normalTextStyle;

        case 'small':
            return Styles.small;

        case "errorLabel":
            return Styles.errorLabel;

        case "heading":
            return Styles.heading;

        case "label":
            return Styles.lable;

        default: return Styles.normalTextStyle
    }
}

export default function AppText(props) {

    const { type, style, isMandatory, ...rest } = props;

    let textStyle = getStyleFromType(type)

    return (
        <Text style={[textStyle, style]} {...rest}>{props.children}
            {isMandatory && <Text style={Styles.mandatorySign}>*</Text>}
        </Text>
    )
}
