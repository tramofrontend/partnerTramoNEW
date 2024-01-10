import { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, IconButton, InputAdornment, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
import { useSnackbar } from '../../components/snackbar';
import FormProvider, { RHFTextField, RHFCodes } from '../../components/hook-form';

import { Api } from '../../webservices';
// ----------------------------------------------------------------------

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
  otp6: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
};

export default function AuthNewPasswordForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const [mess, setMess] = useState('Enter your OTP');

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const emailRecovery =
    typeof window !== 'undefined' ? sessionStorage.getItem('email-recovery') : '';
  const mobileRecovery =
    typeof window !== 'undefined' ? sessionStorage.getItem('mobile-recovery') : '';

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('Code is required'),
    code2: Yup.string().required('Code is required'),
    code3: Yup.string().required('Code is required'),
    code4: Yup.string().required('Code is required'),
    code5: Yup.string().required('Code is required'),
    code6: Yup.string().required('Code is required'),
    otp1: Yup.string().required('Code is required'),
    otp2: Yup.string().required('Code is required'),
    otp3: Yup.string().required('Code is required'),
    otp4: Yup.string().required('Code is required'),
    otp5: Yup.string().required('Code is required'),
    otp6: Yup.string().required('Code is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    mobile: Yup.string().required('mobile is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    otp5: '',
    otp6: '',
    email: emailRecovery || '',
    mobile: mobileRecovery || '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    let id = localStorage.getItem('userId');
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // console.log('DATA:', {
      //   email: data.email,
      //   code: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
      //   password: data.password,
      // });
      const body = {
        userId: localStorage.getItem('userId'),
        e_otp: data.code1 + data.code2 + data.code3 + data.code4 + data.code5 + data.code6,
        m_otp: data.otp1 + data.otp2 + data.otp3 + data.otp4 + data.otp5 + data.otp6,
        password: data.password,
      };

      await Api(`apiBox/otpVerifyAndResetPassword`, 'POST', body, '').then((Response: any) => {
        console.log('=============>' + JSON.stringify(Response));
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            setMess(Response.data.responseMessage);
            sessionStorage.removeItem('email-recovery');
            enqueueSnackbar('Change password success!');
            navigate(PATH_DASHBOARD.root);
          } else {
            setMess(Response.data.responseMessage);
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>{mess}</strong>
      </Alert>
      <Stack spacing={3}>
        <RHFTextField
          name="email"
          label="Email"
          disabled={!!emailRecovery}
          InputLabelProps={{ shrink: true }}
        />

        <RHFCodes keyName="code" inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6']} />

        {(!!errors.code1 ||
          !!errors.code2 ||
          !!errors.code3 ||
          !!errors.code4 ||
          !!errors.code5 ||
          !!errors.code6) && (
          <FormHelperText error sx={{ px: 2 }}>
            Code is required
          </FormHelperText>
        )}
        <RHFTextField
          name="mobile"
          label="Mobile"
          disabled={!!mobileRecovery}
          InputLabelProps={{ shrink: true }}
        />

        <RHFCodes keyName="otp" inputs={['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6']} />

        {(!!errors.otp1 ||
          !!errors.otp2 ||
          !!errors.otp3 ||
          !!errors.otp4 ||
          !!errors.otp5 ||
          !!errors.otp6) && (
          <FormHelperText error sx={{ px: 2 }}>
            Code is required
          </FormHelperText>
        )}

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Confirm New Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword1(!showPassword1)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
        >
          Update Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
