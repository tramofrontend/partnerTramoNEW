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
import { Api } from 'src/webservices';
import { CategoryContext } from 'src/pages/Services';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import * as Yup from 'yup';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import CircleGraph from 'src/components/Graph/CircleGraph';
import { Instance } from '@popperjs/core';
import { fIndianCurrency, fNumber } from 'src/utils/formatNumber';
import { fDateFormatForApi } from 'src/utils/formatTime';
import Chart from 'src/components/chart';

type FormValuesProps = {
  startDate: Date | null;
  endDate: Date | null;
  dateFilter: string;
};

type DashboardProps = {
  label: string;
  totalPercentage: number;
  count: number;
  amount: number;
  color: string[];
};

type CategoryProps = {
  categoryName: string;
  percentage: number;
  totalCount: number;
  totalAmount: number;
  color: string[];
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
  const [dashboardData, setDashboardData] = useState<DashboardProps[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryProps[]>([]);

  const [statusCount, setStatusCount] = useState({
    totalTransaction: {
      count: 0,
      amount: 0,
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
    resetField,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    getDashboard();
  }, [watch('dateFilter')]);

  const getDashboard = () => {
    setIsLoading(true);
    setDashboardData([
      {
        label: 'Success',
        totalPercentage: 0,
        count: 0,
        amount: 0,
        color: [theme.palette.success.light, theme.palette.success.main],
      },
      {
        label: 'Pending',
        totalPercentage: 0,
        count: 0,
        amount: 0,
        color: [theme.palette.warning.light, theme.palette.warning.main],
      },
      {
        label: 'Failed',
        totalPercentage: 0,
        count: 0,
        amount: 0,
        color: [theme.palette.error.light, theme.palette.error.main],
      },
    ]);
    setStatusCount({
      totalTransaction: {
        count: 0,
        amount: 0,
      },
      remarks: [],
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
          setDashboardData([
            {
              label: 'Success',
              totalPercentage: Response.data.data.status.success.successPercentage,
              count: Response.data.data.status.success.totalCount,
              amount: Response.data.data.status.success.totalAmount,
              color: [theme.palette.success.light, theme.palette.success.main],
            },
            {
              label: 'Pending',
              totalPercentage: Response.data.data.status.pending.pendingPercentage,
              count: Response.data.data.status.pending.totalCount,
              amount: Response.data.data.status.pending.totalAmount,
              color: [theme.palette.warning.light, theme.palette.warning.main],
            },
            {
              label: 'Failed',
              totalPercentage: Response.data.data.status.failed.failedPercentage,
              count: Response.data.data.status.failed.totalCount,
              amount: Response.data.data.status.failed.totalAmount,
              color: [theme.palette.error.light, theme.palette.error.main],
            },
          ]);
          const categoryData: CategoryProps[] = [];
          for (let x in Response.data.data.category) {
            Response.data.data.category[x].totalAmount &&
              categoryData.push(Response.data.data.category[x]);
          }
          setCategoryData(categoryData);
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
            <Stack flexDirection={'row'} justifyContent={'end'} gap={1} my={0.5}>
              <Typography variant="subtitle1">
                {fNumber(statusCount.totalTransaction.count)} Unit
              </Typography>
              <Stack sx={{ width: 5, bgcolor: 'warning.light', borderRadius: 1 }}></Stack>
              <Typography variant="subtitle1">
                {fIndianCurrency(statusCount.totalTransaction.amount)}
              </Typography>
            </Stack>
            <Stack flexDirection={'row'}>
              {dashboardData.map((item: DashboardProps, index: number) => {
                return (
                  <Tooltip
                    key={item.label}
                    title={`${item.totalPercentage}%`}
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
                        width: `${item.totalPercentage}%`,
                        borderRadius: 7,
                        backgroundImage: `linear-gradient(to right, ${item.color[0]}, ${item.color[1]})`,
                        transition: `width ${item.totalPercentage / 80}s linear ${
                          index == 1
                            ? dashboardData[0].totalPercentage / 80
                            : index == 2
                            ? (dashboardData[0].totalPercentage +
                                dashboardData[1].totalPercentage) /
                              80
                            : 0
                        }s`,
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundImage: `linear-gradient( ${item.color[1]}, ${item.color[1]})`,
                        },
                      }}
                    ></Stack>
                  </Tooltip>
                );
              })}
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
                <Stack flexDirection={'row'} justifyContent={'space-between'} my={3}>
                  {dashboardData.map((item: DashboardProps) => {
                    return (
                      <Stack flexDirection={'row'} gap={0.5} alignItems={'center'} key={item.label}>
                        <span
                          style={{
                            height: 10,
                            width: 10,
                            borderRadius: '50%',
                            backgroundColor: `${item.color[1]}`,
                          }}
                        ></span>
                        <Stack flexDirection={'row'} gap={1}>
                          <Typography variant="subtitle2">
                            {item.label} ({item.totalPercentage + '%'}) :
                          </Typography>
                          <Typography variant="subtitle2">
                            {fIndianCurrency(item.amount) || '₹0'} ({item.count})
                          </Typography>
                        </Stack>
                      </Stack>
                    );
                  })}
                </Stack>
              </>
            ) : (
              <Typography variant="subtitle1" textAlign={'center'} my={3}>
                Dashboard data not found
              </Typography>
            )}
            <DonutChart
              serviceData={categoryData.map((item) => ({
                service: item.categoryName,
                amount: item.totalAmount,
                count: item.totalCount,
                percentage: item.percentage,
              }))}
              Reason={statusCount.remarks}
            />

            {/* {statusCount.remarks.length > 0 && (
              <CircleGraph
                serviceData={statusCount.remarks?.map((item: any) => ({
                  service: item.reason,
                  count: item.totalCount,
                }))}
              />
            )} */}
          </Card>
        </Scrollbar>
      </>
    </>
  );
}

