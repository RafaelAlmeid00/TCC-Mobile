interface PasswordRequirements {
  length: boolean;
  specialChar: boolean;
  number: boolean;
  uppercase: boolean;
}

function PasswordController(password: string): PasswordRequirements {
  const requirements: PasswordRequirements = {
    length: password.length >= 6,
    specialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password),
    number: /\d+/.test(password),
    uppercase: /[A-Z]+/.test(password),
  };

  return requirements;
}

function areAllTrue(obj: any): boolean {
  return Object.values(obj).every(value => value === true);
}


export { PasswordController, areAllTrue };
