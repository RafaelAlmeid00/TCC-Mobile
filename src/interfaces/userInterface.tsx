interface interfaceUserData {
    user_CPF: string
    user_RG: number,
    user_nome: string,
    user_email: string,
    user_senha: string,
    user_nascimento: string,
    user_endCEP: string,
    user_endUF: string,
    user_endbairro: string,
    user_endrua: string,
    user_endnum: number,
    user_endcomplemento?: string,
    user_endcidade: string,
    user_CPFresponsavel?: any,
    user_tipo?: '',
    list_CPF_list_id?: '',
    user_cel: number,
    user_idcli?: string,
    user_FotoPerfil?: string,
    user_RGFrente?: string,
    user_RGTras?: string,
    user_credit?: number,
    user_Background?: string,
    user_FotoRec?: string,
    user_status?: string,
    user_verifyemail?: string,
    user_verifycel?: string
}

export { interfaceUserData }