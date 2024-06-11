import { useEffect, useState, useCallback } from 'react';
// @mui
import { Stack, styled, SwitchProps, Switch, Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
// sections
import { Icon } from '@iconify/react';
import { _allProducts, _ecommerceBestSalesman } from 'src/_mock/arrays';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Api } from 'src/webservices';
import ApiDataLoading from 'src/components/customFunctions/ApiDataLoading';

// import { Label } from '@mui/icons-material';

// ----------------------------------------------------------------------
type FormValuesProps = {
  MDBankAccount: string;
  DBankAccount: string;
  ABankAccount: string;
};

export default function MyActiveServices() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    let token = localStorage.getItem('token');
    Api(`apiBox/dashboard/getActiveServices`, 'GET', '', token).then((Response: any) => {
      console.log('======Set_Limit==response=====>' + Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          if (Response.data.data) {
            setServices(Response.data.data);
            setIsLoading(false);
          }
          console.log('======Set_Limit_code_200=======>' + Response.data.data);
        } else {
          console.log('======Set_Limit_error=======>' + Response);
          setIsLoading(false);
        }
        setIsLoading(false);
      }
    });
  };

  if (isLoading) {
    return <ApiDataLoading />;
  }

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
