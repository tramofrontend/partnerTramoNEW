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
  // PageOne,
  // PageTwo,
  // PageSix,
  // PageFour,
  // PageFive,
  // PageThree,
  LoginPage,
  Dashboard,
  HelpAndSupport,
  PartnerBilling,
  Referenceapidocs,
  MyTransaction,
  WalletLadger,
  MyFundDeposits,
  MyActiveSecvices,
  // ResetPasswordPage,
  // NewPasswordPage,
  // NewLeadSteps,
  // OurNetwork,
  // AllScheme,
  // AddNewSchemePage,
  // EditScheme,
  // MapSchemeSetting,
  // AllBBPSScheme,
  // EditBBPSScheme,
  // AddNewBBPSScheme,
  // MapBBPSScheme,
  // ProductManagement,
  // AssignVendor,
  // MapShortCode,
  // VendorManagement,
  // MoneyTransferSlots,
  // DmtSlots,
  // AepsSlots,
  // BbpsSlots,
  // AddBankAccount,
  // AdminFundFlow,
  // FundRequest,
  // BbpsManagement,
  // RollManagement,
  // Faqmanagement,
  // Updateimages,
  // SmsEmailManagement,
  // PanVarified,
  // DocuSignUpdate,
  // NewsNotifications,
  // VendorSwitch,
  // AccountRecovery,
  // BankMaster,
  // NewsFlash,
  // UploadExternalData,
  // EnableDisCategories,
  // AEPS,
  // Other,
  // AllTransactionRecords,
  // FundFlow,
  // UserwiseTransactionRecords,
  // WalletLadger,
  // WaitingAreaForDuplicateTxn,
  // HistoricalDataExport,
  // DocApiReference,
  // SalesManagement,
} from './elements';
// import NewLeads from "src/pages/NewLeads";

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
      ],
    },

    {
      path: 'transaction',
      children: [
        {
          element: <Navigate to="/auth/transaction/mytransaction" replace />,
          index: true,
        },
        { path: 'mytransaction', element: <MyTransaction /> },
        { path: 'walletladger', element: <WalletLadger /> },
      ],
    },
    {
      path: 'fundmanagement',
      children: [
        {
          element: <Navigate to="/auth/fundmanagement/myfunddeposits" replace />,
          index: true,
        },
        { path: 'myfunddeposits', element: <MyFundDeposits /> },
        // { path: "mybankaccount", element: <MyBankAccount /> },
        // { path: "aepssettlement", element: <AEPSsettlement /> },
        // { path: "myfundrequest", element: <MyFundRequest /> },
        // { path: "managefundflow", element: <ManageFundFlow /> },
        // { path: "mynetworkfunds", element: <MyNetwrokFunds /> },
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
        // { path: 'MyScheme', element: <MyScheme /> },
        // { path: 'BBPSSchemePage', element: <BBPSSchemePage /> },
      ],
    },

    {
      element: <CompactLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        // { path: 'resetpassword', element: <ResetPasswordPage /> },
        // { path: 'newpassword', element: <NewPasswordPage /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
