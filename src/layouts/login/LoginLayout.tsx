// @mui
import { Typography, Stack } from '@mui/material';
// components
import Logo from '../../components/logo';
import Image from '../../components/image';
//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';
import { Fragment } from 'react';
import packageFile from '../../../package.json';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children, illustration, title }: Props) {
  return (
    <Fragment>
      <StyledRoot>
        <StyledContent>
          <Stack sx={{ width: 1 }}> {children} </Stack>
        </StyledContent>
      </StyledRoot>
      <Stack
        sx={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 999 }}
        flexDirection={'row'}
        justifyContent={'space-between'}
        px={1}
      >
        <Typography variant="caption">
          v.
          {process.env.REACT_APP_ENV == 'DEV' ? packageFile.versiondev : packageFile.versionprod}
        </Typography>
        <Typography variant="caption">Last Updated :- {packageFile.lastUpdated}</Typography>
      </Stack>
    </Fragment>
  );
}
