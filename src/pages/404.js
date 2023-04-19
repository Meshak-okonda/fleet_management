import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Logo } from "../components/logo";

const NotFound = () => (
  <>
    <Head>
      <title>404 | Fleet Management Soft</title>
    </Head>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
        backgroundColor: "#003863",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            align="center"
            sx={{
              color: "white",
            }}
            variant="h1"
          >
            404: Page inacessible
          </Typography>
          <Typography
            align="center"
            sx={{
              color: "white",
            }}
            variant="subtitle2"
          >
            La page demander n&apos;existe pas ou vous n&apos;y etès pas
            autorisé.
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Logo
              alt="Logo CPS"
              style={{
                marginTop: 50,
                display: "inline-block",
                maxWidth: "100%",
                width: "auto",
              }}
            />
          </Box>
          <NextLink href="/" passHref>
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
              sx={{ mt: 3, backgroundColor: "white", color: "#003863" }}
              variant="contained"
            >
              Revenir à la Connexion
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;
