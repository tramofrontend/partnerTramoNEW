import { Card, Grid, alpha, useTheme, CardProps, Stack } from '@mui/material';
import { sentenceCase } from 'change-case';
import React from 'react';
import Chart from 'src/components/chart';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { fIndianCurrency, fNumber } from 'src/utils/formatNumber';

interface Props extends CardProps {
  serviceData: {
    service: string;
    count?: number;
    percentage?: number;
  }[];
}

export default function CircleGraph({ serviceData, ...other }: Props) {
  const theme = useTheme();
  const services = serviceData
    .sort((a: any, b: any) => b.count - a.count)
    .map((data) => `${sentenceCase(data.service)} - ${data.count}`);
  console.log(services);
  const count = serviceData.map((data) => data.count);
  const totalCount = serviceData.length;
  const percentages = count.map((count: any) => count);

  const chartOptions: any = {
    chart: {
      type: 'donut',
    },
    labels: services,
    colors: [
      alpha(theme.palette.error.main, 1),
      alpha(theme.palette.error.main, 0.95),
      alpha(theme.palette.error.main, 0.9),
      alpha(theme.palette.error.main, 0.8),
      alpha(theme.palette.error.main, 0.7),
      alpha(theme.palette.error.main, 0.6),
      alpha(theme.palette.error.main, 0.5),
      alpha(theme.palette.error.main, 0.4),
      alpha(theme.palette.error.main, 0.3),
      alpha(theme.palette.error.main, 0.2),
      alpha(theme.palette.error.main, 0.1),
    ],
    dataLabels: {
      formatter: (val: number, opts: any) => {
        const serviceName = opts.w.globals.labels[opts.seriesIndex];
        return ``;
      },
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value: number) => fNumber(value),
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '85%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              formatter: () => `${serviceData.length}`,
              style: {
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#000000', // Change this to your desired color
              },
            },
          },
        },
      },
    },
    legend: {
      position: 'right',
    },
  };

  const chartSeries = percentages;

  return (
    <Scrollbar>
      <Stack {...other}>
        <Grid
          display={'grid'}
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          my={5}
        >
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="donut"
            // width={'100%'}
            height={320}
          />
        </Grid>
      </Stack>
    </Scrollbar>
  );
}
