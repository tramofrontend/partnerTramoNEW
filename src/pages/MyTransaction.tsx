import { useEffect, useRef, useState } from 'react';

// @mui
import {
  Stack,
  Grid,
  TextField,
  Tabs,
  tableCellClasses,
  Button,
  Box,
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
  Avatar,
  Card,
  Divider,
  MenuItem,
  Container,
  Chip,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
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
import receipt_long from '../assets/icons/receipt_long.svg';
import Group from '../assets/icons/Group.svg';
import autorenew from '../assets/icons/autorenew.svg';
import LogoMain from '../assets/icons/tramoTrmao-Final-Logo.svg';
import DateRangePicker, { useDateRangePicker } from 'src/components/date-range-picker';
import FileFilterButton from '../sections/MyTransaction/FileFilterButton';
import Iconify from 'src/components/iconify/Iconify';
import ReactToPrint from 'react-to-print';
import * as XLSX from 'xlsx';
import { fDate, fDateTime } from '../utils/formatTime';
import Image from '../components/image';
import ApiDataLoading from '../components/customFunctions/ApiDataLoading';
import Label from 'src/components/label/Label';
import { sentenceCase } from 'change-case';
import { useAuthContext } from 'src/auth/useAuthContext';
import CustomPagination from 'src/components/customFunctions/CustomPagination';
import FormProvider, { RHFSelect, RHFTextField } from '../components/hook-form';
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

// ----------------------------------------------------------------------

type FormValuesProps = {
  status: string;
  partnerTransactionId: string;
  transactionType: string;
  category: {
    categoryId: string;
    categoryName: string;
  };
  product: string;
  accountNumber: string;
  mobileNumber: string;
  productName: string;
  key1: string;
  key2: string;
  key3: string;
  startDate: Date | null;
  endDate: Date | null;
  sDate: Date | null;
  eDate: Date | null;
};

export default function MyTransactions() {
  let token = localStorage.getItem('token');
  const isMobile = useResponsive('up', 'sm');
  const isDesktop = useResponsive('up', 'sm');
  const [txnType, setTxnType] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedTab, setSelectedTab] = useState('All');
  const [directFilter, setDirectFilter] = useState([
    {
      label: 'All',
      value: { transactionType: '', category: '', product: '' },
    },
  ]);
  const [Loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [pageCount, setPageCount] = useState<any>(0);
  const [categoryList, setCategoryList] = useState([]);
  const [pageSize, setPageSize] = useState<any>(25);
  const [currentTab, setCurrentTab] = useState('all');
  const [ProductList, setProductList] = useState([]);
  const [filterdValue, setFilterdValue] = useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const txnSchema = Yup.object().shape({
    status: Yup.string(),
    clientRefId: Yup.string(),
  });

  const defaultValues = {
    transactionType: '',
    category: {
      categoryId: '',
      categoryName: '',
    },
    status: '',
    clientRefId: '',
    product: '',
    sDate: null,
    eDate: null,
    accountNumber: '',
    mobileNumber: '',
    key1: '',
    key2: '',
    key3: '',
    startDate: null,
    endDate: null,
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

  useEffect(() => {
    getCategoryList();
    getTxnType();
  }, []);

  useEffect(() => {
    getTransaction();
  }, [currentPage]);

  useEffect(() => setCurrentPage(1), [currentTab]);

  const getTxnType = () => {
    let token = localStorage.getItem('token');
    Api(`adminTransaction/transactionTypes`, 'GET', '', token).then((Response: any) => {
      if (Response?.status == 200) {
        if (Response.data.code == 200) {
          setTxnType(Response.data.data.filter((item: string) => item != 'Fund Flow'));
        }
      }
    });
  };

  const getProductlist = (val: string) => {
    Api(`product/get_ProductList/${val}`, 'GET', '', token).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setProductList(Response.data.data);
        }
      }
    });
  };

  const getCategoryList = async () => {
    let enabledCategory: any = [];
    await Api(`apiBox/dashboard/getActiveServices`, 'GET', '', token).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          enabledCategory = Response.data.data;
        }
      }
    });

    await Api(`category/get_CategoryList`, 'GET', '', token).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setCategoryList(Response.data.data);
          setDirectFilter((prevState) => [
            ...prevState,
            ...Response.data.data
              .filter((item: any) => enabledCategory.includes(item.category_name))
              .map((item1: any) => {
                if (item1.category_name.toLowerCase() == 'kyc') {
                  Api(`product/get_ProductList/${item1._id}`, 'GET', '', token).then(
                    (Response: any) => {
                      if (Response.status == 200) {
                        if (Response.data.code == 200) {
                          setDirectFilter((state) => [
                            ...state,
                            ...Response.data.data.map((row: any) => {
                              return {
                                label: row.productName,
                                value: {
                                  transactionType: '',
                                  category: '',
                                  product: row._id,
                                  productName: '',
                                },
                              };
                            }),
                          ]);
                        }
                      }
                    }
                  );
                }
                if (item1.category_name.toLowerCase() == 'transfer') {
                  return {
                    label: 'UPI Transfer',
                    value: {
                      transactionType: 'Product/Service',
                      category: item1._id,
                      product: '',
                      productName: '',
                    },
                  };
                } else {
                  return {
                    label: item1.category_name,
                    value: {
                      transactionType: '',
                      category: item1._id,
                      product: '',
                      productName: '',
                    },
                  };
                }
              }),
            {
              label: 'UPI varification',
              value: {
                transactionType: '',
                category: '',
                product: '',
                productName: 'UPI Verification',
              },
            },
            {
              label: 'Beneficiary Verification',
              value: {
                transactionType: 'Beneficiary Verification',
                category: '',
                product: '',
                productName: '',
              },
            },
          ]);
        }
      }
    });
  };

  const getTransaction = () => {
    setFilterdValue([]);
    setLoading(true);
    let body = {
      pageInitData: {
        pageSize: pageSize,
        currentPage: currentPage,
      },
      partnerTransactionId: getValues('partnerTransactionId'),
      accountNumber: getValues('accountNumber'),
      productName: getValues('productName'),
      mobileNumber: getValues('mobileNumber'),
      status: getValues('status'),
      transactionType: getValues('transactionType'),
      categoryId: getValues('category.categoryId'),
      productId: getValues('product') || '',
      startDate: fDateFormatForApi(getValues('startDate')),
      endDate: fDateFormatForApi(getValues('endDate')),
      key1: getValues('key1') || '',
      key2: getValues('key2') || '',
      key3: getValues('key3') || '',
    };

    Api(`apiBox/Transactions/transactionByUser`, 'POST', body, token).then((Response: any) => {
      console.log('======Transaction==response=====>' + Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setFilterdValue(Response.data.data.data);
          setPageCount(Response.data.data.totalNumberOfRecords);
          setCurrentTab('');
          enqueueSnackbar(Response.data.message);
        } else {
          enqueueSnackbar(Response.data.message);
        }
        setLoading(false);
      } else {
        enqueueSnackbar('Failed', { variant: 'error' });
        setLoading(false);
      }
    });
  };

  const filterTransaction = async (data: FormValuesProps) => {
    setCurrentPage(1);
    data.partnerTransactionId && setSelectedTab('All');
    try {
      setFilterdValue([]);
      setLoading(true);
      let body = {
        pageInitData: {
          pageSize: pageSize,
          currentPage: currentPage,
        },
        clientRefId: data.partnerTransactionId,
        status: data.status,
        transactionType: data.transactionType,
        categoryId: data.partnerTransactionId ? '' : data.category.categoryId,
        productId: data.product,
        mobileNumber: data.mobileNumber,
        productName: data.productName,
        accountNumber: data.accountNumber,
        key1: data.key1,
        key2: data.key2,
        key3: data.key3,
        startDate: fDateFormatForApi(getValues('startDate')),
        endDate: fDateFormatForApi(getValues('endDate')),
      };
      await Api(`apiBox/Transactions/transactionByUser`, 'POST', body, token).then(
        (Response: any) => {
          console.log('======Transaction==response=====>' + Response);
          if (Response.status == 200) {
            if (Response.data.code == 200) {
              setFilterdValue(Response.data.data.data);
              setPageCount(Response.data.data.totalNumberOfRecords);
              handleClose();
              enqueueSnackbar(Response.data.message);
            } else {
              enqueueSnackbar(Response.data.message, { variant: 'error' });
            }
            setLoading(false);
          } else {
            setLoading(false);
            enqueueSnackbar('Failed', { variant: 'error' });
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const tableLabels2 = [
    { id: 'Date&Time', label: 'Txn Details' },
    { id: 'mode', label: 'Mode' },
    { id: 'Product', label: 'Product' },
    { id: 'Operator', label: 'Operator/ Beneficiary' },
    { id: 'Mobile Number', label: 'Mobile Number' },
    { id: 'Operator Txn ID', label: 'Vendor UTR' },
    { id: 'Txn Amount', label: 'Txn Amount' },
    { id: 'Charge/ Commission', label: 'Charge/ Commission' },
    { id: 'Closing Balance', label: 'Closing Balance' },
    { id: 'status', label: 'Status' },
  ];

  const handleReset = () => {
    reset(defaultValues);
    setFilterdValue([]);
    getTransaction();
    setSelectedTab('All');
    handleClose();
  };

  return (
    <>
      <Helmet>
        <title> Transactions </title>
      </Helmet>
      <Stack flexDirection={'row'} justifyContent={'space-between'} gap={1} mb={1}>
        {isDesktop && (
          <Scrollbar sx={{ width: '100%', p: 1 }}>
            <Stack sx={{ flexWrap: 'nowrap' }}>
              <FormControl>
                <RadioGroup
                  sx={{ flexWrap: 'nowrap' }}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={selectedTab}
                  onChange={(event, newValue) => {
                    setSelectedTab(newValue);
                  }}
                >
                  {directFilter.map((item: any) => (
                    <FormControlLabel
                      key={item.label}
                      value={item.label}
                      control={<Radio />}
                      label={item.label}
                      onClick={() => {
                        reset(defaultValues);
                        setValue('category.categoryId', item.value.category);
                        setValue('transactionType', item.value.transactionType);
                        setValue('product', item.value.product);
                        setValue('productName', item.value.productName);
                        getProductlist(item.value.category);
                        getTransaction();
                      }}
                      sx={{ whiteSpace: 'nowrap' }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Stack>
          </Scrollbar>
        )}
        <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
          <Button variant="outlined" onClick={handleReset} size="medium">
            <Iconify icon="bx:reset" color={'primary.main'} mr={1} />
            Reset
          </Button>
          <Button variant="contained" onClick={handleOpen}>
            <Iconify icon="icon-park-outline:filter" color={'common.white'} mr={1} /> Filter
          </Button>
        </Stack>
      </Stack>
      <Stack>
        <MotionModal open={open} onClose={handleClose} width={{ xs: '95%', sm: 500 }}>
          <Stack>
            <Scrollbar sx={{ maxHieght: { xs: 400, md: 800 } }}>
              {/* <Box> */}
              <FormProvider methods={methods} onSubmit={handleSubmit(filterTransaction)}>
                <Stack gap={1} m={1}>
                  <RHFSelect
                    name="transactionType"
                    label="Select Transaction Type"
                    size="small"
                    SelectProps={{
                      native: false,
                      sx: { textTransform: 'capitalize' },
                    }}
                  >
                    {txnType.map((item: any, index: number) => {
                      return (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </RHFSelect>
                  <RHFSelect
                    name="category.categoryId"
                    label="Category"
                    size="small"
                    SelectProps={{
                      native: false,
                      sx: { textTransform: 'capitalize' },
                    }}
                  >
                    <MenuItem value="">All</MenuItem>
                    {categoryList.map((item: any) => {
                      return (
                        <MenuItem
                          key={item._id}
                          value={item._id}
                          onClick={() => {
                            getProductlist(item._id);
                            setValue('category.categoryName', item.category_name);
                          }}
                        >
                          {item?.category_name}
                        </MenuItem>
                      );
                    })}
                  </RHFSelect>

                  {!!watch('category.categoryId') && (
                    <>
                      {!['transfer'].includes(watch('category.categoryName').toLowerCase()) && (
                        <RHFTextField
                          name="key1"
                          label={
                            ['dmt2', 'dmt1', 'money transfer'].includes(
                              watch('category.categoryName').toLowerCase()
                            )
                              ? 'Account Number'
                              : ['aeps', 'aeps 2', 'aadhaar pay'].includes(
                                  watch('category.categoryName').toLowerCase()
                                )
                              ? 'bank Name'
                              : ['recharges', 'bill payment'].includes(
                                  watch('category.categoryName').toLowerCase()
                                )
                              ? 'Operator Name'
                              : 'key1'
                          }
                        />
                      )}
                      <RHFTextField
                        name="key2"
                        label={
                          ['dmt2', 'dmt1', 'money transfer'].includes(
                            watch('category.categoryName').toLowerCase()
                          )
                            ? 'IFSC'
                            : ['aeps', 'aeps2', 'aadhaar pay'].includes(
                                watch('category.categoryName').toLowerCase()
                              )
                            ? 'Aadhaar Number'
                            : ['recharges', 'bill payment'].includes(
                                watch('category.categoryName').toLowerCase()
                              )
                            ? 'Number'
                            : ['transfer'].includes(watch('category.categoryName').toLowerCase())
                            ? 'UPI ID'
                            : 'key2'
                        }
                      />
                      {!['recharges', 'bill payment', 'transfer'].includes(
                        watch('category.categoryName').toLowerCase()
                      ) && (
                        <RHFTextField
                          name="key3"
                          label={
                            ['dmt2', 'money transfer', 'dmt1'].includes(
                              watch('category.categoryName').toLowerCase()
                            )
                              ? 'Bank Name'
                              : ['aeps', 'aadhaar pay'].includes(
                                  watch('category.categoryName').toLowerCase()
                                )
                              ? 'Mobile Number'
                              : 'key3'
                          }
                        />
                      )}
                    </>
                  )}
                  <RHFSelect
                    name="product"
                    label="Product"
                    size="small"
                    SelectProps={{
                      native: false,
                      sx: { textTransform: 'capitalize' },
                    }}
                  >
                    <MenuItem value="">All</MenuItem>
                    {ProductList.map((item: any) => {
                      return (
                        <MenuItem key={item._id} value={item._id}>
                          {item?.productName}
                        </MenuItem>
                      );
                    })}
                  </RHFSelect>
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
                  <RHFTextField size="small" name="partnerTransactionId" label="Client Id" />
                  {/* <RHFTextField size="small" name="accountNumber" label="AccountNumber" /> */}
                  <RHFTextField size="small" name="mobileNumber" label="MobileNumber" />
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
                  <Stack flexDirection={'row'} flexBasis={{ xs: '100%', sm: '50%' }} gap={1}>
                    <LoadingButton variant="contained" onClick={handleClose}>
                      Cancel
                    </LoadingButton>
                    <LoadingButton variant="contained" onClick={handleReset}>
                      <Iconify icon="bx:reset" color={'common.white'} mr={1} /> Reset
                    </LoadingButton>
                    <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                      Apply
                    </LoadingButton>
                    {/* <Button variant="contained" onClick={ExportData}>
                    Export
                  </Button> */}
                  </Stack>
                </Stack>
              </FormProvider>
            </Scrollbar>
          </Stack>
          {/* </Box> */}
        </MotionModal>

        <Grid item xs={12} md={6} lg={8}>
          <>
            <Scrollbar
              sx={
                isMobile
                  ? { maxHeight: window.innerHeight - 210 }
                  : { maxHeight: window.innerHeight - 154 }
              }
            >
              <Table size="small" aria-label="customized table" stickyHeader>
                <TableHeadCustom headLabel={tableLabels2} />

                <TableBody>
                  {(Loading ? [...Array(20)] : filterdValue).map((row: any) =>
                    Loading ? (
                      <MasterTransactionSkeleton />
                    ) : (
                      <TransactionRow key={row._id} row={row} />
                    )
                  )}
                </TableBody>
                {!filterdValue.length && <TableNoData isNotFound={!filterdValue.length} />}
              </Table>
            </Scrollbar>

            {!Loading && (
              <CustomPagination
                page={currentPage - 1}
                count={pageCount}
                onPageChange={(
                  event: React.MouseEvent<HTMLButtonElement> | null,
                  newPage: number
                ) => {
                  setCurrentPage(newPage + 1);
                }}
                rowsPerPage={pageSize}
                onRowsPerPageChange={(
                  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  setPageSize(parseInt(event.target.value));
                  setCurrentPage(1);
                }}
              />
            )}
          </>
        </Grid>
      </Stack>
    </>
  );
}

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

  const CheckTransactionStatus = (row: any) => {
    setLoading(true);
    let token = localStorage.getItem('token');
    let rowFor = row;
    Api(
      rowFor.categoryName.toLowerCase() == 'money transfer'
        ? `moneyTransfer/checkStatus/` + rowFor._id
        : rowFor.categoryName.toLowerCase() == 'recharges'
        ? `agents/v1/checkStatus/` + rowFor._id
        : rowFor.categoryName.toLowerCase() == 'dmt2'
        ? `dmt2/transaction/status/` + rowFor._id
        : rowFor.transactionType == 'Wallet To Bank Account Settlement' &&
          `settlement/checkStatus/` + rowFor._id,
      'GET',
      '',
      token
    ).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          enqueueSnackbar(Response.data.message);
          setNewRow({ ...newRow, status: Response.data.data.status });
        } else {
          enqueueSnackbar(Response.data.message, { variant: 'error' });
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      padding: 6,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.grey[300],
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
      padding: '0px 20px',
    },
  }));

  return (
    <>
      <StyledTableRow key={newRow._id}>
        {/* Date & Time */}
        <StyledTableCell>
          <Typography variant="body2" whiteSpace={'nowrap'}>
            Client Id : {newRow?.clientRefId}{' '}
            <Tooltip title="Copy" placement="top">
              <IconButton onClick={() => onCopy(newRow?.clientRefId)} sx={{ p: 0 }}>
                <Iconify icon="eva:copy-fill" width={20} />
              </IconButton>
            </Tooltip>
          </Typography>
          <Typography variant="body2" whiteSpace={'nowrap'}>
            Txn Id : {newRow?.partnerTransactionId}{' '}
            <Tooltip title="Copy" placement="top">
              <IconButton onClick={() => onCopy(newRow?.partnerTransactionId)} sx={{ p: 0 }}>
                <Iconify icon="eva:copy-fill" width={20} />
              </IconButton>
            </Tooltip>
          </Typography>
          <Typography variant="body2" whiteSpace={'nowrap'} color="text.secondary">
            {fDateTime(newRow?.createdAt)}
          </Typography>
        </StyledTableCell>

        {user?.role === 'distributor' && (
          <StyledTableCell>
            <Stack flexDirection={'row'} gap={1}>
              <CustomAvatar
                name={newRow?.agentDetails?.id?.firstName}
                alt={newRow?.agentDetails?.id?.firstName}
                src={newRow?.agentDetails?.id?.selfie[0]}
              />
              <Stack>
                <Typography variant="body2">
                  {newRow?.agentDetails?.id?.firstName} {newRow?.agentDetails?.id?.lastName}
                </Typography>
                <Typography variant="body2">{newRow?.agentDetails?.id?.userCode}</Typography>
              </Stack>
            </Stack>
          </StyledTableCell>
        )}

        {/* Distributor Detail */}
        {user?.role === 'm_distributor' && (
          <>
            <StyledTableCell>
              <Stack flexDirection={'row'} gap={1}>
                <CustomAvatar
                  name={newRow?.agentDetails?.id?.firstName}
                  alt={newRow?.agentDetails?.id?.firstName}
                  src={newRow?.agentDetails?.id?.selfie[0]}
                />
                <Stack>
                  <Typography variant="body2">
                    {newRow?.agentDetails?.id?.firstName} {newRow?.agentDetails?.id?.lastName}
                  </Typography>
                  <Typography variant="body2">{newRow?.agentDetails?.id?.userCode}</Typography>
                </Stack>
              </Stack>
            </StyledTableCell>
            <StyledTableCell>
              <Stack flexDirection={'row'} gap={1}>
                <CustomAvatar
                  name={newRow?.distributorDetails?.id?.firstName}
                  alt={newRow?.distributorDetails?.id?.firstName}
                  src={newRow?.distributorDetails?.id?.selfie[0]}
                />
                <Stack>
                  <Typography variant="body2">
                    {newRow?.distributorDetails?.id?.firstName}{' '}
                    {newRow?.distributorDetails?.id?.lastName}
                  </Typography>
                  <Typography variant="body2">
                    {newRow?.distributorDetails?.id?.userCode}
                  </Typography>
                </Stack>
              </Stack>
            </StyledTableCell>
          </>
        )}
        {/* mode of payment */}
        <StyledTableCell>
          <Typography variant="body2">{newRow?.modeOfPayment || '-'}</Typography>
        </StyledTableCell>

        {/* Product  */}
        <StyledTableCell>
          <Typography variant="body2">{newRow?.transactionType}</Typography>
          <Typography variant="body2">{newRow?.productName || '-'}</Typography>
        </StyledTableCell>

        {/* Operator */}
        <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>
          <Typography variant="body2">{newRow?.operator?.key1}</Typography>
          <Typography variant="body2">
            {newRow?.productName == 'Money Transfer'
              ? newRow?.moneyTransferBeneficiaryDetails?.beneName
              : ['aeps', 'aeps 2', 'aadhaar pay'].includes(newRow?.categoryName?.toLowerCase())
              ? newRow?.operator?.key2?.length &&
                'X'
                  .repeat(newRow?.operator?.key2?.length - 4)
                  .split('')
                  .map((item: any, index: number) => {
                    if (index % 4 == 0) {
                      return ' ' + item;
                    } else {
                      return item;
                    }
                  })
                  .join('') +
                  newRow?.operator?.key2
                    ?.slice(newRow?.operator?.key2?.length - 4)
                    .split('')
                    .map((item: any, index: number) => {
                      if (index % 4 == 0) {
                        return ' ' + item;
                      } else {
                        return item;
                      }
                    })
                    .join('')
              : newRow?.operator?.key2}
          </Typography>
          <Typography
            variant="body2"
            sx={{ wordBreak: 'break-all', maxWidth: 200, whiteSpace: 'break-spaces' }}
          >
            {newRow?.operator?.key3}
          </Typography>
        </StyledTableCell>

        {/* Mobile Number */}
        <StyledTableCell>
          <Typography variant="body2">{newRow?.mobileNumber}</Typography>
        </StyledTableCell>

        {/* Operator Txn Id */}
        <StyledTableCell>
          <Typography variant="body2" textAlign={'center'}>
            {newRow?.vendorUtrNumber || '-'}
          </Typography>
        </StyledTableCell>

        {/* Opening Balance */}
        {/* <StyledTableCell>
          <Typography variant="body2" whiteSpace={'nowrap'}>
            {fIndianCurrency(
              user?.role === 'agent'
                ? newRow?.agentDetails?.oldMainWalletBalance
                : user?.role === 'distributor'
                ? newRow?.distributorDetails?.oldMainWalletBalance
                : newRow?.masterDistributorDetails?.oldMainWalletBalance
            )}
          </Typography>
        </StyledTableCell> */}

        {/* Transaction Amount */}
        <StyledTableCell>
          <Typography variant="body2" whiteSpace={'nowrap'}>
            {fIndianCurrency(newRow.amount) || 0}
          </Typography>
        </StyledTableCell>

        {/* Charge/Commission */}
        <StyledTableCell>
          <Stack flexDirection={'row'} justifyContent={'center'}>
            <Typography variant="body2" whiteSpace={'nowrap'} color={'error'}>
              {user?.role === 'agent' && <>-{fIndianCurrency(newRow.debit)}/</>}
            </Typography>{' '}
            <Typography variant="body2" whiteSpace={'nowrap'} color={'green'}>
              + {fIndianCurrency(newRow?.partnerDetails?.creditedAmount) || 0}
            </Typography>
          </Stack>
        </StyledTableCell>

        {/* Closing Balance */}
        <StyledTableCell>
          <Typography variant="body2" whiteSpace={'nowrap'}>
            {fIndianCurrency(newRow?.partnerDetails?.newMainWalletBalance)}
          </Typography>
        </StyledTableCell>

        {/* GST/TDS */}

        {user?.role == 'agent' && (
          <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>
            <Typography variant="body2">
              GST : {fIndianCurrency((user?.role == 'agent' && newRow?.agentDetails?.GST) || '0')}
            </Typography>
            <Typography variant="body2">
              TDS :{' '}
              {fIndianCurrency((user?.role == 'agent' && newRow?.agentDetails?.TDSAmount) || '0')}
            </Typography>
          </StyledTableCell>
        )}

        <StyledTableCell
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
        </StyledTableCell>
      </StyledTableRow>
      <Modal open={modalOpen} onClose={closeModal}>
        <Grid sx={style}>
          <Stack flexDirection={'row'} justifyContent={'flex-end'} mx={1}>
            <Tooltip title="Close" onClick={closeModal}>
              <IconButton>
                <Iconify icon="carbon:close-outline" />
              </IconButton>
            </Tooltip>
            <ReactToPrint
              trigger={() => (
                <Tooltip title="Print">
                  <IconButton>
                    <Iconify icon="eva:printer-fill" />
                  </IconButton>
                </Tooltip>
              )}
              content={() => componentRef.current}
              onAfterPrint={closeModal}
            />
          </Stack>
          <Grid ref={componentRef} sx={{ p: 3 }}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4}>
                <Stack flexDirection={'row'} gap={1}>
                  <Typography variant="caption">Agent Name: </Typography>
                  <Typography variant="caption">
                    {`${user?.firstName} ${user?.lastName}`}
                  </Typography>
                </Stack>
                <Stack flexDirection={'row'} gap={1}>
                  <Typography variant="caption">User code: </Typography>
                  <Typography variant="caption">{`${user?.userCode}`}</Typography>
                </Stack>
                <Stack flexDirection={'row'} gap={1}>
                  <Typography variant="caption"> Mobile Number: </Typography>
                  <Typography variant="caption">{user?.contact_no}</Typography>
                </Stack>
                <Stack flexDirection={'row'} gap={1}>
                  <Typography variant="caption"> Shop Name: </Typography>
                  <Typography variant="caption">{user?.shopAddress}</Typography>
                </Stack>
                <Stack flexDirection={'row'} gap={1} mt={4}>
                  <Typography variant="caption">Sender Name : </Typography>
                  <Typography variant="caption">
                    {newRow?.moneyTransferSenderId?.remitterFN}
                    {newRow?.moneyTransferSenderId?.remitterLN}{' '}
                  </Typography>
                </Stack>
                <Stack flexDirection={'row'} gap={1}>
                  <Typography variant="caption"> Mobile Number: </Typography>
                  <Typography variant="caption">
                    {newRow?.moneyTransferSenderId?.remitterMobile}
                  </Typography>
                </Stack>
                <Stack flexDirection={'row'} gap={1}>
                  <Typography variant="caption"> Service Type: </Typography>
                  <Typography variant="caption">{newRow?.productName}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6">PAYMENT RECEIPT</Typography>
              </Grid>
              <Grid item xs={10} sm={4}>
                <Logo />
                <Typography variant="body2">TRX Date: {fDateTime(newRow?.createdAt)}</Typography>
                <Stack>
                  <Typography variant="subtitle1">Benificary Details</Typography>

                  <Stack flexDirection={'row'}>
                    <Typography variant="body2"> Account Holder Name: </Typography>
                    <Typography variant="body2">
                      {newRow?.moneyTransferBeneficiaryDetails?.beneName}
                    </Typography>
                  </Stack>
                  <Stack flexDirection={'row'} gap={1}>
                    <Typography variant="body2"> Bank Name: </Typography>
                    <Typography variant="body2">
                      {newRow?.moneyTransferBeneficiaryDetails?.bankName}
                    </Typography>
                  </Stack>
                  <Stack flexDirection={'row'} gap={1}>
                    <Typography variant="body2"> Account Number: </Typography>
                    <Typography variant="body2">
                      {newRow?.moneyTransferBeneficiaryDetails?.accountNumber}
                    </Typography>
                  </Stack>
                  <Stack flexDirection={'row'} gap={1}>
                    <Typography variant="body2"> IFSC : </Typography>
                    <Typography variant="body2">
                      {newRow?.moneyTransferBeneficiaryDetails?.ifsc}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            <Grid>
              <Scrollbar sx={{ maxHeight: 600 }}>
                <Stack sx={{ pr: 2 }}>
                  <TableContainer sx={{ overflow: 'unset', border: 'solid 1px' }}>
                    <Table>
                      <TableRow
                        sx={{
                          borderBottom: (theme) => `solid 1.5px ${theme.palette.divider}`,
                        }}
                      >
                        <StyledTableCell align="center">
                          <Typography variant="subtitle2">Transaction Id</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Typography variant="subtitle2">Service</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Typography variant="subtitle2">UTR</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Typography variant="subtitle2">Status</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Typography variant="subtitle2">Amount</Typography>
                        </StyledTableCell>
                      </TableRow>

                      <TableBody>
                        <TableRow
                          sx={{
                            borderBottom: (theme) => `solid 1.5px ${theme.palette.divider}`,
                          }}
                        >
                          <TableCell align="left">
                            <Typography variant="body2" noWrap>
                              {newRow?.clientRefId}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body2" noWrap>
                              {newRow?.productName}
                            </Typography>
                          </TableCell>

                          <TableCell align="center">
                            <Typography variant="body2" noWrap>
                              {newRow?.vendorUtrNumber || '-'}
                            </Typography>
                          </TableCell>

                          <TableCell align="center">
                            <Label
                              variant="soft"
                              color={
                                (newRow.status === 'failed' && 'error') ||
                                ((newRow.status === 'pending' || newRow.status === 'in_process') &&
                                  'warning') ||
                                'success'
                              }
                              sx={{ textTransform: 'capitalize' }}
                            >
                              {newRow.status ? sentenceCase(newRow.status) : ''}
                            </Label>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body2" noWrap>
                              Rs.{fIndianCurrency(newRow?.amount)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Stack>
                    <Typography align="left" variant="body2" whiteSpace={'nowrap'}>
                      Transaction Amount : {' ' + fIndianCurrency(newRow.amount)}
                    </Typography>
                    <Typography align="left" variant="body2" whiteSpace={'nowrap'}>
                      Agent Convienience Fee:{' '}
                      <TextField
                        variant="standard"
                        size="small"
                        value={textFieldValue}
                        onChange={handleTextFieldChange}
                      />
                    </Typography>
                    <Grid item xs={12} md={9}>
                      <Typography variant="caption">
                        The convienience fee charged is the sole responsibility of the Agent. Tramo
                        assumes no libiility for the imposition of this fee and any associated
                        consequences or issues arising from its application rest entirely with the
                        Agent{' '}
                      </Typography>
                    </Grid>
                    <Typography align="left" variant="body1" whiteSpace={'nowrap'}>
                      Total Amount:{`${+textFieldValue + +newRow.amount}`}
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle2">NOTES</Typography>
                  <Grid container>
                    <Grid item xs={12} md={9}>
                      <Typography variant="caption">
                        This transaction receipt is generated automatically and dose not require a
                        physical signature. It is not a tax invoice but serves as a record of your
                        transaction with Tramo. Please retain it for your refrence, and if you have
                        any queries, fell free to contact our Customer Support team.
                      </Typography>
                      <Typography>
                        <Stack
                          flexDirection={{ xs: 'column', sm: 'row' }}
                          sx={{
                            color: 'white',
                            bgcolor: 'darkblue',
                            pt: 1,
                            pb: 1,
                          }}
                          justifyContent="space-between"
                        >
                          <Typography variant="caption">
                            Helpline Numbers +{process.env.REACT_APP_COMPANY_MOBILE} ,{' '}
                            {process.env.REACT_APP_COMPANY_MOBILEOTHER}
                          </Typography>
                          <Typography variant="caption">
                            Timings : 08:00AM to 10:00 PM (Mon-Sun)
                          </Typography>
                          <Typography variant="caption">
                            Email : {process.env.REACT_APP_COMPANY_EMAIL}
                          </Typography>
                        </Stack>
                      </Typography>
                    </Grid>
                  </Grid>
                </Stack>
              </Scrollbar>
            </Grid>
            <Divider variant="fullWidth" style={{ borderWidth: '2px', borderStyle: 'dashed ' }} />
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}
