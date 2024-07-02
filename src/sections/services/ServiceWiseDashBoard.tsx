import { useContext, useEffect, useRef, useState } from 'react';
// @mui
import { Typography, useTheme, Card, Stack, TextField, MenuItem, Button } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import LinearGraph from 'src/components/Graph/LinearGraph';
import { Api } from 'src/webservices';
import { CategoryContext } from 'src/pages/Services';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import * as Yup from 'yup';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import MultiCircle from 'src/components/Graph/MultiCircle';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';

type FormValuesProps = {
  startDate: Date | null;
  endDate: Date | null;
  dateFilter: string;
};

function ServiceWiseDashBoard() {
  const theme = useTheme();
  const category: any = useContext(CategoryContext);
  const [isLoading, setIsLoading] = useState(false);
  const [statusCount, setStatusCount] = useState({
    totalTransaction: {
      count: 0,
      amount: 0,
    },
    status: {
      success: {
        totalCount: 0,
        totalAmount: 0,
        successPercentage: 0,
      },
      pending: {
        totalCount: 0,
        totalAmount: 0,
        pendingPercentage: 0,
      },
      failed: {
        totalCount: 0,
        totalAmount: 0,
        failedPercentage: 0,
      },
    },
  });
  const defaultValues = {
    startDate: null,
    endDate: null,
    dateFilter: 'today',
  };

  const txnSchema = Yup.object().shape({
    startDate: Yup.date()
      .typeError('please enter a valid date')
      .required('Please select Date')
      .max(dayjs(new Date()), 'Please enter valid date'),
    endDate: Yup.date()
      .typeError('please enter a valid date')
      .required('Please select Date')
      .min(Yup.ref('startDate'), "End date can't be before Start date")
      .max(dayjs(new Date()), 'Please enter valid date'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(txnSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  const {
    watch,
    setValue,
    getValues,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    getDashboard();
  }, [watch('dateFilter'), category.category, category.product, category.transactionType]);

  const getDashboard = () => {
    setIsLoading(true);
    let token = localStorage.getItem('token');
    let body = {
      categoryId: category.category,
      productId: category.product,
      transactionType: category.transactionType,
      dateFilter: getValues('dateFilter'),
      startDate: getValues('startDate'),
      endDate: getValues('endDate'),
    };
    Api(`apiBox/dashboard/viewCategory`, 'POST', body, token).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setStatusCount(Response.data.data);
        }
      }
      setIsLoading(false);
    });
  };

  const filterDashboard = () => {};

  return (
    <Scrollbar>
      <Card sx={{ my: 2, p: 2 }}>
        <Scrollbar>
          <Stack mb={1}>
            <FormProvider methods={methods} onSubmit={handleSubmit(filterDashboard)}>
              <Stack direction={'row'} gap={1} py={1}>
                <RHFSelect
                  name="dateFilter"
                  label="Select By"
                  size="small"
                  SelectProps={{
                    native: false,
                    sx: { textTransform: 'capitalize', maxWidth: 225 },
                  }}
                >
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="month">Monthly</MenuItem>
                  <MenuItem value="year">Yearly</MenuItem>
                  <MenuItem value="customDate">Date Filter</MenuItem>
                </RHFSelect>
                {watch('dateFilter') == 'customDate' && (
                  <>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Start date"
                        inputFormat="DD/MM/YYYY"
                        value={watch('startDate')}
                        maxDate={new Date()}
                        onChange={(newValue: any) => setValue('startDate', newValue)}
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            size={'small'}
                            sx={{
                              width: 400,
                              '& .css-d58xje-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled':
                                {
                                  '-webkit-text-fill-color': '#000000',
                                },
                            }}
                            disabled
                          />
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
                          <TextField
                            {...params}
                            size={'small'}
                            sx={{
                              width: 400,
                              '& .css-d58xje-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled':
                                {
                                  '-webkit-text-fill-color': '#000000',
                                },
                            }}
                            disabled
                          />
                        )}
                      />
                    </LocalizationProvider>
                    <Stack flexDirection={'row'} alignItems={'start'} gap={1}>
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={() => {
                          setValue('dateFilter', 'customDate');
                          getDashboard();
                        }}
                      >
                        Search
                      </Button>
                      <Button
                        type="submit"
                        variant="outlined"
                        onClick={() => {
                          setValue('startDate', null);
                          setValue('endDate', null);
                        }}
                      >
                        Clear
                      </Button>
                    </Stack>
                  </>
                )}
              </Stack>
            </FormProvider>
          </Stack>
        </Scrollbar>
        {!isLoading && (
          <>
            {statusCount.totalTransaction.count ? (
              <>
                <Stack flexDirection={{ md: 'row' }} gap={2}>
                  <Stack sx={{ flexBasis: '30%' }}>
                    <MultiCircle
                      title="Transactions"
                      total={statusCount.totalTransaction.amount}
                      chart={{
                        series: [
                          { label: 'Success', value: statusCount.status.success.successPercentage },
                          { label: 'Pending', value: statusCount.status.pending.pendingPercentage },
                          { label: 'Failed', value: statusCount.status.failed.failedPercentage },
                        ],
                      }}
                    />
                  </Stack>
                  <Stack sx={{ flexBasis: '70%' }}>
                    <LinearGraph
                      title="Transaction Count"
                      data={[
                        {
                          status: 'Success',
                          quantity: statusCount.status.success.totalCount,
                          value: statusCount.status.success.successPercentage,
                        },
                        {
                          status: 'Pending',
                          quantity: statusCount.status.pending.totalCount,
                          value: statusCount.status.pending.pendingPercentage,
                        },
                        {
                          status: 'Failed',
                          quantity: statusCount.status.failed.totalCount,
                          value: statusCount.status.failed.failedPercentage,
                        },
                      ]}
                    />
                  </Stack>
                </Stack>
              </>
            ) : (
              <Typography textAlign={'center'} variant="subtitle1" my={5}>
                Transactions Not found
              </Typography>
            )}{' '}
          </>
        )}
      </Card>
    </Scrollbar>
  );
}

export default ServiceWiseDashBoard;
