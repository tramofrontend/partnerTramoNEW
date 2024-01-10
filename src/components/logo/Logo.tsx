import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link, BoxProps } from '@mui/material';
import Tramo from '../../assets/logo/tramoTrmao-Final-Logo.svg';
import Neo from '../../assets/logo/neo-Neosprint_logo_black.svg';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 120,
          height: 70,
          margin: 'auto',
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <img
          src={process.env.REACT_APP_LOGO == 'Neosprint' ? Tramo : Tramo}
          alt="LOGO"
          width={'100%'}
          height={'100%'}
        />
      </Box>
    );

    if (disabledLink) {
      return <>{logo}</>;
    }

    return (
      <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
