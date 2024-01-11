import { useEffect, useState, useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
// @mui
import {
  Grid,
  InputAdornment,
  FormControl,
  InputLabel,
  styled,
  SwitchProps,
  Switch,
} from '@mui/material';
// redux

import { Helmet } from 'react-helmet-async';
// sections

import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
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
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 62,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(32px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export default function ProductionAccess() {
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
    getProductionAccess();
  }, []);

  const getProductionAccess = () => {
    let token = localStorage.getItem('token');
    Api(`apiBox/dashboard/productionCredential`, 'GET', '', token).then((Response: any) => {
      console.log('======productionCredential response====>', Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setApiKey(Response.data.data[0]?.APIKey);
          setAccessKey(Response.data.data[0]?.accessKey);
          setSecretKey(Response.data.data[0]?.secretKey);
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
          Production Access
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
                label="API key"
                value={apiKey}
                size="small"
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
