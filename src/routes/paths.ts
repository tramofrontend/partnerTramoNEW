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
  //Referenceapidocs
  Referenceapidocs: path(ROOTS_DASHBOARD, '/Referenceapidocs'),

  //Trasaction & walletlaser

  transaction: {
    root: path(ROOTS_DASHBOARD, "/transaction"),
    mytransaction: path(ROOTS_DASHBOARD, "/transaction/mytransaction"),
    walletladger: path(ROOTS_DASHBOARD, "/transaction/walletladger"),
  },
}

