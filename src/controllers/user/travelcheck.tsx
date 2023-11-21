import axios from "axios";

export const handleTravel = async ({setUse, setLoading, token, userContext}) => {
    try {
        const response = await axios.post('https://easypass-iak1.onrender.com/usos', {
            user_CPF: userContext ? userContext.user_CPF : '',
        }, {
            headers: {
                'authorization': token
            }
        })
        console.log(response.data);
        setUse(response.data)
        setLoading(false)

    } catch (error) {
        console.log(error);
        setLoading(false)
    }
}
