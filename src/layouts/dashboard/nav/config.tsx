// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  mail: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'Dashboard',
        path: PATH_DASHBOARD.dashboard,
        icon: ICONS.dashboard,
      },
      // {
      //   title: "New Leads",
      //   path: PATH_DASHBOARD.newleads,
      //   icon: ICONS.dashboard,
      // },
      // {
      //   title: "Our Network",
      //   path: PATH_DASHBOARD.ournetwork,
      //   icon: ICONS.dashboard,
      // },
      // {
      //   title: "Scheme Managments",
      //   path: PATH_DASHBOARD.scheme.root,
      //   icon: ICONS.mail,
      //   children: [
      //     { title: "Manage Scheme", path: PATH_DASHBOARD.scheme.allscheme },
      //     { title: "Map Scheme", path: PATH_DASHBOARD.scheme.MapSchemeSetting },
      //     {
      //       title: "Manage BBPS Scheme",
      //       path: PATH_DASHBOARD.scheme.AllbbpsScheme,
      //     },
      //     {
      //       title: "Map BBPS Scheme",
      //       path: PATH_DASHBOARD.scheme.mapbbpsScheme,
      //     },
      //   ],
      // },
      // {
      //   title: "Product Managments",
      //   path: PATH_DASHBOARD.product.root,
      //   icon: ICONS.mail,
      //   children: [
      //     {
      //       title: "Add New Product",
      //       path: PATH_DASHBOARD.product.productmanagement,
      //     },
      //     {
      //       title: "Assign Vendor",
      //       path: PATH_DASHBOARD.product.assignvendor,
      //     },
      //     {
      //       title: "Map Short Code",
      //       path: PATH_DASHBOARD.product.mapshortcode,
      //     },
      //   ],
      // },
      // {
      //   title: "Vendor Managments",
      //   path: PATH_DASHBOARD.vendor.root,
      //   icon: ICONS.mail,
      //   children: [
      //     {
      //       title: "Add New Vendor",
      //       path: PATH_DASHBOARD.vendor.vendormanagement,
      //     },
      //     {
      //       title: "Money Transfer Slots",
      //       path: PATH_DASHBOARD.vendor.moneytransferslots,
      //     },
      //     {
      //       title: "DMT Slots",
      //       path: PATH_DASHBOARD.vendor.dmtslots,
      //     },
      //     {
      //       title: "AEPS Slots",
      //       path: PATH_DASHBOARD.vendor.aepsslots,
      //     },
      //     {
      //       title: "BBPS Slots",
      //       path: PATH_DASHBOARD.vendor.bbpslots,
      //     },
      //   ],
      // },
      // {
      //   title: "Fund Managments",
      //   path: PATH_DASHBOARD.fundmanagement.root,
      //   icon: ICONS.mail,
      //   children: [
      //     {
      //       title: "Add New Bank",
      //       path: PATH_DASHBOARD.fundmanagement.addbank,
      //     },
      //     {
      //       title: "Admin Fund Flow",
      //       path: PATH_DASHBOARD.fundmanagement.adminfundflow,
      //     },
      //     {
      //       title: "Fund Requests",
      //       path: PATH_DASHBOARD.fundmanagement.fundrequest,
      //     },
      //   ],
      // },
      // {
      //   title: "BBPS Management",
      //   path: PATH_DASHBOARD.bbpsmanagement,
      //   icon: ICONS.dashboard,
      // },
      // {
      //   title: "Roll Management",
      //   path: PATH_DASHBOARD.rollmanagement,
      //   icon: ICONS.dashboard,
      // },
      // {
      //   title: "Content Managments",
      //   path: PATH_DASHBOARD.contentmanagement.root,
      //   icon: ICONS.mail,
      //   children: [
      //     {
      //       title: "FAQ management",
      //       path: PATH_DASHBOARD.contentmanagement.faqmanagement,
      //     },
      //     {
      //       title: "Update Images",
      //       path: PATH_DASHBOARD.contentmanagement.updateimage,
      //     },
      //   ],
      // },
      // {
      //   title: "Tools",
      //   path: PATH_DASHBOARD.tools.root,
      //   icon: ICONS.mail,
      //   children: [
      //     {
      //       title: "SMS/Email Management ",
      //       path: PATH_DASHBOARD.tools.smsmanagement,
      //     },
      //     { title: "Approve User PAN", path: PATH_DASHBOARD.tools.panvarified },
      //     { title: "Update DocuSign", path: PATH_DASHBOARD.tools.docusign },
      //     { title: "Vendor Switch ", path: PATH_DASHBOARD.tools.vendorswitch },
      //     { title: "Bank Master ", path: PATH_DASHBOARD.tools.bankmaster },
      //     {
      //       title: "Enable/Disable categories",
      //       path: PATH_DASHBOARD.tools.enablediscategories,
      //     },
      //     { title: "AEPS", path: PATH_DASHBOARD.tools.aeps },
      //     { title: "Other ", path: PATH_DASHBOARD.tools.Other },
      //   ],
      // },
      // {
      //   title: "reports",
      //   path: PATH_DASHBOARD.reports.root,
      //   icon: ICONS.mail,
      //   children: [
      //     {
      //       title: "All Transaction Records ",
      //       path: PATH_DASHBOARD.reports.alltransactionrecord,
      //     },
      //     {
      //       title: "Fund Flow Transactions",
      //       path: PATH_DASHBOARD.reports.fundflow,
      //     },

      //     {
      //       title: "Wallet Ladger ",
      //       path: PATH_DASHBOARD.reports.WalletLadger,
      //     },
      //     {
      //       title: "Hold duplicate Transaction Limit ",
      //       path: PATH_DASHBOARD.reports.WaitingAreaForDuplicateTxn,
      //     },
      //     {
      //       title: "Historical Data Exports ",
      //       path: PATH_DASHBOARD.reports.HistoricalDataExport,
      //     },
      //   ],
      // },
      // {
      //   title: "Doc Api Reference",
      //   path: PATH_DASHBOARD.docapireference,
      //   icon: ICONS.dashboard,
      // },
      // {
      //   title: "Sales Management",
      //   path: PATH_DASHBOARD.salesmanagement,
      //   icon: ICONS.dashboard,
      // },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: "management",
  //   items: [
  //     {
  //       title: "user",
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: "Four", path: PATH_DASHBOARD.user.four },
  //         { title: "Five", path: PATH_DASHBOARD.user.five },
  //         { title: "Six", path: PATH_DASHBOARD.user.six },
  //       ],
  //     },
  //   ],
  // },
];

export default navConfig;
