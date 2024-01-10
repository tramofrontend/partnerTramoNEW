import { Suspense, lazy, ElementType } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

//Login
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
// export const ResetPasswordPage = Loadable(
//   lazy(() => import('../pages/auth/AuthResetPasswordForm'))
// );
// export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/AuthNewPasswordForm')));

// //DashBoard
export const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
//help and support
export const HelpAndSupport = Loadable(lazy(() => import('../pages/SupportTicket')));
//PartnerBilling
export const PartnerBilling = Loadable(lazy(() => import('../pages/PartnerBilling')));
export const Referenceapidocs = Loadable(lazy(() => import('../pages/Referenceapidocs')));

// export const PageOne = Loadable(lazy(() => import("../pages/PageOne")));
// export const PageTwo = Loadable(lazy(() => import("../pages/PageTwo")));
// export const PageThree = Loadable(lazy(() => import("../pages/PageThree")));
// export const PageFour = Loadable(lazy(() => import("../pages/PageFour")));
// export const PageFive = Loadable(lazy(() => import("../pages/PageFive")));
// export const PageSix = Loadable(lazy(() => import("../pages/PageSix")));

export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
