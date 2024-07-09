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
import { fDate, fDateFormatForApi, fDateTime } from '../../utils/formatTime';
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
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import CustomPagination from 'src/components/customFunctions/CustomPagination';
import { MasterTransactionSkeleton } from 'src/components/Skeletons/MasterTransactionSkeleton';

// ----------------------------------------------------------------------

type FormValuesProps = {
  searchBy: string;
  startDate: null;
  endDate: null;
  transactionId: string;
  clientId: string;
  mode: string;
  key1: string;
  key2: string;
  key3: string;
  utr: string;
  status: string;
};

export default React.memo(function Recharges() {
  const isMobile = useResponsive('up', 'sm');
  let token = localStorage.getItem('token');
  const { enqueueSnackbar } = useSnackbar();
  const category: any = useContext(CategoryContext);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  const txnSchema = Yup.object().shape({});

  const defaultValues = {
    startDate: null,
    endDate: null,
    transactionId: '',
    clientId: '',
    mode: '',
    key1: '',
    key2: '',
    key3: '',
    utr: '',
    status: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(txnSchema),
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
  const tableLabels = [
    { id: 'Date&Time', label: 'Date & Time' },
    { id: 'TransactionId', label: 'Transaction ID' },
    { id: 'clientID', label: 'Client ID' },
    { id: 'operator', label: 'Operator' },
    { id: 'mobileNumber', label: 'Mobile Number / Subscriber ID' },
    { id: 'oepratorId', label: 'Operator ID' },
    { id: 'amount', label: 'Transaction Amount' },
    { id: 'discount', label: 'Discount' },
    { id: 'debit', label: 'Debit' },
    { id: 'status', label: 'Status' },
  ];

  useEffect(() => {
    getTransaction();
  }, [pageSize, currentPage]);

  const getTransaction = () => {
    setIsLoading(true);
    let body = {
      pageInitData: {
        pageSize: pageSize,
        currentPage: currentPage,
      },
      transactionType: category.transactionType,
      categoryId: category.category,
      productId: category.product,
      productName: category.productName,
      startDate: fDateFormatForApi(getValues('startDate')),
      endDate: fDateFormatForApi(getValues('endDate')),
      transactionId: getValues('transactionId'),
      clientRefId: getValues('clientId'),
      mode: getValues('mode'),
      key1: getValues('key1'),
      key2: getValues('key2'),
      key3: getValues('key3'),
      vendorUtrNumber: getValues('utr'),
      status: getValues('status'),
    };

    Api(`apiBox/Transactions/transactionByUser`, 'POST', body, token).then((Response: any) => {
      console.log('======Transaction==response=====>' + Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          if (Response.data.data && Response.data.data.data.length) {
            setTableData(Response.data.data.data);
          } else {
            setTableData([]);
          }
          setPageCount(Response.data.data.totalNumberOfRecords);
        } else {
          enqueueSnackbar(Response.data.message, { variant: 'error' });
        }
      } else {
        enqueueSnackbar('Failed', { variant: 'error' });
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });
  };

  useEffect(() => {
    setValue('clientId', '');
    setValue('utr', '');
    setValue('transactionId', '');
    setValue('key1', '');
    setValue('key2', '');
  }, [watch('searchBy')]);

  return (
    <>
      <Helmet>
        <title> Transactions </title>
      </Helmet>
      <Scrollbar>
        <FormProvider methods={methods} onSubmit={handleSubmit(getTransaction)}>
          <Scrollbar>
            <Grid display={'grid'} gridTemplateColumns={'repeat(5, 1fr)'} gap={1} my={1}>
              <RHFSelect
                name="searchBy"
                label="Search By"
                size="small"
                SelectProps={{
                  native: false,
                  sx: { textTransform: 'capitalize' },
                }}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="transaction_id">Transaction ID</MenuItem>
                <MenuItem value="client_id">Client ID</MenuItem>
                <MenuItem value="operator_id">Operator ID</MenuItem>
                <MenuItem value="operator">Operator</MenuItem>
                <MenuItem value="mobile_number">Mobile Number</MenuItem>
              </RHFSelect>

              {watch('searchBy') == 'client_id' && (
                <RHFTextField size="small" name="transactionId" label="Client Id" />
              )}
              {watch('searchBy') == 'transaction_id' && (
                <RHFTextField size="small" name="clientId" label="Transaction Id" />
              )}
              {watch('searchBy') == 'operator' && <RHFTextField name="key1" label="Operator" />}
              {watch('searchBy') == 'mobile_number' && (
                <RHFTextField name="key2" label="Mobile Number" />
              )}
              {watch('searchBy') == 'operator_id' && (
                <RHFTextField name="utr" label="Operator ID" />
              )}
              <Stack direction={'row'} gap={1}>
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
                          '& .css-d58xje-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled': {
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
                          '& .css-d58xje-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled': {
                            '-webkit-text-fill-color': '#000000',
                          },
                        }}
                        disabled
                      />
                    )}
                  />
                </LocalizationProvider>
              </Stack>
              <RHFSelect
                name="status"
                label="Status"
                size="small"
                SelectProps={{
                  native: false,
                  sx: { textTransform: 'capitalize' },
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="success">Success</MenuItem>
                <MenuItem value="failed">Failed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in_process">In process</MenuItem>
                <MenuItem value="hold">Hold</MenuItem>
                <MenuItem value="initiated">Initiated</MenuItem>
              </RHFSelect>
              <Stack flexDirection={'row'} flexBasis={{ xs: '100%', sm: '50%' }} gap={1}>
                <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                  Apply
                </LoadingButton>
                <LoadingButton
                  variant="contained"
                  onClick={() => {
                    reset(defaultValues);
                    getTransaction();
                  }}
                >
                  <Iconify icon="bx:reset" color={'common.white'} mr={1} /> Clear
                </LoadingButton>
              </Stack>
            </Grid>
          </Scrollbar>
        </FormProvider>
      </Scrollbar>
      <Card>
        <Table size="small" aria-label="customized table" stickyHeader>
          <TableHeadCustom headLabel={tableLabels} />

          <TableBody>
            {isLoading
              ? [...Array(25)].map((item, index) => <MasterTransactionSkeleton key={index} />)
              : tableData.map((row: any) => <TransactionRow key={row._id} row={row} />)}
          </TableBody>
          {!tableData.length && <TableNoData isNotFound={!tableData.length} />}
        </Table>
      </Card>
      <CustomPagination
        page={currentPage - 1}
        count={pageCount}
        onPageChange={(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
          setCurrentPage(newPage + 1);
        }}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          setPageSize(parseInt(event.target.value));
          setCurrentPage(1);
        }}
      />
    </>
  );
});

