import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
//mui
import { Box, Card, Tab, Table, TableBody, Tabs, Typography } from '@mui/material';
import { Api } from 'src/webservices';
import BeneVerfication from 'src/sections/services/BeneVerification';
import {
  AEPS,
  AadhaarPay,
  BillPayment,
  DMT1,
  DMT2,
  MoneyTransfer,
  Payments,
  PayoutTransfer,
  Recharges,
  Transfer,
} from 'src/sections/services';
import AadhaarVerification from 'src/sections/services/AadhaarVerification';
import PanVerification from 'src/sections/services/PanVerification';
import GSTVerification from 'src/sections/services/GSTVerification';
import useResponsive from 'src/hooks/useResponsive';
import UPIVerification from 'src/sections/services/UPIVerification';
import ServiceWiseDashBoard from 'src/sections/services/ServiceWiseDashBoard';
import { useAuthContext } from 'src/auth/useAuthContext';
import { Rowing } from '@mui/icons-material';

type FormValuesProps = {
  transactionLabel: string;
  transactionValue: any;
};

export const CategoryContext = React.createContext({});

export default function Services() {
  let token = localStorage.getItem('token');
  const { user } = useAuthContext();
  const isMobile = useResponsive('up', 'sm');
  const [directFilter, setDirectFilter] = useState<any>([
    {
      label: 'Account Verification',
      value: {
        transactionType: 'Beneficiary Verification',
        category: '',
        product: '',
        productName: '',
      },
    },
    {
      label: 'UPI verification',
      value: {
        transactionType: 'UPI Verification',
        category: '',
        product: '',
        productName: '',
      },
    },
  ]);

  const txnSchema = Yup.object().shape({});
  const defaultValues = {
    transactionLabel: 'Account Verification',
    transactionValue: {
      transactionType: 'Beneficiary Verification',
      category: '',
      product: '',
      productName: '',
    },
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(txnSchema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    await Api(`category/get_CategoryList`, 'GET', '', token).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setDirectFilter((prevState: any) => [
            ...prevState,
            ...Response.data.data
              .filter((item: any) =>
                user?.activeCategoryIds
                  .map((row: any) => row.category_name)
                  .includes(item.category_name)
              )
              .map((item1: any) => {
                if (item1.category_name.toLowerCase() == 'kyc') {
                  Api(`product/get_ProductList/${item1._id}`, 'GET', '', token).then(
                    (Response: any) => {
                      if (Response.status == 200) {
                        if (Response.data.code == 200) {
                          setDirectFilter((state: any) => [
                            ...state,
                            ...Response.data.data.map((row: any) => {
                              return {
                                label: row.productName,
                                value: {
                                  transactionType: '',
                                  category: '',
                                  product: row._id,
                                  productName: '',
                                },
                              };
                            }),
                          ]);
                        }
                      }
                    }
                  );
                }
                if (item1.category_name.toLowerCase() == 'transfer') {
                  return {
                    label: 'UPI Transfer',
                    value: {
                      transactionType: 'Product/Service',
                      category: item1._id,
                      product: '',
                      productName: '',
                    },
                  };
                } else {
                  return {
                    label: item1.category_name,
                    value: {
                      transactionType: '',
                      category: item1._id,
                      product: '',
                      productName: '',
                    },
                  };
                }
              }),
          ]);
        }
      }
    });
  };

  return (
    <>
      <Box sx={{ borderColor: 'divider' }}>
        <Tabs
          value={watch('transactionLabel')}
          aria-label="basic tabs example"
          sx={{ background: '#F4F6F8', height: '48px', borderRadius: 2 }}
          onChange={(event, newVal) => {
            setValue('transactionLabel', newVal);
          }}
        >
          {directFilter.map((tab: any) => (
            <Tab
              key={tab.label}
              sx={{ mx: 1, fontSize: { xs: 16, md: 20 } }}
              label={<Typography variant="subtitle1">{tab.label}</Typography>}
              value={tab.label}
              onClick={() => {
                setValue('transactionValue', tab.value);
              }}
            />
          ))}
        </Tabs>
        <CategoryContext.Provider value={{ ...watch('transactionValue') }}>
          <ServiceWiseDashBoard />
          {watch('transactionLabel').toLowerCase() == 'money transfer' ? (
            <MoneyTransfer />
          ) : watch('transactionLabel').toLowerCase() == 'aeps' ? (
            <AEPS />
          ) : watch('transactionLabel').toLowerCase() == 'aadhaar pay' ? (
            <AadhaarPay />
          ) : watch('transactionLabel').toLowerCase() == 'recharges' ? (
            <Recharges />
          ) : watch('transactionLabel').toLowerCase() == 'dmt1' ? (
            <DMT1 />
          ) : watch('transactionLabel').toLowerCase() == 'dmt2' ? (
            <DMT2 />
          ) : watch('transactionLabel').toLowerCase() == 'payments' ? (
            <Payments />
          ) : watch('transactionLabel').toLowerCase() == 'bill payment' ? (
            <BillPayment />
          ) : watch('transactionLabel').toLowerCase() == 'upi transfer' ? (
            <Transfer />
          ) : watch('transactionLabel').toLowerCase() == 'payout payments' ? (
            <PayoutTransfer />
          ) : watch('transactionLabel').toLowerCase() == 'account verification' ? (
            <BeneVerfication />
          ) : watch('transactionLabel').toLowerCase() == 'aadhaar verification' ? (
            <AadhaarVerification />
          ) : watch('transactionLabel').toLowerCase() == 'pan verification' ? (
            <PanVerification />
          ) : watch('transactionLabel').toLowerCase() == 'upi verification' ? (
            <UPIVerification />
          ) : (
            watch('transactionLabel').toLowerCase() == 'gst verification' && <GSTVerification />
          )}
        </CategoryContext.Provider>
      </Box>
    </>
  );
}
