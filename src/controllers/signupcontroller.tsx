import { useContext } from "react";
import { initLocation } from "./locationcontroller";
import { PasswordController, areAllTrue } from "./passwordcontroller";
import { ValidateCPF } from "./validateCPFcontroller";
import { handleSubmitData, validateDate } from "./validateDate";
import { VerifyCPF } from "./verifyCPFexist";
import { SignUpContext } from "../store/context/context";

export const handleInputChange = async (
    value: any,
    currentField: string | number,
    fields: any[],
    formData: any,
    setFormData: (arg0: any) => void,
    setFormValid: (arg0: any) => void,
    address: boolean, DDD: number,
    verifyPassword: string, setWarning: (arg0: any) => void,
    setVisibleHelp: (arg0: any) => void,
    setLoading: (arg0: any) => void,
    setMenor: (arg0: any) => void,
    setIdade: (arg0: any) => void,
    city: string
) => {
    const currentKey = fields[currentField].key;
    let sanitizedValue = value;

    switch (currentKey) {
        case 'user_CPF':
            sanitizedValue = value.replace(/\D/g, '').slice(0, 11);

            const resultCPF = await ValidateCPF(sanitizedValue)

            if (sanitizedValue.length < 11 || !resultCPF) {
                setFormValid(false)
                setVisibleHelp(true)
            } else if (sanitizedValue.length === 11) {
                setLoading(true)
                const resultExist = await VerifyCPF(sanitizedValue)
                if (resultExist) {
                    setFormValid(false)
                    setWarning(true)
                    setLoading(false)
                } else {
                    setFormValid(true)
                    setVisibleHelp(false)
                    setWarning(false)
                    setLoading(false)
                }
            }

            break;
        case 'user_RG':
            sanitizedValue = value.replace(/\D/g, '').slice(0, 9);
            if (sanitizedValue.length < 9) {
                setFormValid(false)
                setVisibleHelp(true)
            } else {
                setFormValid(true)
                setVisibleHelp(false)
            }
            break;
        case 'user_email':
            var emailValid = (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/).test(value);

            if (!emailValid) {
                setFormValid(false)
                setVisibleHelp(true)
            } else {
                setFormValid(true)
                setVisibleHelp(false)
            }
            break;
        case 'user_nascimento':
            let swtch = 1
            sanitizedValue = value.replace(/\D/g, '').slice(0, 8);
            sanitizedValue = sanitizedValue
                .replace(/(\d{2})(\d)/, '$1/$2')
                .replace(/(\d{2})(\d)/, '$1/$2');

            if (swtch === 1) {
                setIdade(sanitizedValue)
            } else {
                sanitizedValue = value.replace(/\D/g, '').slice(0, 8);
                sanitizedValue = sanitizedValue
                    .replace(/(\d{2})(\d)/, '$1/$2')
                    .replace(/(\d{2})(\d)/, '$1/$2');
                setIdade(sanitizedValue)
            }

            const resultDate = await validateDate(sanitizedValue)
            const formatted = handleSubmitData(sanitizedValue)
            console.log(resultDate, sanitizedValue)
            setMenor(false)

            if (resultDate == 'Menor') {
                if (sanitizedValue.length < 10 || !resultDate) {
                    setFormValid(false)
                    setVisibleHelp(true)
                } else {
                    swtch = 2
                    sanitizedValue = formatted
                    setMenor(true)
                    setFormValid(false)
                    setVisibleHelp(false)
                }
            } else {
                if (sanitizedValue.length < 10 || !resultDate) {
                    setFormValid(false)
                    setVisibleHelp(true)
                } else {
                    swtch = 2
                    sanitizedValue = formatted
                    console.log('aq foi')
                    setFormValid(true)
                    setVisibleHelp(false)
                }
            }


            break;
        case 'user_endCEP':
            sanitizedValue = value.replace(/\D/g, '');
            sanitizedValue = sanitizedValue.slice(0, 8);
            sanitizedValue = sanitizedValue.replace(/(\d{5})(\d{3})/, '$1-$2');
            console.log(city);
            

            if (sanitizedValue.length < 8 || address === false || city == '') {
                setFormValid(false)
                setVisibleHelp(true)
            } else if (city !== '') {
                setFormValid(true)
                setVisibleHelp(false)
            } else {
                setFormValid(false)
                setVisibleHelp(true)
            }
            break;
        case 'user_endcomplemento':
            if (value) {
                setFormValid(true)
                setVisibleHelp(false)
            } else {
                setFormValid(true)
                setVisibleHelp(false)
            }

            break;
        case 'user_cel':
            sanitizedValue = value.replace(/\D/g, '');

            sanitizedValue = sanitizedValue.slice(0, 11);

            if (sanitizedValue.length < 11) {
                setFormValid(false);
                setVisibleHelp(true)
            } else {
                setFormValid(true);
                setVisibleHelp(false)
            }
            break;
        case 'user_senha':
            sanitizedValue = value.slice(0, 45);

            const requirements = PasswordController(verifyPassword);
            const allRequirementsMet = areAllTrue(requirements);
            if (sanitizedValue.length >= 6 && verifyPassword == sanitizedValue) {
                setFormValid(true)
                setVisibleHelp(false)
            } else {
                setFormValid(false);
                setVisibleHelp(true)
            }
            break;
        default:
            sanitizedValue = value.slice(0, 45);

            if (value.length == 0) {
                setFormValid(false)
                setVisibleHelp(true)
            } else {
                setFormValid(true)
                setVisibleHelp(false)
            }
            break;
    }

    setFormData({ ...formData, [currentKey]: sanitizedValue });

};


