import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { _ecommerceBestSalesman } from 'src/_mock/arrays';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  MenuItem,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import FormProvider, {
  RHFTextField,
  RHFCodes,
  RHFSelect,
  RHFSecureCodes,
} from 'src/components/hook-form';


const SettlementToMainWallet = () => {

  return (
  <Stack>
    <Typography>
    <Skeleton variant="text" width={400} sx={{ fontSize: '1.5rem' }} />
    </Typography>
    <Typography>
    <Skeleton variant="text" width={150} sx={{ fontSize: '3rem' }} />
    </Typography>
    <Typography>
    <Skeleton variant="text" width={20} sx={{ fontSize: '2rem' }} />
    </Typography>
    <Typography>
    <Skeleton variant="text" width={200} sx={{ fontSize: '3rem' }} />
    </Typography>
    <Typography>
    <Skeleton variant="text" width={150} sx={{ fontSize: '2rem' }} />
    </Typography>
  </Stack>
  );
};
