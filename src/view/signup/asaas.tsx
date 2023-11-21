import { Text, View } from 'react-native';
import Loading from '../loading';
import { useContext, useEffect, useState } from 'react';
import styles from '../../styles';
import { PaperSelect } from 'react-native-paper-select';
import ButtonComp from '../../components/button';
import { createCustomer, handleGetListCpf, handleSend } from '../../controllers/signup/asaascontroller';
import { interfaceUserData } from '../../interfaces/userInterface';
import { SignUpContext, UserContext } from '../../store/context/context';
import useNavigate from '../../controllers/user/navigatecontroller';

export default function AsaasController() {
  const { signUpContext } = useContext(SignUpContext);
  const { setUserContext } = useContext(UserContext);

  console.log(signUpContext)
  const [userData, setUserData] = useState<interfaceUserData>();
  const [loading, setLoading] = useState(false);
  const [offList, setOffList] = useState(false);
  const [type, setType] = useState({
    value: '',
    list: [],
    selectedList: [],
    error: '',
  });
  const navigate = useNavigate()

  const onSend = () => {
    handleSend(signUpContext, type, setUserData)
  }

  useEffect(() => {

    if (signUpContext && !type.value) {
      const cpf = signUpContext.user_CPF
      handleGetListCpf({ cpf, type, setType, setOffList})
    }
    
  }, [signUpContext, type])

  useEffect(() => {
    if (userData || offList) {
      setLoading(true)
      createCustomer(signUpContext, userData, setUserData, navigate, setUserContext)
    }
  }, [userData, offList])


  console.log('tipos', type, type.value, type.selectedList[0], type.list.length, 'context', signUpContext, 'userData', userData, type.list.length, (signUpContext && type.list.length > 0), !loading);

  return (
    <>
      {(signUpContext && type.list.length > 0) && !loading ?

        <View style={styles.alignCenter}>
          <View style={styles.form}>
            <Text style={[styles.textTitle, { marginBottom: 60 }]}>Escolha seu tipo de usuário:</Text>
            <PaperSelect
              label="Selecione o tipo"
              value={type.value}
              onSelection={(value: any) => {
                setType({
                  ...type,
                  value: value.text,
                  selectedList: value.selectedList,
                  error: '',
                });
              }}
              arrayList={[...type.list]}
              selectedArrayList={[...type.selectedList]}
              errorText={type.error}
              multiEnable={false}
            />
            <ButtonComp
              text={'Continuar'}
              mode={'contained'}
              style={[{ marginTop: 20 }]}
              click={onSend}
            />
          </View>

        </View>

        :
        <Loading />

      }
    </>
  );
}
