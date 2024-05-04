import {
  Box,
  Grid,
  Skeleton,
  Stack,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

export const ProductionAccessSkeleton = () => {
  return (
    <Box sx={{ m: 2 }}>
      <Skeleton variant="text" width={300} height={30} />
      <Stack flexDirection={'row'} gap={3} marginTop={3}>
        <Skeleton variant="rounded" width={700} height={40} />
      </Stack>
      <Stack flexDirection={'row'} gap={3} marginTop={3}>
        <Skeleton variant="rounded" width={700} height={40} />
      </Stack>

      <Stack flexDirection={'row'} gap={3} marginTop={3}>
        <Skeleton variant="rounded" width={700} height={40} />
      </Stack>
    </Box>
  );
};
