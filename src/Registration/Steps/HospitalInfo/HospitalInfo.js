import React, { Component } from 'react'
import { Text, TextInput, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import firebase from 'firebase';
import AppButton from '../../../Components/AppButton/AppButton';
import AppTextInput from '../../../Components/AppTextInput/AppTextInput';
import { IsNonEmptyString } from '../../../Utils/HelperFunctions';
import Styles from './styles';

export default class HospitalInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            country: '',
            city: '',
            completeAddress: '',
            licenseNo: '',
            loading: false
        }
    }

    onChangeName = (text) => {
        this.setState({ name: text })
    }

    onChangeCountry = (text) => {
        this.setState({ country: text })
    }

    onChangeCity = (text) => {
        this.setState({ city: text })
    }

    onChangeAddress = (text) => {
        this.setState({ completeAddress: text })
    }

    onChangeLicenseNo = (text) => {
        this.setState({ licenseNo: text })
    }

    validate = () => {
        const {
            name,
            country,
            city,
            completeAddress,
            licenseNo,
        } = this.state;

        if (!(IsNonEmptyString(name) || IsNonEmptyString(country) ||
            IsNonEmptyString(city) || IsNonEmptyString(completeAddress) ||
            IsNonEmptyString(licenseNo))
        ) {
            alert("All fields are required");
            return;
        }


        this.saveRecordInDatabase();

    }

    saveRecordInDatabase = () => {

        const {
            name,
            country,
            city,
            completeAddress,
            licenseNo,
        } = this.state;

        const { userId } = this.props;

        this.setState({ loading: true })

        firebase.database().ref(`hospitalInfo/${userId}`)
            .update({
                name,
                country,
                city,
                completeAddress,
                licenseNo
            }).then(() => {
                alert('record saved successfully')
            }).catch(() => {
                alert("An error has occured while saving data. Please try again");
            }).finally(() => {
                this.setState({ loading: false })
            })
    }

    render() {
        const {
            name,
            country,
            city,
            completeAddress,
            licenseNo,
            loading
        } = this.state;

        return (
            <View style={Styles.containerStyle}>
                <KeyboardAwareScrollView>

                    <TextInput
                        multiline
                        onChangeText
                    />

                    <AppTextInput
                        placeholder="Enter Name"
                        isNonEmpty
                        style={Styles.inputStyle}
                        value={name}
                        onChangeText={this.onChangeName}
                    />
                    <AppTextInput
                        placeholder="Country"
                        isNonEmpty
                        style={Styles.inputStyle}
                        value={country}
                        onChangeText={this.onChangeCountry}
                    />
                    <AppTextInput
                        placeholder="City"
                        isNonEmpty
                        style={Styles.inputStyle}
                        value={city}
                        onChangeText={this.onChangeCity}
                    />

                    <AppTextInput
                        placeholder="Complete Address"
                        isNonEmpty
                        style={Styles.inputStyle}
                        value={completeAddress}
                        multiline
                        onChangeText={this.onChangeAddress}
                    />

                    <AppTextInput
                        placeholder="License No."
                        isNonEmpty
                        style={Styles.inputStyle}
                        value={licenseNo}
                        onChangeText={this.onChangeLicenseNo}
                    />


                    <AppButton
                        style={Styles.inputStyle}
                        title="Save"
                        isLoading={loading}
                        onPress={this.validate}
                    />

                </KeyboardAwareScrollView>
            </View>
        )
    }
}
