import React, { Component } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import {inject, observer} from 'mobx-react';
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer';
import Card from '../../Components/Card/Card';
import R from '../../Utils/R';
import Styles from './styles';
import AppText from '../../Components/AppText/AppText';

@inject("userStore")
@observer
export default class Dashboard extends Component {
    render() {

        return (
            <ScreenContainer>
                <SafeAreaView />
                <View style={Styles.containerStyle}>

                <Card>
                   <AppText>Upcoming Dontation Date: </AppText>
                </Card>

                <Card style={{marginTop: 20}}>
                   <AppText>Donation requests: </AppText>
                </Card>

                <AppText>Donation History</AppText> 
                
                </View>

            </ScreenContainer>
        )
    }
}
