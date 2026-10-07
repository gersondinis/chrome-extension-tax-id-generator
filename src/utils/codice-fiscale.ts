const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
const monthLetters = 'ABCDEHLMPRST';
const municipalities = ['H501', 'F205', 'L219', 'D612', 'G273'];

const oddValues = [1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 2, 4, 18, 20, 11, 3, 6, 8, 12, 14, 16, 10, 22, 25, 24, 23];

function pick(chars: string, length: number) {
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

function pad(value: number) {
  return String(value).padStart(2, '0');
}

function checkChar(value: string) {
  let sum = 0;

  for (let i = 0; i < value.length; i++) {
    const char = value[i];
    const index = /\d/.test(char) ? Number(char) : char.charCodeAt(0) - 65;

    // positions are 1-based, so index 0 is an "odd" position
    sum += i % 2 === 0 ? oddValues[index] : index;
  }

  return String.fromCharCode(65 + (sum % 26));
}

export function generateCodiceFiscale() {
  const year = pad(Math.floor(Math.random() * 60) + 40);
  const month = monthLetters.charAt(Math.floor(Math.random() * monthLetters.length));
  const day = pad(Math.floor(Math.random() * 28) + 1);
  const municipality = municipalities[Math.floor(Math.random() * municipalities.length)];

  const value = pick(consonants, 6) + year + month + day + municipality;

  return value + checkChar(value);
}
