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
        // { path: "newleads", element: <NewLeads /> },
        // { path: "newleadsteps", element: <NewLeadSteps /> },
        // { path: "ournetwork", element: <OurNetwork /> },
        // {
        //   path: "scheme",
        //   children: [
        //     {
        //       element: <Navigate to="/auth/scheme/AllScheme" replace />,
        //       index: true,
        //     },
        //     { path: "AllScheme", element: <AllScheme /> },
        //     { path: "AddNewScheme", element: <AddNewSchemePage /> },
        //     { path: "EditScheme", element: <EditScheme /> },
        //     { path: "mapSchemeSetting", element: <MapSchemeSetting /> },
        //     { path: "AllbbpsScheme", element: <AllBBPSScheme /> },
        //     { path: "EditBBPSScheme", element: <EditBBPSScheme /> },
        //     { path: "AddNewbbpsScheme", element: <AddNewBBPSScheme /> },
        //     { path: "mapbbpsScheme", element: <MapBBPSScheme /> },
        //   ],
        // },
        // {
        //   path: "product",
        //   children: [
        //     {
        //       element: (
        //         <Navigate to="/auth/product/productmanagement" replace />
        //       ),
        //       index: true,
        //     },
        //     { path: "productmanagement", element: <ProductManagement /> },
        //     { path: "assignvendor", element: <AssignVendor /> },
        //     { path: "mapshortcode", element: <MapShortCode /> },
        //   ],
        // },
        // {
        //   path: "vendor",
        //   children: [
        //     {
        //       element: <Navigate to="/auth/vendor/vendormanagement" replace />,
        //       index: true,
        //     },
        //     { path: "vendormanagement", element: <VendorManagement /> },
        //     { path: "moneytransferslots", element: <MoneyTransferSlots /> },
        //     { path: "dmtslots", element: <DmtSlots /> },
        //     { path: "aepsslots", element: <AepsSlots /> },
        //     { path: "bbpslots", element: <BbpsSlots /> },
        //   ],
        // },
        // {
        //   path: "fundmanagement",
        //   children: [
        //     {
        //       element: <Navigate to="/auth/fundmanagement/addbank" replace />,
        //       index: true,
        //     },
        //     { path: "addbank", element: <AddBankAccount /> },
        //     { path: "adminfundflow", element: <AdminFundFlow /> },
        //     { path: "fundrequest", element: <FundRequest /> },
        //   ],
        // },
        // { path: "bbpsmanagement", element: <BbpsManagement /> },
        // { path: "rollmanagement", element: <RollManagement /> },
        // {
        //   path: "contentmanagement",
        //   children: [
        //     {
        //       element: (
        //         <Navigate to="/auth/contentmanagement/faqmanagement" replace />
        //       ),
        //       index: true,
        //     },
        //     { path: "faqmanagement", element: <Faqmanagement /> },
        //     { path: "updateimage", element: <Updateimages /> },
        //   ],
        // },
        // {
        //   path: "tools",
        //   children: [
        //     {
        //       element: <Navigate to="/auth/tools/smsmanagement" replace />,
        //       index: true,
        //     },
        //     { path: "smsmanagement", element: <SmsEmailManagement /> },
        //     { path: "panvarified", element: <PanVarified /> },
        //     { path: "docusign", element: <DocuSignUpdate /> },
        //     { path: "newsnotifications", element: <NewsNotifications /> },
        //     { path: "vendorswitch", element: <VendorSwitch /> },
        //     { path: "accountrecovery", element: <AccountRecovery /> },
        //     { path: "bankmaster", element: <BankMaster /> },
        //     { path: "newsflash", element: <NewsFlash /> },
        //     { path: "uploadexternaldata", element: <UploadExternalData /> },
        //     { path: "enablediscategories", element: <EnableDisCategories /> },
        //     { path: "aeps", element: <AEPS /> },
        //     { path: "Other", element: <Other /> },
        //   ],
        // },
        // {
        //   path: "reports",
        //   children: [
        //     {
        //       element: (
        //         <Navigate to="/auth/reports/alltransactionrecord" replace />
        //       ),
        //       index: true,
        //     },
        //     {
        //       path: "alltransactionrecord",
        //       element: <AllTransactionRecords />,
        //     },
        //     { path: "fundflow", element: <FundFlow /> },
        //     {
        //       path: "userwisetransactionrecord",
        //       element: <UserwiseTransactionRecords />,
        //     },
        //     { path: "WalletLadger", element: <WalletLadger /> },
        //     {
        //       path: "WaitingAreaForDuplicateTxn",
        //       element: <WaitingAreaForDuplicateTxn />,
        //     },
        //     { path: "HistoricalDataExport", element: <HistoricalDataExport /> },
        //   ],
        // },
        // { path: "docapireference", element: <DocApiReference /> },
        // { path: "salesmanagement", element: <SalesManagement /> },
        // { path: "one", element: <PageOne /> },
        // { path: "two", element: <PageTwo /> },
        // { path: "three", element: <PageThree /> },
        // {
        //   path: "user",
        //   children: [
        //     {
        //       element: <Navigate to="/dashboard/user/four" replace />,
        //       index: true,
        //     },
        //     { path: "four", element: <PageFour /> },
        //     { path: "five", element: <PageFive /> },
        //     { path: "six", element: <PageSix /> },
        //   ],
        // },
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