export default Dashboard;

interface DonutChartProps {
  serviceData: {
    service: string;
    amount: number;
    count: number;
    percentage: number;
  }[];
  Reason: string[];
}

const DonutChart: React.FC<DonutChartProps> = ({ serviceData, Reason }) => {
  const services = serviceData.map((data) => `${data.service} - ${fIndianCurrency(data.amount)}`);
  const amount = serviceData.map((data) => data.amount);
  console.log(serviceData);
  console.log(amount);
  const totalCount = amount.reduce((a, b) => a + b, 0);
  const percentages = amount.map((count) => Number(((count / totalCount) * 100)?.toFixed(2)));

  const chartOptions: any = {
    chart: {
      type: 'donut',
    },
    labels: services,
    dataLabels: {
      formatter: (val: number, opts: any) => {
        const serviceName = opts.w.globals.labels[opts.seriesIndex];
        return ``;
      },
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (val: number, { seriesIndex }: { seriesIndex: number }) => {
          const percentage = (amount[seriesIndex] / totalCount) * 100;
          return `${percentage.toFixed(2)}%`;
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '85%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              formatter: () => `${fIndianCurrency(totalCount)}`,
              style: {
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#000000', // Change this to your desired color
              },
            },
          },
        },
      },
    },
    legend: {
      position: 'right',
      verticalAlign: 'middle',
    },
  };

  const chartSeries = percentages;

  return (
    <Scrollbar sx={{ width: 600 }}>
      <Grid
        display={'grid'}
        // gridTemplateColumns={{ xs: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        my={5}
        sx={{
          '& .apexcharts-legend.apx-legend-position-right': {
            alignSelf: 'stretch',
          },
        }}
      >
        <Typography variant="h4">All Services</Typography>
        <Chart options={chartOptions} series={chartSeries} type="donut" width={'100%'} />
      </Grid>
    </Scrollbar>
  );
};
