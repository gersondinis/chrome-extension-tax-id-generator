import { generateDNI } from 'utils/dni';
import { generateNIF } from './nif';
import { TCountry, COUNTRY } from 'constants/country';
import { generatePartitaIVA } from 'utils/partita-iva';

export const generateTaxId = (country: TCountry) => {
  switch (country) {
    case COUNTRY.PT:
      return generateNIF();
    case COUNTRY.IT:
      return generatePartitaIVA();
    case COUNTRY.ES:
      return generateDNI();
    default:
      throw new Error('Country not supported');
  }
};
