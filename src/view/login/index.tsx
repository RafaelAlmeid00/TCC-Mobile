import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import styles from '../../styles';
import stylesLog from '../../styles/login';
import { IconButton, TextInput } from 'react-native-paper';
import { useState } from 'react';
import colors from '../../assets/colors';
import ButtonComp from '../../components/button';
import useNavigate from '../../controllers/navigatecontroller';
import Animated from '../../components/animated/animated';
import InputComp from '../../components/input';
import { handleLogin } from '../../controllers/logincontroller';
import SnackBar from '../../components/snackbar';
import { TitleEasyPass } from '../../components/text/title';
import { authenticateWithBiometry, checkBiometryAvailability } from '../../controllers/authbiometriccontroller';

export default function LoginController() {
    const [cpf, setCPF] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [disable, setDisable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState(false);
    const [error, setError] = useState(false);
    const buttonDisabled = { backgroundColor: disable ? 'gray' : colors.pm }
    const navigate = useNavigate()
    const [authError, setAuthError] = useState(false);


    const OnAuthByometric = () => {
        authenticateWithBiometry({ navigate, setError, setAuthError})
    }

    const onLogin = () => {
        handleLogin(cpf, password, setLoading, setDisable, navigate, setError)
    }

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 120, marginBottom: 80 }}>
                <TitleEasyPass fontSize={30} height={30} width={30} />

            </View>
            <View style={styles.form}>
                <Text style={stylesLog.title}>Não possui uma conta? </Text>
                <ButtonComp style={[stylesLog.subtitle]} color={colors.pm} text={'Clique Aqui'} mode={'text'} click={() => navigate('SignUp')} />
                <InputComp
                    mode={'flat'}
                    left={<TextInput.Icon icon="account" />}
                    value={cpf}
                    onChange={(text) => setCPF(text.replace(/\D/g, ''))}
                    length={11}
                    label={"Digite seu CPF"}
                />
                <InputComp
                    mode={'flat'}
                    left={<TextInput.Icon icon="lock" />}
                    right={
                        <TextInput.Icon
                            icon={visible ? "eye-off" : "eye"}
                            onPress={() => setVisible((prevVisible) => !prevVisible)}
                        />
                    }
                    value={password}
                    onChange={(text) => setPassword(text)}
                    length={11}
                    label={"Digite sua senha"}
                    secureText={!visible}
                />
                <Animated mode={'fadeIn'} time={1000} styles={[{ opacity: disable ? 0.6 : 1 }]}>
                    <ButtonComp style={[buttonDisabled]} text={'Entrar'} mode={'contained'} disable={disable} loading={loading} click={onLogin} />
                </Animated>
                <ButtonComp style={[stylesLog.subtitle, { marginTop: 30 }]} color={colors.pm} text={'Esqueci a senha'} mode={'text'} click={() => navigate('ForgetPassword')} />

                {auth && (
                    <>
                        <View style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                            <IconButton style={{ alignSelf: 'center' }} iconColor={colors.pm} icon={'fingerprint'} size={35} onPress={OnAuthByometric} />
                            <Text style={{ fontSize: 11, marginTop: 5, color: colors.pm }}>Entre com a Biometria</Text>
                        </View>
                    </>
                )}
            </View>

            {error && (
                authError ? (
                    <SnackBar color={'red'} text={'Biometria não autenticada!'} visible={error} setVisibleSnack={setError} />
                ) : (
                    <SnackBar color={'red'} text={'CPF ou Senha inválidos'} label={'Cadastre-se!'} visible={error} action={() => navigate('SignUp')} setVisibleSnack={setError} />
                )
            )}
            <StatusBar style="auto" />
        </View>
    );
}
