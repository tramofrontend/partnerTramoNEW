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
        title: 'Support & Ticket',
        path: PATH_DASHBOARD.helpsupport,
        icon: ICONS.ecommerce,
      },
      {
        title: 'Support & Ticket',
        path: PATH_DASHBOARD.partnerbilling,
        icon: ICONS.ecommerce,
      },
      {
        title: 'Reference API Docs',
        path: PATH_DASHBOARD.Referenceapidocs,
        icon: ICONS.ecommerce,
      },
    ],
  },
];

export default navConfig;
