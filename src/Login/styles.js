import { StyleSheet } from 'react-native';
import R from '../Utils/R';

const styles = StyleSheet.create({
    containerStyle: {
        padding: 20,
        // justifyContent: 'center',
        height: R.Dimension.height
    },

    loginTypelableStyle: {
        fontSize: 16,
        letterSpacing: 0,
        color: 'white'
    },

    logoStyle: {
        marginTop: R.Dimension.height / 4,
        width: 150,
        height: 150,
        alignSelf: 'center'
    },

    chipContainerStyle: {
        marginTop: 2,
        justifyContent: 'space-between'
    }
});

export default styles;