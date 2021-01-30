import { StyleSheet } from 'react-native';
import R from '../../Utils/R';


const styles = StyleSheet.create({
    normalTextStyle: {
        fontSize: 16,
        letterSpacing: 0.5,
        color: 'white'
    },

    small: {
        fontSize: 12,
        color: 'white'
    },

    lable: {
        fontSize: 14,
        color: '#555555'
    },

    errorLabel: {
        fontSize: 10,
        color: 'red',
    },

    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },

    mandatorySign: {
        color: 'red',
        fontSize: 16,
        height: 16,
    }
});

export default styles;