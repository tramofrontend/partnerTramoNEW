import { useEffect, useState } from 'react';
// ReactQuill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
// @mui
import Scrollbar from 'src/components/scrollbar';
import { Card, Stack, Grid, Tabs, Button, Tab, TextField, Modal, Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { _allProducts, _ecommerceBestSalesman } from 'src/_mock/arrays';
import { Api } from 'src/webservices';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

import useResponsive from 'src/hooks/useResponsive';

export default function ReferenceApiDocs() {
  const [currentTab, setCurrentTab] = useState('active');
  const [apiDocData, setApiDocData] = useState<any>([]);
  const isMobile = useResponsive('up', 'sm');
  const isDesktop = useResponsive('up', 'sm');
  const quillConfig = {
    toolbar: false,
  };

  useEffect(() => {
    getAPIDocumentation();
  }, []);

  const getAPIDocumentation = () => {
    Api('category/get_CategoryList', 'GET', '', '').then((Response: any) => {
      console.log('======get_APIDocumentation==response=====>', Response);
      if (Response.status === 200 && Response.data.code === 200) {
        setApiDocData(Response?.data?.data);
        setCurrentTab(Response?.data?.data[0]?.category_name);
        console.log('======get_APIDocumentation code_200=======>', Response);
      } else {
        console.log('======get_APIDocumentation error=======>', Response);
      }
    });
  };

  const anchorItems = apiDocData.map((item: any, index: any) => ({
    key: `part-${index + 1}`,
    href: `#part-${index + 1}`,
    title: item.category_name,
  }));

  return (
    <>
      <Helmet>
        <title>Reference | Tramo</title>
      </Helmet>
      <Box style={{ position: 'sticky', zIndex: 1000, background: '#fff' }}>
        <Tabs
          value={currentTab}
          aria-label="basic tabs example"
          sx={{ background: '#F4F6F8' }}
          onChange={(event, newValue) => setCurrentTab(newValue)}
        >
          {apiDocData.map((tab: any) => (
            <Tab key={tab._id} label={tab.category_name} value={tab.category_name} />
          ))}
        </Tabs>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={2} sx={{ bgcolor: '#F4F6F8' }}>
          <Stack sx={{ mt: 3 }}>
            <SimpleTreeView>
              <TreeItem itemId="Overview" label="Overview" sx={{ mt: 2, p: 1 }}>
                <TreeItem itemId="Key-Features" label="Key Features" />
                <TreeItem itemId="Use-Cases" label="Use Cases" />
                <TreeItem itemId="How-It-Works" label="How It Works" />
                <TreeItem itemId="Benefits" label=" Benefits" />
              </TreeItem>
              <TreeItem itemId="tree-view" label="Account Validation ">
                <TreeItem itemId="Request-URL" label="Request-URL" />
                <TreeItem itemId="Request-Method" label="Request Method" />
                <TreeItem itemId="Request-Header" label="Request-Header" />
                <TreeItem itemId="Request-Parameter" label=" Request Parameter" />
                <TreeItem itemId="Sample-Request " label="Sample-Request " />
                <TreeItem itemId="Response-Format" label="Response-Format" />
                <TreeItem itemId="Sample-Responses" label="Sample-Responses" />
                <TreeItem itemId="Status-Codes" label=" Status-Codes" />
              </TreeItem>
            </SimpleTreeView>
          </Stack>
        </Grid>

        <Grid item xs={10}>
          <Scrollbar
            sx={
              isMobile
                ? { maxHeight: window.innerHeight - 210 }
                : { maxHeight: window.innerHeight - 154 }
            }
          >
            <Stack sx={{}}>
              <div id="part-1" style={{ height: '100vh', background: 'rgba(255,0,0,0.02)' }} />
            </Stack>
          </Scrollbar>
        </Grid>
      </Grid>
    </>
  );
}
