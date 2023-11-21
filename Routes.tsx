import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import LoginScreen from "./src/pages/login"
import SignUpScreen from "./src/pages/signup"
import HomeSystem from './src/pages/system';
import ForgetPassword from './src/pages/forgetpassword';
import { PaperProvider } from 'react-native-paper';
import Asaas from './src/pages/asaas';
import { SignUpContext, UserContext } from './src/store/context/context';

const Tab = createBottomTabNavigator();

export default function Routes() {

    const [userContext, setUserContext] = useState();
    const [token, setToken] = useState();
    const [signUpContext, setSignUpContext] = useState();


    return (
        <PaperProvider>
            <UserContext.Provider value={{ userContext, setUserContext, token, setToken }}>
                <SignUpContext.Provider value={{ signUpContext, setSignUpContext }}>
                    <NavigationContainer>
                        <Tab.Navigator
                            screenOptions={{
                                headerShown: false,
                            }}
                            tabBar={() => null}
                            >

                            <Tab.Screen
                                name="Login"
                                component={LoginScreen}
                            />
                            <Tab.Screen
                                name="SignUp"
                                component={SignUpScreen}
                            />

                            <Tab.Screen
                                name="Asaas"
                                component={Asaas}
                            />

                            <Tab.Screen
                                name="ForgetPassword"
                                component={ForgetPassword}
                            />

                            <Tab.Screen
                                name="HomeSystem"
                                component={HomeSystem}
                            />
                        </Tab.Navigator>
                    </NavigationContainer>
                </SignUpContext.Provider>
            </UserContext.Provider>
        </PaperProvider >

    );
}
