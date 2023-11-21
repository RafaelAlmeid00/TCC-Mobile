import axios from "axios";

export async function SearchCard(token: string, setDataCard: any, userContext: any) {
    try {
        console.log('Iniciando a busca do cartão...');
        console.log(userContext)
        const response = await axios.post('https://easypass-iak1.onrender.com/card/enviados', {
            user_CPF: userContext && userContext.user_CPF,
            token: token
        });

        console.log('aaa', response.data);


        if (response.data && response.data.length > 0) {
            if (response.data == "Sem pedidos" || response.data == "Sem cards ativos") {
                setDataCard(false);
            } else {
                console.log('Dados do cartão recebidos com sucesso:', response.data);
                setDataCard(response.data[0]);
            }

        } else {
            console.log('Nenhum cartão encontrado.');
            setDataCard(false);
        }
    } catch (error) {
        console.error('Erro ao buscar o cartão:', error);
        setDataCard(false);
    }
}