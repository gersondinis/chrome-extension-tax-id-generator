import { CountryCard } from 'components/CountryCard';
import { Stack } from '@mui/material';
import { countries } from 'constants/country';

export const App = () => {
  return (
    <Stack gap={1} sx={{minWidth: '20rem', maxWidth: '25rem'}}>
      {countries.map((country) => (
        <CountryCard country={country} key={country} />
      ))}
    </Stack>
  );
};
