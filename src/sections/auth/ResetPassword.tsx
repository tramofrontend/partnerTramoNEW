import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
// components
import FormProvider, { RHFCodes, RHFTextField } from '../../components/hook-form';
import {
  Link,
  Stack,
  Typography,
  Button,
  Tooltip,
  Box,
  FormHelperText,
  InputAdornment,
  IconButton,
} from '@mui/material';

import React, { useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useSnackbar } from 'notistack';
import LoginLayout from '../../layouts/login';
import Logo from '../../assets/logo/tramoTrmao-Final-Logo.svg';
import { useNavigate } from 'react-router';
import { PATH_AUTH } from 'src/routes/paths';
import { Api } from 'src/webservices';
import { setConstantValue } from 'typescript';
import Iconify from 'src/components/iconify/Iconify';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  mobile: string;
  userId: string;
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
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    mobile: Yup.string().required('mobile number is required'),
  });
  const VerifyPasswordSchema = Yup.object().shape({
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
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(isOtpSend ? VerifyPasswordSchema : ResetPasswordSchema),
    defaultValues: {
      email: '',
      mobile: '',
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
      password: '',
      confirmPassword: '',
    },
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const body = {
        mobile: data.mobile,
        email: data.email,
      };
      await Api(`auth/forgotPassword`, 'POST', body, '').then((Response: any) => {
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            enqueueSnackbar(Response.data.message);
            setIsOtpSend(true);
            setValue('userId', Response.data.data.userId);
            // navigate('/verifyotp', {
            //   state: { userid: Response.data.data.userId },
            // });
          } else {
            enqueueSnackbar(Response.data.message, { variant: 'error' });
          }
        } else {
          enqueueSnackbar('Failed', { variant: 'error' });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onVerify = async (data: FormValuesProps) => {
    try {
      const body = {
        m_otp: data.code1 + data.code2 + data.code3 + data.code4 + data.code5 + data.code6,
        e_otp: data.otp1 + data.otp2 + data.otp3 + data.otp4 + data.otp5 + data.otp6,
        userId: data.userId,
        password: data.password,
      };
      await Api(`auth/otpVerifyAndResetPassword`, 'POST', body, '').then((Response: any) => {
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            enqueueSnackbar(Response.data.message);
            navigate(PATH_AUTH.login);
          } else {
            enqueueSnackbar(Response.data.message, { variant: 'error' });
          }
        } else {
          enqueueSnackbar('Failed', { variant: 'error' });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        component="img"
        src={Logo}
        alt="Logo"
        style={{ width: '160px', padding: '40px 0px 0px 40px', position: 'fixed' }}
      />
      <LoginLayout>
        <Button
          sx={{ position: 'absolute', top: { xs: '3.5%', sm: 40 }, right: '5%' }}
          variant={'contained'}
          onClick={() => navigate(PATH_AUTH.login)}
        >
          Login
        </Button>
        <FormProvider
          methods={methods}
          onSubmit={isOtpSend ? handleSubmit(onVerify) : handleSubmit(onSubmit)}
        >
          <Typography variant="h3" my={2} textAlign={'center'}>
            Reset Password
          </Typography>
          <Stack gap={3}>
            <RHFTextField
              type="number"
              name="mobile"
              label="Registered Mobile Number"
              disabled={isOtpSend}
            />
            <RHFTextField
              name="email"
              label="Registered Email address"
              type="email"
              disabled={isOtpSend}
            />
          </Stack>

          {isOtpSend ? (
            <Stack spacing={2}>
              <React.Fragment>
                <Typography variant="subtitle2" style={{ textAlign: 'left' }}>
                  Mobile Verification Code &nbsp;
                  <Link variant="subtitle2" style={{ float: 'right' }}>
                    Resend code
                  </Link>
                </Typography>
                <RHFCodes
                  keyName="code"
                  inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6']}
                />

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
              </React.Fragment>
              <React.Fragment>
                <Typography variant="subtitle2" style={{ textAlign: 'left' }}>
                  Email Verification Code &nbsp;
                  <Link sx={{ cursor: 'pointer' }} variant="subtitle2" style={{ float: 'right' }}>
                    Resend code
                  </Link>
                </Typography>
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
              </React.Fragment>

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
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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
                Verify
              </LoadingButton>
            </Stack>
          ) : (
            <React.Fragment>
              <Stack sx={{ my: 2 }}>
                <Typography variant="body2">
                  Already have the password{' '}
                  <Link
                    variant="body2"
                    color="inherit"
                    underline="always"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(PATH_AUTH.login)}
                  >
                    Login here?
                  </Link>
                </Typography>
              </Stack>

              <LoadingButton
                fullWidth
                size="medium"
                type="submit"
                variant="contained"
                sx={{ mb: 20 }}
                loading={isSubmitting}
              >
                Reset Password
              </LoadingButton>
            </React.Fragment>
          )}
        </FormProvider>
      </LoginLayout>
    </>
  );
}
