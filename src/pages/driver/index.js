import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DriverListResults } from "../../components/driver/driver-list-results";
import { DriverListToolbar } from "../../components/driver/driver-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";

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
        <DriverListToolbar />
        <Box sx={{ mt: 3 }}>
          <DriverListResults  />
        </Box>
      </Container>
    </Box>
  </>
);
Driver.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Driver;
