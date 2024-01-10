import { Stack, Typography, Card } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

function SupportTicket() {
  const cardStyle = {
    // display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
  };
  return (
    <>
      <Typography sx={{ m: 2 }} variant="h1">
        Contacts
      </Typography>

      <Typography variant="h5" marginLeft={10}>
        We are here to assist you and ensure that your experience with our platform is smooth and
        enjoyable. If you have any questions, concerns, or need assistance, please don't hesitate to
        reach out.
      </Typography>
      <Stack sx={{ m: 10 }} direction="row" justifyContent="space-between">
        <Card sx={{ width: '200px' }}>
          <Stack sx={{ ml: 2 }}>
            <Typography
              variant="h5"
              sx={{
                color: '#AAAAAA',
              }}
            >
              Calling Support
            </Typography>
            <Typography variant="h6" sx={{ mt: '6px' }}>
              <PhoneIcon /> {process.env.React_APP_COMPANYOTHERMOBILE}
            </Typography>
          </Stack>
        </Card>
        <Card sx={{ width: '200px' }}>
          <Stack sx={{ ml: 2 }}>
            <Typography
              variant="h5"
              sx={{
                color: '#AAAAAA',
              }}
            >
              Calling Support
            </Typography>
            <Typography variant="h6" sx={{ mt: '6px' }}>
              <PhoneIcon /> {process.env.React_APP_COMPANYMOBILE}
            </Typography>
          </Stack>
        </Card>
        <Card sx={{ width: '200px' }}>
          <Stack sx={{ ml: 2 }}>
            <Typography
              variant="h5"
              sx={{
                color: '#AAAAAA',
              }}
            >
              Email Support
            </Typography>
            <Typography variant="h6" sx={{ mt: '6px' }}>
              <EmailIcon /> {process.env.React_APP_COMPANYEMAIL}
            </Typography>
          </Stack>
        </Card>
      </Stack>
    </>
  );
}

export default SupportTicket;
