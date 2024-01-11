import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, CardContent, Stack, Card } from '@mui/material';

import { Api } from 'src/webservices';

import Group321 from '../../src/assets/icons/Group 321 copy.svg';
import Group320 from '../../src/assets/icons/Group 320.svg';
import Frame10 from '../../src/assets/icons/Frame 10.svg';
import Frame9 from '../../src/assets/icons/Frame 9.svg';
import isolationMode from '../../src/assets/icons/Isolation_Mode.svg';
import intersect from '../../src/assets/icons/Intersect.png';
import Framegreen from '../../src/assets/icons/Frame green.svg';
import Frameorange from '../../src/assets/icons/Frame orange.svg';
import Graphgreen from '../../src/assets/icons/Graph green.svg';
import Graphorange from '../../src/assets/icons/Graph orange.svg';

import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function MyStats(props: any) {
  const theme = useTheme();

  const logo = [Group321, Group320, Frame10, Frame9, isolationMode, intersect];

  const [Success, setSuccess] = useState<any>({
    status: 'Success',
    volume: '',
    count: '',
    color: '#36B37E',
    logo: Framegreen,
    graph: Graphgreen,
  });
  const [Pending, setPending] = useState<any>({
    status: 'Pending',
    volume: '',
    count: '',
    color: '#FFAB00',
    logo: Framegreen,
    graph: Graphgreen,
  });
  const [Failed, setFailed] = useState<any>({
    status: 'Failed',
    volume: '',
    count: '',
    color: '#FF5630',
    logo: Frameorange,
    graph: Graphorange,
  });

  const [Total, setTotal] = useState<any>({
    status: 'Transactions',
    volume: '',
    count: '',
    color: '#3340A1',
    logo: Framegreen,
    graph: Graphgreen,
  });

  const Values = [
    {
      data: 'Opening Balance ',
      value: '₹ 0',
      color: '#36B37E',
      logo: Group321,
    },
    {
      data: 'Wallet Top-up',
      value: '₹ 0',
      color: '#3340A1',
      logo: Group320,
    },
    {
      data: "Today's Transactions",
      value: '₹ 0',
      color: '#00B8D9',
      logo: Frame10,
    },
    {
      data: 'Incured Charges',
      value: '₹ 0',
      color: '#E03E87',
      logo: Frame9,
    },
    {
      data: 'Commission Earned',
      value: '₹ 0',
      color: '#FFAB00',
      logo: isolationMode,
    },
    {
      data: 'Tax Deducted',
      value: '₹ 0',
      color: '#FF5630',
      logo: intersect,
    },
  ];

  useEffect(() => {
    userdata();
  }, []);
  const userdata = async () => {
    let token = localStorage.getItem('token');
    await Api(`apiBox/dashboard/totalSuccessTransaction`, 'GET', '', token).then(
      (Response: any) => {
        console.log('====res=========>' + JSON.stringify(Response));

        if (Response.status == 200) {
          if (Response.data.code == 200) {
            setSuccess({
              ...Success,
              count: Response.data.totalTransactions,
              volume: Response.data.volume,
            });
            console.log('==========Success=====>', Response);
          } else {
            let msg = Response.data.message;
            console.log('===404===>>>>', msg);
          }
        }
      }
    );
  };

  useEffect(() => {
    userValue();
  }, []);
  const userValue = async () => {
    let token = localStorage.getItem('token');
    await Api(`apiBox/dashboard/totalPendingTransaction`, 'GET', '', token).then(
      (Response: any) => {
        console.log('====res=========>' + JSON.stringify(Response));

        if (Response.status == 200) {
          if (Response.data.code == 200) {
            setPending({
              ...Pending,
              count: Response.data.totalTransactions,
              volume: Response.data.volume,
            });
            console.log('==========Pending=====>', Response);
          } else {
            let msg = Response.data.message;
            console.log('===404===>>>>', msg);
          }
        }
      }
    );
  };

  useEffect(() => {
    userCode();
  }, []);
  const userCode = async () => {
    let token = localStorage.getItem('token');
    await Api(`apiBox/dashboard/totalFailedTransaction`, 'GET', '', token).then((Response: any) => {
      console.log('====res=========>' + JSON.stringify(Response));
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setFailed({
            ...Failed,
            count: Response.data.totalTransactions,
            volume: Response.data.volume,
          });
          console.log('==========Failed=====>', Response);
        } else {
          let msg = Response.data.message;
          console.log('===404===>>>>', msg);
        }
      }
    });
  };

  useEffect(() => {
    userTotal();
  }, []);
  const userTotal = async () => {
    let token = localStorage.getItem('token');
    await Api(`apiBox/dashboard/totalTransactions`, 'GET', '', token).then((Response: any) => {
      console.log('====res=========>' + JSON.stringify(Response));
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setTotal({
            ...Total,
            count: Response.data.totalTransactions,
            volume: Response.data.volume,
          });
          console.log('==========TotalTransaction=====>', Response);
        } else {
          let msg = Response.data.message;
          console.log('===404===>>>>', msg);
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title> My Stats | {process.env.React_APP_COMPANYNAME} </title>
      </Helmet>
      <Grid width={'100%'}>
        <Stack sx={{ flexDirection: 'row', gap: 1, marginTop: '10px' }}>
          <Card
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: '15px',
              boxShadow: '30px',
              width: '33%',
            }}
          >
            <CardContent>
              <Stack
                sx={{
                  fontFamily: 'Public Sans',
                  fontSize: '18px',
                  fontWeight: 600,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Typography style={{ color: Success.color }}>{Success.status}</Typography>
                <Typography>{Success.count}</Typography>
              </Stack>
              <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <img
                  src={Success.logo}
                  alt="logo"
                  style={{
                    width: '40px',
                    height: '30px',
                  }}
                />
                <img
                  src={Success.graph}
                  alt="logo"
                  style={{
                    width: '40px',
                    height: '30px',
                  }}
                />
              </Stack>
              <Typography
                sx={{
                  fontFamily: 'Public Sans',
                  fontSize: '15px',
                  fontWeight: 100,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography>{'Transaction Value'}</Typography>
                <Typography>{parseFloat(Success.volume).toFixed(2)}</Typography>
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: '15px',
              boxShadow: '30px',
              width: '33%',
            }}
          >
            <CardContent>
              <Stack
                sx={{
                  fontFamily: 'Public Sans',
                  fontSize: '18px',
                  fontWeight: 600,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Typography style={{ color: Pending.color }}>{Pending.status}</Typography>
                <Typography>{Pending.count}</Typography>
              </Stack>
              <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <img
                  src={Pending.logo}
                  alt="logo"
                  style={{
                    width: '40px',
                    height: '30px',
                  }}
                />
                <img
                  src={Pending.graph}
                  alt="logo"
                  style={{
                    width: '40px',
                    height: '30px',
                  }}
                />
              </Stack>
              <Typography
                sx={{
                  fontFamily: 'Public Sans',
                  fontSize: '15px',
                  fontWeight: 100,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography>{'Transaction Value'}</Typography>
                <Typography>{parseFloat(Pending.volume).toFixed(2)}</Typography>
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: '15px',
              boxShadow: '30px',
              width: '33%',
            }}
          >
            <CardContent>
              <Stack
                sx={{
                  fontFamily: 'Public Sans',
                  fontSize: '18px',
                  fontWeight: 600,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Typography style={{ color: Failed.color }}>{Failed.status}</Typography>
                <Typography>{Failed.count}</Typography>
              </Stack>
              <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <img
                  src={Failed.logo}
                  alt="logo"
                  style={{
                    width: '40px',
                    height: '30px',
                  }}
                />
                <img
                  src={Failed.graph}
                  alt="logo"
                  style={{
                    width: '40px',
                    height: '30px',
                  }}
                />
              </Stack>
              <Typography
                sx={{
                  fontFamily: 'Public Sans',
                  fontSize: '15px',
                  fontWeight: 100,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography>{'Transaction Value'}</Typography>
                <Typography>{parseFloat(Failed.volume).toFixed(2)}</Typography>
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: '15px',
              boxShadow: '30px',
              width: '33%',
            }}
          >
            <CardContent>
              <Stack
                sx={{
                  fontFamily: 'Public Sans',
                  fontSize: '18px',
                  fontWeight: 600,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Typography style={{ color: Total.color }}>{Total.status}</Typography>
                <Typography>{Total.count}</Typography>
              </Stack>
              <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <img
                  src={Total.logo}
                  alt="logo"
                  style={{
                    width: '40px',
                    height: '30px',
                  }}
                />
                <img
                  src={Total.graph}
                  alt="logo"
                  style={{
                    width: '40px',
                    height: '30px',
                  }}
                />
              </Stack>
              <Typography
                sx={{
                  fontFamily: 'Public Sans',
                  fontSize: '15px',
                  fontWeight: 100,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography>{'Transaction Value'}</Typography>
                <Typography>{parseFloat(Total.volume).toFixed(2)}</Typography>
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Grid>

      <Grid sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
        {Values.map((item, index) => (
          <Grid item key={index} xs={4} width={'100%'}>
            <Card
              sx={{
                backgroundColor: '#fffff',

                borderColor: ' #e5ecf6',
                borderRadius: '15px',
              }}
            >
              <CardContent>
                <Stack>
                  <Typography
                    sx={{
                      fontFamily: 'Public Sans',
                      fontSize: '18px',
                      fontWeight: 700,
                    }}
                    style={{ color: item.color }}
                  >
                    {item.data}
                  </Typography>
                  <Stack
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Public Sans',
                        fontSize: '14px',
                        fontWeight: 600,
                      }}
                    >
                      {item.value}
                    </Typography>
                    <img
                      src={item.logo}
                      alt="logo"
                      style={{
                        display: 'block',
                        width: '50px',
                        height: '40px',
                      }}
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
