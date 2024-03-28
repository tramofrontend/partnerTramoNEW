import { useEffect, useState } from "react";
// @mui
import {
  Stack,
  Grid,
  TableHead,
  Box,
  Table,
  TableRow,
  TableBody,
  TextField,
  Button,
  Typography,
  Pagination,
  MenuItem,
  TableCell,
  styled,
  tableCellClasses,
} from "@mui/material";

import { Helmet } from "react-helmet-async";
import * as Yup from "yup";
import { useSnackbar } from "notistack";

import { Api } from "src/webservices";
import { fDateFormatForApi, fDateTime } from "src/utils/formatTime";
import ApiDataLoading from "src/components/customFunctions/ApiDataLoading";
import Label from "src/components/label/Label";
import { sentenceCase } from "change-case";
import CustomPagination from "src/components/customFunctions/CustomPagination";
import { useForm } from "react-hook-form";
import FormProvider from "src/components/hook-form/FormProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDateRangePicker } from "src/components/date-range-picker";
import FileFilterButton from "../MyTransaction/FileFilterButton";
import Iconify from "src/components/iconify";
import { DateRangePicker } from "@mui/lab";
import { RHFSelect, RHFTextField } from "src/components/hook-form";
import Scrollbar from "src/components/scrollbar";
import { TableHeadCustom } from "src/components/table";
import { fIndianCurrency } from "src/utils/formatNumber";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// ----------------------------------------------------------------------

