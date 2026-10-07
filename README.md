# TaxID Generator
![image](https://github.com/gersondinis/chrome-extension-tax-id-generator/assets/10350627/79c78ced-aa71-4a63-9c9e-2df07e31e0ef)

[Chrome extension](https://chromewebstore.google.com/detail/fhinhgicbbfififkdakanlfhgbibllgn)

A Chrome extension popup that generates **checksum-valid tax IDs** for mock data and QA. It covers Portugal, Italy, Spain and Germany, with one card for an employee ID and one for a company ID in each country.

The numbers pass the format and check-digit rules, so they get through form and API validation. They are random, not registered with any tax authority, so don't use them for anything official.

## How to use it

Open the extension popup. You get eight cards, two per country, with the pair for each country next to each other:

| Country | Employee card | Company card |
|---|---|---|
| 🇵🇹 Portugal | NIF starting with `1` | NIF starting with `5` |
| 🇮🇹 Italy | Codice Fiscale | Partita IVA |
| 🇪🇸 Spain | DNI | CIF |
| 🇩🇪 Germany | Steuer-IdNr | Steuernummer |

- **Click the card** to copy its tax ID to the clipboard. The flag turns into a check mark for 2.5 seconds.
- **Click the generate button** (the icon on the right) to get a new ID for that card only.
- Each card generates an ID when the popup opens.

## What each generator produces

All generators live in `src/utils`.

| Card | File | Format | Rules applied |
|---|---|---|---|
| PT Employee / Company | `nif.ts` | 9 digits | Starts with `1` (person) or `5` (company), with a mod 11 check digit. The generator also accepts `2` and `3` for other personal prefixes. |
| IT Employee | `codice-fiscale.ts` | 16 characters, e.g. `RCVQNH96S01F205V` | 6 consonants, birth year, month letter (`ABCDEHLMPRST`), day (1–28), a real municipality code, and the standard odd/even check character. |
| IT Company | `partita-iva.ts` | 11 digits | 7-digit company number, a tax office code from `001` to `100`, and a Luhn check digit. |
| ES Employee | `dni.ts` | 8 digits + letter | The letter is the number mod 23 looked up in `TRWAGMYFPDXBNJZSQVHLCKE`. |
| ES Company | `cif.ts` | `A` or `B` + 8 digits | Province code `01`–`52` and a Luhn-style control digit. Only company types that use a digit as the control character are generated. |
| DE Employee | `steuer-id.ts` | 11 digits | No leading zero. In the first 10 digits exactly one digit appears twice and the rest are distinct. The last digit is the ISO 7064 MOD 11,10 check digit. |
| DE Company | `steuernummer.ts` | 11 digits | No leading zero. Random digits. Real Steuernummern are 10–11 digits and vary by state, so this is a plausible number rather than a state-specific one. |

## How the code is organised

```
src/
├── main.tsx                  React entry point
├── App.tsx                   Renders one CountryCard per country × tax ID type
├── components/
│   └── CountryCard.tsx       One card: shows the ID, copy on click, regenerate button
├── constants/
│   └── country.ts            COUNTRY, TAX_ID_TYPE, flags and labels
└── utils/
    ├── tax-id.ts             generateTaxId(country, type) → picks the generator
    └── *.ts                  One generator per ID (see table above)
```

- `App.tsx` loops over `countries` and `taxIdTypes` from `constants/country.ts`, so cards for a country always render together.
- `generateTaxId(country, type)` in `src/utils/tax-id.ts` is a lookup table typed as `Record<TCountry, Record<TTaxIdType, () => string>>`. A country or type without a generator won't compile.

## Adding a country or an ID type

1. Add the country to `COUNTRY` and `COUNTRY_FLAG_MAP` in `src/constants/country.ts`. TypeScript flags the flag map if you forget it.
2. Write a generator in `src/utils`. It takes no arguments and returns a string.
3. Add it under the country in the lookup table in `src/utils/tax-id.ts`.

The card list in `App.tsx` picks up the new entry without any other change. A new ID type (for example a third card per country) goes into `TAX_ID_TYPE` and `TAX_ID_TYPE_LABEL_MAP`, and every country then needs a generator for it.

## Development

The project uses React, MUI and Vite, with Yarn as the package manager.

```bash
yarn install
yarn dev               # run the popup UI locally with hot reload
yarn build             # type-check and build for GitHub Pages (absolute /chrome-extension-tax-id-generator/ paths)
yarn build:extension   # type-check and build for Chrome (relative ./ paths)
yarn lint
```

The two builds differ only in the asset base path. GitHub Pages serves the site from `/chrome-extension-tax-id-generator/`, while inside a Chrome extension assets must be relative, or the popup is blank. Always use `yarn build:extension` for anything you load into Chrome or upload to the Web Store.

To try the extension in Chrome, run `yarn build:extension`, open `chrome://extensions`, enable Developer mode, choose **Load unpacked**, and select the `dist` folder. The popup is `index.html`, and `public/manifest.json` is the Manifest V3 config. The extension requests no permissions.

## Publishing

**GitHub Pages** is automatic. A push to `master` runs `.github/workflows/deploy.yml`, which runs `yarn build` and deploys `dist/` to Pages. It needs **Settings → Pages → Source: GitHub Actions** to be set once in the repo.

**Chrome Web Store** is manual. Pages and the Web Store are independent, so pushing to `master` does not update the extension.

1. Bump `version` in `public/manifest.json`. The Web Store rejects an upload whose version is not higher than the published one.
2. Run `yarn build:extension`, then zip the contents of `dist/` so that `manifest.json` is at the zip root: `cd dist && zip -r ../extension.zip .`
3. Open the [Chrome Web Store developer dashboard](https://chrome.google.com/webstore/devconsole), open this extension, go to **Package → Upload new package**, and upload the zip.
4. Update the store listing text if needed, then submit for review.
