import Head from "next/head";
import { Box, Container, Divider, Grid } from "@mui/material";
import { ZoneLeft } from "../../components/zone/zone-gauche-list-results";
import { ZoneRight } from "../../components/zone/zone-droit-list-results";
import { DashboardLayout } from "../../components/dashboard-layout";
import { PlageListToolbar } from "src/components/zone/zone-list-toolbar";

const Driver = () => (
  <>
    <Head>
      <title>CPS | Fleet Management Soft</title>
    </Head>
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <PlageListToolbar />
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={1}>
            <Grid item sm={6} md={6} lg={6} xl={6}>
              <ZoneLeft />
            </Grid>
            <Divider />

            <Grid item sm={6} md={6} lg={6} xl={6}>
              <ZoneRight />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  </>
);
Driver.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Driver;
