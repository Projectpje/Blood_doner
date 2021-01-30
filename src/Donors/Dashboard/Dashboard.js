import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {inject, observer} from 'mobx-react';

@inject("userStore")
@observer
export default class Dashboard extends Component {
    render() {


        console.log('Donor dashboard', this.props.userStore);

        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
