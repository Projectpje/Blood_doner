import React from 'react'
import { View } from 'react-native'
import Styles from './styles';

export default function Card(props) {

    const {style} = props;

    return (
        <View style={[Styles.containerStyle, style]}>
            {props.children}
        </View>
    )
}
