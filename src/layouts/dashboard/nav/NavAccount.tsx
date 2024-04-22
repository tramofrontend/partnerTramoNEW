// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// components
import { CustomAvatar } from '../../../components/custom-avatar';
import { sentenceCase } from 'change-case';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

export default function NavAccount() {
  const { user } = useAuthContext();

  return (
    <StyledRoot>
      <CustomAvatar
        src={user?.selfie[0]}
        alt={user?.firstName + ' ' + user?.lastName}
        name={user?.firstName}
      />

      <Box sx={{ ml: 1 }}>
        <Typography variant="subtitle2" sx={{ textOverflow: 'ellipsis' }}>
          {sentenceCase(user?.firstName + ' ' + user?.lastName)}
        </Typography>
        <Typography variant="subtitle2" noWrap>
          {sentenceCase(user?.role)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {user?.userCode}
        </Typography>{' '}
      </Box>
    </StyledRoot>
  );
}
