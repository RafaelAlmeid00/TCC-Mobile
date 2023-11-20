async function ValidateCPF(cpf: any): Promise<boolean> {
    const cpfDigits = cpf.replace(/\D/g, '');

    if (
        ['00000000000', '11111111111', '22222222222', '33333333333', '44444444444',
            '55555555555', '66666666666', '77777777777', '88888888888', '99999999999'].includes(cpfDigits)
    ) {
        return false;
    }

    const calculateDigit = (digits: string, factor: number) => {
        const sum = digits.split('').reduce((acc, digit, index) => acc + parseInt(digit) * (factor - index), 0);
        const rest = (sum * 10) % 11;
        return rest === 10 || rest === 11 ? 0 : rest;
    };

    const firstDigit = calculateDigit(cpfDigits.slice(0, 9), 10);
    const secondDigit = calculateDigit(cpfDigits.slice(0, 10), 11);

    return firstDigit === parseInt(cpfDigits[9]) && secondDigit === parseInt(cpfDigits[10]);
}

export { ValidateCPF }