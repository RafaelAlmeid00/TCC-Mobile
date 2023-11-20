import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const wave = StyleSheet.create({
    bottom: {
        position: 'relative',
        height: 'auto',
        width: 'auto'
    },

    top: {
        position: 'relative',
        height: 'auto',
        width: 'auto'
    },

    img: {
        height: hp(20),
        width: '100%'
    }

});

export default wave