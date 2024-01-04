function formatNumberLength(num: number, length: number) {
  let r = "" + num;
  while ( r.length < length ) {
    r = "0" + r;
  }
  return r;
}

function charDNI(dni: string) {
  const chain = "TRWAGMYFPDXBNJZSQVHLCKET";
  const pos = Number(dni) % 23;
  return chain.substring( pos, pos + 1 );
}

export function generateDNI() {
  const num = Math.floor( ( Math.random() * 100000000 ) );
  const sNum = formatNumberLength( num, 8 );
  return sNum + charDNI( sNum );
}