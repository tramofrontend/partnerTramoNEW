import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { TextField, Stack, Grid, Tabs, Tab, MenuItem, CircularProgress } from '@mui/material';
import { _ecommerceBestSalesman } from 'src/_mock/arrays';
import { Box, CardProps } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Api } from 'src/webservices';
import ViewAepsTable from './ViewAepsTable';
import ViewMoneyTransferTable from './ViewMoneyTransferTable';
import ViewRechargeTable from './ViewRechargeTable';
// import { useSelector } from 'react-redux';
import ViewAadharPayTable from './ViewAadharPayTable';
import ViewDmt1Table from './ViewDmt1Table';
import ViewDmt2Table from './ViewDmt2Table';
import ViewMatmTable from './ViewMatmTaable';
import ViewBBPSTable from './ViewBBPSTable';

import { useAuthContext } from 'src/auth/useAuthContext';
import RechargeSkeleton from 'src/components/Skeletons/RechargeSkeleton';
// ----------------------------------------------------------------------

export default function ViewAllScheme() {
  const { user } = useAuthContext();
  const [sdata, setSdata] = useState([]);
  const [com, setCom] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [distributor, setDistributor] = useState([]);
  const [superCurrentTab, setSuperCurrentTab] = useState('');
  const [mdSchemeId, setMDschemeId] = useState('');
  const [loading, setLoading] = useState(false);
  const [schemeInfo, setSchemeInfo] = useState({ schemeName: '', schemeDescription: '' });

  useEffect(() => {
    getProductList();
    getCategoryList();
  }, []);

  const getProductList = () => {
    const body = {
      productFor: 'everyone',
    };
    Api(`product/product_Filter`, 'POST', body, '').then((Response: any) => {
      console.log('======getUser==response=====>' + Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setSdata(Response.data.data);
          console.log('======getUser===data.data sdata====>', Response.data.data);
        } else {
          console.log('======getUser=======>' + Response);
        }
      }
    });
  };

  const getCategoryList = () => {
    let token = localStorage.getItem('token');
    Api(`category/get_CategoryList`, 'GET', '', token).then((Response: any) => {
      console.log('======getcategory_list====>', Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          const sortedData = Response.data.data.sort((a: any, b: any) => a.order - b.order);
          setCategoryList(sortedData);
          setSuperCurrentTab(Response.data.data[0].category_name);
          getSchemeDetail(Response.data.data[0]._id);
          console.log('======getcategoryDetails====>', Response.data.data);
        } else {
          console.log('======getcategory=======>' + Response);
        }
      }
    });
  };

  const getSchemeDetail = async (tab: string) => {
    setLoading(true);
    setCom([]);
    let token = localStorage.getItem('token');
    let id = (await user?.role) == 'm_distributor' ? mdSchemeId : user?.schemeId;
    Api(`scheme/getShemeDetail/${id}/${tab}`, 'GET', '', token).then((Response: any) => {
      console.log('======scheme detail==response=====>', Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          if (Response.data.data.succ == null) {
            setLoading(false);
          } else {
            setCom(Response.data.data.succ.commissionSetting);
            setSchemeInfo(Response.data.data);
            setLoading(false);
            console.log('======scheme detail data 200====>', Response.data.data);
          }
        } else {
          console.log('======scheme detail error=======>' + Response);
        }
      }
    });
  };
  {if(loading)
    return <RechargeSkeleton/>
  }

  return (
    <>
      <Helmet>
        <title> My Schemes | Tramo </title>
      </Helmet>
      <Box sx={{ width: '100%' }}>
        {/* <Stack flexDirection={'row'} alignItems={'center'}>
          <Typography variant="h5">Scheme Name: {schemeInfo.schemeName}</Typography>
          <Typography variant="body1"> ({schemeInfo.schemeDescription})</Typography>
        </Stack> */}
        <Box sx={{ mb: 1, borderColor: 'divider' }}>
          <Tabs
            value={superCurrentTab}
            aria-label="basic tabs example"
            sx={{ background: '#F4F6F8', height: '48px' }}
            onChange={(event, newValue) => setSuperCurrentTab(newValue)}
          >
            {categoryList
              .filter((tab: any) => tab.category_name.toLowerCase() !== 'bill payment')
              .map((tab: any) => (
                <Tab
                  key={tab._id}
                  sx={{ mx: 1, fontSize: { xs: 16, md: 20 } }}
                  label={<h5 style={{ marginBlockStart: '12px' }}>{tab.category_name}</h5>}
                  value={tab.category_name}
                  onClick={() => getSchemeDetail(tab._id)}
                />
              ))}
          </Tabs>
        </Box>
      </Box>
      {user?.role == 'm_distributor' && (
        <Stack sx={{ m: 1 }} maxWidth={200}>
          <TextField
            id="outlined-select-currency-native"
            select
            error={!mdSchemeId}
            label="Distributor"
            SelectProps={{ native: false }}
            helperText={!mdSchemeId && 'Please Select Distributor'}
          >
            {distributor.map((item: any) => {
              return (
                <MenuItem
                  key={item._id}
                  value={item.schemeId}
                  onClick={() => setMDschemeId(item.schemeId)}
                >
                  {item.firstName + ' ' + item.lastName}
                </MenuItem>
              );
            })}
          </TextField>
        </Stack>
      )}
      {loading ?(
        <Stack
          sx={{ height: '70vh', width: '100%' }}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {/* <Recharge sx={{ color: '#f82228' }} /> */}
        </Stack>
      ) : (
        <Grid item xs={12} md={6} lg={8}>
          {superCurrentTab.toLowerCase() == 'aeps' ? (
            <ViewAepsTable comData={com} tableData={sdata} />
          ) : superCurrentTab.toLowerCase() == 'recharges' ? (
            <ViewRechargeTable comData={com} tableData={sdata} />
          ) : superCurrentTab.toLowerCase() == 'money transfer' ? (
            <ViewMoneyTransferTable comData={com} tableData={sdata} />
          ) : superCurrentTab.toLowerCase() == 'aadhaar pay' ? (
            <ViewAadharPayTable comData={com} tableData={sdata} />
          ) : superCurrentTab.toLowerCase() == 'dmt1' ? (
            <ViewDmt1Table comData={com} tableData={sdata} />
          ) : superCurrentTab.toLowerCase() == 'dmt2' ? (
            <ViewDmt2Table comData={com} tableData={sdata} />
          ) : superCurrentTab.toLowerCase() == 'matm' ? (
            <ViewMatmTable comData={com} tableData={sdata} />
          ) : null}
        </Grid>
      )}
    </>
  );
}

// import React from 'react';

// function MySchemePage() {
//   return <div>MySchemePage</div>;
// }

// export default MySchemePage;
