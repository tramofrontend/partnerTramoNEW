import { Stack } from '@mui/material';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const LineView = () => {
  const [series, setSeries] = useState([14, 23, 21, 17, 15, 20, 17, 21, 19, 11, 16]);

  const getColor = (value: number) => {
    const max = Math.max(...series);
    const min = Math.min(...series);
    const intensity = (value - min) / (max - min);
    const red = 255;
    const green = Math.round((1 - intensity) * 255);
    const blue = Math.round((1 - intensity) * 255);
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const [options, setOptions] = useState<any>({
    stroke: {
      width: 1,
      colors: series.map((value) => getColor(value)),
    },
    fill: {
      opacity: 1,
      colors: series.map((value) => getColor(value)),
    },

    labels: [
      'Suspended Fraud',
      'Nre Account',
      'Amount Limit Exceeded',
      'Remittor Cbs Timeout While A C Enquiry',
      'Duplicate Reference Number ',
      'Transaction Not Allowed As General Error',
      'Invalid Response Code',
      'Limit Exceeded for Member Bank',
      'Limit Exceeded for Member Bank',
      'Invalid Ifsc Or No Routing For Institution Network',
      'Account Closed',
    ],
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },

    theme: {
      monochrome: {
        enabled: false,
      },
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'center',
          },
        },
      },
    ],
  });

  return (
    <Stack>
      <Stack id="chart">
        <ReactApexChart options={options} series={series} type="polarArea" />
      </Stack>
    </Stack>
  );
};

export default LineView;
