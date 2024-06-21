import { Box, Card, Divider, Grid, Stack, Typography, Tab, Tabs, TextField } from '@mui/material';

import React, { useState } from 'react';
import FormProvider from 'src/components/hook-form/FormProvider';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Ellipseone from '../../assets/dashboardIcon/Ellipseone.svg';
import Ellipsetwo from '../../assets/dashboardIcon/Ellipsetwo.svg';
import Ellipsethree from '../../assets/dashboardIcon/Ellipsethree.svg';
import dayjs from 'dayjs';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LineView from './Charts/LineView';
import { Height } from '@mui/icons-material';
import ProgressBar from 'src/components/progress-bar';
import LinearWithValueLabel from './ProgressBarNew';
type FormValuesProps = {
  startDate: Date | null;
  endDate: Date | null;
  sDate: Date | null;
  eDate: Date | null;
};

function PartnerDashbord() {
  const [valueTab, setValueTab] = useState('daily');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };
  const defaultValues = {
    sDate: null,
    eDate: null,

    startDate: null,
    endDate: null,
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = methods;

  const filterTransaction = async (data: FormValuesProps) => {};
  return (
    <>
      <Stack>
        <Card
          sx={{
            width: '100%',
            background: '#F5F5F5',
          }}
        >
          <>
            <Box
              sx={{
                p: 1.5,
                display: 'flex',
                justifyContent: 'center',
                transform: 'scale(1)',
              }}
              gap={6}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={10}>
                  <Stack>
                    <Typography variant="h5">Analytics</Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={12}>
                  <Stack
                    sx={{
                      border: '1px dotted',
                      borderColor: '#C1C1C1',
                      borderRadius: 2,
                      borderWidth: 1,
                    }}
                  >
                    <Tabs value={valueTab} onChange={handleChange} sx={{ p: 1.5, gap: 7 }}>
                      <Tab value="toay" label="Today" sx={{ fontSize: '20px' }} />
                      <Tab value="currentMonth" label="Current Month" sx={{ fontSize: '20px' }} />
                      <Tab value="previousMonth" label="Previous Month" sx={{ fontSize: '20px' }} />
                      <Stack ml={5}>
                        <FormProvider methods={methods} onSubmit={handleSubmit(filterTransaction)}>
                          <Stack direction={'row'} gap={1}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="Start date"
                                inputFormat="DD/MM/YYYY"
                                value={watch('startDate')}
                                maxDate={new Date()}
                                onChange={(newValue: any) => setValue('startDate', newValue)}
                                renderInput={(params: any) => (
                                  <TextField {...params} size={'small'} sx={{ width: 225 }} />
                                )}
                              />
                              <DatePicker
                                label="End date"
                                inputFormat="DD/MM/YYYY"
                                value={watch('endDate')}
                                minDate={watch('startDate')}
                                maxDate={new Date()}
                                onChange={(newValue: any) => setValue('endDate', newValue)}
                                renderInput={(params: any) => (
                                  <TextField {...params} size={'small'} sx={{ width: 225 }} />
                                )}
                              />
                            </LocalizationProvider>
                          </Stack>
                        </FormProvider>
                      </Stack>
                    </Tabs>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={12}>
                  <Stack
                    sx={{
                      border: '1px dotted',
                      borderColor: '#C1C1C1',
                      borderRadius: 2,
                      borderWidth: 1,
                      p: 2,
                    }}
                  >
                    <Stack flexDirection="row" gap={3}>
                      <Stack flexDirection="row" gap={1}>
                        <Typography variant="subtitle1">Transaction Count:</Typography>
                        <Typography variant="body2">₹ 30,000</Typography>
                      </Stack>
                      <Stack flexDirection="row" gap={1}>
                        <Typography variant="subtitle1">Total Volume : </Typography>
                        <Typography variant="body2">₹ 30,00,000</Typography>
                      </Stack>
                    </Stack>
                    <Stack>
                      <Typography variant="body2">
                        % of successful verifications from total requests
                      </Typography>
                    </Stack>

                    <LinearWithValueLabel />
                    <Stack flexDirection="row" gap={5}>
                      <Stack flexDirection="row" gap={1} mt={2}>
                        <img
                          src={Ellipseone}
                          style={{ height: '18px', width: '18px', marginTop: 1 }}
                        />
                        <Typography variant="body2">Success Transactions & Amount :</Typography>
                        <Typography variant="caption" mt={0.5}>
                          270 & ₹2700
                        </Typography>
                      </Stack>
                      <Stack flexDirection="row" gap={1} mt={2}>
                        <img
                          src={Ellipsetwo}
                          style={{ height: '18px', width: '18px', marginTop: 1 }}
                        />
                        <Typography variant="body2">Pending Transactions & Amount :</Typography>
                        <Typography variant="caption" mt={0.5}>
                          270 & ₹2700
                        </Typography>
                      </Stack>
                      <Stack flexDirection="row" gap={0.5} mt={2}>
                        <img
                          src={Ellipsethree}
                          style={{ height: '18px', width: '18px', marginTop: 1 }}
                        />
                        <Typography variant="body2">Failed Transactions & Amount :</Typography>
                        <Typography variant="caption" mt={0.5}>
                          270 & ₹2700
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={12}>
                  <Stack
                    sx={{
                      border: '1px dotted',
                      borderColor: '#C1C1C1',
                      borderRadius: 2,
                      borderWidth: 1,
                      p: 2,
                    }}
                  >
                    <Stack>
                      <Typography variant="h5">Reason for failure</Typography>
                    </Stack>
                    <Stack sx={{ height: 370, width: 750 }}>
                      <LineView />
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </>
        </Card>
      </Stack>
    </>
  );
}

export default PartnerDashbord;
