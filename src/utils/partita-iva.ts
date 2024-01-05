function generateDateOfBirth(): string {
  const year = Math.floor(Math.random() * 80) + 1900;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;

  return `${year}${month}${day}`;
}

function generateCheckDigit(dateOfBirth: string): string {
  // Calculate check digit using Luhn algorithm
  const digits = dateOfBirth.split('');
  let checksum = 0;
  for (let i = 0; i < digits.length; i++) {
    let digit = parseInt(digits[i]);
    if (i % 2 === 0) { // Even index
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    checksum += digit;
  }
  checksum = (10 - checksum % 10) % 10;
  return checksum.toString();
}

export function generatePartitaIVA() {
  const dateOfBirth = generateDateOfBirth();
  const checkDigit = generateCheckDigit(dateOfBirth);
  const codiceFiscale = dateOfBirth + checkDigit;
  return codiceFiscale.padStart(11, '0');
}

