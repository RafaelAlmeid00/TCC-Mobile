import SystemController from '../../view/system/home';
import styles from '../../styles';
import { View } from 'react-native';
import { useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../store/context/context';
import Loading from '../../view/loading';
import { ConnectionSocket } from '../../controllers/socketcontroller';
import { useRoute } from '@react-navigation/native';

export default function System() {
  const { userContext, setUserContext, setToken } = useContext(UserContext);
  const route = useRoute();
  const { params } = route;
  const { cpf } = params 

  useEffect(() => {

      console.log('teste emit');
      
          ConnectionSocket({ setToken, setUserContext, cpf })
  }, [])

  console.debug('user', userContext)



  return (
    <View style={styles.container}>
      {
        userContext.user_CPF ?
        <SystemController />
        : <Loading/>
      }
    </View>
  );
}