export default function (props: any) {
  const { enqueueSnackbar } = useSnackbar();

  const [sdata, setSdata] = useState([]);
  const [refId, setRefId] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // const [fundRequestCreatedAt, setFundRequestCreatedAt] = useState('');

  const tableLabels = [
    { id: "Date", label: "Date & Time" },
    { id: "amount", label: "Amount" },
    { id: "modeType", label: "ModeType" },
    { id: "Charge", label: "Charge" },
    { id: "Commission", label: "Commission" },
    { id: " deposit_type", label: " Deposit Type" },
    { id: "mobile", label: "Mobile" },
    { id: " branch", label: " Branch" },
    { id: " status", label: " Status" },
  ];

  type FormValuesProps = {
    transactionType: string;
    phoneNumber: string;
    utrNumber: string;
    amount: string;
    status: string;
    Paymentmode: string;
    request_type: string;
    fundRequestId: string;
    startDate: Date | null;
    endDate: Date | null;
  };

  const FilterSchema = Yup.object().shape({
    UserName: Yup.string(),
  });

  const defaultValues = {
    phoneNumber: "",
    amount: "",
    Paymentmode: "",
    status: "",
    request_type: "",
    fundRequestId: "",
    startDate: null,
    endDate: null,
  };
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(FilterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    setValue,
    watch,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const {
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    open: openPicker,
    onOpen: onOpenPicker,
    onClose: onClosePicker,
    isSelected: isSelectedValuePicker,
    isError,
    shortLabel,
  } = useDateRangePicker(null, null);

 

  useEffect(() => {
    getFundReq();
  }, [currentPage]);

  const getFundReq = () => {
    setIsLoading(true);
    let token = localStorage.getItem("token");
    let body = {
      pageInitData: {
        pageSize: pageSize,
        currentPage: currentPage,
      },
    };
    Api(`apiBox/fundManagement/getRaisedRequests`, "POST", body, token).then(
      (Response: any) => {
        console.log("======FundsRequests All==response=====>", Response);
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            enqueueSnackbar(Response.data.message);
            setPageCount(Response.data.count);
            setSdata(Response.data.data);
          } else {
            console.log("======getRaisedRequests=======>" + Response);
            enqueueSnackbar(Response.data.message);
          }
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    );
  };

  const filterRequest = (refId: string) => {
    setSdata([]);
    setIsLoading(true);
    let token = localStorage.getItem("token");
    let body = {
      pageInitData: {
        pageSize: 20,
        currentPage: currentPage,
      },
      clientRefId: refId,
    };
    Api(`transaction/transactionByUser`, "POST", body, token).then(
      (Response: any) => {
        console.log("======Transaction==response=====>" + Response);
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            setSdata(Response.data.data.data);
            enqueueSnackbar(Response.data.message);
          } else {
            console.log("======Transaction=======>" + Response);
          }
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    );
  };


 

  const SearchData = (data: FormValuesProps) => {
    setSdata([]);
    let token = localStorage.getItem("token");
    let body = {
      pageInitData: {
        pageSize: 20,
        currentPage: currentPage,
      },
      bankName: "",
      bankId: "",
      status: data.status,
      modeName: data.Paymentmode,
      mobileNumber: data.phoneNumber,
      amount: data.amount,
      startDate: fDateFormatForApi(getValues("startDate")),
      endDate: fDateFormatForApi(getValues("endDate")),
      type: "",
    };
    Api(`agent/fundManagement/getRaisedRequests`, "POST", body, token).then(
      (Response: any) => {
        console.log("======Transaction==response=====>" + Response);
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            enqueueSnackbar(Response.data.message);
            setPageCount(Response.data.count);
            setSdata(Response.data.data);
          } else {
            console.log("======getRaisedRequests=======>" + Response);
            enqueueSnackbar(Response.data.message);
          }
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    );
  };
  const handdleClear = () => {
    getFundReq();
    onChangeEndDate(null);
    onChangeStartDate(null);
    reset(defaultValues);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 720 },
    bgcolor: "#ffffff",
    borderRadius: 2,
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      padding: 6,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.grey[300],
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <>
      <Helmet>
        <title> Transactions |{process.env.React_APP_COMPANYNAME}</title>
      </Helmet>

      <Stack flexDirection={"row"} justifyContent={"end"}></Stack>
      {isLoading ? (
        <ApiDataLoading />
      ) : (
        <Grid item xs={16} md={12} lg={12}>
          <FormProvider methods={methods} onSubmit={handleSubmit(SearchData)}>
            <Stack direction="row" gap={2} mt={2} mb={2}>
              <Stack>
                <Stack flexDirection={"row"} gap={1}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start date"
                      inputFormat="DD/MM/YYYY"
                      value={watch("startDate")}
                      maxDate={new Date()}
                      onChange={(newValue: any) => setValue("startDate", newValue)}
                      renderInput={(params: any) => (
                        <TextField {...params} size={"small"} sx={{ width: 150 }} />
                      )}
                    />
                    <DatePicker
                      label="End date"
                      inputFormat="DD/MM/YYYY"
                      value={watch("endDate")}
                      minDate={watch("startDate")}
                      maxDate={new Date()}
                      onChange={(newValue: any) => setValue("endDate", newValue)}
                      renderInput={(params: any) => (
                        <TextField {...params} size={"small"} sx={{ width: 150 }} />
                      )}
                    />
                  </LocalizationProvider>
                </Stack>
              </Stack>
              <RHFSelect
                name="Paymentmode"
                label="Mode Of Payment"
                size="small"
                SelectProps={{
                  native: false,
                  sx: { textTransform: "capitalize" },
                }}
              >
                <MenuItem value="NEFT">NEFT</MenuItem>
                <MenuItem value="RTGS">RTGS</MenuItem>
                <MenuItem value="IMPS">IMPS</MenuItem>
                <MenuItem value="Cash deposit at CDM">
                  Cash deposit at CDM
                </MenuItem>
                <MenuItem value="Fund Transfer">Fund Transfer</MenuItem>
                <MenuItem value="Cash deposit at branch">
                  Cash deposit at branch
                </MenuItem>
              </RHFSelect>

              <RHFSelect
                name="status"
                label="Status"
                size="small"
                SelectProps={{
                  native: false,
                  sx: { textTransform: "capitalize" },
                }}
              >
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </RHFSelect>

              {
                <RHFTextField
                  name="phoneNumber"
                  label=" Mobile"
                  placeholder="Mobile"
                  size="small"
                />
              }
              <RHFTextField
                name="amount"
                label="amount"
                placeholder="amount"
                size="small"
              />

              <Button variant="contained" type="submit">
                Search
              </Button>
              <Button variant="contained" onClick={handdleClear}>
                Clear
              </Button>
            </Stack>
          </FormProvider>

          <Scrollbar sx={{ maxHeight: window.innerHeight - 160 }}>
            <Table
              sx={{ minWidth: 720 }}
              aria-label="customized table"
              stickyHeader
            >
              <TableHeadCustom headLabel={tableLabels} />

              <TableBody>
                {sdata.map((row: any) => (
                  <StyledTableRow
                    key={row._id}
                    role="checkbox"
                    tabIndex={-1}
                    sx={{ borderBottom: "1px solid #dadada" }}
                  >
                    <StyledTableCell>
                      <Typography variant="body1">
                      createdAt: {fDateTime(row?.createdAt)}
                      </Typography>
                      <Typography variant="body1">
                      UpdatedAt: {fDateTime(row?.actionDate)}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Typography variant="body1">Rs. {row?.amount}</Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body1">
                        {row?.modeId?.transfer_mode_name}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Typography variant="body1" textAlign={"center"}>
                        {!isNaN(row?.Charge) ? "Rs. " + row?.Charge : "-"}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Typography variant="body1" textAlign={"center"}>
                        {!isNaN(row?.Commission)
                          ? "Rs. " + fIndianCurrency(row?.Commission || "0")
                          : "-"}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Typography variant="body1">
                        {row?.deposit_type}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Typography variant="body1">
                        {row?.transactional_details?.mobile}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Typography variant="body1">
                        {row?.transactional_details?.branch}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell
                      sx={{
                        textTransform: "lowercase",
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      <Label
                        variant="soft"
                        color={
                          (row.status.toLowerCase() === "rejected" && "error") ||
                          ((row.status.toLowerCase() === "pending" ||
                            row.status.toLowerCase() === "in_process") &&
                            "warning") ||
                          "success"
                        }
                        sx={{ textTransform: "capitalize" }}
                      >
                        {row.status.toLowerCase()
                          ? sentenceCase(row.status.toLowerCase())
                          : ""}
                      </Label>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Scrollbar>

          <CustomPagination
                  page={currentPage - 1}
                  count={pageCount}
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

          {/* <CustomPagination /> */}
        </Grid>
      )}
    </>
  );
}
