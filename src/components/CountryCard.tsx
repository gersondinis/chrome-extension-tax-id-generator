import { AutoMode, Done } from '@mui/icons-material';
import { Card, CardHeader, Avatar, IconButton } from '@mui/material';
import { TCountry, TTaxIdType, COUNTRY_FLAG_MAP, TAX_ID_TYPE_LABEL_MAP } from 'constants/country';
import { useState } from 'react';
import { generateTaxId } from 'utils/tax-id';

export const CountryCard = ({
  country,
  type,
  copyTimeout = 2500,
}: {
  country: TCountry;
  type: TTaxIdType;
  copyTimeout?: number;
}) => {
  const [generatedTaxId, setGeneratedTaxId] = useState<string>(() => generateTaxId(country, type));
  const [copied, setCopied] = useState<number | undefined>();

  const onGenerate = () => {
    setGeneratedTaxId(generateTaxId(country, type));
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
    <Card onClick={onCopy} sx={{ cursor: 'pointer' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#f0f0f0' }}>{copied ? <Done fontSize='small' color='success' /> : flag}</Avatar>
        }
        action={
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onGenerate();
            }}
          >
            <AutoMode />
          </IconButton>
        }
        title={`${country} · ${TAX_ID_TYPE_LABEL_MAP[type]}`}
        subheader={generatedTaxId}
      />
    </Card>
  );
};
