import { useContext, useEffect, useRef, useState } from 'react';

// @mui
import {
  Stack,
  Grid,
  TextField,
  tableCellClasses,
  Button,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  styled,
  useTheme,
  Tooltip,
  Modal,
  TableContainer,
  Divider,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
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
import ReactToPrint from 'react-to-print';
import { fDate, fDateTime } from '../../utils/formatTime';
import Label from 'src/components/label/Label';
import { sentenceCase } from 'change-case';
import { useAuthContext } from 'src/auth/useAuthContext';
import CustomPagination from 'src/components/customFunctions/CustomPagination';
import FormProvider, { RHFSelect, RHFTextField } from '../../components/hook-form';
import { LoadingButton } from '@mui/lab';
import Logo from 'src/components/logo/Logo';
import { fIndianCurrency } from 'src/utils/formatNumber';
import useCopyToClipboard from 'src/hooks/useCopyToClipboard';
import { Icon } from '@iconify/react';
import useResponsive from 'src/hooks/useResponsive';
import { CustomAvatar } from 'src/components/custom-avatar';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { fDateFormatForApi } from 'src/utils/formatTime';
import { MasterTransactionSkeleton } from 'src/components/Skeletons/MasterTransactionSkeleton';
import MotionModal from 'src/components/animate/MotionModal';
import { CategoryContext } from 'src/pages/Services';

// ----------------------------------------------------------------------

type FormValuesProps = {
  startDate: null;
  endDate: null;
  transactionId: string;
  clientId: string;
  mobileNumber: string;
  key1: string;
  key2: string;
  key3: string;
  utr: string;
  status: string;
};

export default React.memo(function Transfer() {
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
    mobileNumber: '',
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
    { id: 'senderNumber', label: 'Sender Number' },
    { id: 'upi', label: 'UPI ID' },
    { id: 'upoi handle', label: 'UPI Handle' },
    { id: 'UTR/RRN', label: 'UTR/RRN' },
    { id: 'Transaction Amount', label: 'Transaction Amount' },
    { id: 'Charges', label: 'Charges' },
    { id: 'GST', label: 'GST' },
    { id: 'Debit', label: 'Debit' },
    { id: 'Status', label: 'Status' },
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
      mobileNumber: getValues('mobileNumber'),
      key1: getValues('key1'),
      key2: getValues('key2'),
      key3: getValues('key3'),
      utr: getValues('utr'),
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

  return (
    <>
      <Helmet>
        <title> Transactions </title>
      </Helmet>
      <FormProvider methods={methods} onSubmit={handleSubmit(getTransaction)}>
        <Scrollbar>
          <Grid display={'grid'} gridTemplateColumns={'repeat(5, 1fr)'} gap={1} my={1}>
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
            </Stack>
            <RHFTextField size="small" name="transactionId" label="Client Id" />
            <RHFTextField size="small" name="clientId" label="Transaction Id" />
            <RHFTextField size="small" name="mobileNumber" label="Sender Number" />
            <RHFTextField name="key1" label="UPI Handle" />
            <RHFTextField name="key2" label="UPI ID" />

            <RHFSelect
              name="status"
              label="Status"
              size="small"
              SelectProps={{
                native: false,
                sx: { textTransform: 'capitalize' },
              }}
            >
              <MenuItem value="">None</MenuItem>
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

        {/* Product  */}
        <TableCell>
          <Typography variant="body2">{newRow?.mobileNumber || '-'}</Typography>
        </TableCell>

        {/* Operator */}
        <TableCell>
          <Typography variant="body2" noWrap>
            {newRow?.operator?.key2}{' '}
            <Tooltip title="Copy" placement="top">
              <IconButton onClick={() => onCopy(newRow?.operator?.key2)} sx={{ p: 0 }}>
                <Iconify icon="eva:copy-fill" width={20} />
              </IconButton>
            </Tooltip>
          </Typography>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Typography variant="body2">{newRow?.operator?.key1}</Typography>
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

        {/* Charge/Commission */}
        <TableCell>
          <Stack flexDirection={'row'} justifyContent={'center'}>
            <Typography variant="body2" whiteSpace={'nowrap'} color={'error'}>
              {fIndianCurrency(newRow.debit)}
            </Typography>{' '}
          </Stack>
        </TableCell>

        {/* Closing Balance */}
        <TableCell>
          <Typography variant="body2" whiteSpace={'nowrap'}>
            {fIndianCurrency(newRow?.GST)}
          </Typography>
        </TableCell>

        <TableCell>
          <Stack flexDirection={'row'} justifyContent={'center'}>
            <Typography variant="body2" whiteSpace={'nowrap'} color={'error'}>
              {fIndianCurrency(newRow.amount + newRow.debit)}
            </Typography>{' '}
          </Stack>
        </TableCell>

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
