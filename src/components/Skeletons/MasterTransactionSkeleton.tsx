import { Skeleton, Stack, TableCell, TableRow } from '@mui/material';
import { useAuthContext } from 'src/auth/useAuthContext';

export const MasterTransactionSkeleton = () => {
  const { user } = useAuthContext();
  return (
    <TableRow>
      {/* Date & Time */}
      <TableCell>
        <Skeleton variant="text" width={150} sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" width={350} sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" width={200} sx={{ fontSize: '1rem' }} />
      </TableCell>

      <TableCell>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="circular" width={10} height={10} />
      </TableCell>
    </TableRow>
  );
};
