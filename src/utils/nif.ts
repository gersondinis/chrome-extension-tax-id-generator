function pad(value: number, length: number) {
  let result = value + '';

  while (result.length < length) {
    result = '0' + result;
  }

  return result;
}

function checkDigit(value: string) {
  let sum = 0;
  const len = value.length;

  for (let i = 0; i < len; i++) {
    sum += Number(value[i]) * (len + 1 - i);
  }

  const mod = sum % 11;
  return '' + (mod === 0 || mod === 1 ? 0 : 11 - mod);
}

// personal = 1,2,3 | company = 5
export function generateNIF(prefix: '1' | '2' | '3' | '5' = '1') {
  let value = pad(Math.floor(Math.random() * 99999999), 8);

  if (prefix) {
    value = prefix + value.slice(prefix.length, value.length);
  }

  return value + checkDigit(value);
}
