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
} from '@mui/material';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { TableHeadCustom } from 'src/components/table';

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
export default function ViewMatmTable({ title, subheader, tableData, comData, ...other }: Props) {
  const tableLabels = [
    { id: 'min', label: 'Min. Slab' },
    { id: 'max', label: 'Max. Slab' },
    { id: 'txn', label: 'Transaction Type' },
    { id: 'Agent', label: 'Api User Commission' },
  ];

  return (
    <Card {...other}>
      {comData.length ? (
        <TableContainer sx={{ overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 720 }}>
              <TableHeadCustom headLabel={tableLabels} />
              <TableBody>
                {comData.map((row: any, index: any) => (
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
        Scheme Not Created for MATM. Please Contact to Admin.
      </Typography>
    </Stack>
  );
}
