const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const alphanumeric = '0123456789LMNPQRSTUV';
const codeSequence = [
  { allowedChars: alphabet, length: 6 },
  { allowedChars: alphanumeric, length: 2 },
  { allowedChars: 'ABCDEHLMPRST', length: 1 },
  { allowedChars: alphanumeric, length: 2 },
  { allowedChars: alphabet, length: 1 },
  { allowedChars: alphanumeric, length: 3 },
  { allowedChars: alphabet, length: 1 },
];

export function generateCodiceFiscale() {
  return codeSequence
    .map((sequence) => {
      let code = '';
      for (let i = 0; i < sequence.length; i++) {
        code += sequence.allowedChars.charAt(
          Math.floor(Math.random() * sequence.allowedChars.length)
        );
      }
      return code;
    })
    .join('');
}
