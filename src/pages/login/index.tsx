import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import HomeController from '../../view/splash';
import { useState } from 'react';
import LoginController from '../../view/login';

export default function Login() {

  const [verifyBoolean, setVerifyBoolean] = useState(false)

  const initialScreen = () => {
    setVerifyBoolean(true)
  };

  return (
    <>
      {verifyBoolean
        ?
        <LoginController/>
        :
        <HomeController funVerify={initialScreen} />
      }

    </>
  );
}
