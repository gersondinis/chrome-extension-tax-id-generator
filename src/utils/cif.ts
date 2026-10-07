// company types whose control character is a digit
const orgLetters = 'AB';

export function generateCIF() {
  const letter = orgLetters.charAt(Math.floor(Math.random() * orgLetters.length));
  const province = String(Math.floor(Math.random() * 52) + 1).padStart(2, '0');
  let number = '';

  for (let i = 0; i < 5; i++) {
    number += Math.floor(Math.random() * 10);
  }

  const digits = province + number;
  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    const digit = Number(digits[i]);

    if (i % 2 === 0) {
      const doubled = digit * 2;
      sum += Math.floor(doubled / 10) + (doubled % 10);
    } else {
      sum += digit;
    }
  }

  return letter + digits + ((10 - (sum % 10)) % 10);
}
