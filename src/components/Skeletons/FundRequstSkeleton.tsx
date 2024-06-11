import { useEffect, useState, useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
// @mui
import {
  Container,
  Card,
  Stack,
  Grid,
  InputAdornment,
  Tabs,
  Button,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Modal,
  FormControlLabel,
  styled,
  SwitchProps,
  Checkbox,
  Switch,
  Icon,
  Skeleton,
} from '@mui/material';

import {
  Box,
  Table,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  CardProps,
  CardHeader,
  Typography,
  TableContainer,
} from '@mui/material';
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';

export default function FundsRequestSkeleton() {
  return (
    <>
      <Stack flexDirection={'row'} gap={2} alignItems={'flex-end'} justifyContent={'end'}>
        <Typography>
          <Skeleton variant="text" width={90} sx={{ fontSize: '3rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={90} sx={{ fontSize: '3rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      v
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={30} mt={1}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
        </Typography>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
        </Typography>
      </Stack>
    </>
  );
}
