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
  chargeType: string;
  apiUserCharge: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: RowProps[];
  comData: any;
}

export default function ViewMoneyTransferTable({
  title,
  subheader,
  tableData,
  comData,
  ...other
}: Props) {
  const tableLabels = [
    { id: 'min', label: 'Min. Slab' },
    { id: 'max', label: 'Max. Slab' },
    { id: 'chargeType', label: 'Charge Type' },
    { id: 'charge', label: 'Api user Charge' },
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
        <TableCell>{row.minSlab}</TableCell>
        <TableCell>{row.maxSlab}</TableCell>
        <TableCell>
          {row.chargeType == 'percentage' ? '%' : row.chargeType == 'flat' ? 'Rs.' : '-'}
        </TableCell>
        <TableCell>{row.apiUserCharge}</TableCell>
      </TableRow>
    </>
  );
}

function NoData() {
  return (
    <Stack justifyContent={'center'} p={2}>
      <Typography textAlign={'center'} fontSize={25}>
        {' '}
        Scheme Not Created. Please Contact to Admin.
      </Typography>
    </Stack>
  );
}
