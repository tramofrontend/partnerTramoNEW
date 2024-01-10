// import * as React from 'react';
import { useEffect, useState } from 'react';

import { Api } from 'src/webservices';

import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/material';

export default function PartnerBilling() {
  const [totalAttempt, settotalAttempt] = useState<any>({ PAN_Attempt: ' ', GST_Attempt: ' ' });

  useEffect(() => {
    GetTotalCount();
  }, []);

  const GetTotalCount = () => {
    let token = localStorage.getItem('token');
    Api(`apiBox/dashboard/get_KYC_Attempts`, 'GET', '', token).then((Response: any) => {
      console.log('======get_APIDocumentation==response=====>', Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          settotalAttempt(Response.data.data[0]);
          console.log('======totalcount==response=====>', Response.data.data);
        } else {
          console.log('======get_APIDocumentation error=======>' + Response);
        }
      }
    });
  };

  return (
    <>
      <Typography sx={{ m: 2 }} variant="h3">
        Total Number Of Attempts
      </Typography>
      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(1, 0.5fr)',
        }}
        mt={3}
        mr={2}
      >
        <Stack
          flexDirection={'row'}
          justifyContent={'space-between'}
          sx={{ borderBottom: '1px solid #ee802238', Width: '300px' }}
        >
          <Stack sx={{ Width: '50%' }}>
            <Typography variant="h5" textTransform={'capitalize'}>
              PAN Attempts
            </Typography>
          </Stack>
          <Stack gap={1} mr={4}>
            {totalAttempt.PAN_Attempt}
          </Stack>
        </Stack>

        <Stack
          flexDirection={'row'}
          justifyContent={'space-between'}
          sx={{ borderBottom: '1px solid #ee802238', Width: '300px' }}
        >
          <Stack>
            <Typography variant="h5" textTransform={'capitalize'}>
              GST Attempts
            </Typography>
          </Stack>
          <Stack gap={1} mr={4}>
            {totalAttempt.GST_Attempt}
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
