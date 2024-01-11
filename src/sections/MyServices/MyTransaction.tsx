import { useEffect, useState } from 'react';

// @mui
import {
  Stack,
  Grid,
  Pagination,
  TextField,
  Tabs,
  Tab,
  Button,
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  CircularProgress,
  Typography,
  IconButton,
  Icon,
  TableHead,
  useTheme,
  Tooltip,
  Modal,
  TableContainer,
  Avatar,
  MenuItem,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { _ecommerceBestSalesman } from 'src/_mock/arrays';
import { useSnackbar } from 'notistack';
import React from 'react';
import { Api } from 'src/webservices';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import { useAuthContext } from 'src/auth/useAuthContext';
// import LogoMain from '../../assets/icons/tramoTrmao-Final-Logo.svg';
import DateRangePicker, { useDateRangePicker } from 'src/components/date-range-picker';
import FileFilterButton from '../MyTransaction/FileFilterButton';
import Iconify from 'src/components/iconify/Iconify';
import { jsPDF } from 'jspdf';
import receipt_long from '../../../../assets/icons/receipt_long.svg';
import Group from '../../../../assets/icons/Group.svg';
import autorenew from '../../../../assets/icons/autorenew.svg';
import { fDate, fDateTime } from 'src/utils/formatTime';
import * as XLSX from 'xlsx';
import CustomPagination from 'src/components/customFunctions/CustomPagination';
import { fCurrency } from 'src/utils/formatNumber';
import ApiDataLoading from 'src/components/customFunctions/ApiDataLoading';
import { sentenceCase } from 'change-case';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import Label from 'src/components/label/Label';
import useCopyToClipboard from 'src/hooks/useCopyToClipboard';
// ----------------------------------------------------------------------

type FormValuesProps = {
  status: string;
  clientRefId: string;
  category: string;
};

export default function MyTransactions() {
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();
  const [superCurrentTab, setSuperCurrentTab] = useState(1);
  const [Loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [pageCount, setPageCount] = useState<any>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [sdata, setSdata] = useState([]);
  const [pageSize, setPageSize] = useState<any>(20);

  const txnSchema = Yup.object().shape({
    status: Yup.string(),
    clientRefId: Yup.string(),
  });

  const defaultValues = {
    category: '',
    status: '',
    clientRefId: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(txnSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    getCategoryList();
    getTransaction();
  }, [currentPage]);

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

  const getCategoryList = () => {
    let token = localStorage.getItem('token');
    Api(`category/get_CategoryList`, 'GET', '', token).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setCategoryList(Response.data.data);
        }
      }
    });
  };

  const getTransaction = () => {
    setLoading(true);
    let token = localStorage.getItem('token');
    let body = {
      pageInitData: {
        pageSize: pageSize,
        currentPage: currentPage,
      },
      clientRefId: getValues('clientRefId'),
      status: getValues('status'),
      transactionType: '',
      categoryId: getValues('category'),
    };

    Api(`apiBox/Transactions/transactionByUser`, 'POST', body, token).then((Response: any) => {
      console.log('======Transaction==response=====>' + Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setSdata(Response.data.data.data);
          setPageCount(Response.data.data.totalNumberOfRecords);
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
    try {
      setSdata([]);
      setCurrentPage(1);
      setLoading(true);
      let token = localStorage.getItem('token');
      let body = {
        pageInitData: {
          pageSize: pageSize,
          currentPage: currentPage,
        },
        clientRefId: data.clientRefId,
        status: data.status,
        transactionType: '',
        categoryId: data.category,
      };
      await Api(`apiBox/Transactions/transactionByUser`, 'POST', body, token).then(
        (Response: any) => {
          console.log('======Transaction==response=====>' + Response);
          if (Response.status == 200) {
            if (Response.data.code == 200) {
              setSdata(Response.data.data.data);
              setPageCount(Response.data.data.totalNumberOfRecords);
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
    { id: 'Date&Time', label: 'Date & Time' },
    { id: 'Tramo Id', label: 'Tramo Id' },
    { id: 'Product', label: 'Product' },
    { id: 'Operator', label: 'Operator/Beneficiary' },
    { id: 'Mobile Number', label: 'Mobile Number' },
    { id: 'Operator Txn ID', label: 'UTR/Reference Number' },
    { id: 'Opening Balance', label: 'Opening Balance' },
    { id: 'Txn Amount', label: 'Txn Amount' },
    { id: 'Charge/Commission', label: 'Charge/Commission' },
    { id: 'Closing Balance', label: 'Closing Balance' },
    { id: 'GST/TDS', label: 'GST/TDS' },
    { id: 'status', label: 'Status' },
    { id: 'Action', label: 'Action' },
  ];

  const TabLabel = [
    { id: 1, label: 'all' },
    { id: 2, label: 'pending' },
    { id: 3, label: 'failed' },
    { id: 4, label: 'success' },
    { id: 5, label: 'fund request' },
  ];

  // const parsed = parse(startDate, 'yyyy-MM-dd', new Date());

  const ExportData = () => {
    let token = localStorage.getItem('token');

    let body = {
      pageInitData: {
        pageSize: '',
        currentPage: '',
      },
      clientRefId: '',
      status: '',
      transactionType: '',
      startDate: startDate,
      endDate: endDate,
    };

    Api(`apiBox/Transactions/transactionByUser`, 'POST', body, token).then((Response: any) => {
      console.log('======Transaction==response=====>' + Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          if (Response.data.data.data.length) {
            const Dataapi = Response.data.data.data;
            console.log('Dataapi', Dataapi);

            const formattedData = Response.data.data.data.map((item: any) => ({
              createdAt: new Date(item?.createdAt).toLocaleString(),
              client_ref_Id: item?.client_ref_Id,
              transactionType: item?.transactionType,
              productName: item?.productName,
              categoryName: item?.categoryName,
              opening: item?.partnerDetails?.oldMainWalletBalance,
              closing: item?.partnerDetails?.newMainWalletBalance,
              'Commission Amount': item?.partnerDetails?.commissionAmount,
              'User Name': item?.partnerDetails?.id?.firstName,
              commissionAmount: item?.partnerDetails?.commissionAmount,
              creditedAmount: item?.partnerDetails?.creditedAmount,
              TDSAmount: item?.partnerDetails?.TDSAmount,
              amount: item?.amount,
              credit: item?.credit,
              debit: item?.debit,
              TDS: item?.TDS,
              GST: item?.GST,
              ipAddress: item?.metaData?.ipAddress,
              deviceType: item?.checkStatus?.deviceType,
              three_way_recoon: item?.three_way_recoon,
              status: item?.status,
              bankName: item?.moneyTransferBeneficiaryDetails?.bankName,
              accountNumber: item?.moneyTransferBeneficiaryDetails?.accountNumber,
              vendorUtrNumber: item?.vendorUtrNumber,
              providerBank: item?.providerBank,
              ifsc: item?.ifsc,
              operator: item?.key1,
              number: item?.key2,
              mobileNumber: item?.mobileNumber,
            }));

            const ws = XLSX.utils.json_to_sheet(formattedData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            const currentDate = fDateTime(new Date());
            XLSX.writeFile(wb, `Transaction${currentDate}.xlsx`);

            console.log('======getUser===data.data ===Transaction====>', Response);
          } else {
            enqueueSnackbar('Data Not Found ');
          }
        } else {
          console.log('======Transaction=======>' + Response);
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title> Transactions </title>
      </Helmet>

      <FormProvider methods={methods} onSubmit={handleSubmit(filterTransaction)}>
        <Stack
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent={'space-between'}
          m={1}
          gap={1}
        >
          <Stack
            flexDirection={{ xs: 'column', sm: 'row' }}
            flexBasis={{ xs: '100%', sm: '50%' }}
            gap={1}
          >
            <RHFSelect
              name="category"
              label="Category"
              SelectProps={{
                native: false,
                sx: { textTransform: 'capitalize' },
              }}
            >
              {categoryList.map((item: any) => {
                return (
                  <MenuItem key={item._id} value={item._id}>
                    {item?.category_name}
                  </MenuItem>
                );
              })}
            </RHFSelect>
            <RHFSelect
              name="status"
              label="Status"
              SelectProps={{
                native: false,
                sx: { textTransform: 'capitalize' },
              }}
            >
              <MenuItem value="success">Success</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in_process">In process</MenuItem>
              <MenuItem value="hold">Hold</MenuItem>
              <MenuItem value="initiated">Initiated</MenuItem>
            </RHFSelect>
            <RHFTextField name="clientRefId" label="Client Ref Id" />
            <Stack flexDirection={'row'} flexBasis={{ xs: '100%', sm: '50%' }} gap={1}>
              <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                Search
              </LoadingButton>
              <LoadingButton
                variant="contained"
                onClick={() => {
                  reset(defaultValues);
                  getTransaction();
                }}
              >
                Clear
              </LoadingButton>
            </Stack>
          </Stack>
          <Stack direction={'row'} gap={1}>
            <FileFilterButton
              isSelected={!!isSelectedValuePicker}
              startIcon={<Iconify icon="eva:calendar-fill" />}
              onClick={onOpenPicker}
            >
              {`${fDate(startDate)} - ${fDate(endDate)}`}
            </FileFilterButton>
            <DateRangePicker
              variant="input"
              title="Select Date Range"
              startDate={startDate}
              endDate={endDate}
              onChangeStartDate={onChangeStartDate}
              onChangeEndDate={onChangeEndDate}
              open={openPicker}
              onClose={onClosePicker}
              isSelected={isSelectedValuePicker}
              isError={isError}
            />
            <Button variant="contained" onClick={ExportData}>
              Export
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
      {isLoading ? (
        <ApiDataLoading />
      ) : sdata.length ? (
        <Grid item xs={12} md={6} lg={8}>
          <Scrollbar>
            <Table sx={{ minWidth: 720 }} stickyHeader aria-label="sticky table">
              <TableHeadCustom headLabel={tableLabels2} />

              <TableBody>
                {sdata.map((row: any) => (
                  <TransactionRow key={row._id} row={row} />
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
          <CustomPagination
            pageSize={pageSize}
            onChange={(event: React.ChangeEvent<unknown>, value: number) => {
              setCurrentPage(value);
            }}
            page={currentPage}
            Count={pageCount}
          />
        </Grid>
      ) : (
        <Typography textAlign={'center'} variant="subtitle1">
          No {sentenceCase(TabLabel[superCurrentTab - 1].label)} Transactions Found
        </Typography>
      )}
    </>
  );
}

type childProps = {
  row: any;
};

function TransactionRow({ row }: childProps) {
  const { copy } = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();
  const [newRow, setNewRow] = useState(row);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const generatePDF = () => {
    const pdfWidth = 595;
    const pdfHeight = 842;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [pdfWidth, pdfHeight],
    });

    const content: any = document.getElementById('pdf-content');

    pdf.html(content, {
      callback: function (pdf: any) {
        pdf.save('transaction_receipt.pdf');
      },
    });
  };

  const CheckTransactionStatus = (row: any) => {
    setLoading(true);
    let token = localStorage.getItem('token');
    let rowFor = row.categoryName.toLowerCase();
    Api(
      rowFor.toLowerCase() == 'money transfer'
        ? `partner/moneyTransfer/checkStatus/` + row.clientRefId
        : rowFor.toLowerCase() == 'recharges'
        ? `partner/agents/v1/checkStatus/` + row.clientRefId
        : rowFor.toLowerCase() == 'dmt2' && `partner/dmt2/transaction/status/` + row.clientRefId,
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
      }
    });
  };

  const onCopy = (text: string) => {
    if (text) {
      enqueueSnackbar('Copied!');
      copy(text);
    }
  };

  return (
    <>
      <TableRow hover key={newRow._id}>
        <TableCell>
          <Typography variant="body2" sx={{ width: '100px' }}>
            {fDateTime(newRow?.createdAt)}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="body2">{newRow?.transactionType}</Typography>
          <Typography variant="body2" whiteSpace={'nowrap'}>
            {newRow?.clientRefId}{' '}
            <Tooltip title="Copy" placement="top">
              <IconButton onClick={() => onCopy(newRow?.clientRefId)}>
                <Iconify icon="eva:copy-fill" width={20} />
              </IconButton>
            </Tooltip>
          </Typography>
        </TableCell>

        {/* Product  */}
        <TableCell>
          <Typography variant="body2">{newRow?.productName}</Typography>
        </TableCell>

        {/* Operator */}
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Typography variant="body2">{newRow?.operator?.key1}</Typography>
          <Typography variant="body2">{newRow?.operator?.key2}</Typography>
          <Typography variant="body2">{newRow?.operator?.key3}</Typography>
        </TableCell>

        {/* Mobile Number */}
        <TableCell>
          <Typography variant="body2">{newRow.mobileNumber}</Typography>
        </TableCell>

        {/* Operator Txn Id */}
        <TableCell>
          <Typography variant="body2">{newRow.vendorUtrNumber || '-'}</Typography>
        </TableCell>
        {/* Opening Balance */}
        <TableCell>
          <Typography variant="body2" whiteSpace={'nowrap'}>
            {fCurrency(newRow?.partnerDetails?.oldMainWalletBalance)}
          </Typography>
        </TableCell>

        {/* Transaction Amount */}
        <TableCell>
          <Typography variant="body2" whiteSpace={'nowrap'}>
            {fCurrency(newRow.amount) || 0}
          </Typography>
        </TableCell>

        {/* Charge/Commission */}
        <TableCell>
          <Stack flexDirection={'row'} justifyContent={'center'}>
            <Typography variant="body2" whiteSpace={'nowrap'} color={'error'}>
              - {fCurrency(newRow.debit) || 0}
            </Typography>{' '}
            /
            <Typography variant="body2" whiteSpace={'nowrap'} color={'green'}>
              + {fCurrency(newRow?.partnerDetails?.creditedAmount) || 0}
            </Typography>
          </Stack>
        </TableCell>

        {/* Closing Balance */}
        <TableCell>
          <Typography variant="body2" whiteSpace={'nowrap'}>
            {fCurrency(newRow?.partnerDetails?.newMainWalletBalance)}
          </Typography>
        </TableCell>

        {/* GST/TDS */}
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Typography variant="body2">GST : {fCurrency(newRow?.GST)}</Typography>
          <Typography variant="body2">TDS : {fCurrency(newRow?.TDS)}</Typography>
        </TableCell>

        <TableCell
          sx={{
            textTransform: 'lowercase',
            fontWeight: 600,
            textAlign: 'left',
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

        <TableCell>
          <Stack flexDirection={'row'} flexWrap={'nowrap'} width={100}>
            <IconButton>
              <img src={Group} alt="Receipt Icon" />
            </IconButton>
            {/* {newRow.status !== 'success' && newRow.status !== 'failed' && (
              <Tooltip title="Check Status" placement="top">
                <IconButton
                  onClick={() => CheckTransactionStatus(newRow)}
                  color="primary"
                  aria-label="check transaction status"
                >
                  <img src={autorenew} alt="Receipt Icon" />
                </IconButton>
              </Tooltip>
            )} */}
            <IconButton>
              <img src={receipt_long} alt="Receipt Icon" onClick={openModal} />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
      <Modal
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: '#ffffff',
            boxShadow: 24,
            p: 4,
            borderRadius: '20px',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        >
          <TableContainer id="pdf-content">
            <TableRow sx={{ display: 'flex' }}>
              <Typography fontSize={10} marginLeft={2}>
                {' '}
                <Typography fontSize={15}>{user?.shopAddress}</Typography>
                <Typography fontSize={10} sx={{ marginTop: '10px' }}>
                  <Typography fontSize={10}>
                    {' '}
                    Sender Details :{newRow?.user?.id?.firstName}
                    {newRow?.user?.id?.lastName}{' '}
                  </Typography>
                  <Typography fontSize={10}> Mobile Number :</Typography>
                  <Typography fontSize={10}> Service Type : {newRow?.categoryName}</Typography>
                </Typography>
              </Typography>
              <Typography variant="h6" marginLeft={15}>
                PAYMENT RECEIPT
              </Typography>
              <TableCell>
                <Typography marginLeft={3}>
                  {/* <img src={LogoMain} alt="LOGO" width={'100%'} height={'100%'} />{' '} */}
                  <Typography variant="h6">
                    {' '}
                    Benificary Details
                    <br />
                  </Typography>
                  <Typography fontSize={10}>
                    {' '}
                    Account Holder Name : {newRow.moneyTransferBeneficiaryDetails.beneName}
                  </Typography>
                  <Typography fontSize={10}>
                    {' '}
                    Bank Name : {newRow.moneyTransferBeneficiaryDetails.bankName}{' '}
                  </Typography>
                  <Typography fontSize={10}>
                    Account Number :{newRow.moneyTransferBeneficiaryDetails.accountNumber}
                  </Typography>
                  <Typography fontSize={10}>
                    {' '}
                    IFSC :{newRow.moneyTransferBeneficiaryDetails.ifsc}
                  </Typography>
                </Typography>
              </TableCell>
            </TableRow>
            <Table sx={{ border: '1px solid black' }}>
              <TableHead>
                <TableRow sx={{ border: '1px solid black' }}>
                  <TableCell sx={{ border: '1px solid black' }}>Tramo ID</TableCell>
                  <TableCell sx={{ border: '1px solid black' }} align="center">
                    Mode
                  </TableCell>
                  <TableCell sx={{ border: '1px solid black' }} align="center">
                    UTR
                  </TableCell>
                  <TableCell sx={{ border: '1px solid black' }} align="center">
                    Amount
                  </TableCell>
                  <TableCell sx={{ border: '1px solid black' }} align="center">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableCell sx={{ whiteSpace: 'nowrap', border: '1px solid black' }}>
                  <Typography variant="subtitle2">{newRow.clientRefId}</Typography>
                </TableCell>
                <TableCell sx={{ border: '1px solid black' }}>
                  <Typography>{newRow.productName}</Typography>
                </TableCell>
                <TableCell sx={{ placeItems: 'center', border: '1px solid black' }}>
                  <Typography>{newRow.vendorUtrNumber}</Typography>
                </TableCell>
                <TableCell sx={{ placeItems: 'center', border: '1px solid black' }}>
                  <Typography>{newRow.amount}</Typography>
                </TableCell>
                <TableCell
                  sx={{
                    textTransform: 'lowercase',
                    fontWeight: 600,
                    textAlign: 'left',
                    border: '1px solid black',
                  }}
                >
                  <Typography>{newRow.status}</Typography>
                </TableCell>
              </TableBody>
              <TableCell sx={{ columnSpan: '5' }}>
                <Typography fontSize={9}>
                  Transaction Amount:{newRow.amount}
                  <Typography fontSize={9}>Convienience Fee:{newRow.amount}</Typography>
                  <Typography fontSize={9}>Total Amount:{newRow.newMainWalletBalance}</Typography>
                </Typography>
              </TableCell>
            </Table>
            <Typography variant="body2" paddingBottom={1}>
              Note: This transaction receipt is generated automatically and dose not require a
              physical signature. It is not a tax invoice but serves as a record of your transaction
              with Tramo. Please retain it for your refrence, and if you have any queries, fell free
              to contact our Customer Support team.
            </Typography>
          </TableContainer>
          <Stack flexDirection={'row'}>
            <Button onClick={closeModal}>close</Button>
            <Button onClick={generatePDF}>download receipt</Button>
          </Stack>
        </Grid>
      </Modal>
    </>
  );
}
