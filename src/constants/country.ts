export const COUNTRY = {
  PT: 'PT',
  IT: 'IT',
  ES: 'ES',
  DE: 'DE',
} as const;

export const COUNTRY_FLAG_MAP = {
  [COUNTRY.PT]: '🇵🇹',
  [COUNTRY.IT]: '🇮🇹',
  [COUNTRY.ES]: '🇪🇸',
  [COUNTRY.DE]: '🇩🇪',
} satisfies Record<TCountry, string>;

export const TAX_ID_TYPE = {
  EMPLOYEE: 'EMPLOYEE',
  COMPANY: 'COMPANY',
} as const;

export const TAX_ID_TYPE_LABEL_MAP = {
  [TAX_ID_TYPE.EMPLOYEE]: 'Employee',
  [TAX_ID_TYPE.COMPANY]: 'Company',
} satisfies Record<TTaxIdType, string>;

export type TCountry = (typeof COUNTRY)[keyof typeof COUNTRY];
export type TTaxIdType = (typeof TAX_ID_TYPE)[keyof typeof TAX_ID_TYPE];
export const countries = Object.values(COUNTRY);
export const taxIdTypes = Object.values(TAX_ID_TYPE);
