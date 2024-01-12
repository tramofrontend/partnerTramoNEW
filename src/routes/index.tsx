import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config';
//
import {
  Page404,
  LoginPage,
  Dashboard,
  HelpAndSupport,
  PartnerBilling,
  Referenceapidocs,
  MyTransactions,
  WalletLadgerEntry,
  MyFundDeposit,
  MyActiveSecvices,
  ApiCredentials,
  MyScheme,
  BBPSSchemePage,
  BankDetail,
  AepsSettlement,
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: '/auth',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'helpsupport', element: <HelpAndSupport /> },
        {
          path: 'partnerbilling',
          element: <PartnerBilling />,
        },
        {
          path: 'Referenceapidocs',
          element: <Referenceapidocs />,
        },
        {
          path: 'apicredentials',
          element: <ApiCredentials />,
        },

        {
          path: 'transactions',
          children: [
            {
              element: <Navigate to="/auth/transaction/mytransaction" replace />,
              index: true,
            },
            { path: 'mytransactions', element: <MyTransactions /> },
            { path: 'Mywalletlaser', element: <WalletLadgerEntry /> },
          ],
        },

        {
          path: 'myservices',
          children: [
            {
              element: <Navigate to="/dashboard/myservices/MyActiveServices" replace />,
              index: true,
            },
            { path: 'MyActiveServices', element: <MyActiveSecvices /> },
            { path: 'MyScheme', element: <MyScheme /> },
            { path: 'BBPSSchemePage', element: <BBPSSchemePage /> },
          ],
        },
        {
          path: 'fundmanagement',
          children: [
            {
              element: <Navigate to="/auth/fundmanagement/myfunddeposits" replace />,
              index: true,
            },
            { path: 'myfunddeposit', element: <MyFundDeposit /> },
            { path: 'bankDetail', element: <BankDetail /> },
            { path: 'aepssettlement', element: <AepsSettlement /> },
          ],
        },
      ],
    },

    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
