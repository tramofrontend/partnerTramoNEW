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
      {
        title: 'Services',
        path: PATH_DASHBOARD.services,
        icon: ICONS.dashboard,
      },
      {
        title: 'Reports',
        path: PATH_DASHBOARD.reports,
        icon: ICONS.dashboard,
      },

      {
        title: 'Transactions',
        path: PATH_DASHBOARD.transactions.root,
        icon: ICONS.user,
        children: [
          {
            title: 'My Transactions',
            path: PATH_DASHBOARD.transactions.mytransactions,
          },
          {
            title: 'Wallet Ladger',
            path: PATH_DASHBOARD.transactions.mywalletladger,
          },
          {
            title: 'Report Export',
            path: PATH_DASHBOARD.transactions.reportexport,
          },
        ],
      },
      {
        title: 'My Services',
        path: PATH_DASHBOARD.myservices.root,
        icon: ICONS.user,
        children: [
          { title: 'My Active Services', path: PATH_DASHBOARD.myservices.MyActiveServices },
          { title: 'My Scheme', path: PATH_DASHBOARD.myservices.MyScheme },
          { title: 'View BBPS Scheme', path: PATH_DASHBOARD.myservices.BBPSSchemePage },
        ],
      },

      {
        title: 'Fund Management',
        path: PATH_DASHBOARD.fundmanagement.root,
        icon: ICONS.user,
        children: [
          {
            title: 'My Fund Deposits',
            path: PATH_DASHBOARD.fundmanagement.myfunddeposit,
          },
          {
            title: 'View Update Bank Detail',
            path: PATH_DASHBOARD.fundmanagement.bankDetail,
          },
          {
            title: 'AEPS Settlement',
            path: PATH_DASHBOARD.fundmanagement.aepssettlement,
          },
          {
            title: 'MY Fund Requests',
            path: PATH_DASHBOARD.fundmanagement.myfundrequest,
          },
        ],
      },
      // {
      //   title: 'Report',
      //   path: PATH_DASHBOARD.reportexport,
      //   icon: ICONS.ecommerce,
      // },

      {
        title: 'Support & Ticket',
        path: PATH_DASHBOARD.helpsupport,
        icon: ICONS.ecommerce,
      },
      // {
      //   title: 'Billing',
      //   path: PATH_DASHBOARD.partnerbilling,
      //   icon: ICONS.ecommerce,
      // },
      {
        title: 'API Credentials',
        path: PATH_DASHBOARD.apicredentials,
        icon: ICONS.user,
      },
      {
        title: 'API Docs',
        path: PATH_DASHBOARD.Referenceapidocs,
        icon: ICONS.ecommerce,
      },
      {
        title: 'Setting',
        path: PATH_DASHBOARD.setting.root,
        icon: ICONS.ecommerce,
        children: [{ title: 'Tpin', path: PATH_DASHBOARD.setting.npinreset }],
      },
    ],
  },
];

export default navConfig;
