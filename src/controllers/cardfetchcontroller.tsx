import axios from "axios";

export async function SearchCard(token: string, setDataCard: any) {
    try {
        console.log('ta indo');
        console.log(token);

        const response = await axios.post('https://easypass-iak1.onrender.com/card/enviados', {
            token: token
        });
        console.log(response);
        console.log('ta indo');

        if (response.data) {
            console.log(response.data);
            setDataCard(response.data[0])
        } else {
            console.log('deu merda rapeize')
        }
    } catch (error) {
        console.log(error);
        setDataCard(false)
    }
}