import { useEffect, useState } from 'react';
import {
  Card,
  Stack,
  Grid,
  TableHead,
  Modal,
  Button,
  TextField,
  styled,
  TableCell,
  TableRow,
  tableCellClasses,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSnackbar } from 'notistack';
import DateRangePicker, { useDateRangePicker } from 'src/components/date-range-picker';
import { Table, TableBody, CardProps, Typography, TableContainer } from '@mui/material';
import Label from 'src/components/label/Label';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import React from 'react';
import Iconify from 'src/components/iconify/Iconify';
import { Api } from 'src/webservices';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import CustomPagination from '../components/customFunctions/CustomPagination';
import ApiDataLoading from '../components/customFunctions/ApiDataLoading';
import * as XLSX from 'xlsx';
import FileFilterButton from '../sections/MyTransaction/FileFilterButton';
import { fDate, fDateFormatForApi, fDateTime } from 'src/utils/formatTime';
import { useAuthContext } from 'src/auth/useAuthContext';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormProvider from 'src/components/hook-form/FormProvider';
import { RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import useResponsive from 'src/hooks/useResponsive';
import MotionModal from 'src/components/animate/MotionModal';
import { WalletLadgerSkeleton } from 'src/components/Skeletons/WalletLadgerSkeleton';
import { fIndianCurrency } from 'src/utils/formatNumber';

// ----------------------------------------------------------------------
type FormValuesProps = {
  startDate: Date | null;
  endDate: Date | null;
  clientRefId: string;
};

type RowProps = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  commission: string;
  due: string;
  maxComm: number;
  status: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: RowProps[];
  tableLabels: any;
}
export default function WalletLadger() {
  const { user } = useAuthContext();
  const isMobile = useResponsive('up', 'sm');
  const { enqueueSnackbar } = useSnackbar();
  const [ladgerData, setLadgerData] = useState([]);
  const [pageSize, setPageSize] = useState<any>(20);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [sendLoading, setSendLoading] = useState(false);
  const [WalletCount, setWalletCount] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const agenttableLabels = [
    { id: 'date/LadgerID', label: 'Date/LadgerID' },
    { id: 'fromName', label: 'From / To' },
    { id: 'amount', label: 'Amount' },
    { id: 'opeing', label: 'Opening/Closing ' },
    { id: 'productName', label: 'Product/TransactionType ' },
    { id: 'walletType', label: 'WalletType ' },
    { id: 'reason', label: 'reason ' },

    { id: 'walletId', label: 'Transaction Id' },
  ];
  const distributortableLabels = [
    { id: 'date/LadgerID', label: 'Date/LadgerID' },
    { id: 'fromName', label: 'From / To' },
    { id: 'amount', label: 'Amount' },
    { id: 'opeing', label: 'Opening/Closing ' },
    { id: 'productName', label: 'Product/TransactionType ' },
    { id: 'walletType', label: 'WalletType ' },
    { id: 'reason', label: 'reason ' },

    { id: 'walletId', label: 'Transaction Id' },
  ];
  const MDtableLabels = [
    { id: 'date/LadgerID', label: 'Date/LadgerID' },
    { id: 'fromName', label: 'From / To' },
    { id: 'amount', label: 'Amount' },
    { id: 'opeing', label: 'Opening/Closing ' },
    { id: 'productName', label: 'Product/TransactionType ' },
    { id: 'walletType', label: 'WalletType ' },
    { id: 'reason', label: 'reason ' },
    // { id: "remarks", label: "remarks" },
    { id: 'walletId', label: 'Transaction Id' },
  ];

  const FilterSchema = Yup.object().shape({});
  const defaultValues = {
    startDate: null,
    endDate: null,
    clientRefId: '',
  };
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(FilterSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const {
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    open: openPicker,
    onOpen: onOpenPicker,
    onClose: onClosePicker,
    isSelected: isSelectedValuePicker,
    isError,
    shortLabel,
  } = useDateRangePicker(new Date(), new Date());

  useEffect(() => {
    getTransactional();
  }, [currentPage]);

  const getTransactional = () => {
    let token = localStorage.getItem('token');
    setSendLoading(true);

    let body = {
      pageInitData: {
        pageSize: pageSize,
        currentPage: currentPage,
      },
      clientRefId: getValues('clientRefId') || '',
      startDate: fDateFormatForApi(getValues('startDate')),
      endDate: fDateFormatForApi(getValues('endDate')),
    };
    Api(`agent/walletLedger`, 'POST', body, token).then((Response: any) => {
      console.log('======Transaction==response=====>' + Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setLadgerData(Response.data?.data?.data);
          setWalletCount(Response.data.data.totalNumberOfRecords);
          enqueueSnackbar(Response.data.message);
          setSendLoading(false);
          setOpen(false);
        } else {
          enqueueSnackbar(Response.data.message);
          setSendLoading(false);
          setOpen(false);
        }
      }
    });
  };

  // const ExportData = () => {
  //   let token = localStorage.getItem('token');

  //   let body = {
  //     pageInitData: {
  //       pageSize: '',
  //       currentPage: '',
  //     },
  //     clientRefId: '',
  //     status: '',
  //     transactionType: '',
  //     startDate: startDate,
  //     endDate: endDate,
  //   };

  //   Api(`agent/walletLedger`, 'POST', body, token).then((Response: any) => {
  //     console.log('======walletLedger==response=====>' + Response);
  //     if (Response.status == 200) {
  //       if (Response.data.code == 200) {
  //         if (Response.data.data.data.length) {
  //           const Dataapi = Response.data.data.data;

  //           console.log(
  //             'Response of the ==============walletLedger===========>',
  //             Response.data?.data?.data
  //           );
  //           const formattedData = Response.data.data.data.map((item: any) => ({
  //             createdAt: new Date(item?.createdAt).toLocaleString(),
  //             client_ref_Id: item?.client_ref_Id,
  //             walletId: item?.walletId,
  //             'Opening Balance':
  //               user?._id === item?.agentDetails?.id?._id
  //                 ? item?.agentDetails?.oldMainWalletBalance
  //                 : user?._id === item?.distributorDetails?.id?._id
  //                 ? item?.distributorDetails?.oldMainWalletBalance
  //                 : user?._id === item?.masterDistributorDetails?.id?._id
  //                 ? item?.masterDistributorDetails?.oldMainWalletBalance
  //                 : '',

  //             'Closing Balance':
  //               user?._id === item?.agentDetails?.id?._id
  //                 ? item?.agentDetails?.newMainWalletBalance
  //                 : user?._id === item?.distributorDetails?.id?._id
  //                 ? item?.distributorDetails?.newMainWalletBalance
  //                 : user?._id === item?.masterDistributorDetails?.id?._id
  //                 ? item?.masterDistributorDetails?.newMainWalletBalance
  //                 : '',
  //             ' Commission Amount':
  //               user?._id === item?.agentDetails?.id?._id
  //                 ? item?.agentDetails?.commissionAmount
  //                 : user?._id === item?.distributorDetails?.id?._id
  //                 ? item?.distributorDetails?.commissionAmount
  //                 : user?._id === item?.masterDistributorDetails?.id?._id
  //                 ? item?.masterDistributorDetails?.commissionAmount
  //                 : '',
  //             GST: item?.transaction?.GST,
  //             TDS: item?.transaction?.TDS,

  //             amount: item?.transaction?.amount,
  //             categoryName: item?.transaction?.categoryName,
  //             clientRefId: item?.transaction?.clientRefId,
  //             credit: item?.transaction?.credit,
  //             debit: item?.transaction?.credit,

  //             productName: item?.transaction?.productName,
  //             status: item?.transaction?.status,
  //             transactionType: item?.transaction?.transactionType,
  //             vendorUtrNumber: item?.transaction?.vendorUtrNumber,
  //           }));

  //           const ws = XLSX.utils.json_to_sheet(formattedData);
  //           const wb = XLSX.utils.book_new();
  //           XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //           const currentDate = fDateTime(new Date());
  //           XLSX.writeFile(wb, `WalletLadger${currentDate}.xlsx`);

  //           console.log('======getUser===data.data ===Transaction====>', Response);
  //         } else {
  //           enqueueSnackbar('Data Not Found ');
  //         }
  //       } else {
  //         console.log('======Transaction=======>' + Response);
  //       }
  //     }
  //   });
  // };
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
    },
  }));

  const handleReset = () => {
    reset(defaultValues);
    setLadgerData([]);
    getTransactional();
  };

  return (
    <>
      <Helmet>
        <title>Wallet Ladger | </title>
      </Helmet>
      <Stack flexDirection={'row'} gap={1} mb={1} justifyContent={'right'}>
        <Button variant="contained" onClick={handleReset}>
          <Iconify icon="bx:reset" color={'common.white'} mr={1} />
          Reset
        </Button>
        <Button variant="contained" onClick={handleOpen}>
          <Iconify icon="icon-park-outline:filter" color={'common.white'} mr={1} /> Filter
        </Button>
      </Stack>
      <Stack>
        <MotionModal open={open} onClose={handleClose} width={{ xs: '95%', sm: 500 }}>
          {/* <Box> */}
          <Stack mb={1}>
            <FormProvider methods={methods} onSubmit={handleSubmit(getTransactional)}>
              <Stack gap={1} m={1}>
                <RHFTextField
                  name="clientRefId"
                  placeholder={'Transaction ID '}
                  size="small"
                  fullWidth
                />
                <Stack flexDirection={'row'} gap={1}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start date"
                      inputFormat="DD/MM/YYYY"
                      value={watch('startDate')}
                      maxDate={new Date()}
                      onChange={(newValue: any) => setValue('startDate', newValue)}
                      renderInput={(params: any) => (
                        <TextField {...params} size={'small'} sx={{ width: 250 }} />
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
                        <TextField {...params} size={'small'} sx={{ width: 250 }} />
                      )}
                    />
                  </LocalizationProvider>
                </Stack>
                <Stack flexDirection={'row'} gap={1}>
                  <LoadingButton variant="contained" onClick={handleClose}>
                    Cancel
                  </LoadingButton>
                  <LoadingButton variant="contained" onClick={handleReset}>
                    <Iconify icon="bx:reset" color={'common.white'} mr={1} /> Reset
                  </LoadingButton>
                  <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                    Apply
                  </LoadingButton>
                </Stack>
              </Stack>
            </FormProvider>
          </Stack>
          {/* </Box> */}
        </MotionModal>

        <Grid item xs={12} md={6} lg={8}>
          <TableContainer>
            <Scrollbar
              sx={
                isMobile
                  ? { maxHeight: window.innerHeight - 210 }
                  : { maxHeight: window.innerHeight - 154 }
              }
            >
              <Table sx={{ minWidth: 720 }} aria-label="customized table" stickyHeader size="small">
                <TableHeadCustom
                  headLabel={
                    user?.role == 'm_distributor'
                      ? MDtableLabels
                      : user?.role == 'distributor'
                      ? distributortableLabels
                      : agenttableLabels
                  }
                />

                <TableBody>
                  {(sendLoading ? [...Array(18)] : ladgerData).map((row: any) =>
                    sendLoading ? <WalletLadgerSkeleton /> : <LadgerRow key={row._id} row={row} />
                  )}
                </TableBody>
                {!sendLoading && <TableNoData isNotFound={!ladgerData?.length} />}
              </Table>
            </Scrollbar>
          </TableContainer>
        </Grid>
      </Stack>
      <CustomPagination
        page={currentPage - 1}
        count={WalletCount}
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
}

