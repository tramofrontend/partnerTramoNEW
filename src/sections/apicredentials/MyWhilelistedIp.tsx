import React from 'react';
import { useEffect, useState, useCallback } from 'react';

// @mui
import { Stack, Grid, Button, Box, Typography, TextField } from '@mui/material';

import { Helmet } from 'react-helmet-async';

import { _allProducts, _ecommerceBestSalesman } from 'src/_mock/arrays';
import * as Yup from 'yup';

import { Api } from 'src/webservices';

import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { WhilekistedipSkeleton } from 'src/components/Skeletons/WhilekistedipSkeleton';

// ----------------------------------------------------------------------
type FormValuesProps = {
  MDBankAccount: string;
  DBankAccount: string;
  ABankAccount: string;
};

export default function MyWhilelistedIp() {
  const { enqueueSnackbar } = useSnackbar();
  const [ip, setIP] = React.useState('');
  const [edit, setEdit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
 

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
          setIsLoading(false)
          console.log('======productionCredential code 200====>', Response.data.data[0].setting);
        } else {
          console.log('======productionCredential=======>' + Response);
          setIsLoading(false)
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
  if (isLoading) {
    return <WhilekistedipSkeleton />;
  }

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
