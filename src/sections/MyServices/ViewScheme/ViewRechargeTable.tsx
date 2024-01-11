import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  CardProps,
  TableContainer,
  Stack,
  Typography,
} from '@mui/material';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { TableHeadCustom } from 'src/components/table';
// ----------------------------------------------------------------------

type RowProps = {
  productName: string;
  apiUserCommission: string;
};

interface Props extends CardProps {
  tableData: RowProps[];
  comData: any;
}

export default function ViewRechargeTable({ tableData, comData, ...other }: Props) {
  const tableLabels = [
    { id: 'ProductDetail', label: 'Product Deatil' },
    { id: 'Agent', label: 'Api User Commission(in %)' },
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
        <TableCell>{row.productName}</TableCell>
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
        Scheme Not Created for Recharges. Please Contact to Admin.
      </Typography>
    </Stack>
  );
}
