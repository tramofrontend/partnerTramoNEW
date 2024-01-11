import { useEffect, useState, useCallback } from 'react';

// @mui
import { Grid, InputAdornment, FormControl, InputLabel } from '@mui/material';
// redux

import { Helmet } from 'react-helmet-async';
// sections

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { _allProducts, _ecommerceBestSalesman } from 'src/_mock/arrays';

import { useSnackbar } from 'src/components/snackbar';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Box,
  Table,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  CardProps,
  CardHeader,
  Typography,
  TableContainer,
} from '@mui/material';
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import React from 'react';

import { Api } from 'src/webservices';
import { ReadStream } from 'fs';

import useCopyToClipboard from 'src/hooks/useCopyToClipboard';
import { responsiveFontSizes } from 'src/theme/typography';

// import { Label } from '@mui/icons-material';

// ----------------------------------------------------------------------
type FormValuesProps = {
  MDBankAccount: string;
  DBankAccount: string;
  ABankAccount: string;
};

export default function UatCredential() {
  const { enqueueSnackbar } = useSnackbar();
  const { copy } = useCopyToClipboard();
  const [apiKey, setApiKey] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const FilterSchema = Yup.object().shape({});
  const defaultValues = {
    MDBankAccount: '',
    DBankAccount: '',
    ABankAccount: '',
  };
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(FilterSchema),
    defaultValues,
  });
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const [showPassword1, setShowPassword1] = React.useState(false);

  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onCopy = (text: string) => {
    if (text) {
      enqueueSnackbar('Copied!');
      copy(text);
    }
  };

  useEffect(() => {
    apiUsers();
  }, []);

  const apiUsers = () => {
    let token = localStorage.getItem('token');
    Api(`apiBox/list_API_users`, 'GET', '', token).then((Response: any) => {
      console.log('======productionCredential response====>', Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          console.log('======productionCredential code 200====>', Response.data.data[0].setting);
        } else {
          console.log('======productionCredential=======>' + Response);
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>View Update Bank Detail | Tramo</title>
      </Helmet>
      <Box sx={{ m: 2 }}>
        <Typography ml={1} mb={3} variant="h4">
          {' '}
          UAT Credentials
        </Typography>
        <FormProvider methods={methods}>
          <Grid
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(1, 0.5fr)',
            }}
          >
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">API key</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={'text'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => onCopy(apiKey)}>
                      <Iconify icon="eva:copy-fill" width={24} />
                    </IconButton>
                  </InputAdornment>
                }
                size="small"
                label="API key"
                value={apiKey}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Access key</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword1 ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword1}
                      onMouseDown={handleMouseDownPassword1}
                      edge="end"
                      sx={{ mr: 1 }}
                    >
                      {showPassword1 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    <IconButton onClick={() => onCopy(accessKey)}>
                      <Iconify icon="eva:copy-fill" width={24} />
                    </IconButton>
                  </InputAdornment>
                }
                size="small"
                label="Access key"
                value={accessKey}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Secret key</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ mr: 1 }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    <IconButton onClick={() => onCopy(secretKey)}>
                      <Iconify icon="eva:copy-fill" width={24} />
                    </IconButton>
                  </InputAdornment>
                }
                size="small"
                label="Secret key"
                value={secretKey}
              />
            </FormControl>
          </Grid>
        </FormProvider>
      </Box>
    </>
  );
}
