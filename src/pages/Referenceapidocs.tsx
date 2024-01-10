import { useEffect, useState } from 'react';
//ReactQuill
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
// @mui
import { Card, Stack, Grid, Tabs, Button, Tab, TextField, Modal, Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
// sections
// import { _allProducts, _ecommerceBestSalesman } from 'src/_mock/arrays';
import { _allProducts, _ecommerceBestSalesman } from 'src/_mock/arrays';
import { Api } from 'src/webservices';

// import { Label } from '@mui/icons-material';

export default function ReferenceApiDocs() {
  const [currentTab, setCurrentTab] = useState('active');
  const [apiDocData, setApiDocData] = useState<any>([]);

  const quillConfig = {
    toolbar: false, // Disable the toolbar
  };

  useEffect(() => {
    getAPIDocumentation();
  }, []);

  const getAPIDocumentation = () => {
    Api(`admin/get_APIDocumentation`, 'GET', '', '').then((Response: any) => {
      console.log('======get_APIDocumentation==response=====>' + Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setApiDocData(Response.data.data);
          setCurrentTab(Response.data.data[0].tabName);
          console.log('======get_APIDocumentation code_200=======>' + Response.data.data);
        } else {
          console.log('======get_APIDocumentation error=======>' + Response);
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Reference | Tramo</title>
      </Helmet>
      <Box style={{ padding: '0' }}>
        <Tabs
          value={currentTab}
          aria-label="basic tabs example"
          sx={{ background: '#F4F6F8' }}
          onChange={(event, newValue) => setCurrentTab(newValue)}
        >
          {apiDocData.map((tab: any) => (
            <Tab key={tab._id} sx={{ mx: 3 }} label={tab.tabName} value={tab.tabName} />
          ))}
        </Tabs>
      </Box>
      <Box m={2}>
        <Card sx={{ p: 2 }}>
          {apiDocData.map((item: any) => {
            if (currentTab == item.tabName)
              return (
                <Stack my={2}>
                  <ReactQuill
                    modules={quillConfig}
                    value={item.tabContent}
                    style={{ height: 'fit-content', display: 'block' }}
                  />
                </Stack>
              );
          })}
        </Card>
      </Box>
    </>
  );
}
