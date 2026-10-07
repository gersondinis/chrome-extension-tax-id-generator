import { CountryCard } from 'components/CountryCard';
import { Stack } from '@mui/material';
import { countries, taxIdTypes } from 'constants/country';

export const App = () => {
  return (
    <Stack gap={1} sx={{minWidth: '20rem', maxWidth: '25rem'}}>
      {countries.flatMap((country) =>
        taxIdTypes.map((type) => <CountryCard country={country} type={type} key={`${country}-${type}`} />)
      )}
    </Stack>
  );
};
