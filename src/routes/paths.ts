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
  //Help and support
  helpsupport: path(ROOTS_DASHBOARD, "/helpsupport"),
  //Partner Billing
  partnerbilling: path(ROOTS_DASHBOARD, '/partnerbilling'),

  //Apicredentials
  apicredentials: path(ROOTS_DASHBOARD, '/apicredentials'),

  //Referenceapidocs
  Referenceapidocs: path(ROOTS_DASHBOARD, '/Referenceapidocs'),

  //Trasaction & walletlaser

  transaction: {
    root: path(ROOTS_DASHBOARD, "/transaction"),
    mytransaction: path(ROOTS_DASHBOARD, "/transaction/mytransaction"),
    walletladger: path(ROOTS_DASHBOARD, "/transaction/walletladger"),
  },
  //Fund request

  fundmanagement: {
    root: path(ROOTS_DASHBOARD, "/fundmanagement"),
    myfunddeposits: path(ROOTS_DASHBOARD, "/fundmanagement/myfunddeposits"),
    // mybankaccount: path(ROOTS_DASHBOARD, "/fundmanagement/mybankaccount"),
    // aepssettlement: path(ROOTS_DASHBOARD, "/fundmanagement/aepssettlement"),
    // myfundrequest: path(ROOTS_DASHBOARD, "/fundmanagement/myfundrequest"),
    // managefundflow: path(ROOTS_DASHBOARD, "/fundmanagement/managefundflow"),
    // mynetworkfunds: path(ROOTS_DASHBOARD, "/fundmanagement/mynetworkfunds"),
  },

  //Services 

  myservices: {
    root: path(ROOTS_DASHBOARD, '/myservices'),
    MyActiveServices: path(ROOTS_DASHBOARD, '/myservices/MyActiveServices'),
    // MyScheme: path(ROOTS_DASHBOARD, '/myservices/MyScheme'),
    // BBPSSchemePage: path(ROOTS_DASHBOARD, '/myservices/BBPSSchemePage'),
  },




}