export const handleContinue = async (currentField: number,
    fields: string | any[],
    setCurrentField: (arg0: any) => void,
    setProgress: (arg0: any) => void,
    formData: any,
    navigate: (arg0: any) => void,
    setSignUpContext: (arg0: any) => void,
) => {

    if (currentField < fields.length - 1) {
        setCurrentField(currentField + 1);
        setProgress(currentField + 1);
    } else {
        const result = await verifyFormData(formData)
        if (result) {
            console.log('Dados cadastrados:', formData);
            setSignUpContext(formData)
            navigate('Asaas')
        } else {
            setCurrentField(0);
            setProgress(0);
        }
    }
};

export const handleGoBack = (currentField: number, setCurrentField: (arg0: number) => void) => {
    if (currentField > 0) {
        setCurrentField(currentField - 1);
    }
};

export async function verifyFormData(formData: []): Promise<boolean> {
    const requiredFields = [
        'user_CPF',
        'user_RG',
        'user_nome',
        'user_email',
        'user_senha',
        'user_nascimento',
        'user_endCEP',
        'user_endUF',
        'user_endbairro',
        'user_endrua',
        'user_endnum',
        'user_endcidade',
        'user_cel',
    ];

    for (const field of requiredFields) {
        if (!formData[field]) {
            return false;
        }
    }

    return true;
}

interface CPFProps {
    CPFresp: string;
    setFormValid: React.Dispatch<React.SetStateAction<boolean>>;
    setVisibleHelp: React.Dispatch<React.SetStateAction<boolean>>;
    setCPFresp: React.Dispatch<React.SetStateAction<string>>;
    setCpfValidationDone: React.Dispatch<React.SetStateAction<boolean>>;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

interface CPFProps {
    CPFresp: string;
    cpfValidationDone: boolean;
    setFormValid: React.Dispatch<React.SetStateAction<boolean>>;
    setVisibleHelp: React.Dispatch<React.SetStateAction<boolean>>;
    setCPFresp: React.Dispatch<React.SetStateAction<string>>;
    setCpfValidationDone: React.Dispatch<React.SetStateAction<boolean>>;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    currentField: number,
    setMenor: React.Dispatch<React.SetStateAction<boolean>>;
}

export async function handleValidateCPF(props: CPFProps) {
    const {
        CPFresp,
        cpfValidationDone,
        setFormValid,
        setVisibleHelp,
        setCPFresp,
        setCpfValidationDone,
        setFormData,
        currentField,
        setMenor
    } = props;

    try {
        const resultCPF = await ValidateCPF(CPFresp);

        if (currentField !== 4) {
            setMenor(false);
        } else if (CPFresp.length === 11 && cpfValidationDone) {
            if (!resultCPF) {
                setFormValid(false);
                setVisibleHelp(true);
                setCPFresp('');
                setCpfValidationDone(false);
            } else {
                setFormValid(true);
                setCpfValidationDone(false);
                setVisibleHelp(false);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    user_CPFresponsavel: CPFresp
                }));
            }
        } else {
            setCpfValidationDone(true);
        }

    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

interface interfaceHandleFieldProps {
    currentField: number;
    address: boolean;
    formData: any;
    setFormValid: (value: boolean) => void;
    setVisibleHelp: (value: boolean) => void;
    city: string
}

export function handleFieldFiveAndAddress(props: interfaceHandleFieldProps) {
    const { currentField, address, formData, setFormValid, setVisibleHelp, city } = props;

    if (currentField === 5 && address && city && formData.user_endCEP.length > 8) {
        setFormValid(true);
        setVisibleHelp(false);
    }
}

interface InterfaceHandleFieldNineProps {
    currentField: number;
    formData: any;
    verifyPassword: string;
    allRequirementsMet: boolean;
    setFormValid: (value: boolean) => void;
}

export function handleFieldSeven(currentField: number, setFormValid: (value: boolean) => void) {
    if (currentField === 7) {
        setFormValid(true);
    }
}

export function handleFieldNine(props: InterfaceHandleFieldNineProps) {
    const { currentField, formData, verifyPassword, allRequirementsMet, setFormValid } = props;

    if (currentField === 9) {

        if (formData.user_senha === verifyPassword) {
            if (verifyPassword === '' || formData.user_senha === '') {
                setFormValid(false);
            } else {
                if (!allRequirementsMet) {
                    setFormValid(false);
                } else {
                    setFormValid(true);
                }
            }
        } else {
            setFormValid(false);
        }
    }
}

interface InterfaceHandleFieldFiveLocationProps {
    currentField: number;
    setAddress: (arg0: any) => void;
    formData: any;
    setCidade: (arg0: any) => void;
    setUF: (arg0: any) => void;
    setBairro: (arg0: any) => void;
    setRua: (arg0: any) => void;
    setDDD: (arg0: any) => void;
    setFormData: (arg0: any) => void;
    address: boolean
}


export function handleFieldFiveLocation(props: InterfaceHandleFieldFiveLocationProps) {
    const {
        address,
        currentField,
        setAddress,
        formData,
        setCidade,
        setUF,
        setBairro,
        setRua,
        setDDD,
        setFormData
    } = props;

    if (currentField === 5 && !address) {
        initLocation(
            setAddress,
            formData.user_endCEP,
            (cidade: string) => {
                setCidade(cidade);
                setFormData((prevData: any) => ({ ...prevData, user_endcidade: cidade }));
            },
            (uf: string) => {
                setUF(uf);
                setFormData((prevData: any) => ({ ...prevData, user_endUF: uf }));
            },
            (bairro: string) => {
                setBairro(bairro);
                setFormData((prevData: any) => ({ ...prevData, user_endbairro: bairro }));
            },
            (rua: string) => {
                setRua(rua);
                setFormData((prevData: any) => ({ ...prevData, user_endrua: rua }));
            },
            setDDD
        );
    }
}
