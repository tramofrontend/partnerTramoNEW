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
// export const Newleads = Loadable(lazy(() => import('../pages/NewLeads')));
// export const NewLeadSteps = Loadable(
//   lazy(() => import("../pages/NewLeadSteps"))
// );

// //ournetwork
// export const OurNetwork = Loadable(lazy(() => import("../pages/OurNetwork")));

// //schememanagement
// export const AllScheme = Loadable(
//   lazy(() => import("../sections/schememanagement/ViewAllScheme/ViewAllScheme"))
// );
// export const AddNewSchemePage = Loadable(
//   lazy(() => import("../sections/schememanagement/ManageScheme/AddNewScheme"))
// );
// export const EditScheme = Loadable(
//   lazy(() => import("../sections/schememanagement/ManageScheme/EditScheme"))
// );
// export const EditSchemeTable = Loadable(
//   lazy(() => import("../sections/schememanagement/Recharge/EditSchemeTable"))
// );
// export const MapSchemeSetting = Loadable(
//   lazy(() => import("../sections/schememanagement/MapScheme/MapSchemeSetting"))
// );
// export const AllBBPSScheme = Loadable(
//   lazy(
//     () =>
//       import("../sections/schememanagement/ViewAllBBPSScheme/ViewAllBBPSScheme")
//   )
// );
// export const AddNewBBPSScheme = Loadable(
//   lazy(
//     () =>
//       import("../sections/schememanagement/ManageBBPSscheme/AddNewBBPSScheme")
//   )
// );
// export const EditBBPSScheme = Loadable(
//   lazy(
//     () => import("../sections/schememanagement/ManageBBPSscheme/EditBBPSScheme")
//   )
// );
// export const MapBBPSScheme = Loadable(
//   lazy(() => import("../sections/schememanagement/MapBBPSscheme/MapBBPSScheme"))
// );

//product management
// export const ProductManagement = Loadable(
//   lazy(() => import("../pages/ProductManagement"))
// );
// export const AssignVendor = Loadable(
//   lazy(() => import("../pages/AssignVendor"))
// );
// export const MapShortCode = Loadable(
//   lazy(() => import("../pages/MapShortCode"))
// );

//vendor management
// export const VendorManagement = Loadable(
//   lazy(() => import("../pages/VendorManagement"))
// );
// export const MoneyTransferSlots = Loadable(
//   lazy(
//     () =>
//       import(
//         "../sections/vendormanagement/VendorMoneyTransfer/VendorMoneyTransferData"
//       )
//   )
// );
// export const DmtSlots = Loadable(
//   lazy(() => import("../sections/vendormanagement/VendorDMTdata/VendorDmtData"))
// );
// export const AepsSlots = Loadable(
//   lazy(
//     () => import("../sections/vendormanagement/VendorAEPSdata/VendorAepsData")
//   )
// );
// export const BbpsSlots = Loadable(
//   lazy(() => import("../sections/vendormanagement/VendorBBPSdata/BBPS"))
// );

// //fund management
// export const AddBankAccount = Loadable(
//   lazy(() => import("../sections/fundmanagement/AddBankAccount"))
// );
// export const AdminFundFlow = Loadable(
//   lazy(() => import("../sections/fundmanagement/AdminFundFlow"))
// );
// export const FundRequest = Loadable(
//   lazy(() => import("../sections/fundmanagement/FundRequest"))
// );

// //bbps management
// export const BbpsManagement = Loadable(
//   lazy(() => import("../pages/BBPSmanagement"))
// );

// //rollmanagement
// export const RollManagement = Loadable(
//   lazy(() => import("../pages/RollManagement"))
// );

// //content Management
// export const Faqmanagement = Loadable(
//   lazy(() => import("../sections/contentmanagement/FAQmanagement"))
// );
// export const Updateimages = Loadable(
//   lazy(() => import("../sections/contentmanagement/Updateimages"))
// );

// //tools
// export const SmsEmailManagement = Loadable(
//   lazy(() => import("../sections/tools/SmsTemplate"))
// );
// export const NewsNotifications = Loadable(
//   lazy(() => import("../sections/tools/NewsNotifications"))
// );
// export const VendorSwitch = Loadable(
//   lazy(() => import("../sections/tools/VendorSwitch/VendorSwitch"))
// );
// export const AccountRecovery = Loadable(
//   lazy(() => import("../sections/tools/AccountRecovery"))
// );
// export const NewsFlash = Loadable(
//   lazy(() => import("../sections/tools/NewsFlash/NewsFlash"))
// );
// export const BankMaster = Loadable(
//   lazy(() => import("../sections/tools/BankMaster/BankMaster"))
// );
// export const UploadExternalData = Loadable(
//   lazy(() => import("../sections/tools/UploadExternalData"))
// );
// export const EnableDisCategories = Loadable(
//   lazy(() => import("../sections/tools/EnableDisCategories"))
// );
// export const Other = Loadable(lazy(() => import("../sections/tools/Other")));
// export const AEPS = Loadable(lazy(() => import("../sections/tools/AEPS")));
// export const PanVarified = Loadable(
//   lazy(() => import("../sections/tools/PanVarified"))
// );
// export const DocuSignUpdate = Loadable(
//   lazy(() => import("../sections/tools/DocuSignUpdate"))
// );

// //reports
// export const AllTransactionRecords = Loadable(
//   lazy(() => import("../sections/reports/AllTransactionRecords"))
// );
// export const FundFlow = Loadable(
//   lazy(() => import("../sections/reports/FundFlow"))
// );
// export const UserwiseTransactionRecords = Loadable(
//   lazy(() => import("../sections/reports/UserwiseTransactionRecords"))
// );
// export const WalletLadger = Loadable(
//   lazy(() => import("../sections/reports/WalletLadger"))
// );
// export const WaitingAreaForDuplicateTxn = Loadable(
//   lazy(() => import("../sections/reports/WaitingAreaForDuplicateTxn"))
// );
// export const HistoricalDataExport = Loadable(
//   lazy(() => import("../sections/reports/HistoricalDataExport"))
// );

//api doc referance
// export const DocApiReference = Loadable(
//   lazy(() => import("../pages/DocApiReference"))
// );

//sales management
// export const SalesManagement = Loadable(
//   lazy(() => import("../pages/SalesManagement"))
// );

// export const PageOne = Loadable(lazy(() => import("../pages/PageOne")));
// export const PageTwo = Loadable(lazy(() => import("../pages/PageTwo")));
// export const PageThree = Loadable(lazy(() => import("../pages/PageThree")));
// export const PageFour = Loadable(lazy(() => import("../pages/PageFour")));
// export const PageFive = Loadable(lazy(() => import("../pages/PageFive")));
// export const PageSix = Loadable(lazy(() => import("../pages/PageSix")));

export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
