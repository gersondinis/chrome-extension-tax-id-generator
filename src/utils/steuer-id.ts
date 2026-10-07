function shuffle<T>(items: T[]) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

// ISO 7064 MOD 11,10
function checkDigit(value: string) {
  let product = 10;

  for (const char of value) {
    let sum = (Number(char) + product) % 10;
    if (sum === 0) sum = 10;
    product = (sum * 2) % 11;
  }

  const check = 11 - product;
  return '' + (check === 10 ? 0 : check);
}

// First 10 digits: exactly one digit appears twice, all others once, no leading zero
export function generateSteuerId() {
  let digits: number[];

  do {
    const distinct = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 9);
    const repeated = distinct[Math.floor(Math.random() * distinct.length)];
    digits = shuffle([...distinct, repeated]);
  } while (digits[0] === 0);

  const value = digits.join('');
  return value + checkDigit(value);
}
