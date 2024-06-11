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

export default function ActivitySkeleton() {
  return (
    <>
      <Box sx={{ ml: 3, mt: 1 }}>
        <Typography>
          <Skeleton variant="text" width={150} sx={{ fontSize: '2rem' }} />
        </Typography>
        <Box>
          <Stack flexDirection={'row'} gap={40} mt={2}>
            <Stack>
              <Typography>
                <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
              </Typography>
            </Stack>
            <Typography>
              <Skeleton variant="text" width={150} sx={{ fontSize: '1.5rem' }} />
            </Typography>
          </Stack>
        </Box>
        <Box>
          <Stack flexDirection={'row'} gap={40}mt={1}>
            <Stack>
              <Typography>
                <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
              </Typography>
            </Stack>
            <Typography>
              <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
            </Typography>
          </Stack>
        </Box>
        <Box>
          <Stack flexDirection={'row'} gap={40} mt={1}>
            <Stack>
              <Typography>
                <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
              </Typography>
            </Stack>
            <Typography>
              <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
            </Typography>
          </Stack>
        </Box>
        <Box>
          <Stack flexDirection={'row'} gap={40} mt={1}>
            <Stack>
              <Typography>
                <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
              </Typography>
            </Stack>
            <Typography>
              <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
            </Typography>
          </Stack>
        </Box>
        <Box>
          <Stack flexDirection={'row'} gap={40} mt={1}>
            <Stack>
              <Typography>
                <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
              </Typography>
            </Stack>
            <Typography>
              <Skeleton variant="text" width={150} sx={{ fontSize: '1.2rem' }} />
            </Typography>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
