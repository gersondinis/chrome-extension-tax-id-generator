import { generateDNI } from 'utils/dni';
import { generateNIF } from './nif';
import { TCountry, TTaxIdType, COUNTRY, TAX_ID_TYPE } from 'constants/country';
import { generatePartitaIVA } from 'utils/partita-iva';
import { generateCodiceFiscale } from 'utils/codice-fiscale';
import { generateCIF } from 'utils/cif';
import { generateSteuerId } from 'utils/steuer-id';
import { generateSteuernummer } from 'utils/steuernummer';

const generators = {
  [COUNTRY.PT]: {
    [TAX_ID_TYPE.EMPLOYEE]: () => generateNIF('1'),
    [TAX_ID_TYPE.COMPANY]: () => generateNIF('5'),
  },
  [COUNTRY.IT]: {
    [TAX_ID_TYPE.EMPLOYEE]: generateCodiceFiscale,
    [TAX_ID_TYPE.COMPANY]: generatePartitaIVA,
  },
  [COUNTRY.ES]: {
    [TAX_ID_TYPE.EMPLOYEE]: generateDNI,
    [TAX_ID_TYPE.COMPANY]: generateCIF,
  },
  [COUNTRY.DE]: {
    [TAX_ID_TYPE.EMPLOYEE]: generateSteuerId,
    [TAX_ID_TYPE.COMPANY]: generateSteuernummer,
  },
} satisfies Record<TCountry, Record<TTaxIdType, () => string>>;

export const generateTaxId = (country: TCountry, type: TTaxIdType) => generators[country][type]();
