import { useEffect, useState, useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
// @mui
import {
  Container,
  Card,
  Stack,
  Grid,
  InputAdornment,
  Tabs,
  Button,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Modal,
  FormControlLabel,
  styled,
  SwitchProps,
  Checkbox,
  Switch,
} from '@mui/material';
// redux

// routes

import { Helmet } from 'react-helmet-async';
// sections
import { Icon } from '@iconify/react';
import { _allProducts, _ecommerceBestSalesman } from 'src/_mock/arrays';

import { useSnackbar } from 'src/components/snackbar';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Upload } from 'src/components/upload';

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

export default function MyActiveServices() {
  const [value, setValue] = React.useState('one');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [services, setServices] = useState([]);

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

  useEffect(() => {
    activeServices();
  }, []);

  const activeServices = () => {
    let token = localStorage.getItem('token');
    Api(`apiBox/dashboard/getActiveServices`, 'GET', '', token).then((Response: any) => {
      console.log('======Set_Limit==response=====>' + Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          if (Response.data.data) {
            setServices(Response.data.data);
          }
          console.log('======Set_Limit_code_200=======>' + Response.data.data);
        } else {
          console.log('======Set_Limit_error=======>' + Response);
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>My Active Services | Tramo</title>
      </Helmet>
      <Box sx={{ ml: 3, mt: 1 }}>
        <Typography variant="h4" style={{ textDecoration: 'underline' }}>
          My Active Services
        </Typography>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(1, 0.5fr)',
          }}
          mt={3}
          mr={2}
        >
          <Stack flexDirection={'row'} justifyContent={'space-between'}>
            <Stack>
              <Typography variant="h5" textTransform={'capitalize'}>
                Category
              </Typography>
            </Stack>
            <Typography variant="h5" textTransform={'capitalize'}>
              Status
            </Typography>
          </Stack>
          {services.map((item: any, index: any) => {
            return (
              <Stack
                flexDirection={'row'}
                justifyContent={'space-between'}
                key={index}
                sx={{ borderBottom: '1px solid #ee802238' }}
              >
                <Stack>
                  <Typography variant="subtitle2" textTransform={'capitalize'}>
                    {item}
                  </Typography>
                </Stack>
                <Stack gap={1} mr={4}>
                  <Icon icon="ic:round-done" color="#EE8022" fontSize={20} />
                </Stack>
              </Stack>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
