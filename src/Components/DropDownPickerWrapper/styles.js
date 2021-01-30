import { StyleSheet } from 'react-native';
import R from '../../Utils/R';

const styles = StyleSheet.create({
    style: {
        backgroundColor: 'transparent',
        borderColor: R.Colors.PrimaryDark,

    },
    dropDownStyle: {
        backgroundColor: "white"
    },
    containerStyle: {
        height: 40,
        marginTop: 5
    },
    activeItemStyle: {
        alignItems: 'center'
    },
    activeLabelStyle: {
        color: 'blue'
    },
    labelStyle: {
        fontSize: 14,
        color: 'black'
    }
});

export default styles;