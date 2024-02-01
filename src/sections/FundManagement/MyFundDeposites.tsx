import { useEffect, useState, useCallback } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { LoadingButton } from '@mui/lab';
import FormLabel from '@mui/material/FormLabel';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Container,
  Card,
  Stack,
  Grid,
  InputAdornment,
  Tabs,
  Button,
  Typography,
  Tab,
  TextField,
  FormControl,
  CircularProgress,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Modal,
  FormControlLabel,
  styled,
  SwitchProps,
  Checkbox,
  Switch,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Upload } from 'src/components/upload';
import { useSnackbar } from 'notistack';
import { UploadFile } from 'src/webservices';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { Api } from 'src/webservices';
import React from 'react';
import InstantDepositAccount from './InstantDepositAccount';
import AllBankDetails from './AllBankDetails';
import AllRequests from './AllRequests';
import Image from 'src/components/image/Image';
// import neodeposit from 'src/assets/deposit icon/neodeposit.svg';
import { truncate } from 'lodash';

type FormValuesProps = {
  rupee: string;
  mobile: string;
  branch: string;
  trxID: string;
  amount: string;
};

function MyFundDeposits() {
  const { enqueueSnackbar } = useSnackbar();
  const [success, setSuccess] = useState('upload');

  const handleDropSingleFile = useCallback((acceptedFiles: File[]) => {
    const uploadFile = acceptedFiles[0];
    setSuccess('upload');
    if (uploadFile) {
      setUploadFile(
        Object.assign(uploadFile, {
          preview: URL.createObjectURL(uploadFile),
        })
      );
    }
  }, []);

  const [uploadFile, setUploadFile] = useState<any>();
  const [docUrl, setDocUrl] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedBankID, setSelectedBankID] = useState<any>([]);
  const [selectedMode, setSelectedMode] = useState<any>([]);
  const [selectedModes, setSelectedModes] = useState<any>([]);
  const [selectedModeId, setSelectedModeId] = useState(null);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    dayjs(new Date()) || dayjs('')
  );
  const [dataB, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [requestRaise, setRequestRaise] = useState(false);
  const [newAmmount, setNewAmmount] = useState<any>();
  const { control, setValue } = useForm();
  const [allAmount, setAllAmount] = useState<any>();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [minAmount, setMinAmount] = useState<any>();
  const [maxAmount, setMaxAmount] = useState<any>();
  const [verifyLoding, setVerifyLoading] = useState(false);
  const handleChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
  };

  const formattedDate = selectedDate
    ? selectedDate.format('DD/MM/YYYY') // Use dayjs.format to format the date
    : '';

  // ----------------------------------------------------------------------

  const RegisterSchema = Yup.object().shape({
    mobile: Yup.string()
      .matches(/^\d{10}$/, 'Mobile number must contain only 10 numbers')
      .min(10, 'Mobile number must be at least 10 digits')
      .max(10, 'Mobile number must not exceed 10 digits')
      .required('Mobile number is required'),
  });

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
    console.log('Selected option:', event.target.value);
  };

  useEffect(() => {
    getBankDeatails();
  }, []);

  const handleSelectChange = (event: any) => {
    setSelectedItem(event.target.value);

    setSelectedBankID(event.target.value._id);
    let token = localStorage.getItem('token');
    Api(`apiBox/fundManagement/getAdminBank/` + event.target.value._id, 'GET', '', token).then(
      (Response: any) => {
        console.log(
          '======>>>>>Modes List  Response====>>>>>>',
          Response.data.data.modes_of_transfer
        );

        if (Response.status == 200) {
          if (Response.data.code == 200) {
            const ModesNames = Response.data.data.modes_of_transfer;
            setSelectedMode(ModesNames);
            setMinAmount(Response.data.data.min_Deposit_Amount);
            setMaxAmount(Response.data.data.max_Deposit_Amount);
          } else {
            console.log('======BankList=======>' + Response);
          }
        }
      }
    );
  };

  const handleSelectModes = (event: any) => {
    setSelectedModes(event.target.value);
    setSelectedModeId(event.target.value.modeId);
  };

  const handleRupeeChange = (e: any) => {
    const amount = e.target.value;
    setValue('amount', amount);
    setAllAmount(amount);
    if (selectedModes.transactionFeeType === 'Charge') {
      if (
        selectedModes.transactionFeeOption.for_Agent === 'percentage' ||
        selectedModes.transactionFeeOption.for_Agent === 'percentage' ||
        selectedModes.transactionFeeOption.for_Agent === 'percentage'
      ) {
        const finalAmmount: number = (amount * selectedModes.transactionFeeValue.for_Agent) / 100;

        setNewAmmount(finalAmmount);
      } else if (
        selectedModes.transactionFeeOption.for_Agent === 'flat' ||
        selectedModes.transactionFeeOption.for_Agent === 'flat' ||
        selectedModes.transactionFeeOption.for_Agent === 'flat'
      ) {
        const finalAmmount: number = amount - selectedModes.transactionFeeValue.for_Agent;

        setNewAmmount(finalAmmount);
      }
    } else if (selectedModes.transactionFeeType === 'Commission') {
      if (
        selectedModes.transactionFeeOption.for_Agent === 'percentage' ||
        selectedModes.transactionFeeOption.for_Agent === 'percentage' ||
        selectedModes.transactionFeeOption.for_Agent === 'percentage'
      ) {
        const finalAmmount: number = (amount * selectedModes.transactionFeeValue.for_Agent) / 100;
        setNewAmmount(finalAmmount);
      } else if (
        selectedModes.transactionFeeOption.for_Agent === 'flat' ||
        selectedModes.transactionFeeOption.for_Agent === 'flat' ||
        selectedModes.transactionFeeOption.for_Agent === 'flat'
      ) {
        const finalAmmount: number = amount - selectedModes.transactionFeeValue.for_Agent;

        setNewAmmount(finalAmmount);
      }
    }
  };

  const defaultValues = { rupee: '', mobile: '', branch: '', trxID: '', amount: '' };

  const methods = useForm<FormValuesProps>({
    mode: 'onChange',
    resolver: yupResolver(RegisterSchema),

    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const getBankDeatails = () => {
    setVerifyLoading(true);
    let token = localStorage.getItem('token');
    Api(`apiBox/fundManagement/getAdminBank`, 'GET', '', token).then((Response: any) => {
      console.log('======>>>>>Bank List  Response====>>>>>>', Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          const bankNames = Response.data.data.map((item: any) => item);
          setData(bankNames);

          setVerifyLoading(false);
        } else {
          console.log('======BankList=======>' + Response);
        }
      }
    });
  };

  const uploadDoc = () => {
    setSuccess('wait');
    let doc = uploadFile;
    let token = localStorage.getItem('token');
    let formData = new FormData();
    formData.append('document', doc);
    formData.append('directoryName', 'others');
    UploadFile(`upload/upload_agent_doc`, formData, token).then((Response: any) => {
      // console.log("=====token===aadharFront===", token)
      console.log('=====uploadAadharfrontResponse========>' + JSON.stringify(Response));
      if (Response.status == 200) {
        if (Response.data.status == 'success') {
          enqueueSnackbar('successfully file uploaded');
          setDocUrl(Response.data.filePath);
          console.log('===200=aadharFront====', Response.data.filePath);
          setSuccess('success');
        } else {
          enqueueSnackbar('Server didn`t response', { variant: 'error' });
          console.log('=====404=aadharFront===', Response.data.message);
        }
      } else {
        enqueueSnackbar('file must be less then 1mb', { variant: 'error' });
      }
    });
  };

  const onSubmit = async (data: FormValuesProps) => {
    setVerifyLoading(true);
    let token = localStorage.getItem('token');
    let body = {
      bankId: selectedBankID,
      modeId: selectedModeId,
      // amount: allAmount,
      amount: data.amount,
      date_of_deposit: formattedDate,
      transactional_details: {
        branch: data.branch,
        trxId: data.trxID,
        mobile: data.mobile,
      },
      request_to: 'ADMIN',
      transactionSlip: docUrl,
    };

    Api(`apiBox/fundManagement/raiseRequest`, 'POST', body, token).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setRequestRaise(true);
          setButtonDisabled(true);
          setVerifyLoading(false);
          reset(defaultValues);
          setSelectedItem('');
          setMaxAmount('');
          setMinAmount('');
          setSelectedModes([]);
          setUploadFile('');
          // setAllAmount();

          enqueueSnackbar(Response.data.message);
        } else {
          enqueueSnackbar(Response.data.message);
        }
      }
    });
  };

  return (
    <>
      <Grid sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack
            borderRadius={'10px'}
            sx={{ bgcolor: '#00000', boxShadow: '5', px: 2, display: 'grid', gap: 1 }}
          >
            <Tabs value={'active'} aria-label="basic tabs example">
              <Tab
                sx={{ mx: 3, textAlign: 'start' }}
                value={'active'}
                label={
                  <Grid
                    display={'grid'}
                    gridTemplateColumns={'repeat(2, auto)'}
                    gap={1}
                    alignItems={'center'}
                  >
                    {/* <Image
                      src={neodeposit}
                      alt=""
                      sx={{ width: 30, height: 30, objectFit: 'cover' }}
                    /> */}
                    <Stack>
                      <Typography variant="h5">{'New Fund Request'}</Typography>
                    </Stack>
                  </Grid>
                }
              />
            </Tabs>

            <FormControl variant="outlined" size="small">
              <InputLabel id="data-select-label">Select Bank</InputLabel>

              {verifyLoding ? (
                <CircularProgress />
              ) : (
                <Select
                  labelId="data-select-label"
                  id="data-select"
                  value={selectedItem}
                  onChange={handleSelectChange}
                  label="Select an Bank"
                >
                  {dataB.map((item: any) => (
                    <MenuItem key={item._id} value={item}>
                      {item.bank_details.bank_name}{' '}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>

            <FormControl variant="outlined" size="small">
              <InputLabel id="data-select-label">Select Mode</InputLabel>
              <Select
                labelId="data-select-label"
                id="data-select"
                value={selectedModes}
                onChange={handleSelectModes}
                label="Select Mode"
              >
                {selectedMode.map((item: any) => (
                  <MenuItem key={item._id} value={item}>
                    {item.modeName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Stack>
              <Typography variant="overline" display="block" gutterBottom>
                Min Amount :{minAmount} And Max Amount : {maxAmount}
              </Typography>
              {/* <Controller
                name="amount"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <RHFTextField
                    {...field}
                    variant="outlined"
                    label="Enter Amount"
                    size="small"
                    onChange={handleRupeeChange}
                  />
                )}
              /> */}
              <RHFTextField name="amount" label="Amount" size="small" />

              {selectedModes?.transactionFeeValue && (
                <Typography variant="overline" display="block" gutterBottom>
                  {/* Charge : {newAmmount} */}
                  {selectedModes.transactionFeeType === 'Charge' &&
                  selectedModes?.transactionFeeValue?.for_Agent > 0 ? (
                    <>
                      {' '}
                      <Typography color={'red'}>
                        Charge : {selectedModes?.transactionFeeValue?.for_Agent}{' '}
                      </Typography>{' '}
                    </>
                  ) : selectedModes.transactionFeeType === 'Commission' &&
                    selectedModes?.transactionFeeValue?.for_Agent > 0 ? (
                    <>
                      {' '}
                      <Typography color={'green'}>
                        {' '}
                        Commission : {selectedModes?.transactionFeeValue?.for_Agent}{' '}
                      </Typography>
                    </>
                  ) : (
                    ''
                  )}
                </Typography>
              )}
            </Stack>
            <RHFTextField
              type="number"
              name="mobile"
              label="Registered Mobile Number"
              size="small"
            />
            <Stack flexDirection={'row'} gap={2}>
              <RHFTextField name="branch" label="Branch" size="small" />
              <RHFTextField name="trxID" label="TRXID" size="small" />
            </Stack>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date "
                inputFormat="DD/MM/YYYY"
                maxDate={dayjs(new Date())}
                minDate={dayjs(new Date().setDate(new Date().getDate() - 4))}
                value={selectedDate}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} sx={{ size: 'small' }} />}
              />
            </LocalizationProvider>
            <Stack>
              <Stack>Upload Receipt</Stack>
              <Upload
                file={uploadFile}
                onDrop={handleDropSingleFile}
                onDelete={() => setUploadFile(null)}
              />
              <Stack
                flexDirection={'row'}
                mt={2}
                style={uploadFile != null ? { visibility: 'visible' } : { visibility: 'hidden' }}
              >
                {success == 'upload' ? (
                  <LoadingButton
                    variant="contained"
                    component="span"
                    style={{ width: 'fit-content' }}
                    onClick={() => uploadDoc()}
                  >
                    Upload File
                  </LoadingButton>
                ) : (
                  ''
                )}
              </Stack>
            </Stack>

            {verifyLoding ? (
              <CircularProgress />
            ) : (
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ mt: 1 }}
                // disabled={isButtonDisabled}
              >
                Submit{' '}
              </LoadingButton>
            )}
            {/*  */}
          </Stack>
        </FormProvider>
        <Stack
          sx={{
            bgcolor: '#00000',
            boxShadow: '5',
          }}
          borderRadius={'10px'}
          textAlign={'left'}
          gap={2}
        >
          <AllBankDetails />
        </Stack>

        <Stack
          sx={{
            bgcolor: '#00000',
            boxShadow: '5',
          }}
          borderRadius={'10px'}
          textAlign={'left'}
          gap={2}
        >
          <InstantDepositAccount />
        </Stack>
      </Grid>
      <Grid>
        <Stack
          sx={{
            bgcolor: '#00000',
            boxShadow: '5',
          }}
          borderRadius={'10px'}
          py={5}
          gap={2}
        >
          <AllRequests requestRaise={requestRaise} banklist={dataB} />
        </Stack>
      </Grid>
    </>
  );
}

export default MyFundDeposits;
