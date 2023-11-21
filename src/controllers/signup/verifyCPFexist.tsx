import axios from "axios";

async function VerifyCPF(cpf: string): Promise<boolean> {
    try {
        const result = await axios.post('https://easypass-iak1.onrender.com/user/cpf', { user_CPF: cpf });
        if (result.data) {
            return true;
        }
    } catch (error) {
        return false;
    }
}

export { VerifyCPF }