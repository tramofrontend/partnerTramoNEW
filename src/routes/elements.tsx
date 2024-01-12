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

// DashBoard
export const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
// Trasactions
export const MyTransactions = Loadable(lazy(() => import('../pages/MyTransaction')));
// walletladger
export const WalletLadgerEntry = Loadable(lazy(() => import('../pages/WalletLadger')));

//MyActiveSecvices
export const MyActiveSecvices = Loadable(
  lazy(() => import('../sections/MyServices/MyActiveSecvices'))
);

export const MyScheme = Loadable(
  lazy(() => import('../sections/MyServices/ViewScheme/MySchemePage'))
);

export const BBPSSchemePage = Loadable(
  lazy(() => import('../sections/MyServices/ViewScheme/BBPSSchemePage'))
);

//help and support
export const HelpAndSupport = Loadable(lazy(() => import('../pages/SupportTicket')));
//PartnerBilling
export const PartnerBilling = Loadable(lazy(() => import('../pages/PartnerBilling')));

export const ApiCredentials = Loadable(
  lazy(() => import('../sections/apicredentials/ApiCredentials'))
);

//Referenceapidocs
export const Referenceapidocs = Loadable(lazy(() => import('../pages/Referenceapidocs')));
//Fund Requests
export const MyFundDeposit = Loadable(
  lazy(() => import('../sections/FundManagement/MyFundDeposites'))
);

export const BankDetail = Loadable(lazy(() => import('../sections/FundManagement/BankDetail')));

export const AepsSettlement = Loadable(
  lazy(() => import('../sections/FundManagement/AEPSsettlement'))
);

// export const MyFundRequest = Loadable(
//   lazy(() => import("../sections/FundManagement/MyFundRequest"))
// );
// export const ManageFundFlow = Loadable(
//   lazy(() => import("../sections/FundManagement/ManageFundFlow"))
// );
// export const MyNetwrokFunds = Loadable(
//   lazy(() => import("../sections/FundManagement/MyNetworkFunds"))
// );

export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
