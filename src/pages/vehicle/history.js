import Head from "next/head";
import NextLink from "next/link";
import { Button, Box, Container } from "@mui/material";
import { HistoryListResults } from "../../components/vehicle/history/history-list";
import { DashboardLayout } from "../../components/dashboard-layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const HistoryVehicle = () => {

  return (
    <>
      <Head>
        <title>Page Véhicule</title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ mt: 1 }}>
            <NextLink href="/vehicle" passHref>
              <Button
                component="a"
                startIcon={<ArrowBackIcon fontSize="small" />}
              >
                Revenir en arrière
              </Button>
            </NextLink>
            <HistoryListResults />
          </Box>
        </Container>
      </Box>
    </>
  );
};
HistoryVehicle.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default HistoryVehicle;
