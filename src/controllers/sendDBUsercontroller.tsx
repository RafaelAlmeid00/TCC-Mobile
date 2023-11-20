import axios from "axios";

export async function sendUserDB(dados: any, navigate: any) {

    console.log(dados);
    
    try {
        await axios.post('https://easypass-iak1.onrender.com/user', dados);
        console.log('foi mlk');
        navigate('HomeSystem')
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro na requisição POST:', error.message);

        } else if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error('Erro na requisição POST:', error.response.status);
            } else if (error.request) {
                console.error('Erro na requisição POST:', error.request);
            } else {
                console.error('Erro desconhecido na requisição POST');
            }
        } else {
            console.error('Erro desconhecido na requisição POST');
        }
        
        navigate('SignUp')
    }
}