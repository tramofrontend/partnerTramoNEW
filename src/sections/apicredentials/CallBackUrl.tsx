import { useEffect, useState } from 'react';
// @mui
import { Grid, Box, Card, Typography, Stack, Divider, TextField, Button } from '@mui/material';

import { Helmet } from 'react-helmet-async';
import { _allProducts, _ecommerceBestSalesman } from 'src/_mock/arrays';
import { Api } from 'src/webservices';
import { useSnackbar } from 'notistack';

// import { Label } from '@mui/icons-material';

// ----------------------------------------------------------------------

export default function CallBackUrl() {
  const { enqueueSnackbar } = useSnackbar();
  const [categoryList, setCategoryList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [url, setUrl] = useState('');

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
  const getBBPSUurl = () => {
    let token = localStorage.getItem('token');
    Api(`apiBox/dashboard/callbackUrls`, 'GET', '', token).then((Response: any) => {
      console.log('======userProfileInfo==response=====>', Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setUrl(Response.data.data.partnerCallbackUrls.bbps);
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
      <Box sx={{ m: 1, width: { xs: '100%', md: '50%' } }}>
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
    </>
  );
}
