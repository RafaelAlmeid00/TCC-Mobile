import { StyleSheet } from 'react-native';
import colors from '../assets/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 2
    },
    title: {
        display: 'flex',
        color: colors.sc,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
      },
      form: {
        display: 'flex',
        width: wp('80%'),
        height: 'auto',
        flexDirection: 'column',
        alignSelf: 'center'
      },
      input: {
        width: '100%',
        color: 'black',
        backgroundColor: '#dcdcdc',
        marginBottom: 15,
        marginTop: 15
      },
      button: {
        backgroundColor: colors.pm,
        color: 'white',
        marginTop: 15
      },
      loading: {
        display: 'flex',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('100%'),
        height: hp('100%')
      },
      list: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
      },
      back: {
        display: 'flex',
        alignItems: 'flex-start', 
        justifyContent: 'flex-start',
        backgroundColor: colors.pm,
        width: wp('30%')
      },

      alignTop: {
        display: 'flex',
        width: '100%',
        height: 'auto',
        justifyContent: 'center'
      },

      alignCenter: {
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      },

      textTitle: {
        color: 'black',
        fontSize: hp('2.5%'),
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center'
      },

      textSubTitle: {
        color: 'black',
        fontSize: hp('2%'),
        textAlign: 'center'
      }

});

export default styles