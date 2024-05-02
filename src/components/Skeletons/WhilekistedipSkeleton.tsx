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
  
  export const WhilekistedipSkeleton = () => {
    return (
        <Stack justifyContent={'space-between'}>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={600} height={40} />
        <Stack flexDirection={'row'} gap={3} marginTop={3}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} height={60} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={70} height={60} />
        </Stack>
      </Stack>
    );
  };
  