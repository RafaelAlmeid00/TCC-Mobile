import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('token');
        console.debug(value)
        if (value !== null) {
            return value;
        }
    } catch (error) {
        console.log(error);
    }
    console.debug('deu merde')

    return ''; 
};

export default getToken;
