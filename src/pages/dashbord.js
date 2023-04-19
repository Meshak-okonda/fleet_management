import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { VehicleTotal } from "../components/dashboard/vehicles";
import StatCar from "../components/dashboard/StatCar";
import { ResponsableTotal } from "../components/dashboard/responsables";
import { DriverTotal } from "../components/dashboard/driver";
import { DashboardLayout } from "../components/dashboard-layout";
import { useAppSelector } from "../hooks";

const Dashboard = () => {
  const { vehicles } = useAppSelector((state) => state.globalState);

  return (
    <>
      <Head>
        <title>Dashboard | Fleet Management Soft</title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container
spacing={3}>
            <Grid item
lg={4}
sm={6}
xl={4}
xs={12}>
              <VehicleTotal />
            </Grid>
            <Grid item
xl={4}
lg={4}
sm={6}
xs={12}>
              <DriverTotal />
            </Grid>
            <Grid item
xl={4}
lg={4}
sm={6}
xs={12}>
              <ResponsableTotal />
            </Grid>
          </Grid>
          <Grid container
sx={{ mt: 2 }}
spacing={3}>
            {vehicles.length &&
              vehicles
                .filter((veh) => veh.delete != true)
                .map((vehicle) => (
                  <Grid item
key={vehicle.id}
lg={4}
md={6}
xl={3}
xs={12}>
                    <StatCar key={vehicle.id}
vehicle={vehicle} />
                  </Grid>
                ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
