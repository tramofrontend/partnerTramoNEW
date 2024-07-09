//form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from 'src/components/hook-form/FormProvider';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import {
  Button,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useAuthContext } from 'src/auth/useAuthContext';
import { Api } from 'src/webservices';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';
import CustomPagination from 'src/components/customFunctions/CustomPagination';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import { fDate, fDateFormatForApi, fDateTime } from 'src/utils/formatTime';
import Iconify from 'src/components/iconify/Iconify';
import useCopyToClipboard from 'src/hooks/useCopyToClipboard';
import { useSnackbar } from 'notistack';
import AWS from 'aws-sdk';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import useResponsive from 'src/hooks/useResponsive';
import { ReportSkeleton } from 'src/components/Skeletons/ReportSkeleton';
import ApiDataLoading from 'src/components/customFunctions/ApiDataLoading';

type FormValuesProps = {
  typeOfReport: string;
  service: string;
  transactionValue: {
    transactionType: string;
    category: string;
    product: string;
    productName: string;
  };
  startDate: Date | null;
  endDate: Date | null;
};

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'ap-south-1',
});

export default function Reports() {
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useResponsive('up', 'sm');
  const [currentTab, setCurrentTab] = useState('transactionRecords');
  const [isLoading, setIsLoading] = useState(false);

  const [directFilter, setDirectFilter] = useState<any>([
    {
      label: 'Account Verification',
      value: {
        transactionType: 'Beneficiary Verification',
        category: '',
        product: '',
        productName: '',
      },
    },
    {
      label: 'UPI verification',
      value: {
        transactionType: 'UPI Verification',
        category: '',
        product: '',
        productName: '',
      },
    },
  ]);

  const [reportList, setReportList] = useState([]);

  //pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(25);

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset(defaultValues);
  };

  const txnSchema = Yup.object().shape({
    typeOfReport: Yup.string().required(),
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

  const defaultValues = {
    typeOfReport: currentTab,
    service: '',
    transactionValue: {
      transactionType: '',
      category: '',
      product: '',
      productName: '',
    },
    startDate: null,
    endDate: null,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(txnSchema),
    defaultValues,
    mode: 'all',
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 720 },
    bgcolor: '#ffffff',
    p: 2,
    borderRadius: 2,
  };

  useEffect(() => getCategoryList(), []);
  useEffect(() => getReports(currentTab), [pageSize, currentPage]);

  const getCategoryList = useCallback(() => {
    let token = localStorage.getItem('token');
    Api(`category/get_CategoryList`, 'GET', '', token).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          console.log(
            Response.data.data.filter((test: any) =>
              user?.activeCategoryIds
                .map((item: any) => item.category_name)
                .includes(test.category_name)
            )
          );
          setDirectFilter((prevState: any) => [
            ...prevState,
            ...Response.data.data
              .filter((item: any) =>
                user?.activeCategoryIds
                  .map((item: any) => item.category_name)
                  .includes(item.category_name)
              )
              .map((item1: any) => {
                if (item1.category_name.toLowerCase() == 'kyc') {
                  Api(`product/get_ProductList/${item1._id}`, 'GET', '', token).then(
                    (Response: any) => {
                      if (Response.status == 200) {
                        if (Response.data.code == 200) {
                          setDirectFilter((state: any) => [
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
          ]);
        }
      }
    });
  }, []);

  const getReports = useCallback((val: string) => {
    setIsLoading(true);
    let token = localStorage.getItem('token');
    let body = {
      pageInitData: {
        pageSize: pageSize,
        currentPage: currentPage,
      },
    };
    Api(`transaction/transaction_record_history/${val}`, 'POST', body, token).then(
      (Response: any) => {
        console.log('======Transaction==response=====>' + Response);
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            setReportList(Response.data?.data?.data);
            setPageCount(Response.data?.data?.totalNumberOfRecords);
          }
        }
        setIsLoading(false);
      }
    );
  }, []);

  const onSubmit = async (data: FormValuesProps) => {
    console.log(data);
    let body = {
      from_date: fDateFormatForApi(data.startDate),
      to_date: fDateFormatForApi(data.endDate),
      type_of_report: currentTab,
      categoryId: data.transactionValue.category,
      transactionType: data.transactionValue.transactionType,
      productId: data.transactionValue.product,
      email: user?.email,
    };
    let token = localStorage.getItem('token');
    await Api(`transaction/download_transaction_report`, 'POST', body, token).then(
      (Response: any) => {
        console.log('======sumit==response=====>', Response);
        if (Response.status == 200) {
          enqueueSnackbar(Response.data.message);
          setTimeout(() => {
            getReports(currentTab);
          }, 1000);
          handleClose();
        } else {
          enqueueSnackbar(Response.data.message, { variant: 'error' });
        }
      }
    );
  };

  const DownloadReport = (val: string) => {
    console.log(process.env.REACT_APP_AWS_BUCKET_NAME);

    const s3 = new AWS.S3();
    const params = {
      Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
      Key: val !== '' && val?.split('/').splice(3, 3).join('/'),
      Expires: 600,
    };

    console.log('test url', params);
    s3.getSignedUrl('getObject', params, (err, url) => {
      window.open(url);
    });
  };

  if (isLoading) {
    return <ApiDataLoading />;
  }

  return (
    <React.Fragment>
      <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Tabs
          value={currentTab}
          onChange={(event, newValue) => {
            setCurrentTab(newValue);
            setCurrentPage(() => 1);
            getReports(newValue);
          }}
          aria-label="wrapped label tabs example"
        >
          <Tab
            value="transactionRecords"
            label=" Transaction Report"
            sx={{ fontSize: { xs: 14, md: 16 } }}
          />
          <Tab value="fundRequest" label="Fund Request" sx={{ fontSize: { xs: 14, md: 16 } }} />
          <Tab value="walletLedger" label=" Wallet Ledger" sx={{ fontSize: { xs: 14, md: 16 } }} />
        </Tabs>
        <Stack flexDirection={'row'} gap={1}>
          <Button variant="contained" onClick={handleOpen}>
            New Request
          </Button>
          <Tooltip title="Refresh" placement="top" onClick={() => getReports(currentTab)}>
            <IconButton>
              <Iconify
                icon="flowbite:refresh-outline"
                width={30}
                sx={
                  isLoading
                    ? {
                        animation: 'spin 2s linear infinite',
                        '@keyframes spin': {
                          '0%': {
                            transform: 'rotate(0deg)',
                          },
                          '100%': {
                            transform: 'rotate(360deg)',
                          },
                        },
                      }
                    : { animation: '' }
                }
              />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Card sx={{ mt: 1 }}>
        <TableContainer component={Paper}>
          <Scrollbar
            sx={
              isMobile
                ? { maxHeight: window.innerHeight - 200 }
                : { maxHeight: window.innerHeight - 180 }
            }
          >
            <Table stickyHeader aria-label="sticky table" size="small" sx={{ minWidth: 720 }}>
              <TableHeadCustom
                headLabel={[
                  { id: 'date', label: 'Date' },
                  { id: 'IPAddress ', label: ' Req. IP ' },
                  { id: 'Latitude ', label: 'Lat, Long' },
                  { id: 'From', label: 'From Date' },
                  { id: 'To', label: 'To Date' },
                  { id: 'Link Status ', label: 'Link Status ' },
                  { id: 'Download link ', label: 'Download link ' },
                ]}
              />
              <TableBody>
                {isLoading
                  ? [...Array(25)].map((row: any, index: number) => <ReportSkeleton key={index} />)
                  : reportList.map((row: any) => (
                      <ReportsRow key={row._id} row={row} download={DownloadReport} />
                    ))}
              </TableBody>
              {!reportList.length && <TableNoData isNotFound={!reportList.length} />}
            </Table>
          </Scrollbar>
        </TableContainer>
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

      <Modal open={open} onClose={handleClose}>
        <Grid sx={style}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid display={'grid'} gridTemplateColumns={'repeat(2, 1fr)'} gap={1}>
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
                        minWidth: 200,
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
                        minWidth: 200,
                        '& .css-d58xje-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled': {
                          '-webkit-text-fill-color': '#000000',
                        },
                      }}
                      disabled
                    />
                  )}
                />
              </LocalizationProvider>
              <RHFTextField name="typeOfReport" label="Type Of Report" disabled variant="filled" />
              <RHFSelect
                name="service"
                label="Service"
                SelectProps={{
                  native: false,
                  sx: { textTransform: 'capitalize' },
                }}
              >
                {directFilter.map((item: any) => (
                  <MenuItem
                    key={item.label}
                    value={item.label}
                    onClick={() => setValue('transactionValue', item.value)}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>
            <Stack flexDirection={'row'} justifyContent={'start'} my={1} gap={1}>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={isSubmitting}
                disabled={!isValid}
              >
                Submit
              </LoadingButton>
              <LoadingButton variant="outlined" onClick={handleClose}>
                Close
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Grid>
      </Modal>
    </React.Fragment>
  );
}

const ReportsRow = ({ row, download }: any) => {
  const { copy } = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();

  const onCopy = (text: string) => {
    if (text) {
      enqueueSnackbar('Copied!');
      copy(text);
    }
  };

  return (
    <TableRow key={row?._id} hover>
      <TableCell>
        <Typography variant="body2">{fDateTime(row.created_at)} </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">
          {row?.IP_address}
          <Tooltip title="Copy" placement="top">
            <IconButton onClick={() => onCopy(row?.IP_address)}>
              <Iconify icon="eva:copy-fill" width={20} />
            </IconButton>
          </Tooltip>
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2"> Lat : {row?.latitude} </Typography>
        <Typography variant="body2"> Long :{row?.longitude} </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{fDate(row?.from_date)} </Typography>
      </TableCell>{' '}
      <TableCell>
        <Typography variant="body2">{fDate(row?.to_date)} </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{row?.status} </Typography>
      </TableCell>{' '}
      <TableCell>
        <Button
          variant="contained"
          disabled={row?.status.toLowerCase() !== 'generated'}
          onClick={() => download(row?.url)}
        >
          Export
        </Button>
      </TableCell>
    </TableRow>
  );
};
