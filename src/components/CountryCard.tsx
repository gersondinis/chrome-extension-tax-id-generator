import { AutoMode, Done } from '@mui/icons-material';
import { Card, CardHeader, Avatar, IconButton } from '@mui/material';
import { TCountry, COUNTRY_FLAG_MAP } from 'constants/country';
import { useState } from 'react';
import { generateTaxId } from 'utils/tax-id';

export const CountryCard = ({ country, copyTimeout = 2500 }: { country: TCountry; copyTimeout?: number }) => {
  const [generatedTaxId, setGeneratedTaxId] = useState<string>(() => generateTaxId(country));
  const [copied, setCopied] = useState<number | undefined>();

  const onGenerate = async (country: TCountry) => {
    const taxId = generateTaxId(country);
    setGeneratedTaxId(taxId);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(generatedTaxId);
    setCopied((oldTimeoutId) => {
      clearTimeout(oldTimeoutId);
      return setTimeout(() => setCopied(undefined), copyTimeout);
    });
  };

  const flag = COUNTRY_FLAG_MAP[country];

  return (
    <Card key={country} onClick={onCopy} sx={{ cursor: 'pointer' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#f0f0f0' }}>{copied ? <Done fontSize='small' color='success' /> : flag}</Avatar>
        }
        action={
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onGenerate(country);
            }}
          >
            <AutoMode />
          </IconButton>
        }
        title={country}
        subheader={generatedTaxId}
      />
    </Card>
  );
};
