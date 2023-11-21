import { useNavigation } from '@react-navigation/native';

interface Nav {
    navigate(route: string, params?: any): void;
}

const useNavigate = () => {
    const navigation: Nav = useNavigation();

    const navigateTo = (route: string, data?: any) => {
        navigation.navigate(route, data);
        console.debug('Indo para a rota:', route, 'com os dados:', data);
    };

    return navigateTo;
};

export default useNavigate;
