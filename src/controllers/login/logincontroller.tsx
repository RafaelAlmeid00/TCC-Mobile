import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function handleLogin(cpf: any, password: any, setLoading: any, setDisable: any, navigate: any, setError: any) {
    setLoading(true);
    setDisable(true);
    try {
      const res = await axios.post('https://easypass-iak1.onrender.com/user/login', {
        user_CPF: cpf,
        user_senha: password,
      });

      if (res.data.token) {
        await AsyncStorage.setItem('token', res.data.token);
        console.debug(AsyncStorage.getItem('token'))
        console.debug(res.data);
        console.debug('test', res.data.token);
        setLoading(false);
        navigate('HomeSystem', {cpf});
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setDisable(false);
      setError(true)
    }
}