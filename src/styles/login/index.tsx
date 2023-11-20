import { StyleSheet } from 'react-native';
import colors from '../../assets/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const stylesLog = StyleSheet.create({
  subtitle: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: colors.sc,
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    color: 'black',
    fontSize: hp('2%'),
    fontWeight: 'bold',

  },
  click: {
    marginTop: 5
  },
  logo: { alignSelf: 'center' }
});


export default stylesLog;