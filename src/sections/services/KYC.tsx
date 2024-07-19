import { useEffect, useRef, useState } from 'react';

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

export default React.memo(function KYC({ tableData }: any) {
  const isMobile = useResponsive('up', 'sm');
  const tableLabels = [
    { id: 'Date&Time', label: 'Date & Time' },
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

  return (
    <>
      <Helmet>
        <title> Transactions </title>
      </Helmet>
      <Card>
        <Scrollbar
          sx={
            isMobile
              ? { maxHeight: window.innerHeight - 210 }
              : { maxHeight: window.innerHeight - 164 }
          }
        >
          <Table size="small" aria-label="customized table" stickyHeader>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row: any) => (
                <TransactionRow key={row._id} row={row} />
              ))}
            </TableBody>
            {!tableData.length && <TableNoData isNotFound={!tableData.length} />}
          </Table>
        </Scrollbar>
      </Card>
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
