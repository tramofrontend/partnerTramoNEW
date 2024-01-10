// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, AppBar, Toolbar, IconButton, Typography, Button, Box } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// config
import { HEADER, NAV } from '../../../config';
// components
import Logo from '../../../components/logo';
import Iconify from '../../../components/iconify';
import { useSettingsContext } from '../../../components/settings';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import ContactsPopover from './ContactsPopover';
import NotificationsPopover from './NotificationsPopover';
import { useEffect, useState } from 'react';
import { Api } from 'src/webservices';
import MenuPopover from '../../../components/menu-popover';
import { useDispatch } from 'react-redux';
import { agentDetailInRedux } from 'src/redux/slices/AgentDetail';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const agentDetail = useSelector((state: any) => state.agent.data);
  const [AEPSwallet, setAEPSwallet] = useState('');
  const [MAINwallet, setMAINwallet] = useState('');
  const [transactionDetail, setTransactionsDetail] = useState([]);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  useEffect(() => {
    getWallet();
    getWalletDetail();
  }, []);

  const { themeLayout } = useSettingsContext();

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';

  const isDesktop = useResponsive('up', 'lg');

  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal;

  const getWallet = () => {
    let token = localStorage.getItem('token');
    // let id = localStorage.getItem('apiuserid');
    Api(`agent/get_AgentDetail`, 'GET', '', token).then((Response: any) => {
      console.log('======Wallet==response=====>', Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          dispatch(
            agentDetailInRedux({
              ...Response.data.data,
            })
          );

          localStorage.setItem('apischemeid', Response.data.data.schemeId);
          localStorage.setItem(
            'fullname',
            Response.data.data.firstName + ' ' + Response.data.data.lastName
          );
          console.log('======Wallet data 200====>', Response.data.data);
        } else {
          console.log('======Wallet error=======>' + Response);
        }
      }
    });
  };
  const getWalletDetail = () => {
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('apiuserid');
    Api(`wallet/get_wallet_details/` + id, 'GET', '', token).then((Response: any) => {
      console.log('======Wallet==response=====>', Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setTransactionsDetail(Response.data.succ[0].txnDetails);
          console.log('======Wallet data 200====>', Response.data.data);
        } else {
          console.log('======Wallet error=======>' + Response);
        }
      }
    });
  };

  const renderContent = (
    <>
      {isDesktop && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}
      {!isDesktop && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary' }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}
      <Searchbar />
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1.5 }}
      >
        <Button variant="outlined" onClick={handleOpenPopover}>
          Main : {agentDetail.main_wallet_amount?.toFixed(2)}
        </Button>
        <Button variant="outlined">Aeps : {agentDetail.AEPS_wallet_amount}</Button>
        <NotificationsPopover />
        <AccountPopover />
      </Stack>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 360, p: 0, maxHeight: '60vh', overflow: 'hidden' }}
      >
        {transactionDetail.map((item: any) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }} key={item._id}>
              <Stack
                width={'100%'}
                sx={{ borderBottom: '1px solid #dadada' }}
                // flexDirection={'row'}
              >
                <Stack flexDirection={'row'} justifyContent={'space-between'}>
                  <Typography variant="subtitle1">{item.transferFrom}</Typography>
                  <Typography variant="subtitle1">
                    {new Date(item.createAt).toLocaleDateString()}
                  </Typography>
                </Stack>
                <Typography variant="subtitle2">
                  {item.transactionType} - {item.transactionId}
                </Typography>
                <Stack flexDirection={'row'} justifyContent={'space-between'}>
                  <Typography variant="body1">Rs. {item.depositAmount}</Typography>
                  <Typography variant="body1" textTransform={'capitalize'}>
                    {item.status}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          );
        })}
      </MenuPopover>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
