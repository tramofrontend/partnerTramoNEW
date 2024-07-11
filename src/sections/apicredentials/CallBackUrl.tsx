import { useEffect, useState } from 'react';
// @mui
import { Grid, Box, Card, Typography, Stack, Divider, TextField, Button, Skeleton } from '@mui/material';

import { Helmet } from 'react-helmet-async';
import { _allProducts, _ecommerceBestSalesman } from 'src/_mock/arrays';
import { Api } from 'src/webservices';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { CallBackSkeleton } from 'src/components/Skeletons/CallBackSkeleton';

// import { Label } from '@mui/icons-material';

// ----------------------------------------------------------------------

export default function CallBackUrl() {
  const { enqueueSnackbar } = useSnackbar();
  const [categoryList, setCategoryList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [edit1, setEdit1] = useState(false);
  const [edit2, setEdit2] = useState(false);
  const [edit3, setEdit3] = useState(false);
  const [edit4, setEdit4] = useState(false);
  const [edit5, setEdit5] = useState(false);
  const [edit6, setEdit6] = useState(false);
  const [url, setUrl] = useState('');
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [url3, setUrl3] = useState('');
  const [url4, setUrl4] = useState('');
  const [url5, setUrl5] = useState('');
  const [url6, setUrl6] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getActiveCategory();
    getBBPSUurl();
  }, []);

  const getActiveCategory = () => {
    let token = localStorage.getItem('token');
    Api(`apiBox/dashboard/getActiveServices`, 'GET', '', token).then((Response: any) => {
      console.log('======userProfileInfo==response=====>', Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setCategoryList(Response.data.data);
          console.log('======userProfileInfo==code 200=====>', Response.data.data);
        } else {
          console.log('======userProfileInfo_error=======>' + Response);
        }
      }
    });
  };

  const setBBPSUurl = () => {
    if (!edit) {
      setEdit(!edit);
    } else {
      let token = localStorage.getItem('token');
      let body = {
        bbpsCallbackUrl: url,
      };
      Api(`apiBox/dashboard/updateBbpsCallbackUrl`, 'POST', body, token).then((Response: any) => {
        console.log('======userProfileInfo==response=====>', Response);
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            enqueueSnackbar(Response.data.message);
            setEdit(!edit);
            getBBPSUurl();
            console.log('======userProfileInfo==code 200=====>', Response.data.data);
          } else {
            console.log('======userProfileInfo_error=======>' + Response);
          }
        }
      });
    }
  };


  const setMoneyurl = () => {
    if (!edit1) {
      setEdit1(!edit1);
    } else {
      let token = localStorage.getItem('token');
      let body = {
        payoutCallbackUrl: url1,
      };
      Api(`apiBox/dashboard/updateMoneyTransferCallbackUrl`, 'POST', body, token).then((Response: any) => {
        console.log('======userProfileInfo==response=====>', Response);
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            enqueueSnackbar(Response.data.message);
            setEdit1(!edit1);
            getBBPSUurl();
            console.log('======updateMoneyTransferCallbackUrl==code 200=====>', Response.data.data);
          } else {
            console.log('======updateMoneyTransferCallbackUrl_error=======>' + Response);
          }
        }
      });
    }
  };

  const setRechagurl = () => {
    if (!edit2) {
      setEdit2(!edit2);
    } else {
      let token = localStorage.getItem('token');
      let body = {
        rechargeCallbackUrl: url2,
      };
      Api(`apiBox/dashboard/updateRechargeCallbackUrl`, 'POST', body, token).then((Response: any) => {
        console.log('======userProfileInfo==response=====>', Response);
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            enqueueSnackbar(Response.data.message);
            setEdit2(!edit2);
            getBBPSUurl();
            console.log('======updateRechargeCallbackUrl==code 200=====>', Response.data.data);
          } else {
            console.log('======updateRechargeCallbackUrl=======>' + Response);
          }
        }
      });
    }
  };

  const setTransferUrl = () => {
    if (!edit4) {
      setEdit4(!edit4);
    } else {
      let token = localStorage.getItem('token');
      let body = {
        transferCallbackUrl: url4,
      };
      Api(`apiBox/dashboard/updateTransferCallbackUrl `, 'POST', body, token).then((Response: any) => {
        console.log('======userProfileInfo==response=====>', Response);
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            enqueueSnackbar(Response.data.message);
            setEdit4(!edit4);
            getBBPSUurl();
            console.log('======updatTransferCallbackUrl==code 200=====>', Response.data.data);
          } else {
            console.log('======updatTransferCallbackUrl=======>' + Response);
          }
        }
      });
    }
  };


  const setPayoutUrl = () => {
    if (!edit5) {
      setEdit5(!edit5);
    } else {
      let token = localStorage.getItem('token');
      let body = {
        payoutPaymentCallbackUrl: url5,
      };
      Api(`apiBox/dashboard/updatePayoutPaymentCallbackUrl `, 'POST', body, token).then((Response: any) => {
        console.log('======userProfileInfo==response=====>', Response);
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            enqueueSnackbar(Response.data.message);
            setEdit5(!edit5);
            getBBPSUurl();
            console.log('======updatTransferCallbackUrl==code 200=====>', Response.data.data);
          } else {
            console.log('======updatTransferCallbackUrl=======>' + Response);
          }
        }
      });
    }
  };

  
  const setAEPSurl = () => {
    if (!edit3) {
      setEdit3(!edit3);
    } else {
      let token = localStorage.getItem('token');
      let body = {
        AEPSCallbackUrl: url3,
      };
      Api(`apiBox/dashboard/updateAEPSCallbackUrl`, 'POST', body, token).then((Response: any) => {
        console.log('======userProfileInfo==response=====>', Response);
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            enqueueSnackbar(Response.data.message);
            setEdit3(!edit3);
            getBBPSUurl();
            console.log('======updateRechargeCallbackUrl==code 200=====>', Response.data.data);
          } else {
            console.log('======updateRechargeCallbackUrl=======>' + Response);
          }
        }
      });
    }
  };

  const setDMT1Url = () => {
    if (!edit6) {
      setEdit6(!edit6);
    } else {
      let token = localStorage.getItem('token');
      let body = {
        dmt1CallbackUrl: url6,
      };
      Api(`apiBox/dashboard/updateDmt1CallbackUrl`, 'POST', body, token).then((Response: any) => {
        console.log('======userProfileInfo==response=====>', Response);
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            enqueueSnackbar(Response.data.message);
            setEdit3(!edit6);
            getBBPSUurl();
            console.log('======updateDmt1CallbackUrl==code 200=====>', Response.data.data);
          } else {
            console.log('======updateDmt1CallbackUrl=======>' + Response);
          }
        }
      });
    }
  };

  const getBBPSUurl = () => {
    let token = localStorage.getItem('token');
    Api(`apiBox/dashboard/callbackUrls`, 'GET', '', token).then((Response: any) => {
      console.log('======userProfileInfo==response=====>', Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setUrl(Response.data.data.partnerCallbackUrls.bbps);
          setUrl1(Response.data.data.partnerCallbackUrls.payout)
          setUrl2(Response.data.data.partnerCallbackUrls.recharge)
          setUrl3(Response.data.data.partnerCallbackUrls.aeps)
          setIsLoading(false)
          console.log('======userProfileInfo==code 200=====>', Response.data.data);
        } else {
          console.log('======userProfileInfo_error=======>' + Response);
          setIsLoading(false)
        }
      }
    });
  }
  if (isLoading) {
    return <CallBackSkeleton />;
  }

  return (
    <>
      <Helmet>
        <title>CallBack URL | Tramo</title>
      </Helmet>
      <Stack flexDirection={'row'} gap={2}>
        <Stack>
      <Box sx={{ mt: 2, width: { xs: '100%', md: '50%' } }}>
        <Stack justifyContent={'space-between'}>
          <Typography variant="h4">BBPS Callback URL</Typography>
          <Stack flexDirection={'row'} gap={3} marginTop={3}>
            <TextField
              label="url"
              placeholder="url"
              value={url}
              size="small"
              disabled={!edit}
              variant={edit ? 'outlined' : 'filled'}
              onChange={(e) => setUrl(e.target.value)}
            />
        
            <Button variant="contained" onClick={setBBPSUurl}>
              {edit ? 'Save' : 'Edit'}
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ mt: 2, width: { xs: '100%', md: '50%' } }}>
        <Stack justifyContent={'space-between'}>
          <Typography variant="h4">Money Transfer Callback URL</Typography>
          <Stack flexDirection={'row'} gap={3} marginTop={3}>
            <TextField
              label="Money Transfer url"
              placeholder=" Money Transfer url"
              type="string"
              value={url1}
              size="small"
              disabled={!edit1}
              variant={edit1 ? 'outlined' : 'filled'}
              onChange={(e) => setUrl1(e.target.value)}
            />
            <LoadingButton variant="contained" onClick={setMoneyurl}>
              {edit1 ? 'Save' : 'Edit'}
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ mt: 2, width: { xs: '100%', md: '50%' } }}>
        <Stack justifyContent={'space-between'}>
          <Typography variant="h4">Recharge Callback URL</Typography>
          <Stack flexDirection={'row'} gap={3} marginTop={3}>
            <TextField
              label="Recharge url"
              placeholder="Recharge url"
              type="string"
              value={url2}
              size="small"
              disabled={!edit2}
              variant={edit2 ? 'outlined' : 'filled'}
              onChange={(e) => setUrl2(e.target.value)}
            />
            <LoadingButton variant="contained" onClick={setRechagurl}>
              {edit2 ? 'Save' : 'Edit'}
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ mt: 2, width: { xs: '100%', md: '50%' } }}>
        <Stack justifyContent={'space-between'}>
          <Typography variant="h4">DMT1 Callback URL</Typography>
          <Stack flexDirection={'row'} gap={3} marginTop={3}>
            <TextField
              label="DMT1 url"
              placeholder="DMT1 url"
              type="string"
              value={url6}
              size="small"
              disabled={!edit6}
              variant={edit6 ? 'outlined' : 'filled'}
              onChange={(e) => setUrl6(e.target.value)}
            />
            <LoadingButton variant="contained" onClick={setDMT1Url}>
              {edit6 ? 'Save' : 'Edit'}
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
      </Stack>
      <Stack>
      <Box sx={{ mt: 2, width: { xs: '100%', md: '50%' } }}>
        <Stack justifyContent={'space-between'}>
          <Typography variant="h4">AEPS Callback URL</Typography>
          <Stack flexDirection={'row'} gap={3} marginTop={3}>
            <TextField
              label="AEPS url"
              placeholder="AEPS url"
              type="string"
              value={url3}
              size="small"
              disabled={!edit3}
              variant={edit3 ? 'outlined' : 'filled'}
              onChange={(e) => setUrl3(e.target.value)}
            />
            <LoadingButton variant="contained" onClick={setAEPSurl}>
              {edit3 ? 'Save' : 'Edit'}
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ mt: 2, width: { xs: '100%', md: '50%' } }}>
        <Stack justifyContent={'space-between'}>
          <Typography variant="h4">Payout Callback URL</Typography>
          <Stack flexDirection={'row'} gap={3} marginTop={3}>
            <TextField
              label="Payout url"
              placeholder="Payout url"
              type="string"
              value={url5}
              size="small"
              disabled={!edit5}
              variant={edit5 ? 'outlined' : 'filled'}
              onChange={(e) => setUrl5(e.target.value)}
            />
            <LoadingButton variant="contained" onClick={setPayoutUrl}>
              {edit5 ? 'Save' : 'Edit'}
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ mt: 2, width: { xs: '100%', md: '50%' } }}>
        <Stack justifyContent={'space-between'}>
          <Typography variant="h4">Transfer Callback URL</Typography>
          <Stack flexDirection={'row'} gap={3} marginTop={3}>
            <TextField
              label="Transfer url"
              placeholder="Transfer url"
              type="string"
              value={url4}
              size="small"
              disabled={!edit4}
              variant={edit4 ? 'outlined' : 'filled'}
              onChange={(e) => setUrl4(e.target.value)}
            />
            <LoadingButton variant="contained" onClick={setTransferUrl}>
              {edit4 ? 'Save' : 'Edit'}
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
      </Stack>
      </Stack>
    </>
  );
}
