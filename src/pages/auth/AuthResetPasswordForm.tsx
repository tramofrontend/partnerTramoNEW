import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import FormProvider, { RHFTextField } from '../../components/hook-form';

import { Api } from '../../webservices';
import { useSnackbar } from 'notistack';
// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  mobile: string;
};

export default function AuthResetPasswordForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    mobile: Yup.string().required('Phone number is required'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
    // defaultValues: { email: 'demo@Tramos.cc' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));

      let token = localStorage.getItem('token');
      const body = {
        email: data.email,
        mobile: data.mobile,
      };
      await Api(`apiBox/forgot_password`, 'POST', body, token).then((Response: any) => {
        console.log('=============>' + JSON.stringify(Response));
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            sessionStorage.setItem('email-recovery', data.email);
            sessionStorage.setItem('mobile-recovery', data.mobile);
            localStorage.setItem('userId', Response.data.data.userId);
            enqueueSnackbar(Response.data.message);
            // navigate(PATH_AUTH.newPassword);
          } else {
            enqueueSnackbar(Response.data.message);
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="email" label="Email address" sx={{ mb: 2 }} />
      <RHFTextField type="number" name="mobile" label="Phone Number" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ mt: 3 }}
      >
        Send Request
      </LoadingButton>
    </FormProvider>
  );
}
