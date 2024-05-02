import { useEffect, useState } from 'react';
// @mui
import { Grid, Box, Card, Typography, Stack, Divider, TextField, Button, Skeleton } from '@mui/material';

import { Helmet } from 'react-helmet-async';
import { _allProducts, _ecommerceBestSalesman } from 'src/_mock/arrays';
import { Api } from 'src/webservices';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';

// import { Label } from '@mui/icons-material';

// ----------------------------------------------------------------------

export default function CallBackUrl() {
  const { enqueueSnackbar } = useSnackbar();
  const [categoryList, setCategoryList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [edit1, setEdit1] = useState(false);
  const [edit2, setEdit2] = useState(false);
  const [edit3, setEdit3] = useState(false);
  const [url, setUrl] = useState('');
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [url3, setUrl3] = useState('');

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
          console.log('======userProfileInfo==code 200=====>', Response.data.data);
        } else {
          console.log('======userProfileInfo_error=======>' + Response);
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>CallBack URL | Tramo</title>
      </Helmet>
      <Box sx={{ mt: 2, width: { xs: '100%', md: '50%' } }}>
    <Stack justifyContent={'space-between'}>
      <Typography variant="h4">BBPS Callback URL</Typography>
      <Stack flexDirection={'row'} gap={3} marginTop={3}>
      {url ? (
        <TextField
          label="url"
          placeholder="url"
          value={url}
          size="small"
          disabled={!edit}
          variant={edit ? 'outlined' : 'filled'}
          onChange={(e) => setUrl(e.target.value)}
        />
      ) : (
        <Skeleton variant='rounded' width="30%" height={40}/>
      )}
       {url ? (
        <Button variant="contained" onClick={setBBPSUurl}>
          {edit ? 'Save' : 'Edit'}
        </Button>
         ) : (
          <Skeleton variant='rounded' width="10%" height={40} />
        )}
      </Stack>
    </Stack>
      </Box>
      <Box sx={{ mt: 2, width: { xs: '100%', md: '50%' } }}>
        <Stack justifyContent={'space-between'}>
          <Typography variant="h4">Money Transfer Callback URL</Typography>
          <Stack flexDirection={'row'} gap={3} marginTop={3}>
          {url1 ? (
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
          ) : (
            <Skeleton variant='rounded' width="30%" height={40}/>
          )}
          {url1 ? (
            <LoadingButton variant="contained" onClick={setMoneyurl}>
              {edit1 ? 'Save' : 'Edit'}
            </LoadingButton>
              ) : (
                <Skeleton variant='rounded' width="10%" height={40}/>
              )}
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ mt: 2, width: { xs: '100%', md: '50%' } }}>
        <Stack justifyContent={'space-between'}>
          <Typography variant="h4">Recharge Callback URL</Typography>
          <Stack flexDirection={'row'} gap={3} marginTop={3}>
          {url2 ? (
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
          ) : (
            <Skeleton variant='rounded' width="30%" height={40}/>
          )}
           {url2 ? (
            <LoadingButton variant="contained" onClick={setRechagurl}>
              {edit2 ? 'Save' : 'Edit'}
            </LoadingButton>
               ) : (
                <Skeleton variant='rounded' width="10%" height={40}/>
              )}
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ mt: 2, width: { xs: '100%', md: '50%' } }}>
        <Stack justifyContent={'space-between'}>
          <Typography variant="h4">AEPS Callback URL</Typography>
          <Stack flexDirection={'row'} gap={3} marginTop={3}>
          {url3 ? (
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
          ) : (
            <Skeleton variant='rounded' width="30%" height={40}/>
          )}
          {url3 ? (
            <LoadingButton variant="contained" onClick={setAEPSurl}>
              {edit3 ? 'Save' : 'Edit'}
            </LoadingButton>
              ) : (
                <Skeleton variant='rounded' width="10%" height={40}/>
              )}
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
