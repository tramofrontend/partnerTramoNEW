import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
// @mui
import {
  Stack,
  Grid,
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  styled,
  SwitchProps,
  Switch,
  Box,
  TableRow,
  Typography,
  TextField,
} from '@mui/material';

import { Helmet } from 'react-helmet-async';

import { _allProducts, _ecommerceBestSalesman } from 'src/_mock/arrays';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import IconButton from '@mui/material/IconButton';
import { Api } from 'src/webservices';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';

// import { Label } from '@mui/icons-material';

// ----------------------------------------------------------------------
type FormValuesProps = {
  MDBankAccount: string;
  DBankAccount: string;
  ABankAccount: string;
};
// admin / adminDetails;

export default function MyWhilelistedIp() {
  const { enqueueSnackbar } = useSnackbar();
  const [ip, setIP] = React.useState('');
  const [edit, setEdit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    getProductionAccess();
  }, []);

  const getProductionAccess = () => {
    let token = localStorage.getItem('token');
    Api(`apiBox/dashboard/productionCredential`, 'GET', '', token).then((Response: any) => {
      console.log('======productionCredential response====>', Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setIP(Response?.data?.data[0]?.myIp);

          console.log(' my Ip>>>>>>>>>>>>>>>>>>>>>>>', Response);

          console.log('======productionCredential code 200====>', Response.data.data[0].setting);
        } else {
          console.log('======productionCredential=======>' + Response);
        }
      }
    });
  };

  const setProductionIp = () => {
    setLoading(true);
    let token = localStorage.getItem('token');
    let body = {
      myIp: ip,
    };
    Api(`apiBox/dashboard/set_my_ip`, 'POST', body, token).then((Response: any) => {
      console.log('======productionCredential response====>', Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          enqueueSnackbar(Response?.data?.message);
          setEdit(false);
          console.log('======productionCredential code 200====>', Response.data.data);
        } else {
          enqueueSnackbar(Response?.data?.message);
          console.log('======productionCredential=======>' + Response);
        }
        setLoading(false);
      } else {
        enqueueSnackbar('Failed');
        setLoading(true);
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>View Update Bank Detail | Tramo</title>
      </Helmet>
      <Grid
        rowGap={1}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(1, 0.3fr)',
        }}
      >
        <Box>
          <Typography variant="h4">Production IP</Typography>
          <Stack flexDirection={'row'} gap={3} marginTop={3}>
            <TextField
              value={ip}
              onChange={(e) => setIP(e.target.value)}
              disabled={!edit}
              variant={edit ? 'outlined' : 'filled'}
              label="Production IP"
              size="small"
            />

            <Stack>
              {edit ? (
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  size="large"
                  onClick={setProductionIp}
                >
                  Save
                </LoadingButton>
              ) : (
                <Button variant="contained" size="large" onClick={() => setEdit(true)}>
                  Edit
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
      </Grid>
    </>
  );
}
