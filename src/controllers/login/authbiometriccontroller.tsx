import * as LocalAuthentication from 'expo-local-authentication';

export const authenticateWithBiometry = async ({ navigate, setError, setAuthError}: any) => {
    try {
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Entre com sua Biometria ou Facial',
            cancelLabel: 'Entrar com senha',
            disableDeviceFallback: true
        });

        console.debug(result.success)
        if (result.success) {
            navigate('HomeSystem')
        } else {
            console.debug('Não validado')
            setAuthError(true)
            setError(true)
        }
    } catch (error) {
        console.log('Error:', error);
    }
};

export const checkBiometryAvailability = async ({ navigate, setError, alert, setAuth, token, setAuthError}: any) => {
    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

    if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT) ||
        supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
        if (token) {
            setAuth(true)
            authenticateWithBiometry({LocalAuthentication, navigate, setError, alert, setAuthError})
        } else {
            setAuth(false)
            console.log('sem token')
        }
    } else {
        setAuth(false)
        console.log('Sem biometria')
    }
}