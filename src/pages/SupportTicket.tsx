import { Card, Stack, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

function HelpAndSupport() {
  return (
    <>
      <Stack
        sx={{ display: "flex", justifyItems: "center", alignItems: "center" }}
      >
        <Typography variant="h4" sx={{ color: "#FF3131", marginTop: "6vw" }}>
          Need Help? Contact us at
        </Typography>
      </Stack>
      <Card
        sx={{
          top: "1vw",
          left: "15vw",
          width: "50vw",
          bgcolor: "#F6E2E2",
          height: "35vh",
        }}
      >
        <Stack
          sx={{
            justifyItems: "center",
            alignItems: "center",
            marginTop: "3vw",
          }}
        >
          <Typography
            sx={{
              margin: "16px",
              color: "#00000",
              "& a": { textDecoration: "none" },
            }}
          >
            <EmailIcon /> E-mail :
            <a href={`mailto:${process.env.React_APP_COMPANYEMAIL}`}>
              {process.env.React_APP_COMPANYEMAIL}
            </a>
          </Typography>
        </Stack>
        <Stack sx={{ justifyItems: "center", alignItems: "center" }}>
          <Typography
            sx={{
              margin: "16px",
              color: "#00000",
              "& a": { textDecoration: "none" },
            }}
          >
            <PhoneIcon /> Phone Number :{" "}
            <a href={`tel:${process.env.React_APP_COMPANYMOBILE}`}>
              {process.env.React_APP_COMPANYMOBILE}
            </a>
            ,
            <a href={`tel:${process.env.React_APP_COMPANYOTHERMOBILE}`}>
              {process.env.React_APP_COMPANYOTHERMOBILE}
            </a>
          </Typography>
        </Stack>
      </Card>
    </>
  );
}

export default HelpAndSupport;
