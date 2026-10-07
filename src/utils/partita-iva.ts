function randomDigits(length: number) {
  let result = '';

  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }

  return result;
}

// Luhn variant: odd positions as is, even positions doubled
function checkDigit(value: string) {
  let sum = 0;

  for (let i = 0; i < value.length; i++) {
    let digit = Number(value[i]);

    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
  }

  return '' + ((10 - (sum % 10)) % 10);
}

// 7 digit company number + 3 digit tax office code (001-100) + check digit
export function generatePartitaIVA() {
  const office = String(Math.floor(Math.random() * 100) + 1).padStart(3, '0');
  const value = randomDigits(7) + office;

  return value + checkDigit(value);
}
