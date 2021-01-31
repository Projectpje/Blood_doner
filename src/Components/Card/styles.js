import { StyleSheet } from 'react-native';
import R from '../../Utils/R';

const styles = StyleSheet.create({
    containerStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        backgroundColor: R.Colors.PrimaryColor,
        padding: 10,
        borderRadius: 5
    }
});

export default styles;