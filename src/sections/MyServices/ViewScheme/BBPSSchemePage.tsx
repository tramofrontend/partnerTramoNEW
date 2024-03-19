import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { _ecommerceBestSalesman } from 'src/_mock/arrays';
import { Api } from 'src/webservices';

import {
  Button,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { TableHeadCustom } from 'src/components/table';
import CustomPagination from 'src/components/customFunctions/CustomPagination';
import { useSnackbar } from 'notistack';
import ApiDataLoading from 'src/components/customFunctions/ApiDataLoading';

//form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, { RHFCodes, RHFSelect, RHFTextField } from '../../../components/hook-form';
import { useAuthContext } from 'src/auth/useAuthContext';
// ----------------------------------------------------------------------

type FormValuesProps = { subcategoryList: string[]; subcategory: string; product: string };

export default function BBPSSchemePage() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [bbpsVendor, setBPSvendor] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tempTableData, setTempTableData] = useState([]);
  const [isFilter, setIsFilted] = useState(false);
  const [searchData, setSearchData] = useState([]);

  const rechargePageSchema = Yup.object().shape({});

  const defaultValues = {
    subcategory: '',
    product: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(rechargePageSchema),
    defaultValues,
    mode: 'all',
  });

  const {
    reset,
    getValues,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const tableLabels = [
    { id: 'minslab', label: 'Min Slab' },
    { id: 'maxslab', label: 'Max Slab' },
    { id: 'cate', label: 'Category' },
    { id: 'product', label: 'Product' },
    { id: 'commissiontype3', label: 'Api User Commission Type' },
    { id: 'Agcommission', label: 'API User Commission' },
  ];

  useEffect(() => {
    getSchemeDetails(user?.bbpsSchemeId);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    let temp = [...searchData];
    setTempTableData(temp.slice(currentPage * pageSize - pageSize, currentPage * pageSize));
  }, [searchData.length]);

  //pagenation in frontend
  useEffect(() => {
    let temp = isFilter ? [...searchData] : [...tableData];
    setTempTableData(temp.slice(currentPage * pageSize - pageSize, currentPage * pageSize));
  }, [currentPage, tableData]);

  const getSchemeDetails = async (val: any) => {
    let token = localStorage.getItem('token');
    setIsLoading(true);
    await Api(`bbpsManagement/bbpsScheme/scheme_details/` + val, 'GET', '', token).then(
      (Response: any) => {
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            setTableData(Response.data.data.commissionSetting);
            setCurrentPage(1);
          } else {
            enqueueSnackbar(Response.data.message);
          }
          let arr: any = [];
          Response.data?.data?.commissionSetting?.map((item: any) => {
            if (!arr.includes(item.subCategoryName)) {
              arr.push(item.subCategoryName);
            }
          });
          setValue('subcategoryList', arr);
          setTimeout(() => setIsLoading(false), 1000);
        } else {
          enqueueSnackbar('Failed to Load');
          setIsLoading(false);
        }
      }
    );
  };

  const onSubmit = (data: FormValuesProps) => {
    setIsFilted(true);
    if (data.subcategory && !data.product) {
      setSearchData(tableData.filter((item: any) => item.subCategoryName == data.subcategory));
    } else if (!data.subcategory && data.product) {
      setSearchData(
        tableData.filter((item: any) => item.product.productName.toLowerCase().match(data.product))
      );
    } else if (data.subcategory && data.product) {
      setSearchData(
        tableData
          .filter((item: any) => item.subCategoryName == data.subcategory)
          .filter((item: any) => item.product.productName.toLowerCase().match(data.product))
      );
    } else {
      setSearchData(tableData);
    }
  };

  const clear = () => {
    setIsFilted(false);
    setTempTableData(tableData.slice(currentPage * pageSize - pageSize, currentPage * pageSize));
    setCurrentPage(1);
    setValue('product', '');
    setValue('subcategory', '');
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack flexDirection={'row'} gap={1} my={1} width={{ xs: '100%', sm: '50%' }}>
          <RHFSelect
            name="subcategory"
            label="Category"
            placeholder="Category"
            size="small"
            SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
          >
            {getValues('subcategoryList')?.map((item: string) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </RHFSelect>
          <RHFTextField
            name="product"
            label="Product"
            placeholder="Product"
            size="small"
            SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
          />
          <Button variant="contained" type="submit">
            {' '}
            Search
          </Button>
          <Button variant="contained" onClick={clear}>
            Clear
          </Button>
        </Stack>
      </FormProvider>
      {isLoading ? (
        <ApiDataLoading />
      ) : (
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 720 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody sx={{ overflow: 'auto' }}>
              {tempTableData.map((row: any) => {
                return (
                  <SchemeRow
                    key={row._id}
                    row={row}
                    bbpsVendor={bbpsVendor}
                    rowDetail={user?.role}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
       <CustomPagination
                  page={currentPage - 1}
                  count={(isFilter ? searchData : tableData).length}
                  onPageChange={(
                    event: React.MouseEvent<HTMLButtonElement> | null,
                    newPage: number
                  ) => {
                    setCurrentPage(newPage + 1);
                  }}
                  rowsPerPage={pageSize}
                  onRowsPerPageChange={(
                    event: React.ChangeEvent<
                      HTMLInputElement | HTMLTextAreaElement
                    >
                  ) => {
                    setPageSize(parseInt(event.target.value));
                    setCurrentPage(1);
                  }}
                />
    </>
  );
}

const SchemeRow = ({ row, bbpsVendor, rowDetail }: any) => {
  const [item, setItem] = useState(row);

  return (
    <TableRow>
      <TableCell>{item?.minSlab}</TableCell>
      <TableCell>{item?.maxSlab}</TableCell>
      <TableCell>{item?.subCategoryName}</TableCell>
      <TableCell>{item?.product?.productName}</TableCell>

      <TableCell>
        {item?.apiUserCommissionType == 'flat'
          ? 'Rs.'
          : item?.apiUserCommissionType == 'percentage'
          ? '%'
          : '-'}
      </TableCell>
      <TableCell>{item?.apiUserCommission}</TableCell>
    </TableRow>
  );
};

// import React from 'react';

// function BBPSSchemePage() {
//   return <div>BBPSSchemePage</div>;
// }

// export default BBPSSchemePage;
