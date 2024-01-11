// @mui
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  CardProps,
  TableContainer,
  Typography,
  Stack,
  Tab,
  Tabs,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { TableHeadCustom } from 'src/components/table';
import { Api } from 'src/webservices';

// ----------------------------------------------------------------------

type RowProps = {
  id: string;
  minSlab: string;
  maxSlab: string;
  TransactionType: string;
  apiUserCommission: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: RowProps[];
  comData: any;
}
export default function ViewBBPSTable({ title, subheader, tableData, comData, ...other }: Props) {
  const [currentTab, setCurrentTab] = useState('');
  const [subCateData, setSubCateData] = useState([]);
  const [localScheme, setLocalScheme] = useState([]);
  const tableLabels = [
    { id: 'min', label: 'Min. Slab' },
    { id: 'max', label: 'Max. Slab' },
    { id: 'txn', label: 'Transaction Type' },
    { id: 'Agent', label: 'Api User Commission' },
  ];

  useEffect(() => {
    getSubCategory();
  }, []);

  useEffect(() => {
    setLocalScheme(
      comData.filter((item: any) => {
        return item.subcategoryId == currentTab;
      })
    );
  }, [currentTab]);

  const getSubCategory = () => {
    let token = localStorage.getItem('token');
    let body = { categoryId: '6475b558ca22e107b9939c57' };
    Api('category/get_SubCategoryList', 'POST', body, token).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setSubCateData(Response.data.data.sub_category);
        }
      }
    });
  };

  return (
    <>
      <Tabs
        value={currentTab}
        aria-label="basic tabs example"
        sx={{ background: '#F4F6F8', padding: '0 20px', height: '48px' }}
        onChange={(event, newValue) => setCurrentTab(newValue)}
      >
        {subCateData.map((tab: any) => (
          <Tab
            style={{ fontSize: '20px' }}
            key={tab._id}
            sx={{ mx: 3 }}
            label={<h5 style={{ marginBlockStart: '6px' }}>{tab.sub_category_name}</h5>}
            value={tab._id}
          />
        ))}
      </Tabs>
      <Card {...other}>
        {comData.length ? (
          <TableContainer sx={{ overflow: 'unset' }}>
            <Scrollbar>
              <Table sx={{ minWidth: 720 }}>
                <TableHeadCustom headLabel={tableLabels} />
                <TableBody>
                  {localScheme.map((row: any, index: any) => (
                    <VendorRow key={row.id} row={row} />
                  ))}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        ) : (
          <NoData />
        )}
      </Card>
    </>
  );
}

type vendorRowProps = {
  row: RowProps;
};
// sd
function VendorRow({ row }: vendorRowProps) {
  return (
    <>
      <TableRow>
        <TableCell>{row.minSlab ? 'Rs. ' + row.minSlab : '-'}</TableCell>
        <TableCell>{row.maxSlab ? 'Rs. ' + row.maxSlab : '-'}</TableCell>
        <TableCell>{row.TransactionType || '-'}</TableCell>
        <TableCell>{row.apiUserCommission || '-'}</TableCell>
      </TableRow>
    </>
  );
}

function NoData() {
  return (
    <Stack justifyContent={'center'} p={2}>
      <Typography textAlign={'center'} fontSize={25}>
        {' '}
        Scheme Not Created for BBPS. Please Contact to Admin.
      </Typography>
    </Stack>
  );
}
