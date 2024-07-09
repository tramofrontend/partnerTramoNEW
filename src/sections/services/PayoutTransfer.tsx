import { useContext, useEffect, useRef, useState } from 'react';

// @mui
import {
  Stack,
  Grid,
  TextField,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  useTheme,
  Tooltip,
  MenuItem,
  Card,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
// form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import React from 'react';
import { Api } from 'src/webservices';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import Iconify from 'src/components/iconify/Iconify';
import { fDate, fDateTime } from '../../utils/formatTime';
import Label from 'src/components/label/Label';
import { sentenceCase } from 'change-case';
import { useAuthContext } from 'src/auth/useAuthContext';
import CustomPagination from 'src/components/customFunctions/CustomPagination';
import FormProvider, { RHFSelect, RHFTextField } from '../../components/hook-form';
import { LoadingButton } from '@mui/lab';
import { fIndianCurrency } from 'src/utils/formatNumber';
import useCopyToClipboard from 'src/hooks/useCopyToClipboard';
import useResponsive from 'src/hooks/useResponsive';
import { CustomAvatar } from 'src/components/custom-avatar';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { fDateFormatForApi } from 'src/utils/formatTime';
import { MasterTransactionSkeleton } from 'src/components/Skeletons/MasterTransactionSkeleton';
import { CategoryContext } from 'src/pages/Services';

// ----------------------------------------------------------------------

type FormValuesProps = {
  searchBy: string;
  startDate: null;
  endDate: null;
  transactionId: string;
  clientId: string;
  mobileNumber: string;
  product: string;
  mode: string;
  key1: string;
  key2: string;
  key3: string;
  utr: string;
  status: string;
};
export default React.memo(function PayoutTransfer() {
  const isMobile = useResponsive('up', 'sm');
  let token = localStorage.getItem('token');
  const { enqueueSnackbar } = useSnackbar();
  const category: any = useContext(CategoryContext);

  const [productList, setProductList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  const txnSchema = Yup.object().shape({});

  const defaultValues = {
    searchBy: '',
    startDate: null,
    endDate: null,
    transactionId: '',
    clientId: '',
    mobileNumber: '',
    product: '',
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
    { id: 'transaction', label: 'Transaction ID' },
    { id: 'client', label: 'Client ID' },
    { id: 'mode', label: 'Mode' },
    { id: 'senderNumber', label: 'Sender Number' },
    { id: 'bank', label: 'Bank Name' },
    { id: 'acoount', label: 'Account Number' },
    { id: 'ifsc', label: 'IFSC' },
    { id: 'UTR/RRN', label: 'UTR/RRN' },
    { id: 'Transaction Amount', label: 'Transaction Amount' },
    { id: 'Charges', label: 'Charges' },
    { id: 'GST', label: 'GST' },
    { id: 'Debit', label: 'Debit' },
    { id: 'Status', label: 'Status' },
  ];

  useEffect(() => getProducts(), []);

  useEffect(() => {
    getTransaction();
  }, [pageSize, currentPage]);

  const getProducts = () => {
    Api(`product/get_ProductList/${category.category}`, 'GET', '', token).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setProductList(Response.data.data);
        }
      }
    });
  };

  const getTransaction = () => {
    setIsLoading(true);
    let body = {
      pageInitData: {
        pageSize: pageSize,
        currentPage: currentPage,
      },
      transactionType: category.transactionType,
      categoryId: category.category,
      productId: getValues('product'),
      productName: category.productName,
      startDate: fDateFormatForApi(getValues('startDate')),
      endDate: fDateFormatForApi(getValues('endDate')),
      transactionId: getValues('transactionId'),
      mobileNumber: getValues('mobileNumber'),
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
    setValue('transactionId', '');
    setValue('clientId', '');
    setValue('mode', '');
    setValue('mobileNumber', '');
    setValue('utr', '');
    setValue('key1', '');
    setValue('key2', '');
    setValue('key3', '');
  }, [watch('searchBy')]);

  return (
    <>
      <Helmet>
        <title> Transactions </title>
      </Helmet>
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
              <MenuItem value="client_id">Client ID</MenuItem>
              <MenuItem value="transaction_id">Transaction ID</MenuItem>
              <MenuItem value="mode">mode</MenuItem>
              <MenuItem value="bank_name">Bank Name</MenuItem>
              <MenuItem value="account_number">Account Number</MenuItem>
              <MenuItem value="ifsc">IFSC</MenuItem>
              <MenuItem value="sender_number">Sender Number</MenuItem>
              <MenuItem value="utr">UTR</MenuItem>
            </RHFSelect>

            {watch('searchBy') == 'client_id' && (
              <RHFTextField size="small" name="transactionId" label="Client Id" />
            )}
            {watch('searchBy') == 'transaction_id' && (
              <RHFTextField size="small" name="clientId" label="Transaction Id" />
            )}
            {watch('searchBy') == 'client_id' && (
              <RHFTextField size="small" name="mode" label="Mode" />
            )}
            {watch('searchBy') == 'mode' && (
              <RHFSelect
                name="product"
                label="Mode"
                size="small"
                SelectProps={{
                  native: false,
                  sx: { textTransform: 'capitalize' },
                }}
              >
                <MenuItem value=""></MenuItem>
                {productList.map((item: any) => (
                  <MenuItem value={item._id} key={item._id}>
                    {item.productName}
                  </MenuItem>
                ))}
              </RHFSelect>
            )}
            {watch('searchBy') == 'bank_name' && <RHFTextField name="key3" label="Bank Name" />}
            {watch('searchBy') == 'account_number' && (
              <RHFTextField name="key1" label="Account Number" />
            )}
            {watch('searchBy') == 'ifsc' && <RHFTextField name="key2" label="IFSC" />}
            {watch('searchBy') == 'sender_number' && (
              <RHFTextField name="mobileNumber" label="Sender Number" />
            )}
            {watch('searchBy') == 'utr' && <RHFTextField name="utr" label="UTR" />}

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

      <Card>
        <Scrollbar>
          <Table size="small" aria-label="customized table" stickyHeader>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {isLoading
                ? [...Array(25)].map((item, index) => <MasterTransactionSkeleton key={index} />)
                : tableData.map((row: any) => <TransactionRow key={row._id} row={row} />)}
            </TableBody>
            {!tableData.length && <TableNoData isNotFound={!tableData.length} />}
          </Table>
        </Scrollbar>
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
  const theme = useTheme();
  const { copy } = useCopyToClipboard();
  const { user } = useAuthContext();
  const componentRef = useRef<any>();
  const { enqueueSnackbar } = useSnackbar();
  const [newRow, setNewRow] = useState(row);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState('');
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleTextFieldChange = (event: any) => {
    setTextFieldValue(event.target.value);
  };

  const onCopy = (text: string) => {
    if (text) {
      enqueueSnackbar('Copied!');
      copy(text);
    }
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 720 },
    bgcolor: '#ffffff',
    borderRadius: 2,
  };

  return (
    <>
      <TableRow key={newRow._id}>
        {/* Date & Time */}
        <TableCell>
          <Typography variant="body2" whiteSpace={'nowrap'} color="text.secondary">
            {fDateTime(newRow?.createdAt)}
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

        {/* mode of payment */}
        <TableCell>
          <Typography variant="body2">{newRow?.productName || '-'}</Typography>
        </TableCell>

        {/* Product  */}
        <TableCell>
          <Typography variant="body2">{newRow?.mobileNumber || '-'}</Typography>
        </TableCell>

        {/* Operator */}
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Typography variant="body2">{newRow?.operator?.key3}</Typography>
        </TableCell>

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
            {fIndianCurrency(newRow.amount) || 0}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="body2" whiteSpace={'nowrap'} color="error.main">
            {fIndianCurrency(newRow.debit) || 0}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" whiteSpace={'nowrap'}>
            {fIndianCurrency(newRow.GST) || 0}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" noWrap color="error.main">
            {fIndianCurrency(newRow.amount + newRow.debit) || 0}
          </Typography>
        </TableCell>

        <TableCell
          sx={{
            textTransform: 'lowercase',
            fontWeight: 600,
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