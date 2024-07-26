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
  Tooltip,
  Grid,
  LinearProgress,
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
import MultiCircle from 'src/components/Graph/MultiCircle';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { Instance } from '@popperjs/core';
import { fIndianCurrency, fNumber } from 'src/utils/formatNumber';
import ApiDataLoading from 'src/components/customFunctions/ApiDataLoading';
import CircleGraph from 'src/components/Graph/CircleGraph';

type FormValuesProps = {
  startDate: Date | null;
  endDate: Date | null;
  dateFilter: string;
};

function ServiceWiseDashBoard() {
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
    remarks: [],
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
    formState: { errors, isSubmitting },
  } = methods;

  const successStyle = {};

  useEffect(() => {
    getDashboard();
  }, [watch('dateFilter'), category.category, category.product, category.transactionType]);

  const getDashboard = async () => {
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
      remarks: [],
    });
    let token = localStorage.getItem('token');
    let body = {
      categoryId: category.category,
      productId: category.product,
      transactionType: category.transactionType,
      dateFilter: getValues('dateFilter'),
      startDate: getValues('startDate'),
      endDate: getValues('endDate'),
    };
    await Api(`apiBox/dashboard/viewCategory`, 'POST', body, token).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setIsLoading(false);
          setStatusCount(Response.data.data);
        } else {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    });
  };

  const filterDashboard = () => {};

  if (isLoading) {
    return (
      <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2} my={5}>
        <LinearProgress color={'inherit'} />
      </Stack>
    );
  }

  return (
    <Card sx={{ my: 1, p: 2 }}>
      <Scrollbar>
        <Stack mb={1}>
          <FormProvider methods={methods} onSubmit={handleSubmit(filterDashboard)}>
            <Stack direction={'row'} justifyContent={'space-between'} py={1}>
              <Stack flexDirection={'row'} gap={2}>
                <Button
                  onClick={() => setValue('dateFilter', 'today')}
                  variant={watch('dateFilter') == 'today' ? 'contained' : 'outlined'}
                >
                  Today
                </Button>
                <Button
                  onClick={() => setValue('dateFilter', 'month')}
                  variant={watch('dateFilter') == 'month' ? 'contained' : 'outlined'}
                >
                  Monthly
                </Button>
                <Button
                  onClick={() => setValue('dateFilter', 'year')}
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

      <Stack flexDirection={'row'} justifyContent={'end'} gap={1} my={0.5}>
        <Typography variant="subtitle1">
          {fNumber(statusCount.totalTransaction.count || 0)} Unit
        </Typography>
        <Stack sx={{ width: 5, bgcolor: 'warning.light', borderRadius: 1 }}></Stack>
        <Typography variant="subtitle1">
          {fIndianCurrency(statusCount.totalTransaction.amount) || '₹0'}
        </Typography>
      </Stack>
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
              backgroundColor: theme.palette.success.main,
              transition: `width ${statusCount.status.success.successPercentage / 80}s linear`,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: theme.palette.success.light,
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
              backgroundColor: theme.palette.warning.main,
              transition: `width ${statusCount.status.pending.pendingPercentage / 80}s linear ${
                statusCount.status.success.successPercentage / 80
              }s`,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: theme.palette.warning.light,
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
              backgroundColor: theme.palette.error.main,
              transition: `width ${statusCount.status.failed.failedPercentage / 80}s linear ${
                (statusCount.status.success.successPercentage +
                  statusCount.status.pending.pendingPercentage) /
                80
              }s`,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: theme.palette.error.light,
              },
            }}
          ></Stack>
        </Tooltip>
      </Stack>

      {statusCount.totalTransaction.count ? (
        <>
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
                    Failed ({statusCount.status.failed.failedPercentage + '%'}) :
                  </Typography>
                  <Typography variant="subtitle2">
                    {fIndianCurrency(statusCount.status.failed.totalAmount) || '₹0'} (
                    {statusCount.status.failed.totalCount})
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Grid>
        </>
      ) : (
        <Typography variant="subtitle1" textAlign={'center'}>
          Dashboard data not found
        </Typography>
      )}

      {statusCount.remarks.length > 0 && (
        <CircleGraph
          serviceData={statusCount.remarks?.map((item: any) => ({
            service: item.reason,
            count: item.totalCount,
          }))}
          // sx={{ width: 500 }}
        />
      )}
    </Card>
  );
}

export default ServiceWiseDashBoard;
