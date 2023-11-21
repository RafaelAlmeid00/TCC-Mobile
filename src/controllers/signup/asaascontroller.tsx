import axios from 'axios';
import { sendUserDB } from './sendDBUsercontroller';

interface ListObject {
  list_id: number;
  list_tipo: string;
}

interface TypeState {
  list: { id: number; value: string }[];
  error: string;
}

interface HandleGetListCpfProps {
  cpf: string;
  setType: React.Dispatch<React.SetStateAction<TypeState>>;
  type: any,
  setOffList: any
}

export const handleGetListCpf = async ({ cpf, type, setType, setOffList }: HandleGetListCpfProps) => {
  try {
    console.log('foi');
    const responsecpf = await axios.post('https://easypass-iak1.onrender.com/listcpf/search', { list_CPF: cpf });
    const result = responsecpf.data.objeto;
    console.log('resposta', responsecpf);


    if (responsecpf.data.objeto.length == 0) {
      console.log('sem lista')
      setOffList(true)
    } else {
      const updatedType = result
        .filter((objeto: ListObject) => 'list_id' in objeto && 'list_tipo' in objeto)
        .map((objeto: ListObject) => {
          let updatedValue = objeto.list_tipo;
          if (objeto.list_tipo === 'Work') {
            updatedValue = 'Trabalhador';
          } else if (objeto.list_tipo === 'student') {
            updatedValue = 'Estudante';
          }
          return { id: objeto.list_id, value: updatedValue };
        });

      setType({
        ...type,
        list: updatedType,
        error: '',
      });
    }

  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
};

export function handleSend(signUpContext: any, type: any, setUserData: any) {
  const user_listid = type.selectedList[0].id;
  const user_tipo = type.selectedList[0].value;

  const userDataWithExtras = {
    ...signUpContext,
    user_tipo: user_tipo === 'Estudante' ? 'student' : user_tipo === 'Trabalhador' ? 'worker' : user_tipo,
    list_CPF_list_id: user_listid,
  };

  console.log(userDataWithExtras);
  setUserData(userDataWithExtras);
}

const getIdCustomer = async (id: string, userData: any, signUpContext: any, setUserData: any, navigate: any, setUserContext: any) => {
  
  let userDataWithExtras: any

  if (userData) {
    userDataWithExtras = {
      ...userData,
      user_idcli: id
    };
  } else if (signUpContext) {
    userDataWithExtras = {
      ...signUpContext,
      user_idcli: id
    };
  }

  

  console.log(userDataWithExtras);
  setUserContext(userDataWithExtras);
  await sendUserDB(userDataWithExtras, navigate)

}

export const createCustomer = async (signUpContext: any, userData: any, setUserData: any, navigate: any, setUserContext: any) => {

  let cliente: any

  if (userData) {
    cliente = {
      name: userData.user_nome,
      cpfCnpj: userData.user_CPFresponsavel ? userData.user_CPFresponsavel : userData.user_CPF,
      email: userData.user_email,
      address: `${userData.user_endcidade}, ${userData.user_endrua}`,
      addressNumber: userData.user_endnum,
      province: userData.user_endbairro,
      postalCode: userData.user_endCEP,
      externalReference: userData.user_CPF.slice(0, 6),
      groupName: userData.user_tipo,
      mobilePhone: userData.user_cel
    }
  } else if (signUpContext) {
    cliente = {
      name: signUpContext.user_nome,
      cpfCnpj: signUpContext.user_CPFresponsavel ? signUpContext.user_CPFresponsavel : signUpContext.user_CPF,
      email: signUpContext.user_email,
      address: `${signUpContext.user_endcidade}, ${signUpContext.user_endrua}`,
      addressNumber: signUpContext.user_endnum,
      province: signUpContext.user_endbairro,
      postalCode: signUpContext.user_endCEP,
      externalReference: signUpContext.user_CPF.slice(0, 6),
      groupName: signUpContext.user_tipo,
      mobilePhone: signUpContext.user_cel
    }
  }
  
  console.log(cliente)
  try {
    const response = await axios.post('https://easypass-iak1.onrender.com/cliente', { cliente })
    console.log(response.data.id);
    console.log(response);
    getIdCustomer(response.data.id, userData, signUpContext, setUserData, navigate, setUserContext)
    console.log(response.data);

  } catch (error: any) {
    console.log(error.message)
    throw new Error("Erro ao criar cliente");
  }
}