type childProps = {
  row: any;
};

function TransactionRow({ row }: childProps) {
  const { copy } = useCopyToClipboard();
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [newRow, setNewRow] = useState(row);

  const onCopy = (text: string) => {
    if (text) {
      enqueueSnackbar('Copied!');
      copy(text);
    }
  };

  return (
    <>
      <TableRow key={newRow._id} hover>
        {/* Date & Time */}
        <TableCell>
          <Typography variant="body2" whiteSpace={'nowrap'} color="text.secondary">
            {fDateTime(newRow?.createdAt)}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" whiteSpace={'nowrap'}>
            {newRow?.clientRefId}{' '}
            <Tooltip title="Copy" placement="top">
              <IconButton onClick={() => onCopy(newRow?.clientRefId)} sx={{ p: 0 }}>
                <Iconify icon="eva:copy-fill" width={20} />
              </IconButton>
            </Tooltip>
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" whiteSpace={'nowrap'}>
            {newRow?.partnerTransactionId}{' '}
            <Tooltip title="Copy" placement="top">
              <IconButton onClick={() => onCopy(newRow?.partnerTransactionId)} sx={{ p: 0 }}>
                <Iconify icon="eva:copy-fill" width={20} />
              </IconButton>
            </Tooltip>
          </Typography>
        </TableCell>

        {/* Operator */}
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Typography variant="body2">{newRow?.operator?.key1}</Typography>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Typography variant="body2">{newRow?.operator?.key2}</Typography>
        </TableCell>

        {/* Operator Txn Id */}
        <TableCell>
          <Typography variant="body2" textAlign={'center'}>
            {newRow?.vendorUtrNumber || '-'}
          </Typography>
        </TableCell>

        {/* Transaction Amount */}
        <TableCell>
          <Typography variant="body2" whiteSpace={'nowrap'}>
            {fIndianCurrency(newRow.amount) || '₹0'}
          </Typography>
        </TableCell>

        {/* Charge/Commission */}
        <TableCell>
          <Typography variant="body2" color={'success.main'} noWrap>
            {fIndianCurrency(newRow?.debit) || '₹0'}
          </Typography>
        </TableCell>

        {/* Closing Balance */}
        <TableCell>
          <Typography variant="body2" color={'error.main'} noWrap>
            {fIndianCurrency(newRow?.debit) || '₹0'}
          </Typography>
        </TableCell>

        {/* GST/TDS */}
        {user?.role == 'agent' && (
          <TableCell sx={{ whiteSpace: 'nowrap' }}>
            <Typography variant="body2">
              GST : {fIndianCurrency((user?.role == 'agent' && newRow?.agentDetails?.GST) || '0')}
            </Typography>
            <Typography variant="body2">
              TDS :{' '}
              {fIndianCurrency((user?.role == 'agent' && newRow?.agentDetails?.TDSAmount) || '0')}
            </Typography>
          </TableCell>
        )}

        <TableCell
          sx={{
            textTransform: 'lowercase',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          <Label
            variant="soft"
            color={
              (newRow.status === 'failed' && 'error') ||
              ((newRow.status === 'pending' || newRow.status === 'in_process') && 'warning') ||
              'success'
            }
            sx={{ textTransform: 'capitalize' }}
          >
            {newRow.status ? sentenceCase(newRow.status) : ''}
          </Label>
        </TableCell>
      </TableRow>
    </>
  );
}
