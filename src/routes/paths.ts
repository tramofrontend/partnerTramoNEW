// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/auth";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: "/login",
  // resetpassword: "/resetpassword",
  // newpassword: "/newpassword",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  dashboard: path(ROOTS_DASHBOARD, "/dashboard"),
  // newleads: path(ROOTS_DASHBOARD, "/newleads"),
  // newleadsteps: path(ROOTS_DASHBOARD, "/newleadsteps"),
  // ournetwork: path(ROOTS_DASHBOARD, "/ournetwork"),
  // scheme: {
  //   root: path(ROOTS_DASHBOARD, "/scheme"),
  //   allscheme: path(ROOTS_DASHBOARD, "/scheme/allscheme"),
  //   AddNewScheme: path(ROOTS_DASHBOARD, "/scheme/AddNewScheme"),
  //   EditScheme: path(ROOTS_DASHBOARD, "/scheme/EditScheme"),
  //   MapSchemeSetting: path(ROOTS_DASHBOARD, "/scheme/mapSchemeSetting"),
  //   AllbbpsScheme: path(ROOTS_DASHBOARD, "/scheme/AllbbpsScheme"),
  //   AddNewbbpsScheme: path(ROOTS_DASHBOARD, "/scheme/AddNewbbpsScheme"),
  //   EditBBPSScheme: path(ROOTS_DASHBOARD, "/scheme/EditBBPSScheme"),
  //   mapbbpsScheme: path(ROOTS_DASHBOARD, "/scheme/mapbbpsScheme"),
  // },
  // product: {
  //   root: path(ROOTS_DASHBOARD, "/product"),
  //   productmanagement: path(ROOTS_DASHBOARD, "/product/productmanagement"),
  //   assignvendor: path(ROOTS_DASHBOARD, "/product/assignvendor"),
  //   mapshortcode: path(ROOTS_DASHBOARD, "/product/mapshortcode"),
  // },
  // vendor: {
  //   root: path(ROOTS_DASHBOARD, "/vendor"),
  //   vendormanagement: path(ROOTS_DASHBOARD, "/vendor/vendormanagement"),
  //   moneytransferslots: path(ROOTS_DASHBOARD, "/vendor/moneytransferslots"),
  //   dmtslots: path(ROOTS_DASHBOARD, "/vendor/dmtslots"),
  //   aepsslots: path(ROOTS_DASHBOARD, "/vendor/aepsslots"),
  //   bbpslots: path(ROOTS_DASHBOARD, "/vendor/bbpslots"),
  // },
  // fundmanagement: {
  //   root: path(ROOTS_DASHBOARD, "/fundmanagement"),
  //   addbank: path(ROOTS_DASHBOARD, "/fundmanagement/addbank"),
  //   adminfundflow: path(ROOTS_DASHBOARD, "/fundmanagement/adminfundflow"),
  //   fundrequest: path(ROOTS_DASHBOARD, "/fundmanagement/fundrequest"),
  // },
  // bbpsmanagement: path(ROOTS_DASHBOARD, "/bbpsmanagement"),
  // rollmanagement: path(ROOTS_DASHBOARD, "/rollmanagement"),
  // contentmanagement: {
  //   root: path(ROOTS_DASHBOARD, "/contentmanagement"),
  //   faqmanagement: path(ROOTS_DASHBOARD, "/contentmanagement/faqmanagement"),
  //   updateimage: path(ROOTS_DASHBOARD, "/contentmanagement/updateimage"),
  // },
  // tools: {
  //   root: path(ROOTS_DASHBOARD, "/tools"),
  //   smsmanagement: path(ROOTS_DASHBOARD, "/tools/smsmanagement"),
  //   newsnotifications: path(ROOTS_DASHBOARD, "/tools/newsnotifications"),
  //   vendorswitch: path(ROOTS_DASHBOARD, "/tools/vendorswitch"),
  //   accountrecovery: path(ROOTS_DASHBOARD, "/tools/accountrecovery"),
  //   bankmaster: path(ROOTS_DASHBOARD, "/tools/bankmaster"),
  //   newsflash: path(ROOTS_DASHBOARD, "/tools/newsflash"),
  //   uploadexternaldata: path(ROOTS_DASHBOARD, "/tools/uploadexternaldata"),
  //   enablediscategories: path(ROOTS_DASHBOARD, "/tools/enablediscategories"),
  //   panvarified: path(ROOTS_DASHBOARD, "/tools/panvarified"),
  //   docusign: path(ROOTS_DASHBOARD, "/tools/docusign"),
  //   aeps: path(ROOTS_DASHBOARD, "/tools/aeps"),
  //   Other: path(ROOTS_DASHBOARD, "/tools/Other"),
  // },
  // reports: {
  //   root: path(ROOTS_DASHBOARD, "/reports"),
  //   fundflow: path(ROOTS_DASHBOARD, "/reports/fundflow"),
  //   alltransactionrecord: path(
  //     ROOTS_DASHBOARD,
  //     "/reports/alltransactionrecord"
  //   ),
  // userwisetransactionrecord: path(
  //   ROOTS_DASHBOARD,
  //   "/reports/userwisetransactionrecord"
  // ),
  // WalletLadger: path(ROOTS_DASHBOARD, "/reports/WalletLadger"),
  // WaitingAreaForDuplicateTxn: path(
  //   ROOTS_DASHBOARD,
  //   "/reports/WaitingAreaForDuplicateTxn"
  // ),
  // HistoricalDataExport: path(
  //   ROOTS_DASHBOARD,
  //   "/reports/HistoricalDataExport"
  // ),
}
// docapireference: path(ROOTS_DASHBOARD, "/docapireference"),
// salesmanagement: path(ROOTS_DASHBOARD, "/salesmanagement"),
// one: path(ROOTS_DASHBOARD, "/one"),
// two: path(ROOTS_DASHBOARD, "/two"),
// three: path(ROOTS_DASHBOARD, "/three"),
// user: {
//   root: path(ROOTS_DASHBOARD, "/user"),
//   four: path(ROOTS_DASHBOARD, "/user/four"),
//   five: path(ROOTS_DASHBOARD, "/user/five"),
//   six: path(ROOTS_DASHBOARD, "/user/six"),
// },
// };
