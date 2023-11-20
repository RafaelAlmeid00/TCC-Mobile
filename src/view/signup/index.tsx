import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles';
import InputComp from '../../components/input';
import ButtonComp from '../../components/button';
import useNavigate from '../../controllers/navigatecontroller';
import {
    handleInputChange,
    handleContinue,
    handleGoBack,
    handleFieldFiveAndAddress,
    handleFieldSeven,
    handleFieldNine,
    handleFieldFiveLocation,
    handleValidateCPF,
} from '../../controllers/signupcontroller';
import { TextInput } from 'react-native-paper';
import colors from '../../assets/colors';
import HelperText from '../../components/text/helper';
import SnackBar from '../../components/snackbar';
import Progress from '../../components/progressbar';
import { PasswordController, areAllTrue } from '../../controllers/passwordcontroller';
import { SignUpContext } from '../../store/context/context';

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
    user_tipo?: number,
    list_CPF_list_id?: number,
    user_cel: number,
    user_idcli?: string,
}

const SignUpController = () => {
    const [DDD, setDDD] = useState(0);
    const [formData, setFormData] = useState<interfaceUserData>({
        user_CPF: '',
        user_RG: 0,
        user_nome: '',
        user_email: '',
        user_senha: '',
        user_nascimento: '',
        user_endCEP: '',
        user_endUF: '',
        user_endbairro: '',
        user_endrua: '',
        user_endnum: 0,
        user_endcidade: '',
        user_cel: 0,
    });
    const [currentField, setCurrentField] = useState(0);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    const [city, setCidade] = useState("");
    const [district, setBairro] = useState("");
    const [street, setRua] = useState("");
    const [UF, setUF] = useState("");
    const [idade, setIdade] = useState("");
    const [address, setAddress] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [CPFresp, setCPFresp] = useState('');
    const [visiblePasswordTwo, setVisiblePasswordTwo] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const buttonDisabled = { backgroundColor: !formValid ? 'gray' : colors.pm }
    const [verifyPassword, setVerifyPassword] = useState('');
    const [warning, setWarning] = useState(false);
    const [sucess, setSuccess] = useState(false);
    const [visibleHelp, setVisibleHelp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [menor, setMenor] = useState(false);
    const requirements = PasswordController(verifyPassword);
    const allRequirementsMet = areAllTrue(requirements);
    const [cpfValidationDone, setCpfValidationDone] = useState(true);
    const {setSignUpContext} = useContext(SignUpContext);
    const [alert, setAlert] = useState({
        CPFExist: {
            text: 'Usuário já existente!',
            label: 'Vá para o login',
            action: () => navigate('Login')
        },
        Success: {
            text: 'Salvo com sucesso!',
            label: 'Continue',
            action: () => onContinue()
        }
    });

    const fields: any = [
        { key: 'user_CPF', label: 'seu CPF' },
        { key: 'user_RG', label: 'seu RG' },
        { key: 'user_nome', label: 'seu Nome Completo' },
        { key: 'user_email', label: 'seu E-mail' },
        { key: 'user_nascimento', label: 'sua Data de Nascimento' },
        { key: 'user_endCEP', label: 'seu CEP' },
        { key: 'user_endnum', label: 'seu Número de Endereço' },
        { key: 'user_endcomplemento', label: 'seu Complemento do Endereço' },
        { key: 'user_cel', label: 'seu Número de Celular' },
        { key: 'user_senha', label: 'sua senha novamente' },

    ];

    const checklist = [
        { label: 'Mínimo de 6 caracteres', isValid: requirements.length },
        { label: 'Caractere especial', isValid: requirements.specialChar },
        { label: 'Pelo menos um número', isValid: requirements.number },
        { label: 'Pelo menos uma letra maiúscula', isValid: requirements.uppercase },
    ];


    const onInputChange = (value: any) => {
        handleInputChange(
            value,
            currentField,
            fields,
            formData,
            setFormData,
            setFormValid,
            address,
            DDD,
            verifyPassword,
            setWarning,
            setVisibleHelp,
            setLoading,
            setMenor,
            setIdade,
            city
        );
    };

    const onContinue = () => {
        setFormValid(false)
        handleContinue(currentField, fields, setCurrentField, setProgress, formData, navigate, setSignUpContext);
    };

    const onGoBack = () => {
        setSuccess(true)
        handleGoBack(currentField, setCurrentField);
    };


    useEffect(() => {

        handleValidateCPF({
            CPFresp,
            cpfValidationDone,
            setFormValid,
            setVisibleHelp,
            setCPFresp,
            setCpfValidationDone,
            setFormData,
            currentField,
            setMenor
        })
        handleFieldFiveAndAddress({ currentField, address, formData, setFormValid, setVisibleHelp, city })
        handleFieldSeven(currentField, setFormValid)
        handleFieldNine({ currentField, formData, verifyPassword, allRequirementsMet, setFormValid })
        handleFieldFiveLocation({
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
        })

        console.log(formData)

    }, [formData, CPFresp, currentField, formData.user_endCEP, address, formData.user_senha, verifyPassword]);




    return (
        <>
            <ButtonComp
                icon='arrow-left-bold'
                text={'Voltar'}
                mode={'contained'}
                style={[styles.back, { top: 50, left: 20 }]}
                click={currentField > 0 ? onGoBack : () => navigate('Login')}
            />
            <View style={[styles.alignCenter, { marginTop: -100 }]}>
                <View style={styles.alignTop}>
                    <Text style={[styles.textTitle, { marginBottom: 60, width: '90%' }]}>
                        Preencha suas informações para o cadastro:
                    </Text>
                </View>
                <View style={styles.alignTop}>
                    <Text style={styles.textSubTitle}>
                        Coloque o seu {fields[currentField].label}:
                    </Text>
                </View>
                <View style={[styles.form, { marginTop: 10 }]}>
                    {currentField == 9 &&
                        <InputComp
                            focus={true}
                            mode={'flat'}
                            label={`Digite sua senha`}
                            value={verifyPassword}
                            length={45}
                            onChange={(text) => setVerifyPassword(text)}
                            secureText={!visiblePasswordTwo}
                            left={fields[currentField].key === 'user_senha' && <TextInput.Icon icon="lock" />}
                            right={fields[currentField].key === 'user_senha' &&
                                <TextInput.Icon
                                    icon={visiblePasswordTwo ? "eye-off" : "eye"}
                                    onPress={() => setVisiblePasswordTwo((prevVisible) => !prevVisible)}
                                />
                            }
                        />
                    }
                    <InputComp
                        mode={'flat'}
                        label={`Digite ${fields[currentField].label}`}
                        value={formData[fields[currentField].key] === 'user_nascimento' ? idade : (formData[fields[currentField].key] ? formData[fields[currentField].key] : '')}
                        length={45}
                        onChange={onInputChange}
                        secureText={currentField == 9 && !visiblePassword}
                        left={fields[currentField].key === 'user_senha' &&
                            <TextInput.Icon icon="lock" />
                        }
                        right={fields[currentField].key === 'user_senha' ?
                            <TextInput.Icon
                                icon={visiblePassword ? "eye-off" : "eye"}
                                onPress={() => setVisiblePassword((prevVisible) => !prevVisible)}
                            />
                            : (loading &&
                                <TextInput.Icon icon={"loading"} />
                            )
                        }
                    />
                    {menor &&
                        <>
                            <InputComp
                                focus={true}
                                mode={'flat'}
                                label={`Digite o CPF do seu responsável`}
                                value={CPFresp.replace(/\D/g, '')}
                                length={11}
                                onChange={(text) => setCPFresp(text.replace(/\D/g, ''))}
                            />
                        </>
                    }
                    {menor && visibleHelp &&
                        <HelperText textChildren={'CPF inválido'} type={'error'} visible={visibleHelp} />
                    }
                    <HelperText textChildren={`${fields[currentField].key === 'user_senha' ? 'Erro na comparação de senha!' : `Insira ${fields[currentField].label} ${fields[currentField].key == 'user_cel' ? 'DDD + Número' : ''}válido`!}`} type={'error'} visible={visibleHelp} />
                    {currentField == 5 && address ? (
                        <Text>{district}, {street} - {city}, {UF}</Text>
                    ) : (
                        currentField == 9 && (
                            <>
                                {checklist.map((item, index) => (
                                    <Text key={index} style={{ color: item.isValid ? 'green' : 'red', fontStyle: 'italic', fontSize: 11 }}>
                                        {item.label}: {item.isValid ? 'Válido' : 'Inválido'}
                                    </Text>
                                ))}
                            </>
                        )
                    )}

                    <ButtonComp
                        text={currentField < fields.length - 1 ? 'Continuar' : 'Finalizar'}
                        mode={'contained'}
                        style={[buttonDisabled, { marginTop: 50 }]}
                        click={onContinue}
                        disable={!formValid}
                    />
                    <Progress pointprogress={currentField} style={[{ top: 100 }]} visible={true} />
                </View>
            </View>
            <SnackBar text={sucess ? alert.Success.text : alert.CPFExist.text} label={sucess ? alert.Success.label : alert.CPFExist.label} visible={sucess ? sucess : warning} action={sucess ? alert.Success.action : alert.CPFExist.action} setVisibleSnack={sucess ? setSuccess : setWarning} />
        </>
    );
};

export default SignUpController;
