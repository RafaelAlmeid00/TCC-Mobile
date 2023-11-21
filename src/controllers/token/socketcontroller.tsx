import { Dispatch, SetStateAction } from "react";
import { socket } from "../../store/socket";
import getToken from "./tokencontroller";
import { interfaceUserData } from "../../interfaces/userInterface";
import { jwtDecode } from 'jwt-decode'

interface Connect {
  setToken?: Dispatch<SetStateAction<string>>,
  setUserContext?: any,
  cpf?: string
}

export async function ConnectionSocket({ setToken, setUserContext, cpf }: Connect) {
  const userToken: any = await getToken()

  if (userToken) {
    setToken(userToken);

    (await socket).connect();
    console.debug('Conectou')
    console.log('tem token, conexão', (await socket).connect());
    console.debug('tem token, conexão', (await socket).connect());
    console.log('tem token', (await socket).connected);
    console.debug('tem token', (await socket).connected);
    setTimeout(() => {
      GetUserSocket(userToken, setUserContext, cpf)
    }, 3000);

    if ((await socket).connected) {
      console.debug('Conectou')
      console.log('conected', (await socket).connected);
      console.debug('conected', (await socket).connected);
      setTimeout(() => {
        GetUserSocket(userToken, setUserContext, cpf)
      }, 3000);
      return
    } else {
      (await socket).auth.token = userToken
      console.log('do nada', (await socket).connected)
      console.debug('do nada', (await socket).connected)

    }
  } else {
    console.log('sem token sem connect');
  }
}

export async function GetUserSocket(userToken: string, setUserContext: any, cpf: string) {
  let decoded: interfaceUserData
  console.log('token', userToken);

  try {
    decoded = jwtDecode(userToken, { header: true });
  } catch (error) {
    console.log('ERROR DO DECCODE POOHA', decoded, userToken);
  }

  console.log('decode', decoded);
  console.debug('decode', decoded);
  console.log('decode', cpf);
  console.debug('decode', cpf);

  (await socket).emit('userDetails', decoded ? decoded.user_CPF : cpf, (err: any) => {
    console.log('emitindo os bagui');

    if (err) {
      console.log('timeout');
    }
  });


  console.log(socket);
  (await socket).on('userDetails', (data) => {
    console.log(data)
    setUserContext(data)
  })

  return async () => {
    (await socket).off('userDetails');
  };
}

/*
React.useEffect(() => {
  setUserDataLoaded(false)
  console.log('this is userToken: ', userToken);

  
}, [userToken, socket])

React.useEffect(() => {
  const userToken = localStorage.getItem('token')

  if (userToken) {
    const decoded: UserData = jwt_decode(userToken)

    setTimeout(() => {
      socket.emit('userDetails', decoded.user_CPF, (err: any) => {
        console.log('emitindo os bagui');

        if (err) {
          console.log('timeout');
        }
      });
    }, 4000);

    setTimeout(() => {

      console.log(socket);
      socket.on('userDetails', (data) => {
        console.log(data)
        setUserData(data)
        setUserDataLoaded(true)

      })
    }, 4000);
    return () => {
      socket.off('userDetails');
    };
  } else {
    console.log('sem token.');
  }
}, [userData]); */