const LadgerRow = ({ row }: any) => {
  const { user } = useAuthContext();

  const tableLabelsTO = [
    { id: 'productName', label: 'Product/TransactionType ' },
    { id: 'oldMainWalletBalance', label: ' Opening/Closing' },
    { id: 'commissionAmount', label: ' Amount' },
    { id: 'credit', label: 'Credit/Debit ' },
    { id: 'GST/TDS', label: 'GST/TDS ' },
    { id: 'Status', label: 'Status ' },
    { id: 'BeneficiaryDetails', label: 'BeneficiaryDetails' },
    { id: 'operator', label: 'Operator ' },
    { id: 'mobileNumber', label: 'MobileNumber ' },
  ];

  const [ToFromData, setToFromData] = useState<any>([]);
  const [open, setModalEdit] = React.useState(false);
  const openEditModal = (val: any) => {
    setModalEdit(true);
    getTransactionbyId(val.txnId);
    setToFromData(val);
  };
  const handleClose = () => {
    setModalEdit(false);
  };

  const [txnData, setTxnData] = useState([]);
  const getTransactionbyId = (val: string) => {
    let token = localStorage.getItem('token');

    Api(`transaction/transactionById/` + val, 'GET', '', token).then((Response: any) => {
      console.log('======transactionById==response=====>' + Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          let iterateObj: any = Object.keys(Response.data.data).map(function (key) {
            return (
              <option key={key} value={key}>
                {Response.data.data[key]}
              </option>
            );
          });
          setTxnData(iterateObj);
          console.log('======transactionById===data.data iterateObj====>', iterateObj);
        } else {
          console.log('======transactionById=======>' + Response);
        }
      }
    });
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
    },
  }));

  return (
    <>
      <StyledTableRow
        key={row._id}
        hover
        role="checkbox"
        tabIndex={-1}
        sx={{ borderBottom: '1px solid #dadada' }}
      >
        <StyledTableCell>
          <Typography variant="body2" sx={{ color: 'text.secondary', cursor: 'pointer' }}>
            {row?.createdAt ? fDateTime(row?.createdAt) : fDateTime(row?.transaction?.createdAt)}
          </Typography>
          <Typography variant="body2">{row?.walletId}</Typography>
        </StyledTableCell>
        <StyledTableCell>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {user?._id === row?.to?.id?._id ? (
              <>
                <Stack direction="row" gap={0.5}>
                  <Typography variant="subtitle2">Name :</Typography>
                  <Typography variant="body2">{row?.to?.id?.firstName}</Typography>
                </Stack>
                <Stack direction="row" gap={0.5}>
                  <Typography variant="subtitle2">Role :</Typography>
                  <Typography variant="body2">{row?.to?.id?.role}</Typography>
                </Stack>
              </>
            ) : (
              <>
                <Stack direction="row" gap={0.5}>
                  <Typography variant="subtitle2">Name :</Typography>
                  <Typography variant="body2">{row?.from?.id?.firstName}</Typography>
                </Stack>
                <Stack direction="row" gap={0.5}>
                  <Typography variant="subtitle2">Role :</Typography>
                  <Typography variant="body2">{row?.from?.id?.role}</Typography>
                </Stack>
              </>
            )}
          </Typography>
        </StyledTableCell>
        <StyledTableCell>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {user?._id === row?.to?.id?._id ? (
              <>
                <Typography variant="body1" sx={{ color: 'Green' }}>
                  +{fIndianCurrency(row?.to?.amount)}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="body1" sx={{ color: 'Red' }}>
                  -{fIndianCurrency(row?.from?.amount)}
                </Typography>
              </>
            )}
          </Typography>
        </StyledTableCell>
        <StyledTableCell>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {user?._id === row?.to?.id?._id ? (
              <>
                <Stack direction="row" gap={0.5}>
                  <Typography variant="subtitle2">Opening :</Typography>
                  <Typography variant="body2">
                    {fIndianCurrency(row?.to?.oldMainWalletBalance)}
                  </Typography>
                </Stack>
                <Stack direction="row" gap={0.5}>
                  <Typography variant="subtitle2">Closing :</Typography>
                  <Typography variant="body2">
                    {fIndianCurrency(row?.to?.newMainWalletBalance)}
                  </Typography>
                </Stack>
              </>
            ) : (
              <>
                <Stack direction="row" gap={0.5}>
                  <Typography variant="subtitle2">Opening :</Typography>
                  <Typography variant="body2">
                    {fIndianCurrency(row?.from?.oldMainWalletBalance)}
                  </Typography>
                </Stack>

                <Stack direction="row" gap={0.5}>
                  <Typography variant="subtitle2">Closing :</Typography>
                  <Typography variant="body2">
                    {' '}
                    {fIndianCurrency(row?.from?.newMainWalletBalance)}
                  </Typography>
                </Stack>
              </>
            )}
          </Typography>
        </StyledTableCell>

        <StyledTableCell>
          {row?.transaction?.productName && (
            <Stack direction="row" gap={0.5}>
              <Typography variant="subtitle2">Product :</Typography>
              <Typography variant="body2">{row?.transaction?.productName || '-'}</Typography>
            </Stack>
          )}

          <Stack direction="row" gap={0.5}>
            <Typography variant="subtitle2">Transaction Type : </Typography>
            <Typography variant="body2">{row?.transaction?.transactionType}</Typography>
          </Stack>
        </StyledTableCell>

        <StyledTableCell>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {user?._id === row?.to?.id?._id ? (
              <>
                <Typography color={'error'}>
                  <Label
                    variant="soft"
                    color={
                      (row?.to?.walletType === 'MAIN' && 'error') ||
                      (row?.to?.walletType === 'AEPS' && 'warning') ||
                      'success'
                    }
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {row?.to?.walletType}
                  </Label>
                </Typography>
              </>
            ) : (
              <>
                <Label
                  variant="soft"
                  color={
                    (row?.from?.walletType === 'MAIN' && 'error') ||
                    (row?.from?.walletType === 'AEPS' && 'warning') ||
                    'success'
                  }
                  sx={{ textTransform: 'capitalize' }}
                >
                  {row?.from?.walletType}
                </Label>
              </>
            )}
          </Typography>
        </StyledTableCell>

        <StyledTableCell>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {row?.reason || '-'}
          </Typography>
        </StyledTableCell>

        {row?.transaction?.clientRefId ? (
          <StyledTableCell onClick={() => openEditModal(row)}>
            <Typography
              variant="body1"
              sx={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
            >
              {row?.transaction?.clientRefId || '-'}
            </Typography>
          </StyledTableCell>
        ) : (
          'No Trasaction'
        )}
      </StyledTableRow>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid
          item
          xs={6}
          md={6}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Card sx={{ p: 3 }}>
            <TableContainer style={{ margin: '0 auto', maxHeight: '300px' }}>
              <Table>
                <TableHead>
                  <StyledTableRow>
                    {tableLabelsTO.map((column: any) => (
                      <StyledTableCell key={column.id}>{column.label}</StyledTableCell>
                    ))}
                  </StyledTableRow>
                </TableHead>

                <TableBody>
                  <StyledTableRow
                    key={ToFromData._id}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    sx={{ borderBottom: '1px solid #dadada' }}
                  >
                    <StyledTableCell>
                      {row?.transaction?.productName && (
                        <Stack direction="row" gap={0.5}>
                          <Typography variant="subtitle2">Product:</Typography>
                          <Typography variant="body2">
                            {row?.transaction?.productName || '-'}
                          </Typography>
                        </Stack>
                      )}

                      <Stack gap={0.5}>
                        <Typography variant="subtitle2">Transaction Type:</Typography>
                        <Typography variant="body2">{row?.transaction?.transactionType}</Typography>
                      </Stack>
                    </StyledTableCell>

                    {user?.role == 'agent' ? (
                      <>
                        <StyledTableCell>
                          <Stack gap={0.5} direction="row">
                            <Typography variant="subtitle2">Opening:</Typography>
                            <Typography variant="body2">
                              {fIndianCurrency(
                                ToFromData?.transaction?.agentDetails?.oldMainWalletBalance
                              ) || '-'}
                            </Typography>
                          </Stack>

                          <Stack gap={0.5} direction="row">
                            <Typography variant="subtitle2">Closing:</Typography>
                            <Typography variant="body2">
                              {fIndianCurrency(
                                ToFromData?.transaction?.agentDetails?.newMainWalletBalance
                              )}
                            </Typography>
                          </Stack>
                        </StyledTableCell>

                        <StyledTableCell>
                          <Stack gap={0.5} direction="row">
                            <Typography variant="subtitle2">Comm:</Typography>
                            <Typography variant="body2">
                              {fIndianCurrency(
                                ToFromData?.transaction?.agentDetails?.commissionAmount
                              ) || '-'}
                            </Typography>
                          </Stack>

                          <Stack gap={0.5} direction="row">
                            <Typography variant="subtitle2">Credit:</Typography>
                            <Typography variant="body2">
                              {fIndianCurrency(
                                ToFromData?.transaction?.agentDetails?.creditedAmount
                              )}
                            </Typography>
                          </Stack>

                          <Stack gap={0.5} direction="row">
                            <Typography variant="subtitle2">TDS:</Typography>
                            <Typography variant="body2">
                              {ToFromData?.transaction?.agentDetails?.TDSAmount}
                            </Typography>
                          </Stack>
                        </StyledTableCell>
                      </>
                    ) : user?.role == 'distributor' ? (
                      <>
                        <StyledTableCell>
                          <Stack gap={0.5} direction="row">
                            <Typography variant="subtitle2">Opening:</Typography>
                            <Typography variant="body2">
                              {fIndianCurrency(
                                ToFromData?.transaction?.distributorDetails?.oldMainWalletBalance
                              ) || '-'}
                            </Typography>
                          </Stack>

                          <Stack gap={0.5} direction="row">
                            <Typography variant="subtitle2">Closing:</Typography>
                            <Typography variant="body2">
                              {fIndianCurrency(
                                ToFromData?.transaction?.distributorDetails?.newMainWalletBalance
                              )}
                            </Typography>
                          </Stack>
                        </StyledTableCell>

                        <StyledTableCell>
                          <Stack gap={0.5} direction="row">
                            <Typography variant="subtitle2">Comm:</Typography>
                            <Typography variant="body2">
                              {fIndianCurrency(
                                ToFromData?.transaction?.distributorDetails?.commissionAmount
                              ) || '-'}
                            </Typography>
                          </Stack>

                          <Stack gap={0.5} direction="row">
                            <Typography variant="subtitle2">Credit:</Typography>
                            <Typography variant="body2">
                              {fIndianCurrency(
                                ToFromData?.transaction?.distributorDetails?.creditedAmount
                              )}
                            </Typography>
                          </Stack>

                          <Stack gap={0.5} direction="row">
                            <Typography variant="subtitle2">TDS:</Typography>
                            <Typography variant="body2">
                              {fIndianCurrency(
                                ToFromData?.transaction?.distributorDetails?.TDSAmount
                              )}
                            </Typography>
                          </Stack>
                        </StyledTableCell>
                      </>
                    ) : (
                      <>
                        <StyledTableCell>
                          <Stack gap={0.5} direction="row">
                            <Typography variant="subtitle2">Opening:</Typography>
                            <Typography variant="body2">
                              {fIndianCurrency(
                                ToFromData?.transaction?.masterDistributorDetails
                                  ?.oldMainWalletBalance
                              ) || '-'}
                            </Typography>
                          </Stack>

                          <Stack gap={0.5} direction="row">
                            <Typography variant="subtitle2">Closing:</Typography>
                            <Typography variant="body2">
                              {fIndianCurrency(
                                ToFromData?.transaction?.masterDistributorDetails
                                  ?.newMainWalletBalance
                              )}
                            </Typography>
                          </Stack>
                        </StyledTableCell>

                        <StyledTableCell>
                          <Stack gap={0.5} direction="row">
                            <Typography variant="subtitle2">Comm:</Typography>
                            <Typography variant="body2">
                              {fIndianCurrency(
                                ToFromData?.transaction?.masterDistributorDetails?.commissionAmount
                              ) || '-'}
                            </Typography>
                          </Stack>

                          <Stack gap={0.5} direction="row">
                            <Typography variant="subtitle2">Credit:</Typography>
                            <Typography variant="body2">
                              {fIndianCurrency(
                                ToFromData?.transaction?.masterDistributorDetails?.creditedAmount
                              )}
                            </Typography>
                          </Stack>

                          <Stack gap={0.5} direction="row">
                            <Typography variant="subtitle2">TDS:</Typography>
                            <Typography variant="body2">
                              {fIndianCurrency(
                                ToFromData?.transaction?.masterDistributorDetails?.TDSAmount
                              )}
                            </Typography>
                          </Stack>
                        </StyledTableCell>
                      </>
                    )}

                    <StyledTableCell>
                      <Stack gap={0.5} direction="row">
                        <Typography variant="subtitle2">Credit:</Typography>
                        <Typography variant="body2">
                          {fIndianCurrency(ToFromData?.transaction?.credit)}
                        </Typography>
                      </Stack>

                      <Stack gap={0.5} direction="row">
                        <Typography variant="subtitle2">Debit:</Typography>
                        <Typography variant="body2">
                          {fIndianCurrency(ToFromData?.transaction?.debit)}
                        </Typography>
                      </Stack>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Stack gap={0.5} direction="row">
                        <Typography variant="subtitle2">TDS:</Typography>
                        <Typography variant="body2">
                          {fIndianCurrency(ToFromData?.transaction?.TDS)}
                        </Typography>
                      </Stack>
                      <Stack gap={0.5} direction="row">
                        <Typography variant="subtitle2">GST:</Typography>
                        <Typography variant="body2">
                          {fIndianCurrency(ToFromData?.transaction?.GST)}
                        </Typography>
                      </Stack>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Stack gap={0.5} direction="row">
                        <Typography variant="subtitle2">Status:</Typography>
                        <Typography variant="body2">{ToFromData?.transaction?.status}</Typography>
                      </Stack>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Stack gap={0.5} direction="row">
                        <Typography variant="subtitle2">Bank:</Typography>
                        <Typography variant="body2">
                          {ToFromData?.transaction?.moneyTransferBeneficiaryDetails?.bankName}
                        </Typography>
                      </Stack>

                      <Stack gap={0.5} direction="row">
                        <Typography variant="subtitle2">AccNumber:</Typography>
                        <Typography variant="body2">
                          {ToFromData?.transaction?.moneyTransferBeneficiaryDetails?.accountNumber}
                        </Typography>
                      </Stack>

                      <Stack gap={0.5} direction="row">
                        <Typography variant="subtitle2">beneName:</Typography>
                        <Typography variant="body2">
                          {ToFromData?.transaction?.moneyTransferBeneficiaryDetails?.beneName}
                        </Typography>
                      </Stack>

                      <Stack gap={0.5} direction="row">
                        <Typography variant="subtitle2">ifsc:</Typography>
                        <Typography variant="body2">
                          {ToFromData?.transaction?.moneyTransferBeneficiaryDetails?.ifsc}
                        </Typography>
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Stack gap={0.5} direction="row">
                        <Typography variant="subtitle2">Bank:</Typography>
                        <Typography variant="body2">
                          {ToFromData?.transaction?.operator?.key1}
                        </Typography>
                      </Stack>

                      <Stack gap={0.5} direction="row">
                        <Typography variant="subtitle2">IFSC:</Typography>
                        <Typography variant="body2">
                          {ToFromData?.transaction?.operator?.key2}
                        </Typography>
                      </Stack>

                      <Stack gap={0.5} direction="row">
                        <Typography variant="subtitle2">AccNumber:</Typography>
                        <Typography variant="body2">
                          {ToFromData?.transaction?.operator?.key3}
                        </Typography>
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography>{ToFromData?.transaction?.mobileNumber}</Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{
                mt: 5,
                ml: 1,
              }}
            >
              Close
            </Button>
          </Card>
        </Grid>
      </Modal>
    </>
  );
};
