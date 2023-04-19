import Head from "next/head";
import { Box, Container } from "@mui/material";
import { VehicleListResults } from "../../components/vehicle/vehicle-list-results";
import { VehicleListToolbar } from "../../components/vehicle/vehicle-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";

const Vehicle = () => {

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
          <VehicleListToolbar />
          <Box sx={{ mt: 3 }}>
            <VehicleListResults />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Vehicle.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Vehicle;
