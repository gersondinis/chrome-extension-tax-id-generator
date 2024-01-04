export const COUNTRY = {
  PT: 'PT',
  IT: 'IT',
  ES: 'ES',
} as const;

export const COUNTRY_FLAG_MAP = {
  [COUNTRY.PT]: '🇵🇹',
  [COUNTRY.IT]: '🇮🇹',
  [COUNTRY.ES]: '🇪🇸',
} satisfies Record<TCountry, string>;

export type TCountry = (typeof COUNTRY)[keyof typeof COUNTRY];
export const countries = Object.values(COUNTRY);
