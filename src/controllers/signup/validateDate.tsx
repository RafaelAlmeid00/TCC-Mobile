async function validateDate(dateString: string): Promise<string | boolean> {
    console.log(dateString);
    
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    const dataAtual = new Date();
    const currentYear = dataAtual.getFullYear()
    const currentDay = dataAtual.getDate();
    const currentMonth = dataAtual.getMonth() + 1
    console.debug(date, currentYear, currentMonth, currentDay)
    const minAgeYear = currentYear - 18;
    const isYearGreaterThanMinAgeYear = date.getFullYear() > minAgeYear && date.getFullYear() < currentYear;
    const isYearEqualToCurrentYear = date.getFullYear() === currentYear;
    const isCurrentYearEqualToMinAgeYear = date.getFullYear() === minAgeYear;
    const isCurrentMonthGreaterThanDateMonth = currentMonth < date.getMonth() + 1;
    const isCurrentMonthEqualToDateMonth = currentMonth === date.getMonth() + 1;
    const isCurrentDayLessThanDateDay = currentDay < date.getDate();
    
    if (
      isYearGreaterThanMinAgeYear ||
      isYearEqualToCurrentYear ||
      (isCurrentYearEqualToMinAgeYear && isCurrentMonthGreaterThanDateMonth) ||
      (isCurrentYearEqualToMinAgeYear && isCurrentMonthEqualToDateMonth && isCurrentDayLessThanDateDay)
    ) {
        return 'Menor';
    } else if (
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > 31 ||
        year > currentYear
        ) {
            return false
    }

    return true;
}

function formatDateString(date: string): string {
    let formattedString = date.replace(/\D/g, ''); // remove todos os caracteres não numéricos
    if (formattedString.length > 2) {
        formattedString = formattedString.slice(0, 2) + '-' + formattedString.slice(2);
    }
    if (formattedString.length > 5) {
        formattedString = formattedString.slice(0, 5) + '-' + formattedString.slice(5);
    }
    console.log('formatada', formattedString);

    return formattedString;
}

function handleSubmitData(date: string) {
    console.log('data enviada', date);
    
    const formattedDate = formatDateString(date);
    console.log('recebida', formattedDate);
    
    const parts = formattedDate.split('-');
    let yyyy = parts[2] ? parts[2] : '';
    let mm = parts[1] ? parts[1] : '';
    let dd = parts[0] ? parts[0] : '';

    const formattedDateForDatabase = `${yyyy}-${mm}-${dd}`;
    console.log(formattedDateForDatabase);

    return formattedDateForDatabase;
    // Submeta a data no formato yyyy-mm-dd para o banco de dados
}

export { validateDate, handleSubmitData };
