import { generateDNI } from 'utils/dni';
import { generateCodiceFiscale } from './codice-fiscale';
import { generateNIF } from './nif';
import { TCountry, COUNTRY } from 'constants/country';

export const generateTaxId = (country: TCountry) => {
  switch (country) {
    case COUNTRY.PT:
      return generateNIF();
    case COUNTRY.IT:
      return generateCodiceFiscale();
    case COUNTRY.ES:
      return generateDNI();
    default:
      throw new Error('Country not supported');
  }
};
