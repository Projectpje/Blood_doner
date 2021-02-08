import React, { Component } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import AppButton from '../../Components/AppButton/AppButton'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer'
import firebase from 'firebase';
import {inject, observer} from 'mobx-react';

@inject("userStore")
@observer
export default class Profile extends Component {

    onSignout = () => {

        const {userStore, navigation} = this.props;

        firebase.auth().signOut().then(() => {
            userStore.clearData();
            navigation.navigate("Login");
        })
    }

    render() {
        return (
            <ScreenContainer>
            
                <AppButton title="Signout"
                    onPress={this.onSignout}
                />
             
            </ScreenContainer>
        )
    }
}
