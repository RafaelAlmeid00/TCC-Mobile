import axios from 'axios';

const config = {
  baseURL: 'https://viacep.com.br/ws/',
}

const handleLocation = async (setAddress: any, cep: string, setCidade: any, setUF: any, setBairro: any, setRua: any, setDDD: any) => {
  try {
    console.debug(`${config.baseURL}${cep}/json/`)

    const response = await axios.get(`${config.baseURL}${cep}/json/`);

    if (response.data && !response.data.erro) {
      console.log("Endereço:", response.data);
      console.log("Endereço:", response.data.localidade);
      console.log("Endereço:", response.data.uf);
      console.log("Endereço:", response.data.bairro);
      console.log("Endereço:", response.data.logradouro);
      console.log("Endereço:", response.data.ddd);
      setAddress(true)
      setCidade(response.data.localidade)
      setUF(response.data.uf)
      setBairro(response.data.bairro)
      setRua(response.data.logradouro)
      setDDD(response.data.ddd)
    } else {
      console.log('erro', response.data.erro);
      console.error("Nenhum resultado encontrado");
    }
  } catch (error) {
    console.debug(`${config.baseURL}${cep}/json/`)
    console.error("Falha ao localizar:", error);
  }
};

function initLocation(setAddress: any, cep: string, setCidade: any, setUF: any, setBairro: any, setRua: any, setDDD: any) {
  try {
    handleLocation(setAddress, cep, setCidade, setUF, setBairro, setRua, setDDD);
  } catch (error) {
    console.error("Erro ao inicializar a localização:", error);
  }
}

export { handleLocation, initLocation };