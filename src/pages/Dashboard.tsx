import React, { useContext, useEffect, useRef, useState } from 'react';
// @mui
import {
  Typography,
  useTheme,
  Card,
  Stack,
  TextField,
  MenuItem,
  Button,
  alpha,
  Tooltip,
  Grid,
} from '@mui/material';
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
import CircleGraph from 'src/components/Graph/CircleGraph';
import { Instance } from '@popperjs/core';
import { fIndianCurrency } from 'src/utils/formatNumber';
import { fDateFormatForApi } from 'src/utils/formatTime';

type FormValuesProps = {
  startDate: Date | null;
  endDate: Date | null;
  dateFilter: string;
};

function Dashboard() {
  const positionRef = React.useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const popperRef = React.useRef<Instance>(null);
  const areaRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      popperRef.current.update();
    }
  };
  const theme = useTheme();
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
  }, [watch('dateFilter')]);

  const getDashboard = () => {
    setIsLoading(true);
    setStatusCount({
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
    let token = localStorage.getItem('token');
    let body = {
      categoryId: '',
      productId: '',
      transactionType: '',
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
    <>
      {/* <PartnerDashbord /> */}
      <>
        <Scrollbar>
          <Card sx={{ my: 2, p: 2 }}>
            <Scrollbar>
              <Stack mb={1}>
                <FormProvider methods={methods} onSubmit={handleSubmit(filterDashboard)}>
                  <Stack direction={'row'} justifyContent={'space-between'} py={1}>
                    <Stack flexDirection={'row'} gap={2}>
                      <Button
                        onClick={() => {
                          setValue('dateFilter', 'today');
                          setValue('startDate', null);
                          setValue('endDate', null);
                        }}
                        variant={watch('dateFilter') == 'today' ? 'contained' : 'outlined'}
                      >
                        Today
                      </Button>
                      <Button
                        onClick={() => {
                          setValue('dateFilter', 'month');
                          setValue('startDate', null);
                          setValue('endDate', null);
                        }}
                        variant={watch('dateFilter') == 'month' ? 'contained' : 'outlined'}
                      >
                        Monthly
                      </Button>
                      <Button
                        onClick={() => {
                          setValue('dateFilter', 'year');
                          setValue('startDate', null);
                          setValue('endDate', null);
                        }}
                        variant={watch('dateFilter') == 'year' ? 'contained' : 'outlined'}
                      >
                        Yearly
                      </Button>
                      <Button
                        onClick={() => setValue('dateFilter', 'customDate')}
                        variant={watch('dateFilter') == 'customDate' ? 'contained' : 'outlined'}
                      >
                        Custom Date
                      </Button>
                    </Stack>
                    <Stack flexDirection={'row'} gap={1}>
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
                                    width: 200,
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
                                    width: 200,
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
                  </Stack>
                </FormProvider>
              </Stack>
            </Scrollbar>
            <Stack flexDirection={'row'} gap={1}>
              <Tooltip
                title={`${statusCount.status.success.successPercentage}%`}
                placement="top"
                arrow
                PopperProps={{
                  popperRef,
                  anchorEl: {
                    getBoundingClientRect: () => {
                      return new DOMRect(
                        positionRef.current.x,
                        areaRef.current!.getBoundingClientRect().y,
                        0,
                        0
                      );
                    },
                  },
                }}
              >
                <Stack
                  ref={areaRef}
                  onMouseMove={handleMouseMove}
                  sx={{
                    height: 20,
                    width: `${statusCount.status.success.successPercentage}%`,
                    borderRadius: 7,
                    backgroundImage: `linear-gradient(to right, ${theme.palette.success.light}, ${theme.palette.success.dark})`,
                    transition: `width ${
                      statusCount.status.success.successPercentage / 80
                    }s linear`,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundImage: `linear-gradient( ${theme.palette.success.dark}, ${theme.palette.success.dark})`,
                    },
                  }}
                ></Stack>
              </Tooltip>
              <Tooltip
                title={`${statusCount.status.pending.pendingPercentage}%`}
                placement="top"
                arrow
                PopperProps={{
                  popperRef,
                  anchorEl: {
                    getBoundingClientRect: () => {
                      return new DOMRect(
                        positionRef.current.x,
                        areaRef.current!.getBoundingClientRect().y,
                        0,
                        0
                      );
                    },
                  },
                }}
              >
                <Stack
                  ref={areaRef}
                  onMouseMove={handleMouseMove}
                  sx={{
                    height: 20,
                    width: `${statusCount.status.pending.pendingPercentage}%`,
                    borderRadius: 7,
                    backgroundImage: `linear-gradient(to right, ${theme.palette.warning.light}, ${theme.palette.warning.dark})`,
                    transition: `width ${
                      statusCount.status.pending.pendingPercentage / 80
                    }s linear ${statusCount.status.success.successPercentage / 80}s`,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundImage: `linear-gradient( ${theme.palette.warning.dark}, ${theme.palette.warning.dark})`,
                    },
                  }}
                ></Stack>
              </Tooltip>
              <Tooltip
                title={`${statusCount.status.failed.failedPercentage}%`}
                placement="top"
                arrow
                PopperProps={{
                  popperRef,
                  anchorEl: {
                    getBoundingClientRect: () => {
                      return new DOMRect(
                        positionRef.current.x,
                        areaRef.current!.getBoundingClientRect().y,
                        0,
                        0
                      );
                    },
                  },
                }}
              >
                <Stack
                  ref={areaRef}
                  onMouseMove={handleMouseMove}
                  sx={{
                    height: 20,
                    width: `${statusCount.status.failed.failedPercentage}%`,
                    borderRadius: 7,
                    backgroundImage: `linear-gradient(to right, ${theme.palette.error.light}, ${theme.palette.error.dark})`,
                    transition: `width ${statusCount.status.failed.failedPercentage / 80}s linear ${
                      (statusCount.status.success.successPercentage +
                        statusCount.status.pending.pendingPercentage) /
                      80
                    }s`,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundImage: `linear-gradient( ${theme.palette.error.dark}, ${theme.palette.error.dark})`,
                    },
                  }}
                ></Stack>
              </Tooltip>
            </Stack>
            {statusCount.totalTransaction.count ? (
              <>
                {watch('dateFilter') == 'customDate' && (
                  <Stack flexDirection={'row'} gap={1}>
                    <Typography variant="caption">
                      From {fDateFormatForApi(watch('startDate'))}
                    </Typography>
                    <Typography variant="caption">
                      to {fDateFormatForApi(watch('startDate'))}
                    </Typography>
                  </Stack>
                )}
                <Grid sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} my={3}>
                  {statusCount.status.success.totalCount > 0 && (
                    <Stack flexDirection={'row'} gap={0.5} alignItems={'center'}>
                      <span
                        style={{
                          height: 10,
                          width: 10,
                          borderRadius: '50%',
                          backgroundColor: `${theme.palette.success.main}`,
                        }}
                      ></span>
                      <Stack flexDirection={'row'} gap={1}>
                        <Typography variant="subtitle2">
                          Success ({statusCount.status.success.successPercentage + '%'}) :
                        </Typography>
                        <Typography variant="subtitle2">
                          {fIndianCurrency(statusCount.status.success.totalAmount) || '₹0'} (
                          {statusCount.status.success.totalCount})
                        </Typography>
                      </Stack>
                    </Stack>
                  )}
                  {statusCount.status.pending.totalCount > 0 && (
                    <Stack flexDirection={'row'} gap={0.5} alignItems={'center'}>
                      <span
                        style={{
                          height: 10,
                          width: 10,
                          borderRadius: '50%',
                          backgroundColor: `${theme.palette.warning.main}`,
                        }}
                      ></span>
                      <Stack flexDirection={'row'} gap={1}>
                        <Typography variant="subtitle2">
                          Pending ({statusCount.status.pending.pendingPercentage + '%'}) :
                        </Typography>
                        <Typography variant="subtitle2">
                          {fIndianCurrency(statusCount.status.pending.totalAmount) || '₹0'} (
                          {statusCount.status.pending.totalCount})
                        </Typography>
                      </Stack>
                    </Stack>
                  )}
                  {statusCount.status.failed.totalCount > 0 && (
                    <Stack flexDirection={'row'} gap={0.5} alignItems={'center'}>
                      <span
                        style={{
                          height: 10,
                          width: 10,
                          borderRadius: '50%',
                          backgroundColor: `${theme.palette.error.main}`,
                        }}
                      ></span>
                      <Stack flexDirection={'row'} gap={1}>
                        <Typography variant="subtitle2">
                          Pending ({statusCount.status.failed.failedPercentage + '%'}) :
                        </Typography>
                        <Typography variant="subtitle2">
                          {fIndianCurrency(statusCount.status.failed.totalAmount) || '₹0'} (
                          {statusCount.status.failed.totalCount})
                        </Typography>
                      </Stack>
                    </Stack>
                  )}
                </Grid>{' '}
              </>
            ) : (
              <Typography variant="subtitle1" textAlign={'center'} my={3}>
                Transactions data not found
              </Typography>
            )}
            {/* <MultiCircle
              title="Transactions"
              total={statusCount.totalTransaction.amount}
              chart={{
                series: [
                  {
                    label: 'Success',
                    value: statusCount.status.success.successPercentage,
                  },
                  {
                    label: 'Pending',
                    value: statusCount.status.pending.pendingPercentage,
                  },
                  {
                    label: 'Failed',
                    value: statusCount.status.failed.failedPercentage,
                  },
                ],
              }}
            /> */}

            <CircleGraph
              title="Reason of Failure"
              chart={{
                colors: [
                  alpha(theme.palette.primary.main, 0.8),
                  alpha(theme.palette.primary.main, 0.7),
                  alpha(theme.palette.primary.main, 0.6),
                  alpha(theme.palette.primary.main, 0.5),
                ],
                series: [
                  { label: 'Reason 1', value: 12244 },
                  { label: 'Reason 2', value: 53345 },
                  { label: 'Reason 3', value: 44313 },
                ],
              }}
            />
          </Card>
        </Scrollbar>
      </>
    </>
  );
}

export default Dashboard;
