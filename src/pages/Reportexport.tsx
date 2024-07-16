import { Button, Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as Yup from 'yup';
import React, { useState } from 'react';
import DateRangePicker from 'src/components/date-range-picker/DateRangePicker';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { Api } from 'src/webservices';
import { fDateFormatForApi } from 'src/utils/formatTime';
import FormProvider from 'src/components/hook-form/FormProvider';
import { LoadingButton } from '@mui/lab';

type FormValuesProps = {
  startDate: Date | null;
  endDate: Date | null;
};

function Reportexport() {
  const { enqueueSnackbar } = useSnackbar();
  const [sdata, setSdata] = useState([]);

  const defaultValues = {
    startDate: null,
    endDate: null,
  };

  const methods = useForm<FormValuesProps, any>({
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    getValues,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = methods;

  const ExportData = () => {
    let token = localStorage.getItem('token');
    let body = {
      startDate: fDateFormatForApi(getValues('startDate')),
      endDate: fDateFormatForApi(getValues('endDate')),
    };
    Api(
      `apiBox/dashboard/getTransactionReport
 `,
      'POST',
      body,
      token
    ).then((Response: any) => {
      console.log('======TransactionReport=====>' + Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setSdata(Response.data.data.data);
          enqueueSnackbar(Response.data.message);
          console.log('======TransactionReport====>', Response);
        } else {
          console.log('======TransactionReport=======>' + Response);
        }
      }
    });
  };

  return (
    <div>
      <FormProvider methods={methods} onSubmit={handleSubmit(ExportData)}>
        <Stack direction={'row'} gap={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start date"
              inputFormat="DD/MM/YYYY"
              value={watch('startDate')}
              maxDate={new Date()}
              onChange={(newValue: any) => setValue('startDate', newValue)}
              renderInput={(params: any) => (
                <TextField {...params} size={'small'} sx={{ width: 150 }} />
              )}
            />
            <DatePicker
              label="End date"
              inputFormat="DD/MM/YYYY"
              value={watch('endDate')}
              minDate={watch('startDate')}
              maxDate={new Date()}
              onChange={(newValue: any) => setValue('endDate', newValue)}
              renderInput={(params: any) => (
                <TextField {...params} size={'small'} sx={{ width: 150 }} />
              )}
            />
          </LocalizationProvider>
          <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
            Submit
          </LoadingButton>
        </Stack>
      </FormProvider>
    </div>
  );
}

export default Reportexport;
