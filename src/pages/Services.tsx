//form
import FormProvider, { RHFRadioGroup, RHFSelect, RHFTextField } from '../components/hook-form';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
//mui
import { Button, Stack } from '@mui/material';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { Api } from 'src/webservices';

type FormValuesProps = {
  transactionLabel: string;
  transactionValue: any;
};

export default function Services() {
  const [filters, setFilters] = useState([
    { label: 'UPI varification', value: { transactionType: 'test' } },
    { label: 'UPI transactions', value: { transactionType: 'test' } },
  ]);

  const txnSchema = Yup.object().shape({});
  const defaultValues = {
    transactionLabel: '',
    transactionValue: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(txnSchema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    getActiveCategory();
  }, []);

  useEffect(() => {
    console.log('transactionValue', watch('transactionValue'));
  }, [watch('transactionValue')]);

  const getActiveCategory = () => {
    let token = localStorage.getItem('token');
    Api(`apiBox/dashboard/getActiveServices`, 'GET', '', token).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          Response.data.data.map((item: any) => {
            setFilters((prevState) => [
              { label: item, value: { transactionType: item } },
              ...prevState,
            ]);
          });
          setValue('transactionLabel', Response.data.data[Response.data.data.length - 1]);
          setValue('transactionValue', Response.data.data[Response.data.data.length - 1]);
        }
      }
    });
  };

  const onSubmit = (data: FormValuesProps) => {
    console.log('data', data);
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Scrollbar sx={{ width: '100%', p: 1 }}>
          <Stack sx={{ flexWrap: 'nowrap' }} direction={'row'} gap={1}>
            {filters.map((item: any) => (
              <Button
                key={item.label}
                variant={watch('transactionLabel') == item.label ? 'contained' : 'outlined'}
                onClick={() => {
                  setValue('transactionLabel', item.label);
                  setValue('transactionValue', item.value);
                }}
                sx={{ whiteSpace: 'nowrap' }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Scrollbar>
      </FormProvider>
    </>
  );
}
