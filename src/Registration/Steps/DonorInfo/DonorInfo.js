import React, { Component } from 'react'
import { Text, TextInput, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import firebase from 'firebase';
import AppButton from '../../../Components/AppButton/AppButton';
import AppText from '../../../Components/AppText/AppText';
import AppTextInput from '../../../Components/AppTextInput/AppTextInput';
import ChipGroup from '../../../Components/ChipGroup/ChipGroup';
import ScreenContainer from '../../../Components/ScreenContainer/ScreenContainer';
import { GENDER } from '../../../Utils/Enums';
import { IsNonEmptyString } from '../../../Utils/HelperFunctions';
import R from '../../../Utils/R';
import Styles from './styles';



export default class DonorInfo extends Component {


    constructor(props) {
        super(props);

        this.state = {
            name: '',
            phoneNumber: '',
            city: '',
            bloodGroup: '',
            gender: '',
            loading: false
        };
    }

    onNameChange = (text) => {
        this.setState({ name: text });
    }

    onContactChange = (text) => {
        this.setState({ phoneNumber: text })
    }

    onCityChange = (text) => {
        this.setState({ city: text })
    }


    onBloodGroupChange = (group) => {
        this.setState({ bloodGroup: group })
    }

    onRhChange = (rh) => {
        this.setState({ rh })
    }

    onGenderChange = (gender) => {
        this.setState({ gender })
    }

    validate = () => {
        const { name, city, phoneNumber, bloodGroup, gender } = this.state;

        if (!IsNonEmptyString(name)) {
            alert("Enter name");
            return
        }

        if (!IsNonEmptyString(phoneNumber)) {
            alert("Enter Contact Number");
            return;
        }

        if (!IsNonEmptyString(city)) {
            alert("Enter City")
            return
        }

        if (!IsNonEmptyString(bloodGroup)) {
            alert("Select Blood Group");
            return;
        }

        if (!IsNonEmptyString(gender)) {
            alert("Select Gender");
            return;
        }


        this.saveDataInDatabase();

    }

    saveDataInDatabase = () => {
        const { userId, onProfileCompleted } = this.props;
        const { name, city, phoneNumber, bloodGroup, gender } = this.state;

        this.setState({ loading: true });

        firebase.database().ref(`donors/${userId}`)
            .update({
                name,
                phoneNumber,
                city,
                bloodGroup,
                gender,
                onboardingStep: 2
            }).finally(() => {
                this.setState({ loading: false })
                onProfileCompleted?.();
            })
    }



    render() {

        const { name, city, phoneNumber, bloodGroup, gender, loading } = this.state;


        return (
            <View style={Styles.containerStyle}>
                <KeyboardAwareScrollView
                    contentContainerStyle={Styles.contentContainerStyle}
                >

                    <AppTextInput
                        value={name}
                        onChangeText={this.onNameChange}
                        placeholder="Enter Name"
                        isNonEmpty
                        style={Styles.textInputStyle}
                    />

                    <AppTextInput
                        value={phoneNumber}
                        onChangeText={this.onContactChange}
                        placeholder="Contact Number"
                        keyboardType="phone-pad"
                        isNonEmpty
                        style={Styles.textInputStyle}
                    />

                    <AppTextInput
                        value={city}
                        onChangeText={this.onCityChange}
                        placeholder="Current City"
                        isNonEmpty
                        style={Styles.textInputStyle}
                    />

                    <AppText

                        style={Styles.textInputStyle}
                        type="label">Blood Group</AppText>


                    <ChipGroup
                        onSelected={this.onBloodGroupChange}
                        selectedChips={[bloodGroup]}
                        scrollEnabled
                        horizontal
                        data={R.ChipsData.BloodGroups}
                    />

                    <AppText
                        style={Styles.textInputStyle}
                        type="label">Select Gender</AppText>

                    <ChipGroup
                        style={Styles.textInputStyle}
                        horizontal
                        miniumHorizontalGap={10}
                        data={R.ChipsData.GenderData}
                        onSelected={this.onGenderChange}
                        selectedChips={[gender]}
                    />


                    <AppButton
                        style={Styles.buttonStyle}
                        title="Save"
                        onPress={this.validate}
                        isLoading={loading}
                    />
                </KeyboardAwareScrollView>
            </View>
        )
    }
}
