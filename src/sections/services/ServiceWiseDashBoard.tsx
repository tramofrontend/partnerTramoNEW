import { useContext, useEffect, useRef, useState } from 'react';

// @mui
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  useTheme,
  Tooltip,
  Card,
  TableHead,
  Grid,
  Stack,
  TextField,
  Tab,
  Tabs,
  MenuItem,
  Button,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSnackbar } from 'notistack';
import React from 'react';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import Iconify from 'src/components/iconify/Iconify';
import { fDate, fDateTime } from '../../utils/formatTime';
import Label from 'src/components/label/Label';
import { sentenceCase } from 'change-case';
import { useAuthContext } from 'src/auth/useAuthContext';
import { fIndianCurrency } from 'src/utils/formatNumber';
import useCopyToClipboard from 'src/hooks/useCopyToClipboard';
import useResponsive from 'src/hooks/useResponsive';
import FilledCircleGraph from 'src/components/Graph/FilledCircleGraph';
import LinearGraph from 'src/components/Graph/LinearGraph';
import { Api } from 'src/webservices';
import { CategoryContext } from 'src/pages/Services';
// form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from 'src/components/hook-form/FormProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { RHFSelect } from 'src/components/hook-form';
import CircleGraph from 'src/components/Graph/CircleGraph';

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

  const methods = useForm<FormValuesProps>({
    defaultValues,
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
        <Stack mb={1}>
          <FormProvider methods={methods} onSubmit={handleSubmit(filterDashboard)}>
            <Stack direction={'row'} gap={1}>
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start date"
                  inputFormat="DD/MM/YYYY"
                  value={watch('startDate')}
                  maxDate={new Date()}
                  onChange={(newValue: any) => setValue('startDate', newValue)}
                  renderInput={(params: any) => (
                    <TextField {...params} size={'small'} sx={{ width: 300 }} />
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
                    <TextField {...params} size={'small'} sx={{ width: 300 }} />
                  )}
                />
              </LocalizationProvider>
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
                  setValue('dateFilter', 'today');
                }}
              >
                Clear
              </Button>
            </Stack>
          </FormProvider>
        </Stack>
        {!isLoading && (
          <>
            {statusCount.totalTransaction.count ? (
              <>
                <Stack flexDirection={{ md: 'row' }} gap={2}>
                  <Stack sx={{ flexBasis: '30%' }}>
                    <CircleGraph
                      title=""
                      chart={{
                        colors: [
                          theme.palette.success.main,
                          theme.palette.error.main,
                          theme.palette.info.main,
                        ],
                        series: [
                          { label: 'Success', value: statusCount.status.success.totalAmount },
                          { label: 'Failed', value: statusCount.status.failed.totalAmount },
                          { label: 'Pending', value: statusCount.status.pending.totalAmount },
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
                          status: 'Failed',
                          quantity: statusCount.status.failed.totalCount,
                          value: statusCount.status.failed.failedPercentage,
                        },
                        {
                          status: 'Pending',
                          quantity: statusCount.status.pending.totalCount,
                          value: statusCount.status.pending.pendingPercentage,
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
