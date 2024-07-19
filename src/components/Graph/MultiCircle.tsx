import { ApexOptions } from 'apexcharts';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Card, CardHeader, CardProps, Stack, Typography } from '@mui/material';
// utils
import { fIndianCurrency, fNumber } from '../../utils/formatNumber';
// components
import Chart, { useChart } from '../../components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 220;

const LEGEND_HEIGHT = 0;

const StyledChart = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(0),
  '& .apexcharts-canvas svg': {
    height: CHART_HEIGHT,
  },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'hidden',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important' as 'relative',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  total: number;
  chart: {
    colors?: string[][];
    series: {
      label: string;
      value: number;
    }[];
    options?: ApexOptions;
  };
}

export default function MultiCircle({ title, subheader, total, chart, ...other }: Props) {
  const theme = useTheme();

  const { colors, series, options } = chart;

  const chartSeries = series.map((i) => i.value);

  const chartColors: any = [
    [theme.palette.success.light, theme.palette.success.main],
    [theme.palette.warning.light, theme.palette.warning.main],
    [theme.palette.error.light, theme.palette.error.main],
  ];

  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    labels: series.map((i) => i.label),
    stroke: { colors: [theme.palette.background.paper] },
    legend: {
      floating: false,
      horizontalAlign: 'center',
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: chartColors.map((colors: any) => [
          { offset: 0, color: colors[0] },
          { offset: 100, color: colors[1] },
        ]),
      },
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value: number) => fIndianCurrency(value),
        title: {
          formatter: (seriesName: string) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '58%' },
        dataLabels: {
          name: {
            // show: false,
            color: chartColors,
          },
          value: { offsetY: 16 },
          total: {
            formatter: () =>
              total.toLocaleString('en-IN', {
                maximumFractionDigits: 0,
                style: 'currency',
                currency: 'INR',
              }),
          },
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <StyledChart dir="ltr">
        <Chart type="radialBar" series={chartSeries} options={chartOptions} height={260} />
      </StyledChart>
      <Stack flexDirection="row" justifyContent={'space-evenly'} m={1}>
        {chartColors.map((item: any, index: number) => {
          return (
            <Stack key={index} flexDirection={'row'} gap={0.5} alignItems={'center'}>
              <span
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: '50%',
                  backgroundColor: `${item[1]}`,
                }}
              ></span>
              <Typography variant="caption">
                {index == 0 ? 'Success' : index == 1 ? 'Pending' : 'Failed'}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Card>
  );
}
