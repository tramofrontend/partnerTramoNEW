function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}
const ROOTS_DASHBOARD = '/auth';

export const PATH_AUTH = {
  login: '/login',
  resetpassword: '/resetpassword',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  dashboard: path(ROOTS_DASHBOARD, '/dashboard'),
  services: path(ROOTS_DASHBOARD, '/services'),
  reports: path(ROOTS_DASHBOARD, '/reports'),
  //Help and support
  helpsupport: path(ROOTS_DASHBOARD, '/helpsupport'),
  reportexport: path(ROOTS_DASHBOARD, '/reportexport'),
  //Partner Billing
  partnerbilling: path(ROOTS_DASHBOARD, '/partnerbilling'),

  //Apicredentials
  apicredentials: path(ROOTS_DASHBOARD, '/apicredentials'),

  //Referenceapidocs
  Referenceapidocs: path(ROOTS_DASHBOARD, '/Referenceapidocs'),

  //Trasaction & walletlaser

  transactions: {
    root: path(ROOTS_DASHBOARD, '/transactions'),
    mytransactions: path(ROOTS_DASHBOARD, '/transactions/mytransactions'),
    mywalletladger: path(ROOTS_DASHBOARD, '/transactions/mywalletladger'),
    reportexport: path(ROOTS_DASHBOARD, '/transactions/reportexport'),
  },

  //Services

  myservices: {
    root: path(ROOTS_DASHBOARD, '/myservices'),
    MyActiveServices: path(ROOTS_DASHBOARD, '/myservices/MyActiveServices'),
    MyScheme: path(ROOTS_DASHBOARD, '/myservices/MyScheme'),
    BBPSSchemePage: path(ROOTS_DASHBOARD, '/myservices/BBPSSchemePage'),
  },

  //Fund request

  fundmanagement: {
    root: path(ROOTS_DASHBOARD, '/fundmanagement'),
    myfunddeposit: path(ROOTS_DASHBOARD, '/fundmanagement/myfunddeposit'),
    bankDetail: path(ROOTS_DASHBOARD, '/fundmanagement/bankDetail'),
    aepssettlement: path(ROOTS_DASHBOARD, '/fundmanagement/aepssettlement'),
    myfundrequest: path(ROOTS_DASHBOARD, '/fundmanagement/myfundrequest'),
  },

  setting: {
    root: path(ROOTS_DASHBOARD, '/setting'),
    npinreset: path(ROOTS_DASHBOARD, '/setting/npinreset'),
  },
};
