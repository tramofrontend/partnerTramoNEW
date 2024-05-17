import { Helmet } from 'react-helmet-async';
// sections
import ResetPassword from 'src/sections/auth/ResetPassword';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Reset Password </title>
      </Helmet>

      <ResetPassword />
    </>
  );
}
