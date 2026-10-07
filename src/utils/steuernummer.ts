// 11 digits (real ones are 10-11 depending on the state), no leading zero
export function generateSteuernummer() {
  let value = String(Math.floor(Math.random() * 9) + 1);

  for (let i = 1; i < 11; i++) {
    value += Math.floor(Math.random() * 10);
  }

  return value;
}
