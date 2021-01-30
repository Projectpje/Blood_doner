import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import Styles from './styles';
import PropTypes from 'prop-types';
import { IsNonEmptyString } from '../../Utils/HelperFunctions';
import AppText from '../AppText/AppText';


/**
 * Props:
 * isNonEmpty
 * hasMimimumLength
 * minimumLength
 * onValidationError
 */

export default class AppTextInput extends Component {

    constructor(props) {
        super(props);

        const { value = "" } = props;

        this.state = {
            text: value,
            error: '',
        };


    }

    onBlur = () => {
        const { onBlur, isNonEmpty, hasMimimumLength, onValidationError, minimumLength } =
            this.props;

        const { text } = this.state;

        onBlur?.();

        if (!IsNonEmptyString(text) && isNonEmpty) {
            onValidationError?.();

            this.setState({
                error: "Field cannot be empty"
            });

            return;
        }

        if (text?.trim().length < minimumLength && hasMimimumLength) {
            onValidationError?.();

            this.setState({
                error: `Mimimum ${minimumLength} character are required`
            });

            return;
        }

    }

    onChangeText = (text) => {

        const { onChangeText } = this.props;

        this.setState({
            text,
            error: ''
        });

        onChangeText?.(text);
    }


    render() {

        const { style, isNonEmpty, onBlur, onChangeText, hideErrorLabel = false, ...rest } = this.props;
        const { text, error } = this.state;

        return (
            <>
                <TextInput
                    autoFocus={false}
                    placeholderTextColor="#555555"
                    style={[Styles.containerStyle, style]}
                    onBlur={this.onBlur}
                    onChangeText={this.onChangeText}
                    {...rest}
                />

                {!hideErrorLabel && <AppText type="errorLabel" style={{ marginLeft: 10, marginTop: 2 }}>{error}</AppText>}
            </>
        )
    }
}
