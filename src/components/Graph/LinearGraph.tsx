// @mui
import { alpha } from '@mui/material/styles';
import { Card, CardHeader, Typography, Stack, LinearProgress, Box, CardProps } from '@mui/material';
// utils
import { fShortenNumber } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  data: {
    status: string;
    quantity: number;
    value: number;
  }[];
}

export default function LinearGraph({ title, subheader, data, ...other }: Props) {
  return (
    <Card {...other} sx={{ height: '100%' }}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ px: 3, my: 5 }}>
        {data.map((progress) => (
          <LinearProgress
            variant="determinate"
            key={progress.status}
            value={progress.value}
            color={
              (progress.status === 'Pending' && 'warning') ||
              (progress.status === 'Failed' && 'error') ||
              'success'
            }
            sx={{ height: 8, bgcolor: (theme) => alpha(theme.palette.grey[500], 0.16) }}
          />
        ))}
      </Stack>

      <Stack direction="row" justifyContent="space-between" gap={3} sx={{ px: 3, pb: 3 }}>
        {data.map((progress) => (
          <Stack key={progress.status} alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: 0.5,
                  bgcolor: 'success.main',
                  ...(progress.status === 'Pending' && { bgcolor: 'warning.main' }),
                  ...(progress.status === 'Failed' && { bgcolor: 'error.main' }),
                }}
              />

              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                {progress.status}
              </Typography>
            </Stack>

            <Typography variant="h6">{fShortenNumber(progress.quantity) || 0}</Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
