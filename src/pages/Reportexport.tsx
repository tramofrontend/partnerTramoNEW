import { Button, Stack, TableBody, TextField } from '@mui/material';
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
import ApiDataLoading from 'src/components/customFunctions/ApiDataLoading';
import AWS from 'aws-sdk';

type FormValuesProps = {
  startDate: Date | null;
  endDate: Date | null;
};

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'ap-south-1',
});

function Reportexport() {
  const { enqueueSnackbar } = useSnackbar();
  const [sdata, setSdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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


  const DownloadReport = (val: string) => {
    console.log(process.env);

    const s3 = new AWS.S3();
    const params = {
      Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
      Key: val !== '' && val?.split('/').splice(4, 4).join('/'),
      Expires: 600,
    };

    console.log('test url', params);
    s3.getSignedUrl('getObject', params, (err, url) => {
      window.open(url);
    });
  };

  if (isLoading) {
    return <ApiDataLoading />;
  }


  function fDateFormatForApi(date:any) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}/${month}/${day}`;
}

const startDate = fDateFormatForApi(getValues('startDate'));
const endDate = fDateFormatForApi(getValues('endDate'));

  const ExportData = () => {
    let token = localStorage.getItem('token');
    let body = {
      startDate: startDate,
      endDate: endDate
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
          enqueueSnackbar(Response.data.status);
          DownloadReport(Response.data.filePath)
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
              inputFormat="YYYY/MM/DD"
              value={watch('startDate')}
              maxDate={new Date()}
              onChange={(newValue: any) => setValue('startDate', newValue)}
              renderInput={(params: any) => (
                <TextField {...params} size={'small'} sx={{ width: 150 }} />
              )}
            />
            <DatePicker
              label="End date"
              inputFormat="YYYY/MM/DD"
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
